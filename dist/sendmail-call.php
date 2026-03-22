<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('mikhail.travin@gmail.com', 'Profcenter');
$mail->addAddress('mikhail.travin@gmail.com');
$mail->Subject = 'Заявка на звонок - Profcenter';

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'mikhail.travin@gmail.com';
$mail->Password = 'pogv nnfc uvru xrll';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$body = '<h2>Новая заявка на звонок</h2>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Имя:</strong> ' . htmlspecialchars($_POST['name']) . '</p>';
}
if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Телефон:</strong> ' . htmlspecialchars($_POST['phone']) . '</p>';
}

$body .= '<p><strong>Тип заявки:</strong> Заказ звонка</p>';
$body .= '<p><strong>Время:</strong> ' . date('d.m.Y H:i:s') . '</p>';

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'Ошибка при отправке. Пожалуйста, попробуйте позже.';
} else {
	$message = 'Спасибо! Мы перезвоним вам в ближайшее время.';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
