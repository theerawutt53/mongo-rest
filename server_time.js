var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var cors = require('cors');

var config = require('./config');
var ssl = require('./ssl_option');

var PORT = process.env.PORT || config.servertime_port;
var HOST = process.env.HOST || '';

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/servertime', function (req, res) {
  var long_date = new Date().getTime()
  res.send(long_date.toString());
});

https.createServer(ssl.options, app).listen(PORT, HOST, null, function () {
  console.log('Server listening on port %d', this.address().port);
});
