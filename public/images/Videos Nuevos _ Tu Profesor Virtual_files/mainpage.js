
$('#rUserBTN').on('click', function(){
  $('#rUserContainer').slideToggle(200);
  $('#anonymUser').hide();
  $('#optionL').hide();
  $(this).hide();
})

$(".nav a").on("click", function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});