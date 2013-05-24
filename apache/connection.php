<?php
	$hostname = "www.gisforcloud.com";
	$username = "pt_nae";
	$password = "ptas_nae";
	$database = "nae";
	$port = 5432;

	$connection = pg_connect("host=" . $hostname . " port=" . $port . " dbname=" . $database . " user=" . $username . " password=" . $password);
?>