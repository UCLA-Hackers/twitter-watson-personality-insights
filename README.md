# GiftHub
Struggling to find the gifts for your friends and family? Use Gifthub to find the perfect gift!

Analyze twitter feeds for gift recomendations based on IBM Watson's Personality Insights. Predict personality characteristics, needs and values through twitter feeds. Understand your loved ones habits and preferences on an individual level, and at scale.

## Live Link
 - https://ucla-hackers.github.io/twitter-watson-personality-insights/
 
## Directions
In the command line, type 'npm install' to download node packages. Go to package.json file to view dependencies.
- Optimized for Chrome for best viewing experience.

## How To Use GiftHub
1. Create a login
2. Type the twitter handle of someone you'd like to purchase a gift for
3. Browse eBay gift suggestions based off his/her personality

## Sunburst Example
<img src="https://raw.githubusercontent.com/UCLA-Hackers/twitter-watson-personality-insights/master/assets/images/sunburst-example.PNG" width="85%" height="85%">

## Technologies Used
- Jquery for Dom Manipulation
- AJAX for API GET/POST requests
	- Twitter, IBM Watson Personality Insights, eBay
- D3 for data visualization
- Node.js (npm)
- Express.js for routing
- Firebase for user authentication
- Bootstrap, Google Fonts, custom CSS for styling
- Heroku for backend Proxy APIs

### Directory structure
```none
.
├── app.js                       // express entry point
├── config                       // express configuration
│   ├── error-handler.js
│   ├── express.js
│   ├── i18n.js
│   ├── passport.js
│   └── security.js
├── helpers                      // utility modules
│   ├── personality-insights.js
│   └── twitter-helper.js
├── i18n                         // internationalization
│   ├── en.json
│   ├── es.json
│   └── ja.json
├── manifest.yml
├── package.json
├── public
│   ├── css
│   ├── data                     // sample text and tweets
│   ├── fonts
│   ├── images
│   └── js
├── router.js                   // express routes
├── server.js                   // application entry point
├── test
└── views                       // ejs views
```

## License
  This sample code is licensed under Apache 2.0.

## Developers
- Ysrael "Izzy" Hernandez | [GitHub](https://github.com/ykeanu)
- Donovan Lowkeen | [GitHub](https://github.com/dlowkeen)
- Shinsuke "Mike" Yamato | [GitHub](https://github.com/mikeyamato)

-------------
