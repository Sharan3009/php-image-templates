$(document).ready(function(){
    getTags();
    onTagChangeHandler();
    onLoadMoreHandler();
});
let tagPage = 1;
let templatePage = 1;
let tagName;
let radioEleStr = 'input[type="radio"][name="tagRadios"]';

function getTemplatesOnPageLoad(){
    $("#tagsList").find(radioEleStr).first().trigger("click");

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
    $("#tagsList").find(radioEleStr).not("template").remove();
    getTagsApi().then((response)=>{
        drawTagsUI(response);
        getTemplatesOnPageLoad();
    });
}

function getMoreTags(){
    getTagsApi().then((response)=>{drawTagsUI(response)})
}

function drawTagsUI(response){
    let tagsListEle = $("#tagsList");
    if(response && Array.isArray(response.data)){
        let tagsArr = response.data.map((tag)=>{
            let tagTemplate = $(tagsListEle.find("template").html());
            let tagId = `tag${tag.id}`;
            let tagRadio = tagTemplate.find('[type="radio"]');
            tagRadio.attr("id",tagId)
            tagRadio.attr("value",tag.tagName);
            let tagLabel = tagTemplate.find("label");
            tagLabel.attr("for",tagId);
            tagLabel.text(tag.tagName);
            return tagTemplate;

        });
        tagsListEle.append(tagsArr);
        tagPage++;
    }
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
    $("#tagsList").on("change",radioEleStr,function(){
        tagName = this.value;
        templatePage = 1;
        getTemplates();
    })
}

function onLoadMoreHandler(){
    $(".load-more-button").on("click",function(){
        eval(`${this.name}()`);
    })
}