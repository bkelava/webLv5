<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$tmp = $_POST['deleteID'];

$dbHandler = new DbHandler();
$dbHandler->delete("$tmp");

header("Location: ../../index.php");