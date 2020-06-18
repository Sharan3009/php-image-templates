let tagPage = 1;
let templatePage = 1;
let tagName;
let radioEleStr = 'input[type="radio"]';
let pdfFormatJson = {
    color: "#000000",
    font: "Abel",
    names: [],
    email:$("#staticEmail").val()
};

$(document).ready(function(){
    getTags();
    onTagChangeHandler();
    onLoadMoreHandler();
    onTemplateSelect();
    fontPickerInstance();
    onTextColorSelect();
    onPreviewTemplateHandler();
    onGenerateTempatesHandler();
    onEmailInputHandler();
    onModalCloseHandler();
});

function getTagsApi(){
    let loadMoreBtnName = "getMoreTags";
    return new Promise((resolve,reject)=>{
        ajax.get("api/tags.php",{page:tagPage,count:20})
        .then((response)=>{
            showHideLoadMore(loadMoreBtnName,response);
            resolve(response);
        })
        .catch((error)=>{
            showHideLoadMore(loadMoreBtnName,null);
            console.error(error);
            reject(error);
        });
    })
}

function getTags(){
    let selector = ".tagsList";
    let fn = "drawTagsUI";
    maintainLoader(selector,true);
    getTagsApi()
    .then((response)=>{
        maintainLoader(selector,false);
        maintainDataAndError(selector,fn,null,response);
        tagName = $(selector).children(":first-child").find('[type="radio"]').val();
        $(selector).each((index,ele)=>{
            $(ele).find(`[value=${tagName}]`).prop("checked",true);
        })
        getTemplates();
    })
    .catch((error)=>{
        maintainLoader(selector,false);
        maintainDataAndError(selector,fn,"Error occured while fetching the tags",null);
        getTemplates();
    });
}

function getMoreTags(){
    getTagsApi().then((response)=>{drawTagsUI(response)})
}

function drawTagsUI(response){
    let tagsListEles = $(".tagsList");
    tagsListEles.each((index,ele)=>{
        let tagsListEle = $(ele);
        if(response && Array.isArray(response.data)){
            let tagsArr = response.data.map((tag)=>{
                let tagTemplate = $($(`#${tagsListEle.attr("attr-template-id")}`).html());
                let tagId = `${tag.id}`;
                let tagRadio = tagTemplate.find('[type="radio"]');
                tagRadio.attr("attr-id",tagId);
                let tempId = tagRadio.attr("id");
                tagRadio.attr("id",`${tempId}${tagId}`)
                tagRadio.attr("value",tag.tagName);
                let tagLabel = tagTemplate.find("label");
                tagLabel.attr("for",`${tempId}${tagId}`);
                tagLabel.text(tag.tagName);
                return tagTemplate;
    
            });
            tagsListEle.append(tagsArr);
        }
    });
    tagPage++;
}

function getTemplatesApi(){
    let loadMoreBtnName = "getMoreTemplates";
    return new Promise((resolve,reject)=>{
        ajax.get("api/templates.php",{page:templatePage,count:10,tagName:tagName})
        .then((response)=>{
            showHideLoadMore(loadMoreBtnName,response);
            resolve(response);
        })
        .catch((error)=>{
            showHideLoadMore(loadMoreBtnName,null);
            console.error(error);
            reject(error);
        });
    })
}

function getTemplates(){
    let selector = "#templatesList";
    let fn = "drawTemplatesUI";
    maintainLoader(selector,true);
    getTemplatesApi(tagName)
    .then((response)=>{
        maintainLoader(selector,false);
        maintainDataAndError(selector,fn,null,response);
        drawTemplatesUI(response);
    })
    .catch((error)=>{
        maintainLoader(selector,false);
        maintainDataAndError(selector,fn,"Error occured while fetching the templates",null);
    })
}

function getMoreTemplates(){
    getTemplatesApi(tagName).then((response)=>{
        drawTemplatesUI(response);
    })
}

function drawTemplatesUI(response){
    let templatesListEle = $("#templatesList")
    if(response && Array.isArray(response.data)){
        let templatesArr = response.data.map((tag)=>{
            let template = $($("#templatePlankTemplate").html());
            $(template).find(".card-template").css("background-image",`url("${tag.templateUrl}")`);
            let html = `<i class="fa fa-tag"></i> ${tag.tagName}`;
            template.find('[name="tag"]').html(html)
            return template;

        });
        templatesListEle.append(templatesArr);
        templatePage++;
    }
}

function onTagChangeHandler(){
    $(".tagsList").on("change",radioEleStr,function(){
        updateAllOtherRadioTags($(this));
        tagName = this.value;
        templatePage = 1;
        getTemplates();
    })
}

function updateAllOtherRadioTags(ele){
    let id = ele.attr("attr-id");
    $(".tagsList").each((index,tagsList)=>{
        let currentRadio = $(tagsList).find(`[attr-id="${id}"`);
        if(!currentRadio.checked){
            currentRadio.prop("checked",true);
        }
    })
}

function onLoadMoreHandler(){
    $(".load-more-button").on("click",function(e){
        e.stopPropagation();
        eval(`${this.name}()`);
    })
}

function onTemplateSelect(){
    $("#templatesList").on("click",'[name="tagTemplates"]',function(){
        toggleMainViews();
        setTemplateProperties(this);
    })
}

function setTextCss(obj){
    for(let key in obj){
        pdfFormatJson[key] = obj[key];
        $(".apply-font").css({[key]:obj[key]});
        $($("#templatePreviewHtmlTemplate").prop("content"))
        .find(".apply-font")
        .add(".apply-font")
        .css(
            {
                [key]:obj[key]
            }
        );
    }
}

