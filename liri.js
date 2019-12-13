require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require(`node-spotify-api`);
var spotify = new Spotify(keys.spotify);



var inputString = process.argv;
var action = inputString[2];
var search = inputString.slice(3);


switch (action) {
  case "omdb":
    
var nodeArgs = process.argv;

var movieName = "";

for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
  
    }
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    })
    .catch(function(error) {
        if (error.response) {
            console.log("Data")
        } else if (error.request) {
            console.log("Error", error.message);
        }
            console.log(error.config);
    });

    break;
  
  case "bandsintown":
    
var nodeArgs = process.argv;

var artistName = "";

for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      artistName = artistName + "+" + nodeArgs[i];
    } else {
      artistName += nodeArgs[i];
  
    }
  }


  var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function(response) {
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("Location: " + `${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country}`);
        console.log("Date of Show: " + moment(response.data[0].datetime).format('dddd, MMMM Do YYYY, h:mm a'));
    })
    .catch(function(error) {
        if (error.response) {
            console.log("Error");
        } else if (error.request) {
            console.log("Error", error.message);
        }
            console.log(error.config);
    });


    break;
  
  case "spotify":
     
    spotify.search({ type: 'track', query: `${search}` }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Song Title: " + data.tracks.items[0].name);
    console.log("Release Date: " + moment(data.tracks.items[0].album.release_date).format('dddd, MMMM Do YYYY'));
    console.log("Spotify Link: " + data.tracks.items[0].href);
    });

    break;
}
