let tagPage = configInitialPageNumber;
let templatePage = configInitialPageNumber;
let themeType;
let pdfFormatJson = {
    color: "",
    font: "",
    names: [],
    email:$("#staticEmail").val()
};

$(document).ready(function(){
    getTags();
    onTagChangeHandler();
    onLoadMoreHandler();
    onTemplateSelect();
    onTextColorSelect();
    onToggleToTemplatesHandler();
    onDownloadClickHandler();
    onGenerateTempatesHandler();
    onEmailInputHandler();
    onModalCloseHandler();
});

function getTagsApi(){
    let loadMoreBtnName = "getMoreTags";
    showHideLoadMoreBtn(loadMoreBtnName,{data:[]});
    return new Promise((resolve,reject)=>{
        ajax.get("api/tags.php",{page:tagPage,count:configCountPerPage*2})
        .then((response)=>{
            showHideLoadMoreBtn(loadMoreBtnName,response);
            resolve(response);
        })
        .catch((error)=>{
            showHideLoadMoreBtn(loadMoreBtnName,null);
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
        if(response){
            if(response.data && response.data.length===0){
                maintainDataAndError(selector,fn,"No tags found",null);
            } else {
                maintainDataAndError(selector,fn,null,response);
                themeType = $(selector).children(":first-child").find('[type="radio"]').val();
                $(selector).each((index,ele)=>{
                    $(ele).find(`[value=${themeType}]`).prop("checked",true);
                })
            }
        } else {
            maintainDataAndError(selector,fn,"Error occured while fetching the tags",null);
        }
        getTemplates();
    })
    .catch((error)=>{
        maintainLoader(selector,false);
        maintainDataAndError(selector,fn,"Error occured while fetching the tags",null);
        getTemplates();
    });
}

function getMoreTags(cb=f=>f){
    getTagsApi()
    .then((response)=>{
        drawTagsUI(response);
        cb(response);
    })
    .catch((errpr)=>{
        cb(null);
    })
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
                tagRadio.attr("value",tag.themeType);
                let tagLabel = tagTemplate.find("label");
                tagLabel.attr("for",`${tempId}${tagId}`);
                tagLabel.text(tag.themeType);
                return tagTemplate;
    
            });
            tagsListEle.append(tagsArr);
        }
    });
    tagPage++;
}

function getTemplatesApi(){
    let loadMoreBtnName = "getMoreTemplates";
    showHideLoadMoreBtn(loadMoreBtnName,{data:[]});
    return new Promise((resolve,reject)=>{
        ajax.get("api/templates.php",{page:templatePage,count:configCountPerPage,themeType:themeType})
        .then((response)=>{
            showHideLoadMoreBtn(loadMoreBtnName,response);
            resolve(response);
        })
        .catch((error)=>{
            showHideLoadMoreBtn(loadMoreBtnName,null);
            console.error(error);
            reject(error);
        });
    })
}

function getTemplates(){
    let selector = "#templatesList";
    let fn = "drawTemplatesUI";
    maintainLoader(selector,true);
    getTemplatesApi(themeType)
    .then((response)=>{
        if(response){
            if(response.data && response.data.length===0){
                maintainDataAndError(selector,fn,"No templates found",null);
            } else {
                maintainLoader(selector,false);
                maintainDataAndError(selector,fn,null,response);
            }
        } else {
            maintainDataAndError(selector,fn,"Error occured while fetching the templates",null);
        }
    })
    .catch((error)=>{
        maintainLoader(selector,false);
        maintainDataAndError(selector,fn,"Error occured while fetching the templates",null);
    })
}

function getMoreTemplates(cb=f=>f){
    getTemplatesApi(themeType)
    .then((response)=>{
        drawTemplatesUI(response);
        cb(response);
    })
    .catch((error)=>{
        cb(null);
    })
}

function drawTemplatesUI(response){
    let templatesListEle = $("#templatesList")
    if(response && Array.isArray(response.data)){
        let templatesArr = response.data.map((tag)=>{
            let template = $($("#templatePlankTemplate").html());
            let card = $(template).find(".card-template")
            card.attr("attr-imgBigResolution",tag.imgBigResolution);
            card.attr("attr-font",tag.font);
            card.attr("attr-color",tag.color);
            card.css("background-image",`url("${tag.imgSmallResolution}")`);
            let html = `<i class="fa fa-tag"></i> ${tag.themeType}`;
            template.find('[name="tag"]').html(html)
            return template;

        });
        templatesListEle.append(templatesArr);
        templatePage++;
    }
}

