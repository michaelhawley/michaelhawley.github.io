$(document).foundation();

var showFilters = true;

function showDiv() {
    if (showFilters){
    document.getElementById('disapear').style.display = "block";
    showFilters = false;
    }
    else{
        document.getElementById('disapear').style.display = "none";
        showFilters = true;
    }
}


  var containers = document.querySelectorAll(".container")[0];
  var filtersImage = document.querySelectorAll(".openFilterPane")[0];

  function openfilterpane(){
      containers.classList.toggle("alert-is-shown");
      filtersImage.src = filtersImage.src.replace("left","temp").replace("right","left").replace("temp","right")
  }

function openPullout(pane){
    switch(pane) {
        case 'projection':      
        $("#pulloutPaneContainer").children().remove();
        $("#pulloutPaneContainer").append('<div class = \"pulloutPane\"><span class=\"icon icon-globe\" onclick=\"make_projection(\'geoMercator\')\"></span><p class = \"globetext\"> Mercator </p><span class=\"icon icon-globe\" onclick=\"make_projection(\'geoOrthographic\')\"></span><p class = \"globetext\"> Orthographic </p><span class=\"icon icon-globe\" onclick=\"make_projection(\'geoAzimuthalEquidistant\')\"></span><p class = \"globetext\"> Equidistant (fixme) </p><span class=\"icon icon-globe\" onclick=\"make_projection(\'geoEquirectangular\')\"></span><p class = \"globetext\"> Equirectangular </p></div>');
        break;
        case 'paint':  
        $("#pulloutPaneContainer").children().remove();
        break;

    }

}


    
