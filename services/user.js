const validator = require('validator');
const userModel = require('../models/user');
const userCode = require('../codes/userCode');
const validate = require('../utils/validate');
const statusCode = require('../codes/statusCode');

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
            'name': formData.name
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
        let result = await userModel.getExistOne({
            'name': formData.name
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

    async getUserById(id){
        return await userModel.getUserById(id) || {};
    },

    /**
     * 校验用户是否登录
     * @param  {obejct} ctx 上下文对象
     */
    validateLogin( ctx ) {
        let result = {
            success: false,
            message: userCode.FAIL_USER_NO_LOGIN,
            data: null,
            code: 'FAIL_USER_NO_LOGIN',
        } 
        let session = ctx.session;
        if( session && session.isLogin === true  ) {
            result.success = true;
            result.message = '';
            result.code = '';
        }
        return result;
    },
    validateSignUp(formData){
        let result = {
            success: false,
            message: userCode.ERROR_USER_NAME,
            data: null,
            code: statusCode.VALIDATE_ERROR_CODE
        };
        if(formData.name){
            if(!validate.validateUserName(formData.name)){
                result.message = userCode.ERROR_USER_NAME;
            }
        }
        // if(formData.password){
        //     if(!validate.validatePassword(formData.password)){
        //         result.message = userCode.ERROR_PASSWORD;
        //     }
        // }
        if(formData.password != formData.rePassword){
            result.message = userCode.ERROR_PASSWORD_CONFORM;
        }
        if(formData.mobile){
            if(!validate.validateMobile(formData.mobile)){
                result.message = userCode.ERROR_MOBILE;
            }
        }
        if(formData.email){
            if(!validate.validateEmail(formData.email)){
                result.email = userCode.ERROR_EMAIL;
            }
        }
        result.success = true;
        result.message = '';
        result.code = statusCode.SUCCESS_CODE;
        return result;
    },

    async getUserByPage(query){
        return await userModel.getUserByPage(query);
    }
}
module.exports = user;