var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var multiparty = require('multiparty');
var azure = require('azure');
var Readable = require('stream').Readable;
var base64 = require('base64-stream');
var config = require('./config');
var ssl = require('./ssl_option');

var PORT = process.env.PORT || config.blob_port;
var HOST = process.env.HOST || '';

var app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var ensureLogin_jwt = function (req, res, next) {
  passport.authenticate('jwt', { session: false })(req,res,next);
};

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = ssl.jwt.cert;

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  done(null, jwt_payload);
}));

var _upload = function (req, res) {
  var blobService = azure.createBlobService(config.azure_blob_accountName, config.azure_blob_accessKey);
  var container = req.params.container;

  if (req.headers['content-type'].indexOf('text/plain') !== -1) {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var fileName = req.params.filename;
      var image = new Buffer(body.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      var s = new Readable();
      s.push(image);
      s.push(null);

      blobService.createBlockBlobFromStream(container, fileName, s, image.length, function (error) {
        if (error) {
          res.end(error)
        }
      });
      res.json({
        'ok': true
      });
    });
  } else {
    var form = new multiparty.Form();
    form.on('part', function (part) {
      if (!part.filename) return;
      var size = part.byteCount;
      var name = part.filename;
      blobService.createBlockBlobFromStream(container, name, part, size, function (error) {
        if (error) {
          res.end(error)
        }
      });
    });
    form.parse(req);
    res.json({
      'ok': true
    });
  }
};

app.get('/img', function (req, res) {
  res.writeHead(200, {
    'content-type': 'text/html'
  });
  res.end(
    '<form action="/upload/databasebackup?apikey=83969040dd9f11e6bc01774977b2f887" enctype="multipart/form-data" method="post">' +
    '<input type="text" name="title"><br>' +
    '<input type="file" name="upload"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
});

app.post('/upload/:container/:filename?',ensureLogin_jwt, function (req, res) {
  _upload(req, res);
});

app.post('/download',ensureLogin_jwt, function(req,res) {
  if(req.body){
    var blobService = azure.createBlobService(config.azure_blob_accountName, config.azure_blob_accessKey);
    var container = req.body.container;
    var filename = req.body.filename;
    blobService.createReadStream(container, filename)
    .on('error',function(e) {
      res.json({
        'ok': false,
        'message':e.message
      });
    })
    .pipe(base64.encode())
    .pipe(res);
  }else{
   res.json({
     'ok': false,
     'message':'can not get blob'
   });
  }
});

https.createServer(ssl.options, app).listen(PORT, HOST, null, function () {
  console.log('Server listening on port %d', this.address().port);
});
