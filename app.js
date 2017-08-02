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

var mongodb = {};

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

app.param('db',function(req,res,next,value) {
  req.mongodb = mongodb[value];
  next();
});

app.param('collection',function(req,res,next,value) {
  req.collection = req.mongodb.db.collection(value);
  next();
});

app.use('/:db/:collection',ensureLogin_jwt, route);

//app.use('/', route);

var count = config.mongodb.length;

config.mongodb.forEach(function(db_config) {
  MongoClient.connect(db_config.url,
    db_config.options,function(err,db) {
    if(!err) {
      count--;
      mongodb[db_config.db] = {'db':db,'config':db_config}; 
      if(count==0) {
        app.listen(PORT, function () {
          console.log('Server listening on port %d', this.address().port);
        });
      }
      /*https.createServer(config.ssl_option, app).listen(PORT, HOST, null, function () {
        console.log('Server listening on port %d', this.address().port);
      });*/
    }
  });
});
