<?php $input="Tags"?>
<?php include "shared/section-title.php"?>
<div class="flex-grow-overflow px-2">
    <div id="tagsList">
        <template>
            <div class="form-check py-1">
                <input class="form-check-input" type="radio" name="tagRadios" />
                <label class="form-check-label"></label>
            </div>
        </template>
    </div>
    <?php $buttonName="getMoreTags" ?>
    <?php include "shared/showmore-button.php" ?>
</div>