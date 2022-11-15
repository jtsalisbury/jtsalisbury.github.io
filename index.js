//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/index.html'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the app by listening on the default Heroku port
const port = 80;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});


const app2 = express();

// Serve only the static files form the dist directory
app2.use(express.static(__dirname + '/index.html'));

app2.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the app by listening on the default Heroku port
const port2 = 443;
app2.listen(port2, () => {
  console.log('Express server listening on port', port2)
});