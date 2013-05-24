<?php
	include "connection.php";

	$id = isset($_POST["id"]) ? $_POST["id"] : "";

	$query = pg_query($connection, "SELECT nome FROM protocolo WHERE id = " . $id);

	$result = pg_fetch_array($query, 0, PGSQL_ASSOC);

	echo json_encode($result);
?>