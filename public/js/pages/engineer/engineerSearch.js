function Engineersearch(container){
	this.container = container;
	this.init();
}
Engineersearch.BtnTemp=`
		<div class="row">
		  <div class="col-lg-6" style="float: right;width: 25%">
		    <div class="input-group">
		      <input type="text" class="form-control js-text" placeholder="请输入内容···" style="outline:none;">
		      <span class="input-group-btn">
		        <button class="btn btn-default" type="button" style="outline:none">搜索</button>
		      </span>
		    </div>
		  </div>
		</div>`;
$.extend(Engineersearch.prototype, {
	init:function(){
		this.createDom();
		this.bindEvents();
	},
	createDom:function(){
		this.modal=$(Engineersearch.BtnTemp);
		this.btn=this.modal.find(".btn");
		this.container.append(this.modal);
	},
	bindEvents:function(){
		this.btn.on("click",$.proxy(this.handlebtnClick,this));
	},
	handlebtnClick:function(){
		var text = this.modal.find(".js-text").val();
		this.getEngineersearchInfo(text);
	},
	getEngineersearchInfo:function(text){
		$.ajax({
			url:"/api/getEngineersearch",
			data:{
				text:text
			},
			//success:$.proxy(this.handleEngGetpositionSucc,this)
		})
	},

})