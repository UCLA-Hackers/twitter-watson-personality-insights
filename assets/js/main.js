	$(function(){  // this is shorthand for '$(document).ready(function(){'

	  //Set the carousel rotation timing
	  $(".carousel").carousel({
	    pause: true,
	    interval: 2000,
	  });
	});  // i should place this closing parens at the very bottom

 // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBESuRC2fLY0POQi3dFKbDhsWgCGbWrrng",
        authDomain: "fir-example-2871d.firebaseapp.com",
        databaseURL: "https://fir-example-2871d.firebaseio.com",
        projectId: "fir-example-2871d",
        storageBucket: "fir-example-2871d.appspot.com",
        messagingSenderId: "51091543547"
      };
      firebase.initializeApp(config);

// widgets.js script needed for displaying twitter feeds
	window.twttr = (function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0],
	    t = window.twttr || {};
	  if (d.getElementById(id)) return t;
	  js = d.createElement(s);
	  js.id = id;
	  js.src = "https://platform.twitter.com/widgets.js";
	  fjs.parentNode.insertBefore(js, fjs);

	  t._e = [];
	  t.ready = function(f) {
	    t._e.push(f);
	  };

	  return t;
	}(document, "script", "twitter-wjs"));


// pull twitter handle
	$("form").submit(function(event){
		
		$(".twitterHandleUpdate").empty();

		event.preventDefault();   // this line prevents the form entries from disappearing. must include 'event' in the above function

		var twitterNameData = $("#twitterName").val().trim();
		// console.log(twitterNameData);

		var twitterHandle = twitterNameData.slice([1],twitterNameData.length); // this is to update the latest tweet. chop off @
		// console.log(twitterHandle);

		var twitterHandleString = "href=\"https://twitter.com/" + twitterHandle + "\"";
		// console.log(twitterHandle);

		var twitterHandleString = '<blockquote class="twitter-tweet"><a class="twitter-timeline" ' + twitterHandleString;
		// console.log(twitterHandle);

		var twitterHandleString = twitterHandleString + ' data-tweet-limit="1" data-chrome="noheader nofooter transparent">Tweets by someone</a></blockquote>';
		// console.log(twitterHandle);

		$(".twitterHandleUpdate").append(twitterHandleString);

		twttr.widgets.load(document.getElementById("container"));

		$(".twitHandle").html(twitterNameData + " Personality Profile");
		window.location = "#twitter";

		var userInput;
	    // Storing users input from text box
	    userInput = {
	    	from: twitterHandle,
	    	count: 100
	    };
	    // console.log(userInput);

	   	// ebay AJAX code goes below







	   	// don's AJAX code goes above

	});


// modal
	// Get the modal
	// var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	// var btn = document.getElementById("modalBtn");

	// Get the <span> element that closes the modal
	// var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	// btn.onclick = function() {
	//     modal.style.display = "block";
	// }

	// When the user clicks on <span> (x), close the modal
	// span.onclick = function() {
	//     modal.style.display = "none";
	// }

	// When the user clicks anywhere outside of the modal, close it
	// window.onclick = function(event) {
	//     if (event.target == modal) {
	//         modal.style.display = "none";
	//     }
	// }


/*


// Firebase Login Modal
	// Get the modal
	var firebaseModal = document.getElementById('myFirebaseModal');

	// Get the button that opens the modal
	var logMeIn = document.getElementById("log-in");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	logMeIn.onclick = function() {
	    firebaseModal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    firebaseModal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        firebaseModal.style.display = "none";
	    }
	}

      // FirebaseUI config AND Login functionality
      var uiConfig = {
        signInSuccessUrl: 'login.html',
        signInOptions: [
        
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'

        
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);

*/

// ebay code

	var ebayKeyword = "dildo"; 
	var results = 24; 

	var url = "http://svcs.ebay.com/services/search/FindingService/v1?";
	url += "OPERATION-NAME=findItemsByKeywords&";
	url += "SERVICE-VERSION=1.13.0&";
	url += "SECURITY-APPNAME=DonovanL-Personal-PRD-c5d74fc8f-6fb03d7d&";
	url += "GLOBAL-ID=EBAY-US&";
	url += "RESPONSE-DATA-FORMAT=JSON&";
	url += "REST-PAYLOAD&";
	url += "keywords=(" + ebayKeyword + ")&";
	// url += "outputSelector(0)=PictureURLLarge&";  // this doesn't work :(
	url += "paginationInput.entriesPerPage=" + results;

	console.log(url);

	function setup() {
		loadJSON(url, gotData, "jsonp");  // jsonp addresses the issue of no 'access-control-allow-origin' header
	}

	function gotData(data) {
		console.log(data);

		var commonObj = data.findItemsByKeywordsResponse["0"].searchResult["0"];

		var numItems = commonObj["@count"];
		console.log(numItems); // this should return the number of items pulled
		
		for (i = 0; i < numItems; i++) {
			var productImg = commonObj.item[i].galleryURL["0"];
			console.log(productImg); //this should return the image

			var productTitle = commonObj.item[i].title["0"];
			console.log(productTitle); //this should return the image

			var productUrl = commonObj.item[i].viewItemURL["0"];
			console.log(productUrl); //this should return the item url

			$("#productImg" + i).attr("src", productImg);
			$(".productTitle" + i).html(productTitle);
			$("#productUrl" + i).attr("href", productUrl);



			// $("#row1").append("<div class='col-sm-3 text-center'><a href='' target='_blank' id='productUrl4'><img class='rounded d-block img-fluid' src='' id='productImg4' /><p class='productTitle4'>Coming soon</p></a></div>");



		}

		// var itemImage = commonObj.item["0"].galleryURL["0"];
		// console.log(itemImage); //this should return the image

		// var itemTitle = commonObj.item["0"].title["0"];
		// console.log(itemTitle); //this should return the image

		// var itemURL = commonObj.item["0"].viewItemURL["0"];
		// console.log(itemURL); //this should return the item url

	
		// $("<p />").appendTo("productTitle")


	}


	// dynamically changes the height of the modal when the modal is open
	$("#sunburstModal").modal('handleUpdate');  


	// smooth scrolling
	window.addEventListener("load", function() {
		// scroll back home using the arrow up button
		document.querySelector(".js-scroll-to-top").addEventListener("click", function(e) {
        	e.preventDefault();
        	document.querySelector("#intro").scrollIntoView({ behavior: "smooth" });
		});
		// scroll down to twitter
		document.querySelector("#scrollToTwitter").addEventListener("click", function(e) {
        	e.preventDefault();
        	document.querySelector("#twitter").scrollIntoView({ behavior: "smooth" });
		});
		// scroll down to shopping
		document.querySelector("#scrollToShopping").addEventListener("click", function(e) {
        	e.preventDefault();
        	document.querySelector("#shopping").scrollIntoView({ behavior: "smooth" });
		});
		// scroll down to about us
		document.querySelector("#scrollToAbout").addEventListener("click", function(e) {
        	e.preventDefault();
        	document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
		});
		// scroll down to contact
		document.querySelector("#scrollToContact").addEventListener("click", function(e) {
        	e.preventDefault();
        	document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
		});
	});






	