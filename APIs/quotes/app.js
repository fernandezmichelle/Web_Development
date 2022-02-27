var needle = require ('needle');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function(req, res){
    res.render("index.ejs")
});

app.get("/quotes", function(req, res){
    needle.get('https://type.fit/api/quotes', function(error, response, body){
        if (!error && response.statusCode == 200){
            var obj = JSON.parse(body);
            var randomNumber = Math.floor(Math.random() * obj.length);

            var text = obj[randomNumber].text;
            var author = obj[randomNumber].author;
            res.render("quote.ejs", {text: text, author: author});
        }
    });
});

app.listen(3000, function(){
    console.log('App is listening on port 3000')
})