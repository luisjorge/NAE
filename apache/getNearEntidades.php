<?php
	include "connection.php";

	$morada = isset($_POST["morada"]) ? $_POST["morada"] : "";
	$raio = isset($_POST["raio"]) ? $_POST["raio"] : "";

	$query = "
				SELECT b.nome AS ponto, ST_DWithin(a.the_geom, b.geom, " . $raio . ", false) AS dentro
				FROM entidades b
				INNER JOIN habitacoes a
				ON a.morada = '" . $morada . "'
				ORDER BY b.nome";

	$result = pg_query($connection, $query);
	$num_rows = pg_num_rows($result);

	if($num_rows > 0){
		echo json_encode(array_values(pg_fetch_all($result)));
	}
	else{
		echo null;
	}
?>