<?php
	global $host,$user,$pass,$db;

	/*$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "linea_tiempo";*/

	$host = "localhost";
	$user = "u285316360_lbbd";
	$pass = "JxcOcU@4";
	$db = "u285316360_lbbd_lt";

	//phpinfo();
	try{
		@$Conexion = mysqli_connect($host, $user, $pass) or die ("Error de conexion");
		mysqli_select_db($Conexion, $db) or die ("Hubo un problema al conectar a la base de datos".mysqli_error($Conexion));
	}catch(Exception $e){
		echo $e;
	}
?>