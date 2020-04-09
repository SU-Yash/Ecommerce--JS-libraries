//var s = require('./server');
var events = require('events');
const normalizePort = require('normalize-port');
var http = require('http');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();


urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static(__dirname));

app.get('/', function(req, res){
	//res.send('This is the homepage!');
	res.setHeader("Content-Type","text/html");
   	res.setHeader("Access-Control-Allow-Origin","*");
	res.sendFile(__dirname + '/index.html');
});


//http://angelic-bazaar-233005.appspot.com/details?itemID=233190295934


app.get('/submit', urlencodedParser, function(req, res){
	//res.send('This is the homepage!');
	res.setHeader("Content-Type","text/html");
   	res.setHeader("Access-Control-Allow-Origin","*");

   	var params = url.parse(req.url, true).query;	
	//console.log(req.url);
	
	call = construct(params);
	//console.log(call);

	request(call, { json:true }, (err2, res2, body2 )=>{
	if(err2){return console.log(err2);}
		//console.log(body2);
	  det = body2;
	  res.send({
	  	det
	  });
	});

});


app.get('/details', urlencodedParser, function(req, res){
	res.setHeader("Content-Type","text/html");
   	res.setHeader("Access-Control-Allow-Origin","*");

   	var params = url.parse(req.url, true).query;	
	//console.log(req.url);
	
	detailsUrl = constructDetailsUrl(params);
	//console.log(detailsUrl);
	//var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SuyashSa-ssardarH-PRD-e16e2f5cf-a5b96bb9&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&GLOBAL-ID=EBAY-US&keywords=" + params.Keyword + "&buyerPostalCode=" + params.zipCode + "&paginationInput.entriesPerPage=50&itemFilter(0).name=MaxDistance&itemFilter(0).value=10&itemFilter(1).name=HideDuplicateItems&itemFilter(1).value=true&itemFilter(2).name=LocalPickupOnly&itemFilter(2).value=true&itemFilter(3).name=FreeShippingOnly&itemFilter(3).value=false&itemFilter(4).name=Condition&itemFilter(4).value(0)=New&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo";
	//var u = req.url.substring(8);
	request(detailsUrl, { json:true }, (err2, res2, body2 )=>{
	if(err2){return console.log(err2);}
		//console.log(body2);
	  det = body2;
	  res.send({
	  	det
	  });
	});

})


app.get('/similar', urlencodedParser, function(req, res){
  res.setHeader("Content-Type","text/html");
  res.setHeader("Access-Control-Allow-Origin","*");
  //console.log("Reached");

  var params = url.parse(req.url, true).query;  
  
  sim = constructSimilarURL(params);
  //console.log(sim);

  //console.log(call);
  //var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SuyashSa-ssardarH-PRD-e16e2f5cf-a5b96bb9&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&GLOBAL-ID=EBAY-US&keywords=" + params.Keyword + "&buyerPostalCode=" + params.zipCode + "&paginationInput.entriesPerPage=50&itemFilter(0).name=MaxDistance&itemFilter(0).value=10&itemFilter(1).name=HideDuplicateItems&itemFilter(1).value=true&itemFilter(2).name=LocalPickupOnly&itemFilter(2).value=true&itemFilter(3).name=FreeShippingOnly&itemFilter(3).value=false&itemFilter(4).name=Condition&itemFilter(4).value(0)=New&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo";
  //var u = req.url.substring(8);
  request(sim, (err3, res3, body3 )=>{
  if(err3){return console.log(err3);}
    console.log(body3);
    det = res3;
    res.send({
      det
    });
  });
})



app.get('/photos', urlencodedParser, function(req, res){
  res.setHeader("Content-Type","text/html");
  res.setHeader("Access-Control-Allow-Origin","*");

  var params = url.parse(req.url, true).query;  
  photosURL ="https://www.googleapis.com/customsearch/v1?q="+ params.title +"&cx=005335230104236607213:ijwui7ydvku&imgSi ze=huge&imgType=news&num=8&searchType=image&key=AIzaSyCdUAoKZnftZs2wzbkKe42-rqU7QBJp8PU";
  //console.log(photosURL);

  request(photosURL, (err3, res3, body3 )=>{
  if(err3){return console.log(err3);}
    //console.log(body3);
    det = body3;
    res.send({
      det
    });
  });
})

/*app.get('/profile/:name', function(req, res){
	console.log(req.params.name);
	res.render('profile', {person: req.params.name});

});*/

