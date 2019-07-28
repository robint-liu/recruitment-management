const express = require('express');
const router = express.Router();
const userController=require("../controllers/user.js");
const positionController = require("../controllers/position.js");
const upload_position=require("../utils/uploads_position.js");
const upload_engineer=require("../utils/uploads_engineer.js");
//=====================================position===================================
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/isLogin',userController.isLogin);
router.get('/logout',userController.logout);

router.post('/addPosition', upload_position.single('logo'),positionController.addPosition);
router.get('/getPositionList', positionController.getPositionList);
router.get('/removePosition', positionController.removePosition);
router.get('/getPosition', positionController.getPosition);
router.post('/updatePosition', upload_position.single('logo'),positionController.updatePosition);
//=====================================engineer===================================
router.post('/addEngineer', upload_engineer.single('logo'),positionController.addEngineer);
router.get('/getEngineerList', positionController.getEngineerList);
router.get('/removeEngineer', positionController.removeEngineer);
router.get('/getEngineer', positionController.getEngineer);
router.post('/updateEngineer', upload_engineer.single('logo'),positionController.updateEngineer);
router.get('/EngGetposition', positionController.EngGetposition);
router.get('/getEngineersearch', positionController.getEngineersearch);

module.exports = router;
