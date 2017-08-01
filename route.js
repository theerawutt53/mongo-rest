var express = require('express');
var through2 = require('through2');
var JSONStream = require('JSONStream');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var uuid = require('node-uuid');
var router = express.Router();
var config = require('./config');

var collection_name = "obec_students";
router.get('/data/:id?', function(req, res) {
  var key = req.params.id ? req.params.id : '';
  var db = req.mongodb;
  var collection = db.collection(collection_name);
  var opt = {limit: 10};
  if (req.query.limit) {
    var limit = parseInt(req.query.limit);
    opt['limit'] = limit ? limit : 10;
  }

  var fn = function() {
    return through2.obj(function(chunk, enc, callback) {
      callback(null, {
        'key': chunk._id,
        'value': chunk
      });
    });
  };

  if(key == '') {
    collection.find({}, opt)
    .pipe(fn())
    .pipe(JSONStream.stringify())
    .pipe(res);
  } else {
    collection.findOne({"_id":key}, opt,function(err,doc) {
      if(!err) {
        if(!doc) {
          res.json({
            'ok': false,
            'message': 'Not Found'
          });
        } else {          
          res.json(doc);
        }
      } else {
        res.json({
          'ok': false,
          'message': err
        });
      }
    });
  }
});

router.post('/data/:id?', function(req, res) {
  var key = req.params.id ? req.params.id : '';
  key = (key == '') ? {} : {
    "_id": key
  };
  var value = req.body;
  var db = req.mongodb;
  var collection = db.collection(collection_name);

  if (key._id) {
    value['_id'] = key._id;
  } else {
    key['_id'] = uuid.v1().replace(/-/g, '');
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

});

router.delete('/data/:id', function(req, res) {
  var key = req.params.id;
  var db = req.mongodb;
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
        'key': key
      });
    }
  });
});

router.post('/query/:index', function(req, res) {
  var index = req.params.index;
  var map_index = config.map_index;
  var list_index = map_index[collection_name];
  var array_attrs = [];
  
  var orderby = {};
  
  for (var i = 0; i < list_index.length; i++) {
    if (list_index[i][index]) {
      array_attrs = list_index[i][index];
      array_attrs.forEach(function(arg) {
        orderby[arg]=1;
      });
    }
  }

  var opt = {};
  if (req.body.limit) {
    var limit = parseInt(req.body.limit);
    opt['limit'] = limit;
  }

  var db = req.mongodb;
  var collection = db.collection(collection_name);
  
  var start_query = {};
  if (req.body.start) {
    var tmp_list = [];
    for (var i = 0; i < req.body.start.length; i++) {
      var tmp = {};
      tmp[array_attrs[i]] = {
        '$gte': req.body.start[i]
      };
      tmp_list.push(tmp);
    }
    start_query["$and"] = tmp_list;
  }
  
  var end_query = {};
  if (req.body.end) {
    var tmp_list = [];
    for (var i = 0; i < req.body.end.length; i++) {
      var tmp = {};
      tmp[array_attrs[i]] = {
        '$lte': req.body.end[i]
      };
      tmp_list.push(tmp);
    }
    end_query["$and"] = tmp_list;
  }
  
  var query = {};
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
  }else{
    query["$and"] = [start_query,end_query];
  }
  collection.find(query, opt).sort(orderby)
  .pipe(JSONStream.stringify())
  .pipe(res);
});

router.get('/index', function(req, res){
  var index = {
  "name":"obec_students",
  "index": [{
      'name': 'cid',
      'map': function(key, value, emit) {
        if (value) {
          if(value.cid){
            emit([value.cid]);
          }
        }
      }
    }, {
      "name": "host_class_room",
      "map": function(key, value, emit) {
        if (value) {
          if(value.hostid && value["class"] && value["room"]){
            emit([value.hostid, value["class"], value["room"]]);
          }
        }
      }
    }]
  };
  res.json(index);
});

module.exports = router;
