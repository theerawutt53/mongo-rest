var path = require('path');
var fs = require('fs');

var certsPath = path.join(__dirname, 'ssl_certificate', 'server');
var caCertsPath = path.join(__dirname, 'ssl_certificate', 'ca');
var certsJWT = path.join(__dirname, 'ssl_certificate', 'jwt');
var  ReadPreference = require('mongodb').ReadPreference;
var service_name = 'thaieduforall_20180203';

module.exports.options = {
  key: fs.readFileSync(path.join(certsPath, 'server.key')),
  cert: [
    fs.readFileSync(path.join(certsPath, 'server-'+service_name+'.crt'))
  ],
  ca: [
    fs.readFileSync(path.join(caCertsPath, 'ca-'+service_name+'.crt'))
  ],
  requestCert: false,
  rejectUnauthorized: true
};

module.exports.mongodb_old_options = {
  poolSize:1000,
  ssl:true,
  sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-old-key.pem')),
  sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-old-cert.pem')),
  sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-old-ca-chain.pem')),
  readPreference:ReadPreference.PRIMARY_PREFERRED
};

module.exports.mongodb_options = {
  poolSize:1000,
  ssl:true,
  sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
  sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
  sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem')),
  readPreference:ReadPreference.PRIMARY_PREFERRED
};

module.exports.jwt = {
  key: fs.readFileSync(path.join(certsJWT, 'jwt_key.key')),
  cert: fs.readFileSync(path.join(certsJWT, 'jwt_cert.crt')),
  expiresIn:'2h'
};
