<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <?php include "shared/minimal-css.php" ?>
    <!-- <link href="assets/css/fontselect-alternate.css" rel="stylesheet" type="text/css" media="all" /> -->
    <link href="assets/css/home.css" rel="stylesheet" type="text/css" media="all" />
</head>
<body>
    <?php include "config/config.php" ?>
    <?php include "shared/header.php" ?>

    <div class="container-fluid parent-flex" id="selection">
        <div class="row">
            <div class="col-md-3 d-md-flex d-none parent-flex border-right px-0">
                <?php include "shared/tags-view.php" ?>
            </div>
            <div class="col-md-9 parent-flex px-0">
                <?php include "shared/templates-view.php" ?>
            </div>
        </div>
    </div>

    <div id="generatePdf" class="parent-flex d-none">
        <?php include "shared/template-generate.php" ?>
    </div>

    <?php include "shared/minimal-js.php" ?>
    <?php include "shared/html-template-tags.php" ?>
    <script src="assets/js/fontpicker.js" type="text/javascript"></script>
    <script>
        configMaxLengthPerName = <?php echo $GLOBALS['configMaxLengthPerName'] ?>;
        configMaxPdfPages = <?php echo $GLOBALS['configMaxPdfPages'] ?>;
        configInitialPageNumber = <?php echo $GLOBALS['configInitialPageNumber'] ?>;
        configCountPerPage = <?php echo $GLOBALS['configCountPerPage'] ?>;
        configToggleToDesignBtnText = "<?php echo $GLOBALS['configToggleToDesignBtnText'] ?>";
    </script>
    <script src="assets/js/home.js" type="text/javascript"></script>
</body>
</html>