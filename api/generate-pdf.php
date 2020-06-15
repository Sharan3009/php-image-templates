<?php

    require_once "../dompdf/autoload.inc.php";

    use Dompdf\Dompdf;

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
        $html = $obj['html'] ?? '';
        $savein = "../assets/pdf/";
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4','landscape');
        $dompdf->render();
        $pdf = $dompdf->output();
        file_put_contents($savein.str_replace("/","-","Dummy.pdf"), $pdf);    // save the pdf file on server
    };

?>