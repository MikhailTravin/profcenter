<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', __DIR__ . '/PHPMailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('profcentre@sama.ru', 'Profcenter');
//Кому отправить
$mail->addAddress('profcentre@sama.ru');
//Тема письма
$mail->Subject = 'Привет! Это "Profcenter"';


// Email server settings
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';             //  smtp host
$mail->SMTPAuth = true;
$mail->Username = 'profcentre@sama.ru';   //  sender username
$mail->Password = 'pogv nnfc uvru xrll';       // sender password
$mail->SMTPSecure = 'ssl';                  // encryption - ssl/tls
$mail->Port = 465;

//Тело письма
$body = '<h1></h1>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Name:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}

$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
