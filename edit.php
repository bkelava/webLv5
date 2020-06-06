<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EDIT FIGHTER</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
</head>

<body>

    <?php
    require "./controller/DbHandler.php";

    use db\DbHandler;

    $dbHandler = new DbHandler();

    $action = $_POST['edit'];

    if ($action == "EDIT") {
        $catID = $_POST['editID'];

        $dbHandler = new DbHandler();
        $sql = "SELECT * FROM cats WHERE id = '{$catID}'";
        $result = $dbHandler->select($sql);
        $row = $result->fetch_assoc();
    }
    ?>

    <form id="form" enctype="multipart/form-data">
        <p>
            <label for="name">First name: </label>
            <input type="text" name="name" id="name" value="<?php echo (isset($result)) ? $row["name"] : ''; ?>" required />
        </p>

        <p>
            <label for="age">Age: </label>
            <input type="number" min="0" name="age" id="age" value="<?php echo (isset($result)) ? $row["age"] : ''; ?>" required />
        </p>

        <p>
            <label for="info">Info: </label>
            <input type="text" name="info" id="info" value="<?php echo (isset($result)) ? $row["info"] : ''; ?>" required />
        </p>

        <p>
            <label for="wins">Wins: </label>
            <input type="number" min="0" name="wins" id="wins" value="<?php echo (isset($result)) ? $row["wins"] : ''; ?>" required />
        </p>

        <p>
            <label for="loss">Loss: </label>
            <input type="number" min="0" name="loss" id="loss" value="<?php echo (isset($result)) ? $row["loss"] : ''; ?>" required />
        </p>
        <p>
            <label for="imageFile">Upload image: </label>
            <input type="file" name="imageFile"/>
        </p>
        <button type="submit" formmethod="POST" formaction="controller/db/UpdateInformations.php" style="display: inline-block;" name="editID" value="<?= $catID; ?>">Save fighter</button>
        <button type="submit" formmethod="POST" formaction="controller/db/Delete.php" style="display: inline-block;" name="deleteID" value="<?= $catID; ?>">Delete fighter</button>

    </form>
    </div>
</body>

</html>