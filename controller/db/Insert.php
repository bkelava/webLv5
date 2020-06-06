<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$name = $_POST['name'];
$age = $_POST['age'];
$catInfo = $_POST['catInfo'];
$wins = $_POST['wins'];
$loss = $_POST['loss'];

$saveLocation="../../images/";
$saveLocationShort="images/";

$saveLocation=$saveLocation.basename($_FILES['uploadFile']['name']);
$saveLocationShort=$saveLocationShort.$_FILES['uploadFile']['name'];
move_uploaded_file($_FILES['uploadFile']['tmp_name'],$saveLocation);
$dbHandler = new DbHandler();
$dbHandler->insert("INSERT INTO cats(name,age,info,wins,loss,image) VALUES ('$name',$age,'$catInfo',$wins,$loss,'$saveLocationShort')");
