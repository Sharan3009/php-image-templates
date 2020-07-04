<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    require_once '../libraries/phpmailer/src/PHPMailer.php';
    require_once '../libraries/phpmailer/src/SMTP.php';
    require_once '../libraries/phpmailer/src/Exception.php';

    if ($_SERVER['REQUEST_METHOD']==='POST') {
        if(isset($_POST['action'])){
            switch($_POST['action']){
                case "send-email":
                    sendEmail($_POST);
            }
        }
    };

    function sendEmail($obj) {
        require_once '../config/email-config.php';
        $senderEmail = $obj['email'];
        $fileUrl = $obj['fileUrl'];
        $emailBody = "<!DOCTYPE html>
                        <html>
                            <head>
                                <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
                            </head>
                            <body>
                                $fileUrl
                            </body>
                        </html>";

        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPDebug = $config_debug;
        $mail->SMTPAuth = $config_smtp_auth;
        $mail->SMTPSecure = $config_smtp_secure;
        $mail->Port     = $config_port;  
        $mail->Username = $config_username;
        $mail->Password = $config_password;
        $mail->Host     = $config_host;
        $mail->Mailer   = $config_mailer;
        $mail->SetFrom($config_username, $config_email_name);
        $mail->AddAddress($senderEmail);
        $mail->Subject = $config_email_subject;
        $mail->WordWrap   = $config_word_wrap;
        $content = $emailBody;
        $mail->MsgHTML($content);
        $mail->IsHTML(true);
        if(!$mail->Send())
            echo json_encode(false);
        else
            echo json_encode(true);
    };

?>