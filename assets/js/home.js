$(document).ready(function(){
    getTags();
    getTemplates();
})

function getTags(){
    ajax.get("api/tags.php",{page:1})
    .then((data)=>{
        console.log(data);
    })
    .catch((error)=>{
        console.error(error);
    });
}

function getTemplates(){
    ajax.get("api/templates.php",{file:1})
    .then((data)=>{
        console.log(data);
    })
    .catch((error)=>{
        console.error(error);
    });
}