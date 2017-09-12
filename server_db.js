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
var request = require('request');
var rewrite = require('express-urlrewrite');
var MongoClient = require('mongodb').MongoClient;

var route1 = require('./route1');
var route2 = require('./route2');
var login_route = require('./login');
var config = require('./config');

var PORT = process.env.PORT || config.port;
var HOST = process.env.HOST || '';

var mongodb = {};

var app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));

var ensureLogin_jwt = function (req, res, next) {
  passport.authenticate('jwt', { session: false })(req,res,next);
};

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.jwt.cert;

var pipe_request = function(method, url, req, res) {
  var jwt = req.headers.authorization?req.headers.authorization:'';
  if (req.body) {
    request({
        method: method,
        url: url,
        headers: {
          'Authorization': jwt
        },
        qs: req.query,
        json: true,
        body: req.body
      })
      .on('error', function(err) {
        res.json({
          'ok': false,
          'message': err
        });
      })
      .pipe(res)
  } else {
    request({
      method: method,
      url: url,
    }).pipe(res);
  }
}

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  done(null, jwt_payload);
}));

/*
app.get('/',function(req,res){
  res.send('test');
});
*/

require('express-readme')(app, {
  filename: 'README.md',
  routes: ['/', '/readme']
});

app.param('db',function(req,res,next,value) {
  req.mongodb = mongodb[value];
  next();
});

app.param('collection',function(req,res,next,value) {
  req.collection = req.mongodb.db.collection(value);
  next();
});

app.use('/api/dbs/:db/:id?',function(req,res,next) {
  if(config.forward[req.params.db]) {
    var url = config.forward[req.params.db];
    var db_url = url+'/data';
    if(req.params.id) {
      db_url += '/'+req.params.id;
    }
    pipe_request(req.method,db_url,req,res);
  } else {
    next();
  }
});

app.use('/api/query/:db/:index',function(req,res,next) {
  if(config.forward[req.params.db]) {
    var url = config.forward[req.params.db];
    var db_url = url+'/query/'+req.params.index;
    pipe_request(req.method,db_url,req,res);
  } else {
    next();
  }
});

app.all('/login',rewrite('/_login/cores/user_db'));

for(var key in config.ldb) {
  app.all('/api/dbs/'+key+'',
    rewrite('/v1/'+config.ldb[key]+'/'+key+'/data'));
  app.all('/api/dbs/'+key+'/:id',
    rewrite('/v1/'+config.ldb[key]+'/'+key+'/data/:id'));
  app.post('/api/query/'+key+'/:view',
   rewrite('/v1/'+config.ldb[key]+'/'+key+'/query/:view'));
}

app.use('/_login/:db/:collection',login_route._login);

app.use('/v1/:db/:collection',ensureLogin_jwt, route1);
app.use('/v2/:db/:collection',ensureLogin_jwt, route2);

var count = config.mongodb.length;

config.mongodb.forEach(function(db_config) {
  MongoClient.connect(db_config.url,
    db_config.options,function(err,db) {
    if(!err) {
      count--;
      mongodb[db_config.db] = {'db':db,'config':db_config};
      if(count==0) {
        https.createServer(config.ssl_option, app).listen(PORT, HOST, null, function () {
          console.log('Server listening on port %d', this.address().port);
        });
      }
    }
  });
});
