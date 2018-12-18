const router = require('koa-router')();
const userController = require('../controller/userController');

const routers = router
    .get('/user/getUserInfo', userController.getLoginUserInfo)
    .post('/user/signIn', userController.signIn)
    .get('/user/signUp', userController.signUp)
    .get('/user/test', userController.test);

module.exports = routers;