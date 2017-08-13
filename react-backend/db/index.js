var config = require('./config.json');
var  mongoUrl= config.url;
mongoUrl = mongoUrl.replace("<dbuser>", config.dbuser);
mongoUrl = mongoUrl.replace("<dbpassword>", config.dbpassword);
module.exports = mongoUrl;