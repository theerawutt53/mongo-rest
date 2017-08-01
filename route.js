var express = require('express');
var through2 = require('through2');
var JSONStream = require('JSONStream');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
var config = require('./config');
var db_url = 'mongodb://45.32.109.171:27017/obec';

router.get('/dbs/:db/:id?', function(req, res) {
  var collection_name = req.params.db;
  var key = req.params.id ? req.params.id : '';
  var db = req.mongodb;
  var collection = db.collection(collection_name);
  var opt = {limit: 10};
  if (req.query.limit) {
    var limit = parseInt(req.query.limit);
    opt['limit'] = limit ? limit : 10;
  }
  collection.find(key == '' ? {} : {
    "_id": ObjectId(key)
  }, opt)
  .pipe(through2.obj(function(chunk, enc, callback) {
    callback(null, {
     'key': chunk._id,
     'value': chunk
    });
  }))
  .pipe(JSONStream.stringify())
  .pipe(res);
});

router.post('/dbs/:db/:id?', function(req, res) {
  var collection_name = req.params.db;
  var key = req.params.id ? req.params.id : '';
  key = (key == '') ? {} : {
    "_id": key
  };
  var value = req.body;
  MongoClient.connect(db_url, function(err, db) {
    if (err) {
      res.json({
        'ok': false,
        'message': err
      });
    } else {
      var collection = db.collection(collection_name);

      if (key._id) {
        value['_id'] = key._id;
      } else {
        key['_id'] = new ObjectId();
        value['_id'] = key['_id'];
      }
      collection.replaceOne(key, value, {
        'upsert': true
      }, function(err, resc) {
        if (err) {
          res.json({
            'ok': false,
            'message': err
          });
        } else {
          var result = resc.result;
          res.json({
            'ok': result.ok == 1 ? true : false,
            'key': key['_id']
          });
        }
      });
    }
  });
});

router.delete('/dbs/:db/:id?', function(req, res) {
  var collection_name = req.params.db;
  var key = req.params.id ? req.params.id : '';
  MongoClient.connect(db_url, function(err, db) {
    if (err) {
      res.json({
        'ok': false,
        'message': err
      });
    } else {
      var collection = db.collection(collection_name);
      collection.deleteOne({'_id':key}, function(err, resc) {
        if (err) {
          res.json({
            'ok': false,
            'message': err
          });
        } else {
          var result = resc.result;
          res.json({
            'ok': result.ok == 1 ? true : false,
            'key': key['_id']
          });
        }
      });
    }
  });
});

router.post('/query/:db/:index', function(req, res) {
  var collection_name = req.params.db;
  var index = req.params.index;
  var map_index = config.map_index;
  var list_index = map_index[collection_name];
  var array_attrs = [];
  for (var i = 0; i < list_index.length; i++) {
    if (list_index[i][index]) {
      array_attrs = list_index[i][index];
    }
  }
  
  var opt = {};
  if (req.body.limit) {
    var limit = parseInt(req.body.limit);
    opt['limit'] = limit;
  }

  MongoClient.connect(db_url, function(err, db) {
    if (err) {
      res.json({
        'ok': false,
        'message': err
      });
    } else {
      
      var collection = db.collection(collection_name);
      var query = {};
      console.log(req.body);
      if (req.body.match) {
        var tmp_list = [];
        for (var i = 0; i < req.body.match.length; i++) {
          var tmp = {};
          tmp[array_attrs[i]] = {
            '$eq': req.body.match[i]
          };
          tmp_list.push(tmp);
        }
        query["$and"] = tmp_list;
      }
      console.log(JSON.stringify(query));
      collection.find(query, opt)
      .pipe(through2.obj(function(chunk, enc, callback) {
        callback(null, {
            'key': chunk._id,
            'value': chunk
          });
        }))
        .on('end', function() {
          db.close();
        })
        .pipe(JSONStream.stringify())
        .pipe(res);
    }
  });
});

module.exports = router;
