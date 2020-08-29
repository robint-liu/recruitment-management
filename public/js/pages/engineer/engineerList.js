function EngineerList(container) {
  this.container = container;
  this.page = 1;
  this.size = 8;
  this.init();
}

EngineerList.Temp = `
	<table class="table table-hover" style="margin-top:20px;">
		<thead>
			<tr style="text-align:center;">
				<th  style="text-align:center">序号</th>
				<th  style="text-align:center">姓名</th>
				<th  style="text-align:center">性别</th>
				<th  style="text-align:center">年龄</th>
				<th  style="text-align:center">期望职位</th>
				<th  style="text-align:center">期望薪资</th>
				<th  style="text-align:center">期望办公地点</th>
				<th  style="text-align:center">头像</th>
				<th  style="text-align:center">操作</th>
			</tr>
		</thead>
		<tbody class="js-tbody"></tbody>
	</table>`;

$.extend(EngineerList.prototype, {
  init: function () {
    this.createDom();
    this.getListInfo(); //页面加载便开始运行getListInfo()。
    this.bindEvents();
    this.createUpdateEngineer();
    this.createSalaryExp();
  },
  createDom: function () {
    this.element = $(EngineerList.Temp);
    this.container.append(this.element);
  },
  getListInfo: function () {
    $.ajax({
      url: "/api/getEngineerList",
      data: {
        page: this.page,
        size: this.size,
      },
      success: $.proxy(this.handleGetListInfoSucc, this),
    });
  },
  handleGetListInfoSucc: function (res) {
    //console.log(res);
    if (res && res.data && res.data.list) {
      this.createItems(res.data.list);
      if (this.page > res.data.totalPage) {
        this.page = res.data.totalPage;
        this.getListInfo();
      } else {
        $(this).trigger(
          new $.Event("change", {
            total: res.data.totalPage,
          })
        );
      }
    }
  },
  createItems: function (list) {
    var itemContainer = this.element.find(".js-tbody"),
      str = "";
    if (list != "error") {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        this.file = item.filename || "defaulg.png";
        str += `<tr>
							<td style="text-align:center">${i + 1}</td>
							<td style="text-align:center">${item.name}</td>
							<td style="text-align:center">${item.sex}</td>
							<td style="text-align:center">${item.age}</td>
							<td style="text-align:center">${item.position}</td>
							<td style="text-align:center;cursor:pointer;border-radius:5px;" class="js-Nowsalary btn-default">${
                item.salary
              }</td>
							<td style="text-align:center">${item.address}</td>
							<td style="text-align:center"><img class="img_engineer" style="width:30px;height:30px;" src="/engineer_logo/${
                this.file
              }"/></td>
							<td style="text-align:center">
								<span class="js-update btn-default hover" style="box-shadow: 1px 1px 1px 1px rgba(0,0,0,.5);width:45%;background:orange;height: 30px;line-height: 30px;text-align: center;cursor:pointer;display:inline-block;color:#fff" data-id="${
                  item._id
                }">修改</span>
								<span class="js-delete btn-default hover" style="box-shadow: 1px 1px 1px 1px rgba(0,0,0,.5);width:45%;background:red;height: 30px;line-height: 30px;text-align: center;cursor:pointer;display:inline-block;color:#fff" data-id="${
                  item._id
                }" style="margin-left:20px">删除</span>
							</td>
						</tr>`;
      }
      itemContainer.html(str);
    }
  },
  changePage: function (page) {
    this.page = page;
    this.getListInfo();
  },
  createUpdateEngineer: function () {
    this.updateEngineer = new UpdateEngineer(this.container);
    $(this.updateEngineer).on("change", $.proxy(this.getListInfo, this));
  },
  createSalaryExp: function () {
    this.filterposition = new Filterposition(this.container);
  },
  bindEvents: function () {
    this.container.on("click", $.proxy(this.handleTableClick, this));
  },
  handleTableClick: function (e) {
    //console.log(this);
    var target = $(e.target),
      isDeleteClick = target.hasClass("js-delete"),
      isUpdateClick = target.hasClass("js-update");
    isSalaryClick = target.hasClass("js-Nowsalary");
    if (isDeleteClick) {
      //当点击js-delete时，
      this.deleteItem(target.attr("data-id")); //执行删除方法
    }
    if (isUpdateClick) {
      var imgSrc = target.parent().siblings().find(".img_engineer").attr("src");
      //console.log(imgSrc);
      this.updateEngineer.showItem(target.attr("data-id"), imgSrc);
    }
    if (isSalaryClick) {
      this.filterposition.showItem(target.text()); //获取点击对象的文本内容
    }
  },
  deleteItem: function (id) {
    $.ajax({
      url: "/api/removeEngineer",
      data: {
        id: id,
        file: this.file,
      },
      success: $.proxy(this.handleItemDeleteSucc, this),
    });
  },
  handleItemDeleteSucc: function (res) {
    //执行成功后的回掉函数
    console.log(res);
    if (res && res.data && res.data.delete) {
      this.getListInfo(); //调用getListInfo
    }
  },
});
