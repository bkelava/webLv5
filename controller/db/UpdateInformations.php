<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$id = $_POST['editID'];
$name = $_POST['name'];
$age = $_POST['age'];
$catInfo = $_POST['info'];
$wins = $_POST['wins'];
$loss = $_POST['loss'];

$saveLocation="../../images/";
$saveLocationShort="images/";

$saveLocation=$saveLocation.basename($_FILES['imageFile']['name']);
$saveLocationShort=$saveLocationShort.$_FILES['imageFile']['name'];
move_uploaded_file($_FILES['imageFile']['tmp_name'],$saveLocation);


$dbHandler = new DbHandler();

if (is_file($saveLocation))
{
    $dbHandler->update("UPDATE cats SET name = '$name', age = $age, info = '$catInfo',wins = $wins, loss = $loss, image='$saveLocationShort' WHERE id= $id" );
    //echo "PRVA";
}

else 
{
    $dbHandler->update("UPDATE cats SET name = '$name', age = $age, info = '$catInfo',wins = $wins, loss = $loss WHERE id= $id" );
    //echo "DRUGA";
}

header("Location: ../../index.php");

