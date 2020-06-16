let tagPage = 1;
let templatePage = 1;
let tagName;
let radioEleStr = 'input[type="radio"]';
let pdfFormatJson = {
    color: "#000000",
    font: "Abel",
    names: []
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
    $('#colorPicker').val(pdfFormatJson.color);
});

function getTemplatesOnPageLoad(){
    $(".tagsList").first().find(radioEleStr).first().trigger("click");

}
function getTagsApi(){
    return new Promise((resolve,reject)=>{
        ajax.get("api/tags.php",{page:tagPage,count:20})
        .then((response)=>{
            resolve(response);
        })
        .catch((error)=>{
            alert("Some error occured");
            console.error(error);
            reject(error);
        });
    })
}

function getTags(){
    getTagsApi().then((response)=>{
        drawTagsUI(response);
        getTemplatesOnPageLoad();
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
                let tagTemplate = $(tagsListEle.find("template").html());
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
    return new Promise((resolve,reject)=>{
        ajax.get("api/templates.php",{page:templatePage,count:10,tagName:tagName})
        .then((response)=>{
            resolve(response);
        })
        .catch((error)=>{
            alert("Something went wrong");
            console.error(error);
            reject(error);
        });
    })
}

function getTemplates(){
    $("#templatesList").find('[name="tagTemplates"]').not("template").remove();
    getTemplatesApi(tagName).then((response)=>{
        drawTemplatesUI(response);
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
            let template = $(templatesListEle.find("template").html());
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
    let namesForDemo = names.slice(0,6);
    let templates = namesForDemo.map((name)=>{
        let template = $($(`#templatePreviewHtmlTemplate`).html());
        template.find(".template-text").text(name);
        return template;
    });
    $("#generatedTemplates").append(templates);
    $("#templatesPreview").removeClass("d-none");
    $("#templatesPreview")[0].scrollIntoView({behavior:"smooth"});
}

function onGenerateTempatesHandler(){
    $(".generate-templates").on("click",function(){
        let pdfHtml = $("#generatedTemplates").html();
        console.log(pdfFormatJson);
        ajax.post("api/generate-pdf.php",{
            action:"generate-pdf",
            html:pdfHtml
        })
    })
}

function toggleMainViews(){
    $("#selection .flex-grow-overflow").scrollTop(0);
    $("#generatePdf .flex-grow-overflow").scrollTop(0);
    $("#selection").toggleClass("d-none");
    $("#generatePdf").toggleClass("d-none");
}