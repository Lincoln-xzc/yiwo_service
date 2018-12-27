const router = require('koa-router')();
const userController = require('../controller/userController');

const routers = router
    .get('/userInfo', userController.getLoginUserInfo)
    .get('/users', userController.getUsers)
    .post('/signIn', userController.signIn)
    .post('/signUp', userController.signUp);

module.exports = routers;