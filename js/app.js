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
      console.log(filtersImage)
      console.log(filtersImage.src)
      filtersImage.src = filtersImage.src.replace("left","temp").replace("right","left").replace("temp","right")
      console.log(filtersImage.src)
  }