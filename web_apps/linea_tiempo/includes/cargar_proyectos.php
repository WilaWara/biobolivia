<?php
	require('conexion.php');

	$datos = array();

	// Armando la consulta
	$consulta_proyectos = "SELECT * FROM proyectos 
							INNER JOIN tematicas ON tematicas.id_tematica = proyectos.id_tematica 
							ORDER BY proyectos.fecha_inicio ASC";

	// Ejecutando la consulta
	if ($resultado_proyectos = $Conexion->query($consulta_proyectos)) {
	    while ($fila_proyecto = $resultado_proyectos->fetch_assoc()) {
	    	$nombre_proyecto = $fila_proyecto["nombre_proyecto"];
	    	$fecha_inicio = $fila_proyecto["fecha_inicio"];
	    	$fecha_fin = $fila_proyecto["fecha_fin"];
	    	$orden = $fila_proyecto["orden"];
	    	$resultados = $fila_proyecto["resultados"];
	    	$nombre_tematica = $fila_proyecto["nombre_tematica"];

			array_push($datos, $nombre_proyecto, $fecha_inicio, $fecha_fin, $orden, $resultados, $nombre_tematica);
	    }

	    echo json_encode($datos);
	}else{
		echo "No hay registros";
	}
	
	$Conexion->close();
?>