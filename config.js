var path = require('path');
var fs = require('fs');

var certsPath = path.join(__dirname, 'ssl_certificate', 'server');
var caCertsPath = path.join(__dirname, 'ssl_certificate', 'ca');
var certsJWT = path.join(__dirname, 'ssl_certificate', 'jwt');

module.exports.mongodb = [
  {
    db:'obec',
    url:"mongodb://mongodb1.inforvation.systems:27017/obec",
    options:{
      poolSize:100,
      ssl:true,
      sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
      sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
      sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
    },
    map_index : {
      "obec_students": [
        {"host_class_room": ["hostid","class","room"]},
        {"cid": ["cid"]}
      ],
      "form_record_new":[
        {"cid": ["cid"]},
        {"hostid_cid":["hostid","cid"]}
      ],
      "form_record_homevisit":[
        {"hostid_cid":["hostid","cid"]}
      ]
    }
  },{
    db:'oosc',
    url:"mongodb://mongodb1.inforvation.systems:27017/oosc",
    options:{
      poolSize:100,
      ssl:true,
      sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
      sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
      sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
    },
    map_index : {
      "oosc_form":[
        {"houseid":["houseid"]}
      ]
    }
  }
]

module.exports.ssl_option = {
  /*---ssl certificate---*/
  key: fs.readFileSync(path.join(certsPath, 'server.key')),
  cert: [
    //fs.readFileSync(path.join(certsPath, 'server-thaiedu.crt')),
    fs.readFileSync(path.join(certsPath, 'server-maas.crt'))
  ],
  ca: [
    //fs.readFileSync(path.join(caCertsPath, 'ca-thaiedu.crt')),
    fs.readFileSync(path.join(caCertsPath, 'ca-maas.crt'))
  ],
  requestCert: false,
  rejectUnauthorized: true
  /*---ssl certificate---*/
};

module.exports.jwt = {
  key: fs.readFileSync(path.join(certsJWT, 'jwt_key.key')),
  cert: fs.readFileSync(path.join(certsJWT, 'jwt_cert.crt'))
};

module.exports.port = "44325";
