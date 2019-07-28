function Pagination(container){
	this.container=container;
	this.bindEvents();
}
$.extend(Pagination.prototype,{
	bindEvents:function(){
		this.container.on("click",$.proxy(this.handleClick,this));//给ul绑定事件
	},
	handleClick:function(e){//当点击时，获取点击对象中的text();
		var target=$(e.target),//将js对象转为jq对象
			page=parseInt(target.text(),10);
		//进行事件发布
		$(this).trigger($.Event("change",{
			page:page
		}))
	},
	setTotal:function(total){
		this.createDom(total);
	},
	createDom:function(total){
		var str="";
		for(var i=1;i<=total;i++){
			str+=`<li><a href="#javascript">${i}</a></li>`
		}
		this.container.html(str);
	}
})
