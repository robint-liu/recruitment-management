var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/position');//可以自建lagou
mongoose.Promise = global.Promise;

module.exports=mongoose;