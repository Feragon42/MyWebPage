//Toogle videolist function in videoList.jade
$('.subject').on('click', function(){
  var subjectId = $(this).attr('subject-id');
  $('#'+subjectId+'VideoList').slideToggle(200);
});
  
//Toogle themeList function in *subjectname*Videos.jade
$('.block').on('click', function(){
  var blockId = $(this).attr('block-id');
  $('#themeList'+blockId).slideToggle(200);
});
  
//Toogle videolist function in *subjectname*Videos.jade
$('.theme').on('click', function(){
  var themeId = $(this).attr('theme-id');
  $('#theme'+themeId).slideToggle(200);
});
  
//Videolist carousel function
var owl = $(".videoCarousel");
owl.owlCarousel({    
items : 5,  //5 items above 1000px browser width
itemsDesktop : [1000,5] //5 items between 1000px and 901px
});
owl.trigger('owl.play', 2000); //Autoplay parameters.
  
//Opacity change, and view button appear when mouse over videos preview
$('.video').hover(function(){
  var n = $(this).attr('video-id');
  $(this).css('opacity', '1');
  $('#btn'+n).fadeIn();
}, function(){
  var n = $(this).attr('video-id')
  $(this).css('opacity', '0.5');
  $('#btn'+n).fadeOut();
});



////////////////////////////////////Upload Videos Scripts/////////////////////////////////////////////////////////

//Select between Youtube and Vimeo
$('#youtubeButton').on('click', function(){
  $('#vimeo').css('display', 'none');
  $('#youtube').slideToggle(200);
});

$('#vimeoButton').on('click', function(){
  $('#youtube').css('display', 'none');
  $('#vimeo').slideToggle(200);
});

//Button to transform the block select list to an input in createTheme.jade
$('#blockButton').on('click', function(evt){
  evt.preventDefault();
  $('#createThemes #blockSelectList').empty();
  $('#createThemes #blockSelectList').append($('<input>',{
    id : 'blockInput',
    class : 'form-control',
    placeholder : 'Ejm: Quimica Organica'
  }))
});

//Function to take selected subject and show Blocks
//This function is called in the onChange select element in uploadVideos.jade and in createTheme.jade
function showBlocks(section){
  var selectedSubject = $('#'+section+' #subjectList :selected').text();
  $.ajax({ // -----------------------------SEND THE AJAX
    type: 'POST',
    data: {
      subject: selectedSubject
    },
    url: '/videosDB/takeBlock',
    dataType: 'json',
    cache:false
  }).done(function(data){ //-------------TAKE THE DATA OBTAINED WITH THE PREVIOUS SEND
      $('#'+section+' #subjectBlock').css('display', 'block');//-----Make visible the select theme list
      if(section == 'createThemes'){
        $('#'+section+' #blockTheme').css('display', 'block');
        $('#'+section+' #createThemeBTN').css('display', 'block');
      }      
      $('#'+section+' #blockList').empty();//-----------------------Blank the sselect theme if the user choose another option
      $('#'+section+' #subjectBlock #blockList').append($('<option>', {
        text: 'Selecciona un Bloque',
        disabled : true,
        selected : true
      }))
      $.each(data, function(i, field){
        $('#'+section+' #subjectBlock #blockList').append($('<option>', {//-------Populate select theme list with the extracted data
            value: field.block_name,
            text: field.block_name
        }));
      })
    });
};

//Function to take selected subject
//This function is called in the onChange select element in uploadVideos.jade
function showThemes(section){
  var selectedBlock = $('#'+section+' #blockList :selected').text();
  $.ajax({ // -----------------------------SEND THE AJAX
    type: 'POST',
    data: {
      block_name: selectedBlock
    },
    url: '/videosDB/takeThemes',
    dataType: 'json',
    cache:false
  }).done(function(data){ //-------------TAKE THE DATA OBTAINED WITH THE PREVIOUS SEND
      $('#'+section+' #subjectTheme').css('display', 'block');//-----Make visible the select theme list
      $('#'+section+' #themeList').empty();//-----------------------Blank the sselect theme if the user choose another option
      $.each(data, function(i, field){
        $.each(field.themes, function(i, themes){
          $('#'+section+' #subjectTheme #themeList').append($('<option>', {//-------Populate select theme list with the extracted data
            value: themes,
            text: themes
          }));
        })
      })
    });
};



//-----------------------------Functions for Youtube-------------------------------------------------//

