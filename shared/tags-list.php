<div class="tagsList px-2">
    <template>
        <div class="form-check py-1">
            <input class="form-check-input" type="radio" id=<?php echo $uniqueRadioIdentifier ?> name=<?php echo $uniqueRadioIdentifier ?> />
            <label class="form-check-label" for=<?php echo $uniqueRadioIdentifier ?>></label>
        </div>
    </template>
</div>
<?php $buttonName="getMoreTags" ?>
<?php include "shared/showmore-button.php" ?>