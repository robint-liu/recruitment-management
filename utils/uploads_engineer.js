const multer=require("multer");//引入第三方模块multer

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/engineer_logo/')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname);
  }
})

var upload = multer({ storage: storage });
module.exports=upload;

