$('#story .theme').on('click', function(){
  var id = $(this).attr('cardID');
  $('#story #cardGroup'+id).slideToggle(200);
});