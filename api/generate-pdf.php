<?php
    require_once "../libraries/dompdf/autoload.inc.php";
    require_once "./email-sender.php";

    use Dompdf\Dompdf;
    use Dompdf\Options;

    if ($_SERVER['REQUEST_METHOD']==='POST') {
        if(isset($_POST['action'])){
            switch($_POST['action']){
                case "generate-pdf":
                /* sending back the response as soon as pdf generation api hit is recieved
                    which will redirect the user to a success page and later on all the further function calls
                    and logics will be executed to generate pdf's and send an email after that.
                */
                sendAndCloseConnection();
                generatePdf($_POST);
                break;
            }
        }
    };

    function sendAndCloseConnection(){
        ignore_user_abort(true);
        set_time_limit(0);

        ob_start();
        // do initial processing here
        echo json_encode(true); // send the response
        header('Connection: close');
        header('Content-Length: '.ob_get_length());
        ob_end_flush();
        ob_flush();
        flush();
    }

    function generatePdf($obj) {
        include "../config/constants-config.php";
        $pdfFormatJson = $obj["pdfFormatJson"] ?? array();
        $font = $pdfFormatJson["font"];
        $templateUrl = $pdfFormatJson["imgBigResolution"];
        $color = $pdfFormatJson["color"];
        $names = $pdfFormatJson["names"];
        $email = $pdfFormatJson["email"];
        $namesLength = count($names);
        if(count($names)>$config_max_pdf_pages){
            echo json_encode(false);
            return;
        } else {
            foreach($names as $name){
                if(strlen(trim($name))>$config_max_length_per_name){
                    echo json_encode(false);
                    return;
                }
            }
        }
        $html_start = "
        <html>
            <head>
                <style>
                    .parent-div{
                        position:absolute;
                        left:0px;
                        right:0px;
                        bottom:0px;
                        top:0px;
                    }
                    .template-container{
                        position:relative;
                        width:100%;
                        height:100%;
                    }
                    .img-container{
                        position:absolute;
                        top:50%;
                        transform:translateY(-50%);
                    }
                    .template-name-text{
                        line-height:0.7;
                        padding:0px 8px;
                        font-family:{$font};
                        font-size:75px;
                        position:absolute;
                        left:0px;
                        right:0px;
                        text-align:center;
                        top:50%;
                        transform:translateY(-50%);
                        color:{$color};
                    }
                </style>
                <link href='https://fonts.googleapis.com/css?family={$font}%3Aregular&subset=latin&font-display=swap' rel='stylesheet' type='text/css' media='all' />            </head>
            <body>
        ";

        $html_content ="";

        $html_end="
            </body>
        </html>
        ";

        $i = 0;

        $pageBreakCss = "page-break-after:always;";

        foreach($names as $key=>$value) {
            if(++$i === $namesLength) {
                $pageBreakCss="";
            }
            $html_content .= "
                <div class='parent-div' style='$pageBreakCss'>
                    <div class='template-container'>
                        <div class='img-container'>
                            <img style='width:100%;' src='$templateUrl'/>
                        </div>
                        <div class='template-name-text'>{$value}</div>
                    </div>
                </div>
            ";
        };
        $html = $html_start . $html_content . $html_end;
        $savein = "../assets/pdf/";
        $fileName = uniqid("file").".pdf";
        $options = new Options();
        $options->set('isRemoteEnabled', true);
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4','landscape');
        $dompdf->render();
        // $dompdf->stream("sample.pdf",array("Attachment"=>0));
        $pdf = $dompdf->output();
        file_put_contents($savein.str_replace("/","-",$fileName), $pdf);    // save the pdf file on server
        $fileUrl = realpath($savein . $fileName);
        $sendEmailObj = array("email"=>$email,"fileUrl"=>$fileUrl);
        sendEmail($sendEmailObj);
    };

?>