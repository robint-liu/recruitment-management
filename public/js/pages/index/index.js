function Page(){

}
$.extend(Page.prototype,{//将对象内的内容全部拷贝到Page.prototype
	init:function(){
		this.createHeader();
	},
	createHeader:function(){
		var headerContainer=$(".js-header");
		this.header=new Header(headerContainer,0);
	}
})