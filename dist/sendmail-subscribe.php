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

$mail->setFrom('profcentre@sama.ru', 'Profcenter');
$mail->addAddress('profcentre@sama.ru');
$mail->Subject = 'Новая подписка на рассылку - Profcenter';

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'profcentre@sama.ru';
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

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
