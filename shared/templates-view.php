<?php $input="Templates"?>
<div class="d-flex">
    <?php include "shared/section-title.php"?>
    <div class="dropdown ml-auto d-md-none d-flex border-bottom align-items-center mr-2">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Tags
        </button>
        <div class="dropdown-menu dropdown-menu-right pr-4" style="height:60vh;overflow-y:auto;overflow-x:hidden;" aria-labelledby="dropdownMenuButton">
            <?php $uniqueRadioIdentifier="tagDropdown"?>
            <?php include "shared/tags-list.php" ?>
        </div>
    </div>
</div>
<div class="parent-flex">
    <div class="flex-grow-overflow position-relative">
        <div  id="templatesList" class="d-flex flex-wrap">
        </div>
        <?php $buttonName="getMoreTemplates" ?>
        <?php include "shared/showmore-button.php" ?>
    </div>
</div>