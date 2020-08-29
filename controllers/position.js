const positionModel = require("../models/position.js");

module.exports = {
  addPosition(req, res) {
    const { company, position, salary, address } = req.body;
    const filename = req.file ? req.file.filename : "";
    positionModel.addPosition(
      company,
      position,
      salary,
      address,
      filename,
      (err) => {
        res.json({
          ret: true,
          data: {
            inserted: !err,
          },
        });
      }
    );
  },
  getPositionList(req, res) {
    const { page, size } = req.query; //请求page、size
    let totalPage = 0;
    positionModel.getPosition({}, (result) => {
      if (result && result !== "error") {
        //为假
        totalPage =
          Math.ceil(result.length / size) >= 1
            ? Math.ceil(result.length / size)
            : 1; //始终将totalPage最小值设为1
        positionModel.getPositionByPage(page, size, (result) => {
          //console.log(result);//error
          res.json({
            //将json返回给前端
            ret: true,
            data: {
              list: result,
              totalPage: totalPage,
            },
          });
        });
      }
    });
  },
  removePosition(req, res) {
    positionModel.removeItemById(req.query.file, req.query.id, (err) => {
      res.json({
        ret: true,
        data: {
          delete: !err,
        },
      });
    });
  },
  getPosition(req, res) {
    positionModel.getPositionById(req.query.id, (result) => {
      res.json({
        ret: true,
        data: {
          info: result && result !== "error" ? result : false,
        },
      });
    });
  },
  updatePosition(req, res) {
    //console.log(req.file);//当没有选择文件时，undefined
    const { company, position, salary, address, imgSrc, id } = req.body;
    const params = {
      company,
      position,
      salary,
      address,
    };
    if (req.file && req.file.filename) {
      params.filename = req.file.filename;
    }
    console.log(params.filename);
    positionModel.updatePositionById(id, imgSrc, params, (result) => {
      res.json({
        ret: true,
        data: {
          update: result && result !== "error" ? true : false,
        },
      });
    });
  },
  //======================position==========================================================
  addEngineer(req, res) {
    const { name, sex, age, position, salary, address } = req.body;
    const filename = req.file ? req.file.filename : "";
    positionModel.addEngineer(
      name,
      sex,
      age,
      position,
      salary,
      address,
      filename,
      (err) => {
        res.json({
          ret: true,
          data: {
            inserted: !err,
          },
        });
      }
    );
  },
  getEngineerList(req, res) {
    const { page, size } = req.query; //请求page、size
    let totalPage = 0;
    positionModel.getEngineer({}, (result) => {
      if (result && result !== "error") {
        //为假
        totalPage =
          Math.ceil(result.length / size) >= 1
            ? Math.ceil(result.length / size)
            : 1;
        positionModel.getEngineerByPage(page, size, (result) => {
          //console.log(result);//error
          res.json({
            //将json返回给前端
            ret: true,
            data: {
              list: result,
              totalPage: totalPage,
            },
          });
        });
      }
    });
  },
  removeEngineer(req, res) {
    positionModel.removeEngineerItemById(
      req.query.file,
      req.query.id,
      (err) => {
        res.json({
          ret: true,
          data: {
            delete: !err,
          },
        });
      }
    );
  },
  getEngineer(req, res) {
    positionModel.getEngineerById(req.query.id, (result) => {
      res.json({
        ret: true,
        data: {
          info: result && result !== "error" ? result : false,
        },
      });
    });
  },
  updateEngineer(req, res) {
    //console.log(req.file);//当没有选择文件时，undefined
    const { name, age, sex, position, salary, address, imgSrc, id } = req.body;
    const params = {
      //当对象的键和值相等时，可忽略值。id不需要更新
      name,
      age,
      sex,
      position,
      salary,
      address,
    };
    if (req.file && req.file.filename) {
      params.filename = req.file.filename;
    }
    //console.log(company,position,salary,address);
    positionModel.updateEngineerById(id, imgSrc, params, (result) => {
      //console.log(result);
      res.json({
        ret: true,
        data: {
          update: result && result !== "error" ? true : false,
        },
      });
    });
  },
  EngGetposition(req, res) {
    const salary = req.query.salary;
    //db.userInfo.find({"age": 22});
    positionModel.getPosition({ salary: salary }, (result) => {
      //console.log(result);
      if (result && result !== "error" && result.length !== 0) {
        //为假
        res.json({
          //将json返回给前端
          ret: true,
          data: {
            list: result,
          },
        }); //positionModel
      }
    });
  },
  getEngineersearch(req, res) {
    const text = req.query.text;
    positionModel.getEngineerSear(text, (result) => {
      //console.log(result);未走到这一步
      if (result && result !== "error" && result.length !== 0) {
        //为假
        res.json({
          //将json返回给前端
          ret: true,
          data: {
            list: result,
          },
        });
      }
    });
  },
};
