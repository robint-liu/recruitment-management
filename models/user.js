var mongoose=require("../utils/database.js");
//mongoose :node.js优雅的mongodb对象建模
var User = mongoose.model('user', {//创建一个数据库collection
	username:String,
	password:String
});

module.exports={
	register(username,password,cb){
		var user=new User({//创建一个document
			username:username,
			password:password
		});
		user.save(function(err){
			cb(err);
		})
	},
	findUser(findParams,cb){
		User.findOne(//从collection中找出username:username的行
			findParams
		).then((result)=>{
			cb(result);
		}).catch(()=>{
			cb("error");
		})
	}

}