<?php $input="Templates"?>
<?php include "shared/section-title.php"?>
<div class="parent-flex">
    <div class="flex-grow-overflow">
        <div  id="templatesList" class="d-flex flex-wrap">
            <template>
                <div class="col-lg-4 col-md-6 col-12 p-0" name="tagTemplates">
                    <div class="card m-2">
                        <img class="card-img-top border" src="assets/images/green-leaves-top.png" alt="Card image">
                        <div class="card-body">
                            <span class="badge badge-secondary" name="tag"></span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <?php $buttonName="getMoreTemplates" ?>
        <?php include "shared/showmore-button.php" ?>
    </div>
</div>