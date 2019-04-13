<?php 
    require  'phpmailer/PHPMailerAutoload.php';
    //require  'phpmailer\class.smtp.php';
    //include_once(PATH.'/PHPMailer/src/SMTP.php');
    $mail = new PHPMailer(); 
    $mail->IsSMTP(); // enable SMTP

    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "xxx";
    $mail->Password = "xxx";
    $mail->SetFrom("xxxx", "xxx");
    $mail->Subject = 'New Contact us request with subject: ' . $_POST['subject'];
    $mail->Body = '<b>' . $_POST['name'] . '</b> has submitted a Contact request on our website. Here the message: <br/><br/>' . $_POST['message'] . '. <br/><br/>His/her email address is ' . $_POST['email'];
    $mail->AddAddress('xxx');
    $mail->AddAddress('xxx');
    for($ct=0;$ct<count($_FILES['my_file']['tmp_name']);$ct++){
      $mail->AddAttachment($_FILES['my_file']['tmp_name'][$ct], $_FILES['my_file']['name'][$ct]);
    }  

     if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
     } else {
        echo "Message has been sent";
     }
?>