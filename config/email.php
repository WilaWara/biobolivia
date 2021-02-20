<?php
    $direccion_formulario = $_POST["direccion_formulario"];
    $mensaje_formulario = $_POST["mensaje_formulario"];

	$subject = "Mensaje desde BioBolivia.tech";
	$to = "jaimerodriguez0001@gmail.com";
	$headers = "From: Sitio_BioBolivia" . "\r\n";
	$headers .= "Content-type: text/html\r\n";

	$body = "Email: " . $direccion_formulario . "<br>Mensaje: " . $mensaje_formulario;
	$success = mail($to, $subject, $body, $headers);
	echo "Su mensaje ha sido correctamente enviado, muchas gracias!";
?>