<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    require_once '../phpmailer/src/PHPMailer.php';
    require_once '../phpmailer/src/SMTP.php';
    require_once '../phpmailer/src/Exception.php';
    
    if ($_SERVER['REQUEST_METHOD']==='POST') {
        if(isset($_POST['action'])){
            switch($_POST['action']){
                case "send-email":
                    sendEmail($_POST);
            }
        }
    };

    function sendEmail($obj) {
        $email = $obj['email'];
        $fileUrl = $obj['fileUrl'];
        $emailSubject = "Templates";
        $emailBody = "<!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
                </head>
                <body>
                    <div>
                        <p>Click <a href ='{$fileUrl}'>here</a> to download.</p>
                    </div>
                </body>
            </html>";

            $mail = new PHPMailer();
            $mail->IsSMTP();
            $mail->SMTPDebug = 0;
            $mail->SMTPAuth = TRUE;
            $mail->SMTPSecure = "tls";
            $mail->Port     = 587;  
            $mail->Username = "gochat30091994@gmail.com";
            $mail->Password = "Password@94";
            $mail->Host     = "smtp.gmail.com";
            $mail->Mailer   = "smtp";
            $mail->SetFrom("test@testdomain.com", "Template Generator");
            $mail->AddAddress($email);
            $mail->Subject = $emailSubject;
            $mail->WordWrap   = 80;
            $content = $emailBody;
            $mail->MsgHTML($content);
            $mail->IsHTML(true);
            if(!$mail->Send()) 
            echo "Problem sending email.";
            else 
            echo "email sent.";
    };

?>