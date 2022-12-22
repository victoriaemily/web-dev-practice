// $("h1").addClass("big-title margin");
//may also remove the class with removeClass
// $("button");

// $("h1").click(function(){
//     $("h1").css("Color", "purple");
// });

$("button").on("click", function(){
    $("h1").animate({opacity: 0.5});
});