<?php
	include "connection.php";

	$field = "geom";
	$gid = isset($_POST["gid"]) ? $_POST["gid"] : "";
	$table = isset($_POST["table"]) ? $_POST["table"] : "";

	if($table == "habitacoes"){
		$field = "the_geom";
	}

	$query = pg_query($connection, "SELECT st_x(" . $field . ") AS \"longitude\", st_y(" . $field . ") AS \"latitude\" FROM " . $table . " WHERE gid = " . $gid);

	$result = pg_fetch_array($query, 0, PGSQL_ASSOC);

	echo json_encode($result);
?>