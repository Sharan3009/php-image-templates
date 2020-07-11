<!DOCTYPE html>
<html lang="en">
<head>
    <?php $title="Templates" ?>
    <?php include "shared/head-meta.php" ?>
    <?php include "shared/minimal-css.php" ?>
    <link href="assets/css/templates.css" rel="stylesheet" type="text/css" media="all" />
</head>
<body>
    <!-- this apply-font element will stay everytime in order to preload the selected font -->
    <div class="position-fixed apply-font" style="top:-1000px">preload font</div>
    <?php include "config/constants-config.php" ?>
    <?php include "shared/header.php" ?>

    <div class="container-fluid parent-flex" id="select-templates">
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
        configMaxLengthPerName = <?php echo $config_max_length_per_name ?>;
        configMaxLengthPerTable = <?php echo $config_max_length_per_table ?>;
        configMaxPdfPages = <?php echo $config_max_pdf_pages ?>;
        configInitialPageNumber = <?php echo $config_initial_page_number ?>;
        configCountPerPage = <?php echo $config_count_per_page ?>;
        configToggleToDesignBtnText = "<?php echo $config_toggle_to_design_btn_text ?>";
        configPlaceCardPreviewPlaceholder = "<?php echo $config_place_card_name_placeholder ?>";
    </script>
    <script src="assets/js/templates.js" type="text/javascript"></script>
</body>
</html>