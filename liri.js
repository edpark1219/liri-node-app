    var Twitter = require('twitter');
    var spotify = require('spotify');
    var request = require("request");
    var fs = require("fs");

    var commands = process.argv[2];
    var input = process.argv[3];

    switch (commands) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }

    function myTweets() {



        var keys = require("./keys.js");
        var params = { screen_name: 'nytimes', count: 20 };
        var client = new Twitter(keys.twitterKeys);
        client.get('statuses/user_timeline', params, function(error, tweets, response) {

            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log(JSON.stringify(tweets[i].text, null, 2));
                    console.log(JSON.stringify(tweets[i].created_at, null, 2));
                    console.log("=======================");
                }
            };
        });

    };

    function spotifyThisSong() {



        if (!input) {
            input = "Ace of Base";
        }

        spotify.search({ type: 'track', query: input }, function(err, data) {
            if (err) {
                console.log('Error occured: ' + err);
                return;
            }
            console.log("=======================");
            console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
            console.log("Song name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
            console.log("Preview: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
            console.log("=======================");
        })

    }

    function movieThis() {
        var movieName = "";
        movieName = input.split(" ").join("+");
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";


        request(queryURL, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("=======================")
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
                var movieTitle = JSON.parse(body).Title;
                movieTitle = movieTitle.toLowerCase();
                var temp = movieTitle.split(" ").join("_");
                var rotURL = "http://www.rottentomatoes.com/m/" + temp
                console.log("Rotten Tomatoes URL: " + rotURL);
                console.log("=======================");
            }
        });
    }

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function(err, data) {

            data = data.split(",");
            input = data[1];

            switch (data[0]) {
                case "my-tweets":
                    myTweets();
                    break;

                case "spotify-this-song":
                    spotifyThisSong();
                    break;

                case "movie-this":
                    movieThis();
                    break;
            }

        })
    }
