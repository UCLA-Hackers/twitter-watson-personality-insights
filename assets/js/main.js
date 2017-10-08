	$(function(){  // this is shorthand for '$(document).ready(function(){'

	  //Set the carousel rotation timing
	  $(".carousel").carousel({
	    pause: true,
	    interval: 2000,
	  });
	});  // i should place this closing parens at the very bottom

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
		event.preventDefault();   // this line prevents the form entries from disappearing. must include 'event' in the above function
		
		var twitterNameData = $("#twitterName").val().trim();
		console.log(twitterNameData);

		var twitterHandle = twitterNameData.slice([1],twitterNameData.length); // this is to update the latest tweet. chop off @
		console.log(twitterHandle);

		var twitterHandle = "href=\"https://twitter.com/" + twitterHandle + "\"";
		console.log(twitterHandle);

		var twitterHandle = '<blockquote class="twitter-tweet"><a class="twitter-timeline" ' + twitterHandle;
		console.log(twitterHandle);

		var twitterHandle = twitterHandle + ' data-tweet-limit="1" data-chrome="noheader nofooter transparent">Tweets by someone</a></blockquote>';
		console.log(twitterHandle);

		$(".twitterHandleUpdate").append(twitterHandle);

		// $(".twitterHandleUpdate").append("blockquote", "https://twitter.com/" + twitterHandle);		

		twttr.widgets.load(document.getElementById("container"));


		$(".twitHandle").html(twitterNameData + " Personality Profile");
		window.location = "#twitter";


	});


// modal
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("modalBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}


// ebay code

	var url = "http://svcs.ebay.com/services/search/FindingService/v1";
	    url += "?OPERATION-NAME=findItemsByKeywords";
	    url += "&SERVICE-VERSION=1.0.0";
	    url += "&SECURITY-APPNAME=DonovanL-Personal-PRD-c5d74fc8f-6fb03d7d";
	    url += "&GLOBAL-ID=EBAY-US";
	    url += "&RESPONSE-DATA-FORMAT=JSON";
	    url += "&callback=_cb_findItemsByKeywords";
	    url += "&REST-PAYLOAD";
	    // This is the keywords input that we will want to put the watson info into
	    url += "&keywords=(hammock,candle)";
	    url += "&paginationInput.entriesPerPage=5";

	// Parse the response and build an HTML table to display search results
		function _cb_findItemsByKeywords(root) {

			var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
			var html = [];
			html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
			  for (var i = 0; i < items.length; ++i) {
			    var item     = items[i];
			    var title    = item.title;
			    var pic      = item.galleryURL;
			    var viewitem = item.viewItemURL;
				    if (null != title && null != viewitem) {
				      html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
				      '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
				    }
				document.getElementsByClassName("productTitle").innerHTML = title;
			  }
			html.push('</tbody></table>');
			document.getElementById("results").innerHTML = html.join("");
		}


	s = document.createElement('script');
	s.src = url;
	document.body.appendChild(s);

	_cb_findItemsByKeywords();

