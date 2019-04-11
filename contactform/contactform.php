<?php 
    require  '/storage/ssd1/017/9222017/public_html/contactform/phpmailer/PHPMailerAutoload.php';
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
    $mail->Username = "tiptoprecruitmentofficial@gmail.com";
    $mail->Password = "xxxxxx";
    $mail->SetFrom("tiptoprecruitmentofficial@gmail.com");
    $mail->Subject = $_POST['subject'];
    $mail->Body = $_POST['message'];
    $mail->AddAddress("tiptoprecruitmentofficial@gmail.com");
    
    for($ct=0;$ct<count($_FILES['my_file']['tmp_name']);$ct++){
      $mail->AddAttachment($_FILES['my_file']['tmp_name'][$ct], $_FILES['my_file']['name'][$ct]);
    }  

     if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
     } else {
        echo "Message has been sent";
     }
?>