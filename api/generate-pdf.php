<?php

    require_once "../libraries/dompdf/autoload.inc.php";
    require_once "./email-sender.php";

    use Dompdf\Dompdf;
    use Dompdf\Options;

    if ($_SERVER['REQUEST_METHOD']==='POST') {
        if(isset($_POST['action'])){
            switch($_POST['action']){
                case "generate-pdf":
                    generatePdf($_POST);
                break;
            }
        }
    };

    function generatePdf($obj) {
        $pdfFormatJson = $obj["pdfFormatJson"] ?? array();
        $font = $pdfFormatJson["font"];
        $templateUrl = $pdfFormatJson["templateUrl"];
        $color = $pdfFormatJson["color"];
        $names = $pdfFormatJson["names"];
        $email = $pdfFormatJson["email"];
        $namesLength = count($names);

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
                    .template-text{
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
                        <div class='template-text'>{$value}</div>
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