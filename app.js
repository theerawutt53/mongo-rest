var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var session = require('express-session');
var authorization = require('express-authorization');
var path = require('path');
var https = require('https');

var MongoClient = require('mongodb').MongoClient;

var route = require('./route');
var config = require('./config');

var PORT = process.env.PORT || config.port;
var HOST = process.env.HOST || '';

var mongodb = null;

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
jwtOptions.secretOrKey = config.jwt.cert;

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  done(null, jwt_payload);
}));

/*



*/

app.use(function(req,res,next) {
  req.mongodb = mongodb;
  next();
});

app.use('/',ensureLogin_jwt, route);

//app.use('/', route);

MongoClient.connect(config.mongodb.url,
  config.mongodb.options,function(err,db) {
  if(!err) {
    mongodb = db; 
    app.listen(PORT, function () {
      console.log('Server listening on port %d', this.address().port);
    });
    /*https.createServer(config.ssl_option, app).listen(PORT, HOST, null, function () {
      console.log('Server listening on port %d', this.address().port);
    });*/
  }
});
