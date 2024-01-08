// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var port = 3000;

// Set up server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/api/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// Post comments
app.post('/api/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),
      name: req.body.name,
      comment: req.body.comment
    };
    comments.push(newComment);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

// Start server
app.listen(port, function() {
  console.log('Server started on port ' + port);
});