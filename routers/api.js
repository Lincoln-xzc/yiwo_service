const router = require('koa-router')();
const userController = require('../controller/userController');

const routers = router
    .get('/user/getUserInfo', userController.getLoginUserInfo)
    .post('/user/signIn', userController.signIn)
    .post('/user/signUp', userController.signUp);

module.exports = routers;