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

// От кого письмо
$mail->setFrom('profcentre@sama.ru', 'Profcenter');
// Кому отправить
$mail->addAddress('profcentre@sama.ru');
// Тема письма
$mail->Subject = 'Заявка на звонок - Profcenter';

// Настройки SMTP
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'profcentre@sama.ru';
$mail->Password = 'pogv nnfc uvru xrll';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

// Тело письма
$body = '<h2>Новая заявка на звонок</h2>';

if (!empty($_POST['name'])) {
	$body .= '<p><strong>Имя:</strong> ' . htmlspecialchars($_POST['name']) . '</p>';
}
if (!empty($_POST['phone'])) {
	$body .= '<p><strong>Телефон:</strong> ' . htmlspecialchars($_POST['phone']) . '</p>';
}

$body .= '<p><strong>Тип заявки:</strong> Заказ звонка</p>';
$body .= '<p><strong>Время:</strong> ' . date('d.m.Y H:i:s') . '</p>';

$mail->Body = $body;

// Отправляем
if (!$mail->send()) {
	$message = 'Ошибка при отправке. Попробуйте позже.';
} else {
	$message = 'Спасибо! Ваша заявка успешно отправлена.';
}

$response = ['message' => $message];

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
