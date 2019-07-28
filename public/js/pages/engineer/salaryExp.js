function Filterposition(container){
	this.container = container;
	this.init();
}
Filterposition.ModelTemp =`<div class="modal fade js-salaryExp-modal" role="dialog" aria-labelledby="salaryExp"  style="overflow-y: auto;max-height:600px;">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="outline:none">&times;</span></button>
	        <h4 class="modal-title" id="salaryExp">对应薪资的职位列表</h4>
	      </div>
	      <div class="modal-body">
			<table class="table table-bordered table-hover table-condensed ">
			<thead>
				<tr>
					<th style="text-align:center;">序号</th>
					<th style="text-align:center;">公司</th>
					<th style="text-align:center;">职位</th>
					<th style="text-align:center;">薪资</th>
					<th style="text-align:center;">地址</th>
					<th style="text-align:center;">LOGO</th>
				</tr>
			</thead>
			<tbody class="js-tbody">
			
			</tbody>
			</table>
	      </div>
	    </div>
	  </div>
	</div>`;
$.extend(Filterposition.prototype,{
	init:function(){
		this.createDom();
		//this.bindEvents();
	},
	createDom:function(){
		this.modal=$(Filterposition.ModelTemp);
		this.container.append(this.modal);
	},
	showItem:function(text){//显示模态框
		this.modal.modal("show");
		this.getEngineerInfo(text);
	},
	getEngineerInfo:function(text){
		$.ajax({
			url:"/api/EngGetposition",
			data:{
				salary:text
			},
			success:$.proxy(this.handleEngGetpositionSucc,this)
		})
	},
	handleEngGetpositionSucc:function(res){//将查找到的结果放进input中。
		var list=res.data.list;
		var itemContainer=this.modal.find(".js-tbody"),
			str="";
				for(var i=0;i<list.length;i++){
				var item=list[i];
				this.file = item.filename ? item.filename: "头像.PNG";
				str+=`<tr>
							<td style="text-align:center;">${i + 1}</td>
							<td style="text-align:center;">${item.company}</td>
							<td style="text-align:center;">${item.position}</td>
							<td style="text-align:center;">${item.salary}</td>
							<td style="text-align:center;">${item.address}</td>
							<td style="text-align:center;"><img class="img_engineer" style="width:30px;height:30px;" src="/position_logo/${this.file}"/></td>
						</tr>`;
				}
			itemContainer.html(str);
			console.log(itemContainer)
	},
})