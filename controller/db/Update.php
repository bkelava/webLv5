<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$winner = $_GET["winner"];
$wins = $_GET["wins"];
$loser = $_GET["loser"];
$loss =$_GET["loss"];

$dbHandler = new DbHandler;
$dbHandler->update("UPDATE cats SET wins=$wins WHERE id = $winner");
$dbHandler->update("UPDATE cats SET loss=$loss WHERE id = $loser");
