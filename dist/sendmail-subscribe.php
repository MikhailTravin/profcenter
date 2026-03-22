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
$mail->Subject = 'Новая подписка на рассылку - Profcenter';

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'mikhail.travin@gmail.com';
$mail->Password = 'pogv nnfc uvru xrll';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$body = '<h2>Новый подписчик на рассылку!</h2>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Имя:</strong> ' . htmlspecialchars($_POST['name']) . '</p>';
}
if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>E-mail:</strong> ' . htmlspecialchars($_POST['email']) . '</p>';
}

$body .= '<p><strong>Тип подписки:</strong> E-mail рассылка</p>';
$body .= '<p><strong>Дата подписки:</strong> ' . date('d.m.Y H:i:s') . '</p>';
$body .= '<hr>';
$body .= '<p style="color: #666; font-size: 12px;">Подписчик добавлен в базу для рассылки.</p>';

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'Ошибка при подписке. Пожалуйста, попробуйте позже.';
} else {
	$message = 'Спасибо за подписку! Мы будем присылать вам только самое интересное.';

	$subscriber = date('Y-m-d H:i:s') . ' | ' . $_POST['name'] . ' | ' . $_POST['email'] . "\n";
	file_put_contents('subscribers.txt', $subscriber, FILE_APPEND);
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
