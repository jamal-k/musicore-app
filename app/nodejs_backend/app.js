var express = require("express");
var unirest = require("unirest");
const cors = require('cors');

require('dotenv').config()

// Set up the express app
const app = express();
app.use(cors());

// get all todos
app.get('/api/events/music', function(req, res, next) {
  // var options = {
  //   url: 'https://api.predicthq.com/v1/events',
  //   headers: {'content-type': 'application/json'},
  //   json: {
  //       "address":"*address*",
  //       "view_key":"*viewkey*"
  //   }
  // };
  
  // request.post(options,function(error, response, body) {
  //   console.log(body);
  // })  

  var request = unirest("GET", "https://api.predicthq.com/v1/events");

  request.headers({
    "Authorization": "Bearer " + process.env.predicthq_token,
    "Accept": "application/json",
  });

  request.query({      "country": "CA",
  "label": "music",
  "limit": 30,
  "sort": "start"})


  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    res.send(response.body["results"]);
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});