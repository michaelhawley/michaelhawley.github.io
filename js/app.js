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
  function openfilterpane(){
      console.log('c');
      containers.classList.toggle("alert-is-shown");
  }