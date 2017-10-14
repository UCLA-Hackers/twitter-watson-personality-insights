$(document).ready(function() {
    // -------------------- I. VARIABLES + INITIALIZE DATABASE --------------------

    var ebayKeyword = [];
    var newEbaykeyword;
    var twitterPic;
    var signInSuccess;

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
    var database = firebase.database();
    var twitterHandle;
    var user_signin;

    // -------------------- II. FUNCTIONS -------------------

    // Twitter feed widget
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

    // Bootstrap carousel transition
    $(".carousel").carousel({
        pause: true,
        interval: 2000,
    });

    // Determines the most dominant personality trait
    function getMax(arr, prop) {
        var max;
        for (var i = 0; i < arr.length; i++) {
            if (!max || parseFloat(arr[i][prop]) > parseFloat(max[prop]))
                max = arr[i];
        }
        return max;
    };

    function shuffle() {
        var i = (ebayKeyword.length),
            j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = ebayKeyword[j];
            ebayKeyword[j] = ebayKeyword[i];
            ebayKeyword[i] = temp;
        }
    }

    // Firebase Login/out State Change Function
    firebase.auth().onAuthStateChanged(function(user) {
        window.user = user
        if (window.user) {
            $('#log-in').hide()
            $('#log-out').show()
        } else {
            $('#log-in').show()
            $('#log-out').hide()
        }
    });

    // Firebase Login function
    $('#log-in').click(function() {
        firebase.auth().then(function(result) {
            window.user = result.user;
        }).catch(function(error) {
            console.log(error)
        })
        console.log(user);
    })

    // Firebase Logout function
    $('#log-out').click(function() {
        firebase.auth().signOut()
    })

    // FirebaseUI config AND Login functionality
    if (window.location.href == "http://127.0.0.1:8080/") {
        signInSuccess = "/";
    } else {
        signInSuccess = "/twitter-watson-personality-insights/";
    }
    var uiConfig = {
        signInSuccessUrl: signInSuccess,
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


    // -------------------- III. MAIN PROCSS --------------------
    // User input
    $("#twitterInput").submit(function(event) {
        $(".twitterHandleUpdate").empty();
        event.preventDefault(); // this line prevents the form entries from disappearing. must include 'event' in the above function

        var twitterNameData = $("#twitterName").val().trim();
        var twitterHandle = twitterNameData.slice([1], twitterNameData.length); // this is to update the latest tweet. chop off @
        console.log(twitterHandle);
        var twitterHandleString = "href=\"https://twitter.com/" + twitterHandle + "\"";
        var twitterHandleString = '<blockquote class="twitter-tweet"><a class="twitter-timeline" ' + twitterHandleString;
        var twitterHandleString = twitterHandleString + ' data-tweet-limit="1" data-chrome="noheader nofooter transparent">Tweets by someone</a></blockquote>';
        $(".twitterHandleUpdate").append(twitterHandleString);
        twttr.widgets.load(document.getElementById("container"));
        $(".twitHandle").html(twitterNameData + " Personality Profile");
        if (window.location.href == "http://127.0.0.1:8080/") {
            window.location.href = "http://127.0.0.1:8080/#twitter";
        } else {
            window.location.href = "https://ucla-hackers.github.io/twitter-watson-personality-insights/#twitter";
        }
        var userInput;
        // Storing users input from text box
        userInput = {
            from: twitterHandle,
            count: 100
        };
        database.ref().push({
            twitterHandle: twitterHandle
        });

        // Proxy API Watson's Personality Insights
        $.post(`https://twitter-watson-proxy-api.herokuapp.com/json/${twitterHandle}`, function(data) {
            $("#watson-traits").empty();
            var watson = data;
            var watsonTraits = data.consumption_preferences;
            var count = 0;
            for (var i = 0; i < watsonTraits.length; i++) {
                for (var j = 0; j < watsonTraits[i].consumption_preferences.length; j++) {
                    if (watsonTraits[i].consumption_preferences[j].score === 1 && count < 10) {
                        count++;
                        $("#watson-traits").append("<li>" + watsonTraits[i].consumption_preferences[j].name + "</li>");
                    }
                }
            }

            // Proxy Twitter API
            $.post(`https://twitter-proxy-api.herokuapp.com/json-tweets/${twitterHandle}`, function(twitter) {
                console.log(twitter, "TWITTER OBJECT");
                // Generates twitter profile picture
                twitterPic = twitter.statuses[0].user.profile_image_url;
                regSizePic = twitterPic.replace("_normal", "");
                $("#newTwitImg").attr('src', regSizePic);
                $(".twitLink").attr('href', `https://twitter.com/${twitterHandle}`);
                // Renders the sunburst
                // $('#profile').append('<pre>' + JSON.stringify(data, null, 2) + '</pre>'); // Future Update: Adding a data table.
                var chart = new PersonalitySunburstChart({ 'selector': '#sunburstChart', 'version': 'v3' });
                chart.show(watson, regSizePic);
            });

            var arr = data.personality;
            var personality = getMax(arr, "percentile");

            function shoppingAlgorithm() {
                if (personality.name === "Openness") {
                    ebayKeyword = ["Paint-set", "utility-knife", "philosophy-book", "abstract-painting", "fixed-gear-bike"];
                } else if (personality.name === "Conscientiousness") {
                    ebayKeyword = ["calendar", "kindle", "smart-watch", "exercise-equipment", "shoe-organizer"];
                } else if (personality.name === "Extraversion") {
                    ebayKeyword = ["Artsy-Shot-Glasses", "morph-suit", "suspenders", "spike-ball", "backpacking"];
                } else if (personality.name === "Agreeableness") {
                    ebayKeyword = ["greeting-cards", "stationery", "home-decor", "sunglasses", "wine-bottle-opener"];
                } else if (personality.name === "Emotional range") {
                    ebayKeyword = ["Stress-Ball", "fidget-spinner", "back-massager", "candles", "hammock"];
                };
                console.log(ebayKeyword, "preshuffle");
                shuffle();
                newEbaykeyword = ebayKeyword.slice(0, 2).join();
            };
            shoppingAlgorithm();
            console.log(newEbaykeyword, "postshuffle");

            // Ebay AJAX API call
            var results = 24; // to increase, the carousel structure will need to be updated
            var url = "https://svcs.ebay.com/services/search/FindingService/v1?";
            url += "OPERATION-NAME=findItemsByKeywords&";
            url += "SERVICE-VERSION=1.13.0&";
            url += "SECURITY-APPNAME=DonovanL-Personal-PRD-c5d74fc8f-6fb03d7d&";
            url += "GLOBAL-ID=EBAY-US&";
            url += "RESPONSE-DATA-FORMAT=JSON&";
            url += "REST-PAYLOAD&";
            url += "keywords=(" + newEbaykeyword + ")&";
            url += "paginationInput.entriesPerPage=" + results;
            displayEbayInfo();

            function displayEbayInfo() {
                $.ajax({
                    url: url,
                    method: "GET",
                    dataType: "jsonp"
                }).done(function(data) {
                    console.log(data);
                    var commonObj = data.findItemsByKeywordsResponse["0"].searchResult["0"];
                    var numItems = commonObj["@count"];
                    console.log(numItems); // this should return the number of items pulled
                    for (i = 0; i < numItems; i++) {
                        var productImg = commonObj.item[i].galleryURL["0"];
                        // console.log(productImg); //this should return the image
                        var productTitle = commonObj.item[i].title["0"];
                        // console.log(productTitle); //this should return the image
                        var productUrl = commonObj.item[i].viewItemURL["0"];
                        // console.log(productUrl); //this should return the item url
                        $("#productImg" + i).attr("src", productImg);
                        $(".productTitle" + i).html(productTitle);
                        $("#productUrl" + i).attr("href", productUrl);
                    };
                });
            };

            // TESTING ~~~~~~~~~~~~~~~~~~
            // console.log(data, "PROXY API JSON OBJECT");
            // console.log(arr, "PERSONALITY ITERATION OF PROXY API");
            // console.log(personality, "DOMINANT PERSONALITY");
            // console.log(newEbaykeyword, "RESULTS OF SHOPPING shoppingAlgorithm");
            // console.log(url, "THIS IS THE EBAY JSON OBJECT");
        });
    });

    // Firebase Login Modal
    // Get the button that opens the modal
    var logMeIn = document.getElementById("log-in");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close");
    // When the user clicks on the button, open the modal 
    logMeIn.onclick = function() {
        firebaseModal.style.display = "block";
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        firebaseModal.style.display = "none";
    };

    // Modal -> Dynamically changes the height of the modal when the modal is open
    $("#sunburstModal").modal('handleUpdate');

    // Smooth scrolling
    window.addEventListener("load", function() {
        // scroll back home using the arrow up button
        document.querySelector(".js-scroll-to-top").addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector("#pageTop").scrollIntoView({ behavior: "smooth" });
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
    });

    // When the user scrolls down from the top of the document, show the button
    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("upArrow").style.display = "block";
        } else {
            document.getElementById("upArrow").style.display = "none";
        }
    };
});