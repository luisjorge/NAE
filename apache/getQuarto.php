<?php
	include "connection.php";

	$id = isset($_POST["id"]) ? $_POST["id"] : "";

	$result = pg_query($connection, "SELECT * FROM quartos WHERE id_habitacao = " . $id . " ORDER BY andar");
	$num_rows = pg_num_rows($result);

	if($num_rows > 0){
		echo json_encode(array_values(pg_fetch_all($result)));
	}
	else{
		echo null;
	}
?>