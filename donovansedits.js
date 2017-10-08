// -------------------- I. VARIABLES + NODE PACKAGES--------------------
var str = [];
var tweets = [];
var textTweet;
var jsonObject;

// Environmental variables for API keys
var dotenv = require('dotenv');
dotenv.config();

// Twitter API
var Twitter = require('twitter')
var util = require('util');
var T = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

var paramsTwitter = {
    from: 'khloekardashian',
    // q: '@realDonaldTrump',
    count: 100
}

// Watson Personality API
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    version_date: '2016-10-20'
});

// -------------------- II. MAIN PROCESS -------------------
// Promise Function
T.get('/search/tweets.json', paramsTwitter)
    .then(function(stageOne) {
        for (var i = 0; i < stageOne.statuses.length; i++) {
            tweets.push(stageOne.statuses[i].text);
        };
        return textTweet = tweets.join(' ').toString();
        console.log(textTweet);
    })
    // Watson Parameters
    .then(function(stageTwo) {
        var paramsWatson = {
            // Get the content items from the JSON file.
            text: stageTwo,
            consumption_preferences: true,
            raw_scores: true,
            headers: {
                'accept-language': 'en',
                'accept': 'application/json'
            }
        };
        return paramsWatson;
    })
    .then(function(stageThree) {
        personality_insights.profile(stageThree, function(error, response) {
            if (error)
                console.log('WATSON Error:', error);
            else
                // console.log(JSON.stringify(response, null, 2));
            // return jsonObject = JSON.stringify(response, null, 2);

                    // console.log((JSON.stringify(response.personality[i].trait_id, null, 2)) + (JSON.stringify(response.personality[i].percentile, null, 2)));

                    var arr = response.personality;
                    console.log("CHILDREN", arr);


                    function getMax(arr, prop) {
                        var max;

                        for (var i=0 ; i<arr.length ; i++) {
                            if (!max || parseFloat(arr[i][prop]) > parseFloat(max[prop]))
                                max = arr[i];
                        }
                        return max;
                    }

                    var personality = getMax(arr, "percentile");
                    console.log(paramsTwitter.from + "'s main personality trait is " + personality.name);

                        if (personality.name === "Openness") {
                            console.log("Paint set, utility knife, philosophy book, abstract painting, fixed gear bike")
                        } else if (personality.name === "Conscientiousness") {
                            console.log("calendar, kindle, smart watch, exercise equipment, shoe organizer")
                        } else if (personality.name === "Extraversion") {
                            console.log("Artsy Shot Glasses, morph suit, suspenders, spike ball, backpacking")
                        } else if (personality.name === "Agreeableness") {
                            console.log("greeting cards, stationery, home decor, sunglasses, wine bottle opener")
                        } else if (personality.name === "Emotional Range") {
                            console.log("Stress Ball, fidget spinner, back massager, candles, hammock")
                        }



        });
    });