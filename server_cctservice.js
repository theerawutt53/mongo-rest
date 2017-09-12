var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var config = require('./config');
var hostsummary = require('./hostsummary');
var ssl = require('./ssl_option');

var PORT = process.env.PORT || config.cctservice_port;
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

app.post('/studentstatus',ensureLogin_jwt, hostsummary._studentstatus);
app.post('/dbs/form_record/:id?',ensureLogin_jwt, hostsummary._formrecord);

https.createServer(ssl.options, app).listen(PORT, HOST, null, function () {
  console.log('Server listening on port %d', this.address().port);
});
