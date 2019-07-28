const userModel=require("../models/user.js");
const crypto=require("crypto");
const hash=crypto.createHash('sha256');

module.exports={
	register:(req,res)=>{//注册的业务逻辑
		const {username,password}=req.body;//解构赋值
		const hash=crypto.createHash('sha256');//创建hash实例
		//console.log(hash);//hash是一个对象
			hash.update(password);//使用给定的password更新哈希内容
			//console.log(hash.update(password),hash.digest('hex'));
		userModel.findUser({username:username},(result)=>{
			if (result && result!=="error") {//当用户已经存在
				res.json({
					ret:true,
					data:{
						register:false,
						simple:true
					}
				})
			}else{//当用户
				userModel.register(username,hash.digest('hex'),(err)=>{//计算加密摘要
					res.json({//同res.send()作用相同，并将相关内容转换为json
						ret:true,
						data:{
							register:!err,
						}
					})
					if (!err) {
						res.end("注册成功");
					}
				})
			}
		})
	},
	login:(req,res)=>{
		const {username,password}=req.body;
		const hash=crypto.createHash('sha256');
		hash.update(password);
		userModel.findUser({
			username:username,
			password:hash.digest('hex')
		},(result)=>{
			if (result&&result!=="error") {
				req.session.username=username;//如果用户存在，将username覆盖
			}
				res.json({
					ret:true,
					data:{
						login:(result&&result!=="error")?true:false
					}
				})
		})
	},
	isLogin:(req,res)=>{
		res.json({
			ret:true,
			data:{
				isLogin:req.session.username?true:false,
			}
		})
	},
	logout:(req,res)=>{
		req.session=null;
		res.json({
			ret:true,
			data:{
				logout:true
			}
		})
	}
}