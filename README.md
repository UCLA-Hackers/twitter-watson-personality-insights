# GiftHub
Struggling to find the gifts for your friends and family? Use Gifthub to find the perfect gift!
- Analyze twitter feeds for gift recommendations based on IBM Watson's Personality Insights. Predict personality characteristics, needs and values through twitter feeds. Understand your loved ones habits and preferences on an individual level, and at scale.

## Live Link
 - https://ucla-hackers.github.io/twitter-watson-personality-insights/

## Set Up Directions
In the command line, type 'npm install' to download node packages. Go to package.json file to view dependencies.
- Optimized for Chrome for best viewing experience.

## How to Use GiftHub
1. Create a login
2. Type the twitter handle of someone you'd like to purchase a gift for
3. Click sunburst graph to visualize personality data
3. Browse eBay gift suggestions based off his/her characteristics

## Sunburst Example
<img src="https://raw.githubusercontent.com/UCLA-Hackers/twitter-watson-personality-insights/master/assets/images/sunburst-example.PNG" width="85%" height="85%">

## Back-End
- Proxy API: IBM Watson's Personality Insights + Twitter
	- Repository: https://github.com/ykeanu/twitter-watson-proxy-api
- Proxy API: Twitter 
	- Repository: https://github.com/UCLA-Hackers/twitter-proxy-api

## Technologies Used
- Jquery for Dom Manipulation
- AJAX for API GET/POST requests
	- Twitter, IBM Watson Personality Insights, eBay API
- D3 for data visualization
- Node.js (npm)
- Express.js for routing
- Firebase for user authentication
- Bootstrap, Google Fonts, custom CSS for styling
- Heroku for backend Proxy APIs


## Directory structure
```none
.
├── assets			 // client-side application
│   ├── css
│   ├── fonts	
│   ├── images
│   ├── js
│   ├── json
│   ├── php
│   └── videos	                        
├── router                       // server-side applicatoin
│   └── app.js			 // express configuratoin
├── .gitignore                   
├── Procfile  
├── README.md  
├── index.html  		 // application browser
├── package-lock.json  
├── package.json       		 // dependencies            
└── profile_photo.jpg                
```

## License
  This sample code is licensed under Apache 2.0.

### Developers
- Ysrael "Izzy" Hernandez | [GitHub](https://github.com/ykeanu)
- Donovan Lowkeen | [GitHub](https://github.com/dlowkeen)
- Shinsuke "Mike" Yamato | [GitHub](https://github.com/mikeyamato)

-------------
