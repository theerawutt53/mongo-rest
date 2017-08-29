var jwt = require('jsonwebtoken');
var encryption = require('./encryption');
// var ssl = require('./ssl_option');
var ssl = require('./config');
const loginTimeOut = 180;

var findByUsername = function (username,req, cb) {
  req.collection.find({'User':username}).toArray(function(err,docs) {
    if(docs.length > 0) {
      cb(true,docs[0]);
    } else {
      cb(false,null);
    }
  });
};

var findByID = function (id, done) {
  util.get_dbs('user_db', function (err, db_name) {
    if (err) {
      res.json({
        'ok': false,
        'message': err
      });
    } else {
      db_name.get(id, function (err, value) {
        if (err) {
          done(null, false);
        } else {
          done(null, value)
        }
      });
    }
  });
};

var jwtToken = function(UserID) {
  console.log(UserID);
  // sign with RSA SHA256
  var cert = ssl.jwt.key;  // get private key
  var token = jwt.sign({ UserID: UserID }, cert,{ algorithm: 'RS256','expiresIn':ssl.jwt.expiresIn});
  return token;
};

module.exports = {
  _login: function (req, res) {
    var _username = req.body.user?req.body.user:req.headers.user;
    var _pass = req.body.pass?req.body.pass:req.headers.pass;
    findByUsername(_username,req, function (found, user) {
      if (found) {
        var _password_hash = encryption.password_hash(_pass, user.Pass_Salt);
        if (user.User === _username && user.Pass_Hash === _password_hash) {
          if(!user.deactive ){
            var key = user._id;
            var obj = {
              timestamp: new Date().getTime(),
              _id: key
            };
            var collection = req.mongodb.db.collection('authen_db');
            collection.replaceOne({'_id':key},obj,{'upsert':true},function(err,result) {
              console.log({'username':_username,message:'Authenthicated','last_login':new Date(obj.timestamp)});
              if(err) {
                 res.json({status: false});
              } else {
                 res.set({
                   'Access-Control-Expose-Headers': 'Authorization',
                   'Content-Type': 'application/json; charset=utf-8',
                   'Authorization': jwtToken(_username)
                 });
                 res.json({
                   status: true,
                   key: key
                 });
              }
            });
          } else {
            console.log({'username':_username,message:'Username Deactived'});
            res.json({
              status: false,
              message: 'Username Deactived'
            });
          }
        } else {
          console.log({'username':_username,message:'Invalid Username or Password'});
          res.json({
            status: false,
            message:'Invalid Username or Password'
          });
        }
      } else {
        console.log({'username':_username,message:'Username is Not Found'});
        res.json({
          status: false,
          message:'Username is Not Found'
        });
      }
    });
  },
  _logout: function (req, res) {
    res.json({status: true});
  },
  _getUser: function (id, done) {
    findByID(id, function (err, value) {
      if (err) {
        done(null, false);
      } else {
        done(null, value)
      }
    });
  },
  _isAuthen: function (id, done) {
    util.get_dbs('authen_db', function (err, authen_db) {
      if (err) {
        res.json({
          'ok': false,
          'message': err
        });
      } else {
        authen_db.get(id, function (err, value) {
          if (err) {
            done(null, false);
          } else {

            var diff = Math.abs(new Date(value.timestamp) - new Date().getTime());
            var minutes = Math.floor((diff / 1000) / 60);

            if (minutes > loginTimeOut) {
              done(null, false);
            } else {
              findByID(id, function (err, value) {
                if (err) {
                  done(null, false);
                } else {
                  done(null, value)
                }
              });
            }
          }
        });
      }
    });
  }
}
