var path = require('path');
var fs = require('fs');

var certsPath = path.join(__dirname, 'ssl_certificate', 'server');
var caCertsPath = path.join(__dirname, 'ssl_certificate', 'ca');
var certsJWT = path.join(__dirname, 'ssl_certificate', 'jwt');

module.exports.mongodb = {
  url:"mongodb://mongodb1.inforvation.systems:27017/obec",
  options:{
    poolSize:100,
    ssl:true,
    sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
    sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
    sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
  }
}

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

module.exports.map_index = {
  "obec_students": [
    {
      "host_class_room": [
        "hostid",
        "class",
        "room"
      ]
    },
    {
      "cid": [
        "cid"
      ]
    }
  ]
};

module.exports.port = "44325";
