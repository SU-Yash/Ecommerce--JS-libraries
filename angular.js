var myApp = angular.module('myApp',[]);
myApp.controller('myAppController', function($scope, $http){
  $scope.loc1 = 'true';
  $scope.ZipCodeTextDisabled = $scope.loc1;
  $scope.categories = ['Art', 'Baby', 'Books', 'Clothing, Shoes & Accessories', 'Computers/Tablets & Networking', 'Health & Beauty', 'Music', 'Video Game and Console'];
  
  $scope.show_collection = true;
  $scope.showans = true;
  $scope.details_disabled = true;

  $scope.show_results = false;
  $scope.show_results_page_table = true;
  $scope.show_results_table = true;

  $scope.show_favor = true;


  $scope.show_title = false;
  $scope.show_details = false;
  $scope.show_back = false;
  $scope.show_nav = false;
  $scope.show_photos = false;
  $scope.show_shipping = false;
  $scope.show_seller = false;
  $scope.show_similar = false
  $scope.show_more = false;
  $scope.show_empty_error = false;
  $scope.show_detail_button = false;

  $scope.error = false;

  //$scope.number_of_results = false;



  

  $scope.submit = function(){
      //console.log("Submit Pressed");
      $scope.show_results = true;
      $scope.show_page_table = true;
      $scope.show_results_table = true;
      $scope.show_detail_button = true;
      $scope.show_title = false;
      $scope.show_back = false;
      $scope.show_nav = false;
      $scope.show_photos = false;
      $scope.show_shipping = false;
      $scope.show_seller = false;
      $scope.show_similar = false;
      $scope.show_more = false;
      $scope.show_details = false;
      $scope.details_disabled = true;
      ID = 0;

      document.getElementById("product").classList.add("btn-secondary");
      document.getElementById("photos").classList.remove("btn-secondary");
      document.getElementById("shipping").classList.remove("btn-secondary");
      document.getElementById("seller").classList.remove("btn-secondary");
      document.getElementById("similar").classList.remove("btn-secondary");
      document.getElementById("product").style.background = "black";
      document.getElementById("photos").style.background = "white";
      document.getElementById("shipping").style.background = "white";
      document.getElementById("seller").style.background = "white";
      document.getElementById("similar").style.background = "white";

  }

  $scope.hideResults = function(){
  }

  $scope.showResults = function(){
    //console.log("ShowAll"); 
    $scope.show_results = true;
    //$scope.hide_results = true;
   // document.getElementById("Results-Table").innerHTML = '';
    //document.getElementById("pager").innerHTML = '';
    //document.getElementById("pager").innerHTML = "<ul id='pagination' class='pagination-sm'></ul>";
    //$scope.show_results_page_table = false;
    //$scope.show_results_table = false;
    //console.log($scope.pager);
  }

  $scope.ListButtonPressed = function() {
    $scope.show_title = false;
    $scope.show_back = false;
    $scope.show_nav = false;
    $scope.show_photos = false;
    $scope.show_shipping = false;
    $scope.show_seller = false;
    $scope.show_similar = false;
    $scope.show_more = false;
    $scope.show_details = false;
    $scope.show_results = true;
    $scope.show_empty_error = false;
    $scope.details_disabled = false;
    $scope.show_detail_button = true;

    generateResultTable();

    //$scope.number_of_results = false;
  }

    $scope.DetailButtonPressed = function() {
    $scope.show_title = true;
    $scope.show_back = true;
    $scope.show_nav = true;
    $scope.show_photos = false;
    $scope.show_shipping = false;
    $scope.show_seller = false;
    $scope.show_similar = false;
    $scope.show_more = false;
    $scope.show_details = true;
    $scope.show_results = false;
    $scope.show_empty_error = false;

    
    
    document.getElementById("product").classList.add("btn-secondary");
    document.getElementById("photos").classList.remove("btn-secondary");
    document.getElementById("shipping").classList.remove("btn-secondary");
    document.getElementById("seller").classList.remove("btn-secondary");
    document.getElementById("similar").classList.remove("btn-secondary");
    document.getElementById("product").style.background = "black";
    document.getElementById("photos").style.background = "white";
    document.getElementById("shipping").style.background = "white";
    document.getElementById("seller").style.background = "white";
    document.getElementById("similar").style.background = "white";

    
    //$scope.number_of_results = false;
  }

  $scope.loc1click = function() {
    document.getElementById("ZipCodeText").value = "";
  }

  $scope.reset = function() {
   //detailLoc = "";
   //$scope.formData = {};
   $scope.searchForm.$setPristine();
   $scope.searchForm.$setUntouched();
   $scope.ConditionNew = 'false';
   $scope.ConditionUsed = 'false';
   $scope.ConditionUnspecified = 'false';
   $scope.ShippingLocal = 'false';
   $scope.ShippingFree = 'false';
   //$scope.searchForm.Keyword.$touched = false;
   $scope.Keyword = "";
   $scope.Categories = '';
   $scope.Distance = "";
   //$scope.show_results_page_table = false;
   $scope.loc1 = "true";
   //$scope.showans = false;
   //$scope.show_indiv = false;
   //$scope.pager = false;
    $scope.show_collection = true;
    $scope.showans = true;

    $scope.show_results = false;
    $scope.show_results_page_table = true;
    $scope.show_results_table = true;

    $scope.show_favor = true;

    $scope.show_title = false;
    $scope.show_details = false;
    $scope.show_back = false;
    $scope.show_nav = false;
    $scope.show_photos = false;
    $scope.show_shipping = false;
    $scope.show_seller = false;
    $scope.show_similar = false;
    $scope.show_more = false;
    $scope.show_empty_error = false;
    ID = 0;
    $scope.show_detail_button = false;
    $scope.details_disabled = true;
    //$scope.number_of_results = false;

   document.getElementById("ZipCodeText").value = "";
   //document.getElementById("Results-Table").value = "";
   document.getElementById("Results-Table").innerHTML = '';
   document.getElementById("pager").innerHTML = '';
   document.getElementById("pager").innerHTML = "<ul id='pagination' class='pagination-sm'></ul>";
   document.getElementById("show_details").innerHTML = "";
   document.getElementById("show_photos").innerHTML = "";
   document.getElementById("show_shipping").innerHTML = "";
   document.getElementById("show_similar").innerHTML = "";

   document.getElementById("product").classList.add("btn-secondary");
   document.getElementById("photos").classList.remove("btn-secondary");
   document.getElementById("shipping").classList.remove("btn-secondary");
   document.getElementById("seller").classList.remove("btn-secondary");
   document.getElementById("similar").classList.remove("btn-secondary");
   document.getElementById("product").style.background = "black";
   document.getElementById("photos").style.background = "white";
   document.getElementById("shipping").style.background = "white";
   document.getElementById("seller").style.background = "white";
   document.getElementById("similar").style.background = "white";

  }

  $scope.auto = function()
  {
    
    /*var params="";
    params={};
    params.zip=$scope.ZipCodeText;

    if(params.zip.length > 5){
      $scope.hide_this = true;
    }

    else{

    $http.get ("http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith="+ params.zip+"&username=ssardar&country=US&maxRows=5")
    .then(function (response)
    {
      if(response.data.postalCodes.length > 0){

        $scope.get_auto_details=response.data.postalCodes;
        //console.log(response.data.postalCodes[0].postalCode);
      }
      //console.log(response);
    });
  }*/
  }


  $scope.fill_text = function(string)
  {  
       $scope.ZipCodeText= string;  
       $scope.hide_this = true;  
  } 

  $scope.results_to_favor = function() 
  {
        //$scope.show_favor = true;
        //$scope.show_results_page_table = false;
        /*$scope.show_details = false;
        $scope.show_photos = false;
        $scope.show_shipping = false;
        $scope.show_similar = false;*/
        $scope.show_collection = false; 
    }

  $scope.favor_to_results = function() 
  {
        $scope.show_collection = true; 
        //$scope.show_favor = false;
        //$scope.show_results_page_table = true;
        /*
        $scope.show_details = true;
        $scope.show_photos = true;
        $scope.show_shipping = true;
        $scope.show_similar = false;*/
  }

  $http.get("http://ip-api.com/json?callback=")
  .then(function(response) {
    $scope.apiZip = response.data.zip;
      //document.getElementById("ans").innerHTML = $scope.apiZip;
      document.getElementById("ZipHere").value = $scope.apiZip;
 })

});