function construct(params){
	    ebayFindingApiCall = "http://svcs.ebay.com/services/search/FindingService/v1?";
        ebayFindingApiCall += "OPERATION-NAME=findItemsAdvanced";
        ebayFindingApiCall += "&SERVICE-VERSION=1.0.0";
        ebayFindingApiCall += "&SECURITY-APPNAME=SuyashSa-ssardarH-PRD-e16e2f5cf-a5b96bb9";
        ebayFindingApiCall += "&RESPONSE-DATA-FORMAT=JSON";
        ebayFindingApiCall += "&REST-PAYLOAD";
        ebayFindingApiCall += "&GLOBAL-ID=EBAY-US";
        ebayFindingApiCall += "&paginationInput.entriesPerPage=50";
        ebayFindingApiCall += "&keywords=" + params.Keyword;
        ebayFindingApiCall += "&buyerPostalCode=" + params.zip;
        ebayFindingApiCall += "&itemFilter(0).name=HideDuplicateItems&itemFilter(0).value=true";
        ebayFindingApiCall += "&itemFilter(1).name=MaxDistance&itemFilter(1).value=" + params.Distance; 

        var i = 2;
        var j = 0;


        if(params.LocalShipping == true){
            ebayFindingApiCall += "&itemFilter(" + i + ").name=LocalPickupOnly&itemFilter(" + i + ").value=true"; 
            i += 1;
        }
        if(params.FreeShipping == true){
            ebayFindingApiCall += "&itemFilter(" + i + ").name=FreeShippingOnly&itemFilter(" + i + ").value=true"; 
            i += 1;
        }


        if(params.New == true || params.Used == true || params.Unspecified == true){
        	ebayFindingApiCall += "&itemFilter(" + i + ").name=Condition";
    	}

        if(params.New == true){
        ebayFindingApiCall += "&itemFilter(" + i + ").value(" + j + ")=New"; 
        	j += 1;
    	}

    	if(params.Used == true){
	        ebayFindingApiCall += "&itemFilter(" + i + ").value(" + j + ")=Used"; 
	        j += 1;
   		}

   		if(params.Unspecified == true){
	        ebayFindingApiCall += "&itemFilter(" + i + ").value(" + j + ")=Unspecified"; 
	        j += 1;
   		}		

        if(params.Categories != ''){
          if(params.Categories == 'Art'){ ebayFindingApiCall += "&categoryId=550"; }
          else if(params.Categories == 'Baby'){ ebayFindingApiCall += "&categoryId=2984"; }
          else if(params.Categories == 'Books'){ ebayFindingApiCall += "&categoryId=267"; }
          else if(params.Categories == 'Clothing, Shoes & Accessories'){ ebayFindingApiCall += "&categoryId=11450"; }
          else if(params.Categories == 'Computers/Tablets & Networking'){ ebayFindingApiCall +="&categoryId=58058"; }
          else if(params.Categories == 'Health & Beauty'){ ebayFindingApiCall += "&categoryId=26395"; }
          else if(params.Categories == 'Music'){ ebayFindingApiCall += "&categoryId=11233"; }
          else if(params.Categories == 'Video Game and Console'){ ebayFindingApiCall += "&categoryId=1249"; }
        }

        ebayFindingApiCall += "&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo"; 

        return ebayFindingApiCall;
}

function constructDetailsUrl(params){
  //$itemID = '252822643970';
  
  //Constructing the api call to the ebay shopping API
  apicallTwo = "http://open.api.ebay.com/shopping?";
  apicallTwo += "callname=GetSingleItem";
  apicallTwo += "&responseencoding=JSON";
  apicallTwo += "&appid=SuyashSa-ssardarH-PRD-e16e2f5cf-a5b96bb9";
  apicallTwo += "&siteid=0";
  apicallTwo += "&version=967";
  apicallTwo += "&ItemID=" + params.itemID;
  apicallTwo += "&IncludeSelector=Description,Details,ItemSpecifics";

  return(apicallTwo);

}

function constructSimilarURL(params){
    //Constructing the call to the ebay Merchandising API
    apicallMerc = "http://svcs.ebay.com/MerchandisingService?";
    apicallMerc += "OPERATION-NAME=getSimilarItems";
    apicallMerc += "&SERVICE-NAME=MerchandisingService";
    apicallMerc += "&SERVICE-VERSION=1.1.0";
    apicallMerc += "&CONSUMER-ID=SuyashSa-ssardarH-PRD-e16e2f5cf-a5b96bb9";
    apicallMerc += "&RESPONSE-DATA-FORMAT=JSON";
    apicallMerc += "&REST-PAYLOAD";
    apicallMerc += "&itemId=" + params.itemID;
    apicallMerc += "&maxResults=8";

    return(apicallMerc);
}

const port = normalizePort(process.env.PORT || '3000');
app.listen(port);
console.log('Listening to 3000 Port');
