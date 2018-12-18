const dbUtils = require('../utils/db-utils');

const user = {

    /**
     * 数据库创建用户
     * @param {object} model 用户数据模型
     * @return {object} mysql执行结果
     * 
     */
    async create (model){
        let result = await dbUtils.insertData('user', model);
        return result;
    },

    
    /**
     *
     *
     * @param {object} options 查找条件参数
     * @return {object|null} 查找结果
     */
    async getExistOne(options){
        let _sql = `select * from user
                    where email = "${options.email}" or name="${options.name}" limit 1`;
        let result = await dbUtils.query(_sql);
        if(Array.isArray(result) && result.length > 0){
            result = result[0];
        }else{
            result = null
        }
        return result;
    },

    
    /**
     *
     *
     * @param {object} options 用户名密码
     * @returns {object|null}
     */
    async getUserByUserNameAndPassword (options){
        let _sql = `select * from user
                    where name="${options.name}" and password="${options.password}" limit 1`;

        let result = await dbUtils.query(_sql);
        if(Array.isArray(result) && result.length > 0){
            result = result[0];
        }else{
            result = null;
        }
        return result;
    },

    /**
     * @param {string} userName 用户米
     * @return {object|null} 结果
     */
    async getUserInfoByUserName(userName){
        let result = await dbUtils.select(
            'user',
            ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time']);
        if(Array.isArray(result) && result.length > 0){
            result = result[0];
        }else{
            result = null;
        }
        return result;
    }
};

module.exports = user;