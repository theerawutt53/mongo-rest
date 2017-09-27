var path = require('path');
var fs = require('fs');

var certsPath = path.join(__dirname, 'ssl_certificate', 'server');
var caCertsPath = path.join(__dirname, 'ssl_certificate', 'ca');
var certsJWT = path.join(__dirname, 'ssl_certificate', 'jwt');

var service_name = 'maas';

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

module.exports.mongodb_options = {
  poolSize:100,
  ssl:true,
  sslKey: fs.readFileSync(path.join(certsPath, 'mongodb-key.pem')),
  sslCert: fs.readFileSync(path.join(certsPath, 'mongodb-cert.pem')),
  sslCA: fs.readFileSync(path.join(caCertsPath, 'mongodb-ca-chain.pem'))
};

module.exports.jwt = {
  key: fs.readFileSync(path.join(certsJWT, 'jwt_key.key')),
  cert: fs.readFileSync(path.join(certsJWT, 'jwt_cert.crt')),
  eexpiresIn:'1h'
};

