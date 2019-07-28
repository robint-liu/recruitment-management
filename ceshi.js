var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/lagou');//可以自建lagou
var textSearch = require('mongoose-text-search');
 
// create our schema 
var gameSchema = mongoose.Schema({
    name: String
  , tags: [String]
  , likes: Number
  , created: Date
});
 
// give our schema text search capabilities 
gameSchema.plugin(textSearch);
 
// add a text index to the tags array 
gameSchema.index({ tags: 1 });
 
// test it out 
var Game = mongoose.model('Game', gameSchema);
Game.create({ name: 'Super Mario 64', tags: ['nintendo', 'mario', '3d'] }, function (err) {
  //if (err) return handleError(err);

  Game.textSearch('3d', function (err, output) {
 	console.log(err);
 	console.log(output);
    //if (err) return handleError(err);
    // var inspect = require('util').inspect;
    // console.log(inspect(output, { depth: null }));
	})
})