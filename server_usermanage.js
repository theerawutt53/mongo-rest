var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var config = require('./config');
var adminuser = require('./adminuser');
var ssl = require('./ssl_option');

var PORT = process.env.PORT || config.usermanage_port;
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

app.post('/user',ensureLogin_jwt, adminuser._user);
app.post('/resetpass',ensureLogin_jwt, adminuser._resetpass);
app.post('/edituser',ensureLogin_jwt, adminuser._edituser);
app.post('/changepass',ensureLogin_jwt, adminuser._changepass);

https.createServer(ssl.options, app).listen(PORT, HOST, null, function () {
  console.log('Server listening on port %d', this.address().port);
});
