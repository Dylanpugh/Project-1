
//movie api
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?primary_release_year=2019&page=1&api_key=6f0a2ab68362abacd4411d8533c75937",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  //calling api
  $.ajax(settings).done(function (response) {
    console.log(response.results);
  
  //append to html
        for (var i=0; i < response.results.length; i++) {
          var appendrow = $("<div class='ui centered card'></div>").appendTo("#movie-container");
            $("<div class='image'><img src='https://image.tmdb.org/t/p/w500/" + response.results[i].poster_path  + 
            "'><br><h4>"+response.results[i].title+" Release Date: "+response.results[i].release_date+"</h4><button type='button' class='ui red basic button video-btn' data-toggle='modal' data-src='"+response.results[i].title+"' data-target='#myModal'>Play Trailer</button></div>").appendTo(appendrow);
        }
        //create pagination
        for (var j=1;j<=response.total_pages;j++) {
            var append_pagination = $('<li class="page-item"><a class="page-link" data-page="'+j+'"href="#">'+j+'</a></li>').appendTo($(".pagination"));
        
        }
      });
  // ---------------------------------------------------------
  
  //onclick function for youtube api
  var videoSrc;  
  $(document).on("click",".video-btn",function() {
      videoSrc = $(this).data( "src" );
  
      console.log(videoSrc);
      getRequest(videoSrc);
      function getRequest(videoSrc) {
      var url = 'https://www.googleapis.com/youtube/v3/search';
      var params = {
          part: 'snippet',
          key: 'AIzaSyB4hCVbW3IzYNSdCGwQpkFW5ubHyv2a2go',
          q: videoSrc
      };
    
      $.getJSON(url, params, showResults);
  }
  
  //displays youtube trailor
  function showResults(results) {
      var entries = results.items[0].id.videoId;
      console.log(entries);
      $("#video").attr('src', "https://www.youtube.com/embed/"+entries+"?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" );
  }
  
  
  
   
  
  
  });
  
  //when user clicks page number, follows command
  $(document).on("click",".page-link",function() {
    page_number = $(this).attr('data-page');
  
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?primary_release_year=2019&page="+page_number+"&api_key=6f0a2ab68362abacd4411d8533c75937",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  //renders page clicked
  $.ajax(settings).done(function (response) {
    console.log(response.results);
  
    
        for (var i=0; i < response.results.length; i++) {
          var appendrow = $("<div class='ui centered card'></div>").appendTo("#movie-container");
            $("<div class='image'><img src='https://image.tmdb.org/t/p/w500/" + response.results[i].poster_path  + 
            "'><br><h4>"+response.results[i].title+" Release Date: "+response.results[i].release_date+"</h4><button type='button' class='ui red basic button video-btn' data-toggle='modal' data-src='"+response.results[i].title+"' data-target='#myModal'>Play Trailer</button></div>").appendTo(appendrow);
        }
        for (var j=1;j<=response.total_pages;j++) {
            var append_pagination = $('<li class="page-item"><a class="page-link" data-page="'+j+'"href="#">'+j+'</a></li>').appendTo($(".pagination"));
        
        }
      });
  
  
  });
  //create variables for modal
var modal = document.getElementById('myModal');

var btn = $(".video-btn");

var span = document.getElementsByClassName("close")[0];
 //onclick function to activate modal
$(document).on("click",btn,function() {

  modal.style.display = "block";
  });

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
	  