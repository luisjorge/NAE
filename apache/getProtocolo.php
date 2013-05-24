<?php
	include "connection.php";

	$result = pg_query($connection, "SELECT * FROM protocolo");

	echo json_encode(array_values(pg_fetch_all($result)));
?>