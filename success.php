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
        <div class="parent-container py-5 text-center">
            <h1 class="mb-3">Congratulations! 🎉</h1>
            <h4 class="mb-5">Expect an email in 10-12 minutes.</h4>
            <div class="loader">
                <svg class="circular">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="1"  stroke-color="#f00" stroke-miterlimit="10"/>
                    
                </svg>
                <svg class="suc">
                <path class="checkmark__check" fill="none" d="M10.7,20.4l5.3,5.3l12.4-12.5"></path>
                </svg>
            </div>
            <p class="my-5">
                Our top minds are busy at work transcribing your podcast.<br>
                <strong>Keep an eye on your SPAM folder too. Just in case.</strong>
            </p>
            <button type="button" class="btn btn-success"><a href="templates.php" class="h5 p-3">Continue</a></button>
        </div>
        <?php include "shared/footer.php" ?>
        <?php include "shared/minimal-js.php" ?>
    </body>
</html>