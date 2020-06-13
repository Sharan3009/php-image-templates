$(document).ready(function(){
    $.ajax({
        type:"GET",
        url: "api/tags.php?page=1",
        dataType: 'json',
        success:function(data){
            $.ajax({
                type:"GET",
                url:"api/templates.php?file=1",
                dataType:'json',
                success:function(){
                    
                }
            })
        }
    })
})