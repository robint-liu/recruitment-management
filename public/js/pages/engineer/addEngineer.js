function AddEngineer(container){
	this.container = container;
	this.init();
}

AddEngineer.BtnTemp=`
			<button type="button" class="btn btn-info" data-toggle='modal'  style="box-shadow: 2px 2px 1px 1px rgba(0,0,0,.5);;border:0;background:orange;outline:none" data-target='.js-addeng-modal'>新增</button>`;
AddEngineer.ModelTemp = `
	<div class="modal fade js-addeng-modal" role="dialog" aria-labelledby="AddEngineerLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="outline:none"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="AddEngineerLabel">新增求职者</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addeng-name">姓名</label>
			  <input type="text" class="form-control js-name" id="addeng-name" placeholder="请输入姓名">
			</div>
			<div class="form-group">
			  <label for="addeng-sex">性别</label>
			  <input type="text" class="form-control js-sex" id="addeng-sex" placeholder="请输入性别">
			</div>
			<div class="form-group">
			  <label for="addeng-age">年龄</label>
			  <input type="text" class="form-control js-age" id="addeng-age" placeholder="请输入年龄">
			</div>
			<div class="form-group">
			  <label for="addeng-address">期望职位</label>
			  <input type="text" class="form-control js-position" id="addeng-address" placeholder="请输入期望职位">
			</div>
			<div class="form-group">
			  <label for="addeng-salary">期望薪资</label>
			  <select class="form-control js-salary" id="addeng-salary">
				  <option>5k-10k</option>
				  <option>10k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-30k</option>
				  <option>30k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="addeng-address">期望办公地点</label>
			  <input type="text" class="form-control js-address" id="addeng-address" placeholder="请输入办公地点">
			</div>
			<div class="form-group">
			  <label for="addeng-logo">个人头像</label>
			  <input type="file" class="form-control js-logo" id="addeng-logo">
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
$.extend(AddEngineer.prototype,{
	init:function(){
		this.createDom();
		this.bindEvents();
	},
	createDom: function() {
		this.btn = $(AddEngineer.BtnTemp);
		this.modal = $(AddEngineer.ModelTemp);
		this.succNoticeElem = this.modal.find(".js-succ-notice");
		this.container.append(this.btn);
		this.container.append(this.modal);
	},
	bindEvents:function(){
		var submitBtn = this.modal.find(".js-submit");
		submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function() {
		var name = this.modal.find(".js-name").val(),
			sex = this.modal.find(".js-sex").val(),
			age = this.modal.find(".js-age").val(),
			position = this.modal.find(".js-position").val(),
			salary = this.modal.find(".js-salary").val(),
			address = this.modal.find(".js-address").val(),
			logo = this.modal.find(".js-logo")[0].files[0];//获取转换为js对象后的files内容。files是一个数组

		var formData = new FormData();
		formData.append("name",name);
		formData.append("sex",sex);
		formData.append("age",age);
		formData.append("position",position);
		formData.append("salary",salary);
		formData.append("address",address);
		formData.append("logo",logo);

		$.ajax({
			type: "POST",
			cache:false,
			url: "/api/addEngineer",//新定义接口：/api/addEngineer"
			processData:false,
			contentType:false,
			data: formData,
			success: $.proxy(this.handleAddEngineerSucc, this)
		})
	},
	handleAddEngineerSucc: function(res) {
		if (res && res.data && res.data.inserted) {
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDelay, this), 2000);
			$(this).trigger("change");//发布change事件
		}
	},
	handleDelay: function() {
		this.modal.find("input").val("");
		this.succNoticeElem.addClass("hide");
		this.modal.modal("hide");
	}
})