var config = require('./config.json');
var mongoUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds025742.mlab.com:25742/'+config.dbname;

module.exports = mongoUrl;