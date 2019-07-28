function Page(){

}
$.extend(Page.prototype,{//将对象内的内容全部拷贝到Page.prototype
	init:function(){
		this.createHeader();
		this.createAddEngineer();
		this.createEngineerList();
		this.createPagination();
		this.createEngineersearch();
	},
	createHeader:function(){
		var headerContainer=$(".js-header");
		this.header=new Header(headerContainer,2);
	},
	createAddEngineer: function() {
		var EngineerContainer = $(".js-container");
		this.addengineer = new AddEngineer(EngineerContainer);
		$(this.addengineer).on("change",$.proxy(this.handleAddPosition,this));
	},
	handleAddPosition:function(){
		//当请求ajax成功时，发布change事件，再次执行getListInfo()方法
		this.engineerList.getListInfo();
	},
	createEngineerList: function() {
		var engineerContainer = $(".js-container");
		this.engineerList = new EngineerList(engineerContainer);
		$(this.engineerList).on("change",$.proxy(this.handleListChange,this));
	},
	createPagination:function(){
		var paginationContainer=$(".js-pagination");
		this.pagination=new Pagination(paginationContainer);
		$(this.pagination).on("change",$.proxy(this.handlePaginationChange,this))
	},
	handlePaginationChange:function(e){
		this.engineerList.changePage(e.page);
	},
	handleListChange:function(e){
		this.pagination.setTotal(e.total);
	},
	createEngineersearch:function(){
		var searchContainer=$(".js-search");
		this.engineersearch=new Engineersearch(searchContainer);
	}
})