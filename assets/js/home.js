$(document).ready(function(){
    getTags();
    getTemplates();
})

function getTags(){
    ajax.get("api/tags.php",{page:1,count:25})
    .then((response)=>{
        if(response){
            let tagsArr = response.data.map((tag)=>{
                let tagTemplate = $($("#tagTemplate").html());
                let tagId = `tag${tag.id}`;
                let tagRadio = tagTemplate.find('[type="radio"]');
                tagRadio.attr("id",tagId)
                tagRadio.attr("value",tag.tagName);
                let tagLabel = tagTemplate.find("label");
                tagLabel.attr("for",tagId);
                tagLabel.text(tag.tagName);
                return tagTemplate;
            });
            $("#tagsList").append(tagsArr);
        }
    })
    .catch((error)=>{
        alert("Some error occured");
        console.error(error);
    });
}

function getTemplates(){
    ajax.get("api/templates.php",{page:1})
    .then((data)=>{
        console.log(data);
    })
    .catch((error)=>{
        console.error(error);
    });
}