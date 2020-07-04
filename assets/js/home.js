AOS.init({
    duration: 800,
    easing: 'slide',
    once: true
});

new Typed('.typed-words', {
    strings: ["Wedding.", "Party.", "Events."],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    startDelay: 80,
    loop: true,
    showCursor: true
  });

$(document).ready(function(){
    contactUsFormHandler();
})

function contactUsFormHandler(){
    $("#contactUsForm").submit(function(event){
        event.preventDefault();
        var $inputs = $(`#${this.id} :input:not([type="submit"])`);
        var values = {};
        $inputs.each(function() {
            values[this.id] = $(this).val();
        });
        
        ajax
        .post("api/contact-us.php",{
            action:"contact-us-submit",
            form:values
        }).then((response)=>{
            $inputs.each(function(){
                $(this).val("");
            })
        }).catch((error)=>{
            alert("Error occured while sending the query. Please try again!");
            console.error(error);
        })
    })
}