<?php foreach(["tagList","tagDropdown"] as $value): ?>
<template id=<?php echo $value ?>>
    <div class="form-check py-1">
        <input class="form-check-input" type="radio" id=<?php echo $value ?> name=<?php echo $value ?> />
        <label class="form-check-label" for=<?php echo $value ?>></label>
    </div>
</template>
<?php endforeach ?>

<template id="templatePreviewHtmlTemplate">
    <div class="template-preview p-2 my-1 w-100">
        <?php include "shared/template-preview.php" ?>
    </div>
</template>

<template id="templatePlankTemplate">
    <div class="col-lg-4 col-md-6 col-12 p-0" name="tagTemplates">
        <div class="card m-2 template-shadow">
            <div class="card-template card-img-top border" style="background-color:#d3d3d3;background-repeat:no-repeat;background-size:cover;"></div>
            <div class="card-body">
                <span class="badge badge-secondary" name="tag"></span>
            </div>
        </div>
    </div>
</template>