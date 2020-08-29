function PositionList(container) {
	this.container = container;
	this.page = 1;
	this.size = 8;
	this.init();
}

PositionList.Temp = `
	<table class="table table-hover" style="margin-top:20px;">
		<thead>
			<tr>
				<th style="text-align:center">序号</th>
				<th style="text-align:center">公司</th>
				<th style="text-align:center">职位</th>
				<th style="text-align:center">薪资</th>
				<th style="text-align:center">地址</th>
				<th style="text-align:center">LOGO</th>
				<th style="text-align:center">操作</th>
			</tr>
		</thead>
		<tbody class="js-tbody"></tbody>
	</table>`;
	
$.extend(PositionList.prototype, {
	init: function() {
		this.createDom();
		this.getListInfo();//页面加载便开始运行getListInfo()。
		this.bindEvents();
		this.createUpdatePosition();
	},
	createUpdatePosition:function(){
		this.updatePosition=new UpdatePosition(this.container);
		$(this.updatePosition).on("change",$.proxy(this.getListInfo,this));
	},
	createDom: function() {
		this.element = $(PositionList.Temp);
		this.container.append(this.element);
	},
	getListInfo: function() {
		$.ajax({
			url: "/api/getPositionList",
			data: {
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleGetListInfoSucc, this)
		})
	},
	handleGetListInfoSucc: function(res) {
		if (res && res.data && res.data.list) {
			this.createItems(res.data.list);
			if (this.page>res.data.totalPage) {
				this.page=res.data.totalPage;
				this.getListInfo();
			}else{
				$(this).trigger(new $.Event("change",{
					total:res.data.totalPage
				}))
			}
		}
	},
	createItems:function(list){
		var itemContainer=this.element.find(".js-tbody"),
			str="";
		if (list!="error") {
				for(var i=0;i<list.length;i++){
				var item=list[i];
				this.file = item.filename || "defaulg.png";
				str+=`<tr>
							<td  style="text-align:center">${i + 1}</td>
							<td  style="text-align:center">${item.company}</td>
							<td  style="text-align:center">${item.position}</td>
							<td  style="text-align:center">${item.salary}</td>
							<td  style="text-align:center">${item.address}</td>
							<td  style="text-align:center"><img class="img_engineer" style="width:30px;height:30px;" src="/position_logo/${this.file}"/></td>
							<td  style="text-align:center">
								<span style="width:30%;background:red;height: 30px;line-height: 30px;text-align: center;cursor:pointer;display:inline-block;color:#fff;box-shadow: 1px 1px 1px 1px rgba(0,0,0,.5);" class="js-update" data-id="${item._id}">修改</span>
								<span style="width:30%;background:orange;height: 30px;line-height: 30px;text-align: center;cursor:pointer;display:inline-block;color:#fff;box-shadow: 1px 1px 1px 1px rgba(0,0,0,.5);" class="js-delete" data-id="${item._id}" style="margin-left:20px">删除</span>
							</td>
						</tr>`;
				}
			itemContainer.html(str);
		}
	},
	changePage:function(page){
		this.page=page;
		this.getListInfo();
	},
	bindEvents:function(){
		this.container.on("click",$.proxy(this.handleTableClick,this));
	},
	handleTableClick:function(e){
		var target=$(e.target),
			isDeleteClick=target.hasClass("js-delete"),
			isUpdateClick=target.hasClass("js-update");
		if (isDeleteClick) {//当点击js-delete时，
			this.deleteItem(target.attr("data-id"));//执行删除操作
		}
		if(isUpdateClick){
			var imgSrc=target.parent().siblings().find(".img_engineer").attr("src");
			this.updatePosition.showItem(target.attr("data-id"),imgSrc);
		}
	},
	deleteItem:function(id){
		$.ajax({
			url:"/api/removePosition",
			data:{
				id:id,
				file:this.file
			},
			success:$.proxy(this.handleItemDeleteSucc,this)
		})
	},
	handleItemDeleteSucc:function(res){//执行成功后的回掉函数
		if (res && res.data && res.data.delete) {
			//调用getListInfo
			this.getListInfo();
		}
	}
})