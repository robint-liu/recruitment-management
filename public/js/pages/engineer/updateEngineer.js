function UpdateEngineer(container){
	this.container=container;
	this.init();
}
UpdateEngineer.ModelTemp = `
	<div class="modal fade js-updeng-modal" role="dialog" aria-labelledby="UpdatePositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" style="outline:none" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="outline:none">&times;</span></button>
	        <h4 class="modal-title" id="UpdatePositionLabel">新增求职者</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="updeng-name">姓名</label>
			  <input type="text" class="form-control js-name" id="updeng-name" placeholder="请输入姓名">
			</div>
			<div class="form-group">
			  <label for="updeng-sex">性别</label>
			  <input type="text" class="form-control js-sex" id="updeng-sex" placeholder="请输入性别">
			</div>
			<div class="form-group">
			  <label for="updeng-age">年龄</label>
			  <input type="text" class="form-control js-age" id="updeng-age" placeholder="请输入年龄">
			</div>
			<div class="form-group">
			  <label for="updeng-address">期望职位</label>
			  <input type="text" class="form-control js-position" id="updeng-address" placeholder="请输入期望职位">
			</div>
			<div class="form-group">
			  <label for="updeng-salary">期望薪资</label>
			  <select class="form-control js-salary" id="updeng-salary">
				  <option>5k-10k</option>
				  <option>10k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-30k</option>
				  <option>30k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="updeng-address">期望办公地点</label>
			  <input type="text" class="form-control js-address" id="updeng-address" placeholder="请输入办公地点">
			</div>
			<div class="form-group">
			  <label for="updeng-logo">个人头像</label>
			  <input type="file" class="form-control js-logo" id="updeng-logo">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			添加成功
	      </div>
	    </div>
	  </div>
	</div>`;
$.extend(UpdateEngineer.prototype,{
	init:function(){
		this.createDom();//创建模态框
		this.bindEvents();
	},
	createDom:function(){
		this.modal=$(UpdateEngineer.ModelTemp);
		this.succNoticeElem=this.modal.find(".js-succ-notice");
		this.container.append(this.modal);
		this.nameElem=this.modal.find(".js-name");
		this.sexElem=this.modal.find(".js-sex");
		this.ageElem=this.modal.find(".js-age");
		this.positionElem=this.modal.find(".js-position");
		this.salaryElem=this.modal.find(".js-salary");
		this.addressElem=this.modal.find(".js-address");
		this.filenameElem=this.modal.find(".js-logo");
		this.succNoticeElem = this.modal.find(".js-succ-notice");
	},
	showItem:function(id,imgSrc){//显示模态框
		this.modal.modal("show");
		this.imgSrc=imgSrc;//转换为实例对象
		this.getEngineerInfo(id);
	},
	getEngineerInfo:function(id){
		$.ajax({
			url:"/api/getEngineer",
			data:{
				id:id
			},
			success:$.proxy(this.handleGetEngineerInfoSucc,this)
		})
	},
	handleGetEngineerInfoSucc:function(res){//将查找到的结果放进input中。
		//console.log(res);
		if (res && res.data && res.data.info) {
			var info=res.data.info;
			this.nameElem.val(info.name);
			this.sexElem.val(info.sex);
			this.ageElem.val(info.age);
			this.positionElem.val(info.position);
			this.salaryElem.val(info.salary);
			this.addressElem.val(info.address);
			// this.filenameElem.files[info.filename];//暂无法设置文件（含路径）
			// console.log(this.filenameElem)
			this.id = info._id;//获取返回的json中的id
		}
	},
	bindEvents:function(){
		var submitBtn=this.modal.find(".js-submit");//点击提交
		submitBtn.on("click",$.proxy(this.handleSubmitBtnClick,this));
	},
	handleSubmitBtnClick:function(){//当点击提交时，获取输入框中内容,进行ajax请求，并刷新页面
			var name=this.nameElem.val(),
				sex=this.sexElem.val(),
				age=this.ageElem.val(),
				position=this.positionElem.val(),
				salary=this.salaryElem.val(),
				address=this.addressElem.val(),
				logo=this.filenameElem[0].files[0];//获取选中的文件

		var formData = new FormData();
				formData.append("name",name);
				formData.append("sex",sex);
				formData.append("age",age);
				formData.append("position",position);
				formData.append("salary",salary);
				formData.append("address",address);
				formData.append("logo",logo);
				formData.append("id",this.id);
				formData.append("imgSrc",this.imgSrc);
				
		$.ajax({
			type:"POST",
			url:"/api/updateEngineer",
			processData:false,
			cache:false,
			contentType:false,
			data: formData,
			success:$.proxy(this.handleUpdateEngineerSucc,this)
		})
	},
	handleUpdateEngineerSucc:function(res){
		if (res&&res.data&&res.data.update) {
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDelay,this),2000);
			$(this).trigger("change");
		}
	},
	handleDelay:function(){
		this.succNoticeElem.addClass("hide");
		this.modal.modal("hide");	
	}
})