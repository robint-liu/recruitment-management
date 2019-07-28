function UpdatePosition(container){
	this.container=container;
	this.init();
}
UpdatePosition.ModelTemp = `
	<div class="modal fade js-updatepos-modal" role="dialog" aria-labelledby="UpdatePositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" style="outline:none" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="UpdatePositionLabel">新增职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="updatepos-company">公司名称</label>
			  <input type="text" class="form-control js-company" id="updatepos-company" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="updatepos-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="updatepos-position" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
			   <label for="addpos-salary">薪资范围</label>
			  <select class="form-control js-salary" id="addpos-salary">
				  <option>5k-10k</option>
				  <option>10k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-35k</option>
				  <option>35k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="updatepos-address">办公地点</label>
			  <input type="text" class="form-control js-address" id="updatepos-address" placeholder="请输入办公地点">
			</div>
			<div class="form-group">
			  <label for="updatepos-logo">公司logo</label>
			  <input type="file" class="form-control js-logo" id="updatepos-logo">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			修改成功
	      </div>
	    </div>
	  </div>
	</div>`;
$.extend(UpdatePosition.prototype,{
	init:function(){
		this.createDom();//创建模态框
		this.bindEvents();
	},
	createDom:function(){
		this.modal=$(UpdatePosition.ModelTemp);
		this.succNoticeElem=this.modal.find(".js-succ-notice");
		this.container.append(this.modal);
		this.companyElem=this.modal.find(".js-company");
		this.positionElem=this.modal.find(".js-position");
		this.salaryElem=this.modal.find(".js-salary");
		this.addressElem=this.modal.find(".js-address");
		this.filenameElem=this.modal.find(".js-logo");
		this.succNoticeElem = this.modal.find(".js-succ-notice");
	},
	showItem:function(id,imgSrc){//显示模态框
		this.modal.modal("show");
		this.imgSrc=imgSrc;
		this.getPositionInfo(id);
	},
	getPositionInfo:function(id){
		$.ajax({
			url:"/api/getPosition",
			data:{
				id:id
			},
			success:$.proxy(this.handleGetPositionInfoSucc,this)
		})
	},
	handleGetPositionInfoSucc:function(res){
		if (res && res.data && res.data.info) {
			var info=res.data.info;
			this.companyElem.val(info.company);
			this.positionElem.val(info.position);
			this.salaryElem.val(info.salary);
			this.addressElem.val(info.address);
			// this.filenameElem.files[info.filename];//暂无法设置文件（含路径）
			// console.log(this.filenameElem)
			this.id = info._id;//获取返回的json中的id
		}
	},
	bindEvents:function(){
		var submitBtn=this.modal.find(".js-submit");
		submitBtn.on("click",$.proxy(this.handleSubmitBtnClick,this));
	},
	handleSubmitBtnClick:function(){//当点击提交时，获取输入框中内容,进行ajax请求，并刷新页面
		var company=this.companyElem.val(),
			position=this.positionElem.val(),
			salary=this.salaryElem.val(),
			address=this.addressElem.val(),
			logo=this.filenameElem[0].files[0];

		var formData = new FormData();
				formData.append("company",company);
				formData.append("position",position);
				formData.append("salary",salary);
				formData.append("address",address);
				formData.append("logo",logo);
				formData.append("id",this.id);
				formData.append("imgSrc",this.imgSrc);

		$.ajax({
			type:"POST",
			url:"/api/updatePosition",
			processData:false,
			cache:false,
			contentType:false,
			data: formData,
			success:$.proxy(this.handleUpdatePositionSucc,this)
		})
	},
	handleUpdatePositionSucc:function(res){
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