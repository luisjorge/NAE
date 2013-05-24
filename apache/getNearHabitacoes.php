<?php
	include "connection.php";

	$nome = isset($_POST["nome"]) ? $_POST["nome"] : "";
	$raio = isset($_POST["raio"]) ? $_POST["raio"] : "";

	$query = "
				SELECT a.morada AS ponto, a.numero AS numero, ST_DWithin(b.geom, a.the_geom, " . $raio . ", false) AS dentro
				FROM entidades b
				INNER JOIN habitacoes a
				ON b.nome = '" . $nome . "'
				ORDER BY a.morada";

	$result = pg_query($connection, $query);
	$num_rows = pg_num_rows($result);

	if($num_rows > 0){
		echo json_encode(array_values(pg_fetch_all($result)));
	}
	else{
		echo null;
	}
?>