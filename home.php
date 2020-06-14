<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <?php include "shared/minimal-css.php" ?>
    <link href="assets/css/home.css" rel="stylesheet" type="text/css" media="all" />
</head>
<body>
    <?php include "shared/header.php" ?>

    <div class="container-fluid parent-flex">
        <div class="row">
            <div class="col-3 parent-flex border-right px-0">
                <?php include "shared/tags-view.php" ?>
            </div>
            <div class="col-9 parent-flex px-0">
                <?php include "shared/templates-view.php" ?>
            </div>
        </div>
    </div>

    <?php include "shared/minimal-js.php" ?>
    <script src="assets/js/home.js" type="text/javascript"></script>
</body>
</html>