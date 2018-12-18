const validator = require('validator');
const userModel = require('../models/user');
const userCode = require('../codes/userCode');

const user = {
    /**
     *创建用户
     *
     * @param {object} user 用户信息
     * @returns {object} 创建结果
     */
    async create(user){
        let result = await userModel.create(user);
        return result;
    },

    /**
     *查找存在用户信息
     *
     * @param {*} formData 邮箱或者用户名
     * @returns {object}
     */
    async getExistOne(formData){
        let result = await userModel.getExistOne({
            'email': formData.email,
            'name': formData.userName
        });
        return result;
    },

    /**
     *登录 根据用户名密码
     *
     * @param {*} formData 用户名密码
     * @returns {object}
     */
    async signIn(formData){
        let result = await userModel.getUserByUserNameAndPassword({
            'password': formData.password,
            'name': formData.userName
        });
        return result;
    },

    /**
     *根据用户名查找业务操作
     *
     * @param {*} userName 用户名
     * @returns {object|null}
     */
    async getUserInfoByUserName(userName){
        let resultData  = await userModel.getUserInfoByUserName(userName) || {};
        let userInfo = {
            email: result.email,
            userName: result, email,
            detailInfo: result.detail_info,
            createTime: result.create_time
        };
        return userInfo;
    },

    /**
     * 检验用户注册数据
     * @param  {object} userInfo 用户注册数据
     * @return {object}          校验结果
     */
    validatorSignUp( userInfo ) {
        let result = {
        success: false,
        message: '',
        }

        if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
        result.message = userCode.ERROR_USER_NAME;
        return result;
        }
        if ( !validator.isEmail( userInfo.email ) ) {
        result.message = userCode.ERROR_EMAIL;
        return result;
        }
        if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
        result.message = userCode.ERROR_PASSWORD;
        return result;
        }
        if ( userInfo.password !== userInfo.confirmPassword ) {
        result.message = userCode.ERROR_PASSWORD_CONFORM;
        return result
        }

        result.success = true;

        return result;
  }
}