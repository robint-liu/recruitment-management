var mongoose = require('../utils/database.js');
const fs=require("fs");

var Position = mongoose.model('position', { //集合
	company: String,
	position: String,
	salary: String,
	address: String,
	filename:String//添加图片规则
});
var Engineer = mongoose.model('engineer', { //集合
	name: String,
	sex: String,
	age: String,
	position: String,
	salary: String,
	address: String,
	filename:String//添加图片规则
});

module.exports = {
	addPosition(company, position, salary, address,filename, cb) {
		var position = new Position({company, position, salary, address,filename});
		position.save(function(err) {
			cb(err)
		})
	},
	getPosition(params, cb) {
		Position.find(params).then((result) => {//找到匹配项，执行result
			//console.log(result);//[]
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},
	removeItemById:function(file,id,cb){
		if (file!=="头像.PNG") {
			fs.unlink("../express-demo/public/position_logo/"+file,(err)=>{
				console.log(err);
			});
		}
		Position.findByIdAndRemove(id,(err)=>{//findByIdAndRemove封装好的方法
			cb(err);
		})
	},
	getPositionByPage(page, size, cb) {
		page=parseInt(page,10);
		size=parseInt(size,10);
		Position.find({}).limit(size).skip((page-1) * size).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	getPositionById:function(id,cb){
		Position.findById(id).then((result)=>{//将结果返回result或null、[]
			cb(result);
		}).catch(()=>{
			cb("error");
		})
	},
	updatePositionById:function(id,imgSrc,params,cb){
		//console.log(imgSrc);
		if (imgSrc!=="/position_logo/头像.PNG"&&params.filename) {
			fs.unlink("../express-demo/public"+imgSrc,(err)=>{
				console.log(err);
			});
		}
		Position.findByIdAndUpdate(id,params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error")
		})
	},
	//====================position==============================
	addEngineer(name, sex, age, position, salary, address, filename, cb) {
		var engineer = new Engineer({name, sex, age, position, salary, address, filename});
		engineer.save(function(err) {
			cb(err)
		})
	},
	getEngineer(params, cb) {
		Engineer.find(params).then((result) => {//找到匹配项，执行result
			//console.log(result);//[]
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},
	getEngineerById:function(id,cb){
		Engineer.findById(id).then((result)=>{//将结果返回result或null、[]
			cb(result);
		}).catch(()=>{
			cb("error");
		})
	},
	getEngineerByPage(page, size, cb) {
		page=parseInt(page,10);
		size=parseInt(size,10);
		Engineer.find({}).limit(size).skip((page-1) * size).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error');
		})
	},
	removeEngineerItemById:function(file,id,cb){
		if (file!=="头像.PNG") {
			fs.unlink("../express-demo/public/engineer_logo/"+file,(err)=>{
				console.log(err);
			});
		}
		Engineer.findByIdAndRemove(id,(err)=>{//findByIdAndRemove封装好的方法
			cb(err);
		})
	},
	updateEngineerById:function(id,imgSrc,params,cb){
		// console.log(imgSrc);
		if (imgSrc!=="/engineer_logo/头像.PNG"&&params.filename) {
			fs.unlink("../express-demo/public"+imgSrc,(err)=>{
				console.log(err);
			});
		}
		Engineer.findByIdAndUpdate(id,params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error")
		})
	},
	getEngineerSear:function(text,cb){
		var textSearch = require('mongoose-text-search');
		var collect=Engineer;
			//console.log(collect);
		collect.plugin(textSearch);//为engineer注册textSearch插件
		collect.index({ 
			name: 1 ,
			sex: 1 ,
			age: 1 ,
			position: 1 ,
			salary: 1 ,
			address: 1 ,
		});
		collect.textSearch(text, function(err, output){
		   console.log(1);
		   console.log(output);
		   cb(result);
	    // var inspect = require('util').inspect;
	    // console.log(inspect(output, { depth: null }));})
		})
	}
}