<?php $input="Templates"?>
<div class="d-flex">
    <?php include "shared/section-title.php"?>
    <div class="dropdown ml-auto d-md-none d-flex border-bottom align-items-center mr-2">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown button
        </button>
        <div class="dropdown-menu dropdown-menu-right" style="height:60vh;overflow-y:auto;" aria-labelledby="dropdownMenuButton">
        <?php $uniqueRadioIdentifier="tagDropdown"?>
            <?php include "shared/tags-list.php" ?>
        </div>
    </div>
</div>
<div class="parent-flex">
    <div class="flex-grow-overflow">
        <div  id="templatesList" class="d-flex flex-wrap">
            <template>
                <div class="col-lg-4 col-md-6 col-12 p-0" name="tagTemplates">
                    <div class="card m-2 template-shadow">
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