function fontPickerInstance(){
    new FontPicker(
        "AIzaSyA_wjcKCakGT7URaUYhR-_CgmipNty-6Bw",
        pdfFormatJson.font,
        { limit: 100 },
        onFontSelect
    )
}

function onFontSelect(fontObj){
    pdfFormatJson["font"] = fontObj.family;

}

function onTextColorSelect(){
    $(function(){
        $('#colorPicker').change(function(){
            setTextCss({"color":$(this).val()});
        });
      });
}

function setTemplateProperties(templateCard) {
    let imageUrl = $(templateCard).find(".card-template").css('background-image');
    imageUrl = imageUrl.replace('url(','').replace(')','').replace(/\"/gi, "");
    pdfFormatJson["templateUrl"]= imageUrl;
    $($("#templatePreviewHtmlTemplate").prop("content"))
    .find(".selected-template")
    .add(".selected-template")
    .css(
        {
            "background-image":`url(${imageUrl})`,
            "background-repeat": "no-repeat",
            "background-size": "cover"
        }
    );
}

function onPreviewTemplateHandler(){
    $(".preview-template").on("click",function(){
        let text = $("#templateNames").val();
        let error = null;
        let arrOfNames = [];
        if(text){
            if(text.trim()){
                arrOfNames = text.split("\n");
                if(arrOfNames.length<=20){
                    arrOfNames.some((name)=>{
                        if(name && name.length>100){
                            error = `The name "${name}" has more than 100 characters. Please make sure they do not exceed the limit.`;
                            return error;
                        }
                    });
                } else {
                    error = "You cannot generate more than 20 page templates at a time";
                }
            } else {
                error = "Make sure the input box has atleast one character to proceed";
            }
        } else {
            error = "Textbox cannot be empty";
        }
        if(error){
            generateError(error);
        } else {
            generatePreviews(arrOfNames);
        }
    })
}

function generateError(error){
    let errorEle = $("#namesError");
    errorEle.removeClass("d-none");
    errorEle.text(error);
}

function generatePreviews(names = []){
    pdfFormatJson["names"] = names;
    $("#namesError").addClass("d-none");
    $(`#generatedTemplates >.template-preview`).remove();
    let nameForDemo = names[0];
    let template = $($(`#templatePreviewHtmlTemplate`).html());
    template.find(".template-text").text(nameForDemo);
    $("#generatedTemplates").append(template);
    $("#templatesPreview").removeClass("d-none");
    $("#templatesPreview")[0].scrollIntoView({behavior:"smooth"});
}

function onGenerateTempatesHandler(){
    $(".generate-templates").on("click",function(){
        let emailSendButton = $(".generate-templates");
        let emailSuccess = $("#emailSuccess");
        let emailError = $("#emailError");
        let emailTextInput = $("#staticEmail");
        emailSuccess.addClass("d-none");
        emailError.addClass("d-none");
        emailSendButton.prop("disabled",true);
        emailTextInput.prop("disabled",true);
        ajax.post("api/generate-pdf.php",{
            action:"generate-pdf",
            pdfFormatJson:pdfFormatJson
        }).then((response)=>{
            emailSendButton.prop("disabled",false);
            emailTextInput.prop("disabled",false);
            if(response){
                emailSuccess.removeClass("d-none");
                emailError.addClass("d-none");
            } else {
                emailError.removeClass("d-none");
                emailSuccess.addClass("d-none");
            }
        }).catch((error)=>{
            emailSendButton.prop("disabled",false);
            emailTextInput.prop("disabled",false);
            emailError.removeClass("d-none");
            emailSuccess.addClass("d-none");
            console.error(error);
        })
    })
}

function onEmailInputHandler(){
    let emailSendButton = $(".generate-templates");
    $("#staticEmail").on("keyup",function(e){
        pdfFormatJson.email = e.target.value;
        if(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.target.value)){
            emailSendButton.prop("disabled",false);
        } else {
            emailSendButton.prop("disabled",true);
        }
    })
}

function maintainLoader(selector,loader){
    if(loader){
        $(selector).each((index,ele)=>{
            $(ele).children().remove();
            $(ele).html(`
            <div class="position-absolute" style="left:50%;top:50%;transform:translate(-50%,-50%);">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>`);
        })
    } else {
        $(selector).each((index,ele)=>{
            $(ele).children().remove();
        })
    }
}

function maintainDataAndError(selector,fn,error,data){
    if(error){
        $(selector).each((index,ele)=>{
            $(ele).children().remove();
            $(ele).html(`
            <div class="position-absolute text-center w-100" style="left:0px;top:50%;transform:translateY(-50%);">
                ${error}
            </div>`);
        });
    } else {
        eval(`${fn}(${JSON.stringify(data)})`);
    }
}

function showHideLoadMore(loadMoreBtnName,response){
    let btn = $(`.load-more-button[name=${loadMoreBtnName}]`);
    if(response){
        if(response.data && response.data.length===0){
            btn.addClass("d-none");
        } else {
            btn.removeClass('d-none');
        }
    } else {
        btn.addClass("d-none");
    }
}

function onModalCloseHandler(){
    $('#pdfGenerateModal').on('hidden.bs.modal', function (e) {
        // do something...
        let emailSuccess = $("#emailSuccess");
        let emailError = $("#emailError");
        let emailTextInput = $("#staticEmail");
        emailTextInput.val("");
        emailError.addClass("d-none");
        emailSuccess.addClass("d-none");
    })
}

function toggleMainViews(){
    $("#selection .flex-grow-overflow").scrollTop(0);
    $("#generatePdf .flex-grow-overflow").scrollTop(0);
    $("#selection").toggleClass("d-none");
    $("#generatePdf").toggleClass("d-none");
}