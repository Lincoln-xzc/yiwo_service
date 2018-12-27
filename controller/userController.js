const userService = require('../services/user');
const userCode = require('../codes/userCode');
const validator = require('../utils/validate');
const statusCode = require('../codes/statusCode');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'jwt_secret';
module.exports = {

    /**
     * 登录操作
     * @param  {obejct} ctx 上下文对象
     */
    async signIn( ctx ) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        };
        try{
            let userResult = await userService.signIn( formData );

            if ( userResult ) {
                if(await bcrypt.compare(formData.password, userResult.password)){
                    result.code = statusCode.SUCCESS_CODE;
                    result.data = {
                        token: jsonwebtoken.sign({
                            data: userResult,
                            exp: Math.floor(Date.now() /1000) + (60*60)
                        }, secret)
                    };
                    result.message = userCode.SUCCESS_LOGIN;
                    result.success= true;
                } else {
                    result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
                    result.code = statusCode.VALIDATE_ERROR_CODE;
                    return;
                }
            } else {
                result.code = statusCode.VALIDATE_ERROR_CODE;
                result.message = userCode.FAIL_USER_NO_EXIST;
            }
            // let session = ctx.session;
            // session.isLogin = true;
            ctx.body = result;
        }catch(error){
            console.log(error);
            ctx.throw(500);
        }
  },

    /**
     * 注册操作
     * @param   {obejct} ctx 上下文对象
     */
    async signUp( ctx ) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: statusCode.VALIDATE_ERROR_CODE
        };
        console.log(formData);
        let validateResult = userService.validateSignUp( formData );

        if ( validateResult.success === false ) {
            result = validateResult;
            ctx.body = result;
            return;
        }

        let existOne  = await userService.getExistOne(formData);
        console.log( existOne );

        if ( existOne  ) {
            if ( existOne.name === formData.name ) {
                result.message = userCode.FAIL_USER_NAME_IS_EXIST;
                result.code = statusCode.VALIDATE_ERROR_CODE;
                ctx.body = result;
                return;
            }
            if ( existOne.email === formData.email ) {
                result.message = userCode.FAIL_EMAIL_IS_EXIST;
                result.code = statusCode.VALIDATE_ERROR_CODE;
                ctx.body = result;
                return;
            }
        }

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, async (err, salt)=>{
            bcrypt.hash(formData.password, salt, async (err, hash)=>{
                let userResult = await userService.create({
                    email: formData.email || '',
                    password: hash,
                    name: formData.name,
                    mobile: formData.mobile || '',
                    sex: 0,
                    create_time: new Date().getTime()
                });
                if ( userResult && userResult.insertId * 1 > 0) {
                    result.success = true;
                    result.message = userCode.SUCCESS_REGISTER;
                    result.code = statusCode.SUCCESS_CODE;
                } else {
                    result.success = false;
                    result.message = userCode.ERROR_SYS;
                    result.code = statusCode.VALIDATE_ERROR_CODE;
                }
                ctx.body = result;
            })
        });
    },

    /**
     * 获取用户信息
     * @param    {obejct} ctx 上下文对象
     */
    async getLoginUserInfo( ctx ) {
        const currentUser = ctx.state.user;

        let result = {
            success: true,
            message: '',
            data: null,
        };
        if ( currentUser ) {
            let userInfo = await userService.getUserById( currentUser.id );
            if ( userInfo ) {
                result.data = userInfo;
                result.success = true;
                result.code = statusCode.SUCCESS_CODE;
            } else {
                result.message = userCode.FAIL_USER_NO_LOGIN;
                result.code = statusCode.NO_ACCESS_CODE;
                result.success = true;
            }
        } else {
        // TODO
            result.code = statusCode.NO_ACCESS_CODE;
            result.message = "未登录";
        }

        ctx.body = result;
    },

    async getUsers(ctx){
        let options = ctx.request.query;
        let resultData = await userService.getUserByPage(options);
        return result = {
            success: false,
            message: '',
            data: {
                users: resultData.users,
                pages: {
                    current_page: options.current_page,
                    per_page: options.per_page,
                    count: resultData.count
                }
            },
            code: statusCode.SUCCESS_CODE
        };
    } 
}
