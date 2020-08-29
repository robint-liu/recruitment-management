const multer=require("multer");// node.js中间件，用于处理multipart/form-data类型的表单数据。参数用来告诉Multer将上传文件保存在哪里

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/position_logo/')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname);
  }
})

var upload = multer({ storage: storage });
module.exports=upload;

