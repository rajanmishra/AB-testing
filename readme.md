


How can you design an A/B testing module using Redis that efficiently distributes three layouts

 (namely layout1, layout2, and layout3) equally among users? The solution should cater to guest users for whom we don't have any pre-existing identifiers. The goal is to implement an API that serves these layouts uniformly.



 // people 1000 sites
 // Guest users - track user
 // equal frequency


 // whenever user landing  It's server responsiblity to give a right layout need to be shown
 //in the initial call see see user in all three layout we can assign the one having less users







 TO run the code

 Server - in the root run - `npm start` will run server on [3004](http://localhost:3004/)
 Client - `cd front-end` - `npm run` will start client on [3000](http://localhost:3000/)