//Toogle video info function when paste video code
$('#youtube #url').bind('paste', function(e){
  if($('#youtube #videoInfo').css('display')=='none'){
    $('#youtube #videoInfo').slideToggle(200);            
  }
  $(this).val('').val(e.target.value);
  var x = $(this) //<-========================== IMPORTANT
  setTimeout(function(){///////////Sinceramente no se porque hay que hacer esto... pero no anda sin el timeout
     $.getJSON('https://www.googleapis.com/youtube/v3/videos', {
          key: 'AIzaSyCUXDLWxKnsQ6fd08jKobIXi67G7B-l11g', //Key obtained when sign the project in in google developer.
          part: 'snippet, contentDetails',
          id: x.val()
        }, function(data){
          if(data.items.length === 0){
            alert('Video inexistente')
          }
          $('#youtube #nameVideo').attr('value', data.items[0].snippet.title);
          $('#youtube #descriptionVideo').attr('value', data.items[0].snippet.description);
          var str = data.items[0].contentDetails.duration;
          var str2 = str.replace(/PT|S/g, '');
          var lString = str2.replace(/H|M/g, ':');
          if (lString.substr(lString.length - 1)>'6'){
            var num = lString.substr(lString.length - 1);
            lString.substr(lString.length - 1).replace('0'+num)
          };
          $('#youtube #lenghtVideo').attr('value', lString);
          str = data.items[0].snippet.publishedAt;
          var dString = str.match(/[0-9]{4}(-[0-9]{2}){2}/g);
          $('#youtube #dateVideo').attr('value', dString);
          $('#youtube #thumbnailVideo').attr('src', data.items[0].snippet.thumbnails.medium.url);
          $('#youtube #thumbnailVideo').attr('width', data.items[0].snippet.thumbnails.medium.width);
          $('#youtube #thumbnailVideo').attr('height', data.items[0].snippet.thumbnails.medium.height);
        });
  },1);
});



//-----------------------------Functions for Vimeo-------------------------------------------------//

//Toogle video info function when paste video code
$('#vimeo #url').bind('paste', function(e){
  if($('#vimeo #videoInfo').css('display')=='none'){
    $('#vimeo #videoInfo').slideToggle(200);            
  }
  $(this).val('').val(e.target.value)
  var x = $(this) //<-========================== IMPORTANT
  
  setTimeout(function(){
     $.ajax({
       type: 'GET',
       url: 'https://vimeo.com/api/v2/video/' + x.val() + '.json',
       jsonp: 'callback',
       dataType: 'jsonp'
     }).done(function(data){
      $('#vimeo #nameVideo').attr('value', data[0].title);
      $('#vimeo #descriptionVideo').attr('value', data[0].description);
      
      var duration = data[0].duration //Vimeo API return the video duration in segs: EXAMPLE: 5:11 -> 307
      var durationShow = (duration/60).toFixed(2); //We need to divide the duration by 60 to convert to minutes and rounde the decimal to 2 digits.
      var durationString = durationShow.toString().split('.'); //Then, transform the result to a string, to split it in the middle.
      $('#vimeo #lenghtVideo').attr('value', durationString[0]+':'+durationString[1]); //And replace the . for a :
      
      var date = data[0].upload_date;
      var dateString = date.match(/[0-9]{4}(-[0-9]{2}){2}/g);
      $('#vimeo #dateVideo').attr('value', dateString);
      
      $('#vimeo #thumbnailVideo').attr('src', data[0].thumbnail_medium);
      $('#vimeo #thumbnailVideo').attr('width', data[0].thumbnail_medium.width);
      $('#vimeo #thumbnailVideo').attr('height', data[0].thumbnail_medium.height);
     });
  },1);
});

$('#uploadVideoBTN').on('click', function(evt){
  $.ajax({
    type: 'POST',
    data:{
      title: $('#nameVideo').val(),
      url: "https://www.youtube.com/embed/"+$('#url').val(),
      duration: $('#lenghtVideo').val(),
      thumbnail: $('#thumbnailVideo').attr('src'),
      subject: $('#subjectList :selected').text(),
      block: $('#blockList :selected').text(),
      theme: $('#themeList :selected').text()
    },
    url: '/videosDB/upload',
    dataType: 'json',
    cache: false
  }).done(function(data){
      alert(data);
      location.reload();
    });
  
});

$('#createThemeBTN').on('click', function(evt){
  var blockName = '', newBlock = 'f';
  if($('#blockInput').val()==undefined){
    blockName=$('#blockList :selected').text();
    
  }
  else{
    blockName=$('#blockInput').val();
    newBlock = 't';
  }
  
  $.ajax({
    type: 'POST',
    data:{
      subject: $('#subjectList :selected').text(),
      block: blockName,
      theme: $('#themeInput').val(),
      createNew : newBlock
    },
    url: '/videosDB/uploadTheme',
    dataType: 'json',
    cache: false
  }).done(function(data){
      alert(data);
      location.reload();
    });
  
});
