function Login(container,modelContainer){
	this.container=container;
	this.modelContainer=modelContainer;
	this.init();
}

Login.btnTemp=`
			<li><a href='#' data-toggle='modal' data-target='.js-login-Modal' style="outline:none;text-shadow: 1px 1px 1px rgba(0,0,0,.5);">登录</a></li>`;

Login.ModelTemp=`
				<div class="modal fade js-login-Modal" tabindex="-1" role="dialog" aria-labelledby="LoginLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="LoginLabel">登录</h4>
			      </div>
			      <div class="modal-body">

			       	<form>
							  <div class="form-group">
							    <label for="username">用户名</label>
							    <input type="email" class="form-control js-user" id="username" placeholder="请输入用户名">
							  </div>
							  <div class="form-group">
							    <label for="password">密码</label>
							    <input type="password" class="form-control js-pass" id="password" placeholder="请输入密码">
							  </div>
							</form>

			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-primary js-submit">提交</button>
			      </div>
			       <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px">恭喜您，登录成功</div>
			       <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px">对不起，用户名或密码错误！</div>
			    </div>
			  </div>
			</div>`;

$.extend(Login.prototype,{
	init:function(){
		this.createBtn();
		this.createModel();
		this.bindEvents();
	},
	createBtn:function(){
		this.btn=$(Login.btnTemp);//生成新元素$("<div>")或$("<div>werty</div>")
		this.container.append(this.btn);
	},
	createModel:function(){
		this.model=$(Login.ModelTemp);
		//module.exports=Login.prototype;
		//module.exports=new Login();
		this.succNoticeElem=this.model.find(".js-succ-notice");
		this.errNoticeElem=this.model.find(".js-err-notice");
		this.modelContainer.append(this.model);
	},
	bindEvents:function(){
		var submitBtn=this.model.find(".js-submit");
		submitBtn.on("click",$.proxy(this.handleSubmitBtnClick,this));
	},
	handleSubmitBtnClick:function(){
		var username=this.model.find(".js-user").val(),
			password=this.model.find(".js-pass").val();
		$.ajax({
			url:"/api/login",
			type:"POST",
			data:{
				username:username,
				password:password
			},
			success:$.proxy(this.handleLoginSucc,this)
		})
	},
	handleLoginSucc:function(res){
		if(res&&res.ret&&res.data&&res.data.login){
			// this.model.modal("hide");
			// window.location.reload();
			this.errNoticeElem.addClass("hide");
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleModelFade,this),2000);
		}else{
			this.errNoticeElem.removeClass("hide");
		}
	},
	handleModelFade:function(){
		this.model.modal("hide");
		this.succNoticeElem.addClass("hide");
		window.location.reload();
	}
	// qwqqqq:function(){
	// 	console.log(this);
	// }
})
// $.qwqqqq();