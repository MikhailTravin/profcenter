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

	//От кого письмо
	$mail->setFrom('mikhail.travin@gmail.com', 'Profcenter');
	//Кому отправить
	$mail->addAddress('mikhail.travin@gmail.com');
	//Тема письма
	$mail->Subject = 'Привет! Это "Profcenter"';


	 // Email server settings
	 $mail->isSMTP();
	 $mail->Host = 'smtp.gmail.com';             //  smtp host
	 $mail->SMTPAuth = true;
	 $mail->Username = 'mikhail.travin@gmail.com';   //  sender username
	 $mail->Password = 'pogv nnfc uvru xrll';       // sender password
	 $mail->SMTPSecure = 'ssl';                  // encryption - ssl/tls
	 $mail->Port = 465;

	//Тело письма
	$body = '<h1></h1>';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
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
	
?>