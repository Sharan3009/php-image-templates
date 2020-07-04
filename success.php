<!DOCTYPE html>
<html lang="en">
    <head>
        <?php $title="Success" ?>
        <?php include "shared/head-meta.php" ?>
        <?php include "shared/minimal-css.php" ?>
        <link rel="stylesheet" href="assets/css/success.css">
    </head>
    <body>
        <?php include "config/constants-config.php" ?>
        <?php include "shared/header.php" ?>
        <div class="loader">
            <svg class="circular">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="1"  stroke-color="#f00" stroke-miterlimit="10"/>
                
            </svg>
            <svg class="suc">
            <path class="checkmark__check" fill="none" d="M10.7,20.4l5.3,5.3l12.4-12.5"></path>
            </svg>
        </div>
        <?php include "shared/minimal-js.php" ?>
    </body>
</html>