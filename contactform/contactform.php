<?php 
    require  'phpmailer\PHPMailerAutoload.php';
    require  'phpmailer\class.smtp.php';
    //include_once(PATH.'/PHPMailer/src/SMTP.php');
    $mail = new PHPMailer(); 
    $mail->IsSMTP(); // enable SMTP

    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "";
    $mail->Password = "";
    $mail->SetFrom("");
    $mail->Subject = $_POST['subject'];
    $mail->Body = $_POST['message'];
    $mail->AddAddress("");

    $mail->AddAttachment($_FILES['my_file']['tmp_name'], $_FILES['my_file']['name']); 

     if(!$mail->Send()) {
        //echo "Mailer Error: " . $mail->ErrorInfo;
     } else {
        //echo "Message has been sent";
     }
?>