$(document).ready(function(){
    getTags();
    getTemplates();
})

function getTags(){
    ajax.get("api/tags.php",{page:1,count:25})
    .then((response)=>{
        let tagsListEle = $("#tagsList")
        if(response && Array.isArray(response.data)){
            let notChecked = true;
            let tagsArr = response.data.map((tag)=>{
                let tagTemplate = $(tagsListEle.find("template").html());
                let tagId = `tag${tag.id}`;
                let tagRadio = tagTemplate.find('[type="radio"]');
                if(notChecked){
                    tagRadio.attr("checked",true);
                    notChecked = false;
                }
                tagRadio.attr("id",tagId)
                tagRadio.attr("value",tag.tagName);
                let tagLabel = tagTemplate.find("label");
                tagLabel.attr("for",tagId);
                tagLabel.text(tag.tagName);
                return tagTemplate;

            });
            tagsListEle.append(tagsArr);
        }
    })
    .catch((error)=>{
        alert("Some error occured");
        console.error(error);
    });
}

function getTemplates(){
    ajax.get("api/templates.php",{page:1,count:25,tagName:"Poaceae"})
    .then((response)=>{
        let templatesListEle = $("#templatesList")
        if(response && Array.isArray(response.data)){
            let templatesArr = response.data.map((tag)=>{
                let template = $(templatesListEle.find("template").html());
                let html = `<i class="fa fa-tag"></i> ${tag.tagName}`;
                template.find('[name="tag"]').html(html)
                return template;

            });
            templatesListEle.append(templatesArr);
        }
    })
    .catch((error)=>{
        console.error(error);
    });
}