function onTagChangeHandler(){
    $(".tagsList").on("change",'input[type="radio"]',function(){
        updateAllOtherRadioTags($(this));
        themeType = this.value;
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
        $(this).addClass("d-none");
        $(this).next().removeClass("d-none");
        e.stopPropagation();
        eval(`${this.name}(${(response)=>{
            if(response){
                if(response.data && response.data.length){
                    $(this).removeClass("d-none");
                }
            } else {
                alert("Something went wrong while loading more items");
            }
            $(this).next().addClass("d-none");
        }})`);
    })
}

function onTemplateSelect(){
    $("#templatesList").on("click",'[name="tagTemplates"]',function(){
        // adding setTimeout so that font's preapply before the text renders and stops abrupt font toggle in text
        setTimeout(()=>{
            $("#generatePdf .flex-grow-overflow").scrollTop(0);
            $("#select-templates").addClass("d-none");
            $("#generatePdf").removeClass("d-none");
        },100);
        setTemplateProperties(this);
    })
}

function onToggleToTemplatesHandler(){
    $("#toggleToTemplates").on("click",function(){
        $("#select-templates").removeClass("d-none");
        $("#generatePdf").addClass("d-none");
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
    $("#font-picker").empty();
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
    let card = $(templateCard).find(".card-template")
    let imageUrl = card.attr("attr-imgBigResolution");
    let font = card.attr("attr-font");
    let color = card.attr("attr-color");
    imageUrl = imageUrl.replace('url(','').replace(')','').replace(/\"/gi, "");
    pdfFormatJson.imgBigResolution = imageUrl;
    pdfFormatJson.font = font;
    pdfFormatJson.color = color;
    fontPickerInstance();
    $("#colorPicker").val(color);
    setTextCss({color:color});
    $($("#templatePreviewHtmlTemplate").prop("content"))
    .find(".selected-template")
    .add(".selected-template")  // add() to clone the template element's .selected-template and do the actions
    .css(
        {
            "background-image":`url(${imageUrl})`,
            "background-repeat": "no-repeat",
            "background-size": "cover"
        }
    );
}

function onDownloadClickHandler(){
    $(".download-template").on("click",function(e){
        let text = $("#templateNames").val();
        let error = null;
        let arrOfNames = [];
        if(text){
            if(text.trim()){
                arrOfNames = text.split("\n");
                if(arrOfNames.length<=configMaxPdfPages){
                    arrOfNames.some((name)=>{
                        if(name && name.trim().length>configMaxLengthPerName){
                            error = `The name "${name}" has more than ${configMaxLengthPerName} characters. Please make sure they do not exceed the limit.`;
                            return error;
                        }
                    });
                } else {
                    error = `You cannot generate more than ${configMaxPdfPages} page templates at a time`;
                }
            } else {
                error = "Make sure the input box has atleast one character to proceed";
            }
        } else {
            error = "Textbox cannot be empty";
        }
        if(error){
            e.stopPropagation();
            generateError(error);
        } else {
            $("#namesError").addClass("d-none");
            pdfFormatJson["names"] = arrOfNames;
        }
    })
}

function generateError(error){
    let errorEle = $("#namesError");
    errorEle.removeClass("d-none");
    errorEle[0].scrollIntoView({behavior:"smooth"});
    errorEle.text(error);
}

function onGenerateTempatesHandler(){
    $(".generate-templates").on("click",function(){
        let emailSendButton = $(".generate-templates");
        let emailError = $("#emailError");
        let emailTextInput = $("#staticEmail");
        emailError.addClass("d-none");
        emailSendButton.prop("disabled",true);
        emailTextInput.prop("disabled",true);
        ajax
        .timeout(60000)
        .post("api/generate-pdf.php",{
            action:"generate-pdf",
            pdfFormatJson:pdfFormatJson
        }).then((response)=>{
            window.location.pathname = "success.php";
        }).catch((error)=>{
            emailSendButton.prop("disabled",false);
            emailTextInput.prop("disabled",false);
            emailError.removeClass("d-none");
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

function showHideLoadMoreBtn(loadMoreBtnName,response){
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
        let emailError = $("#emailError");
        let emailTextInput = $("#staticEmail");
        emailTextInput.val("");
        emailError.addClass("d-none");
    })
}