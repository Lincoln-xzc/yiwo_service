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
     * s@return {object|null} 查找结果
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
     * @param {string} userName 用户名
     * @return {object|null} 结果
     */
    async getUserInfoByUserName(userName){
        let result = await dbUtils.select(
            'user',
            ['id', 'email', 'name', 'avatar', 'sex', 'mobile', 'create_time']);
        if(Array.isArray(result) && result.length > 0){
            result = result[0];
        }else{
            result = null;
        }
        return result;
    },

    async getUserById(id){
        let result = await dbUtils.select(
            'user',
            ['id', 'email', 'name', 'avatar', 'sex', 'mobile']);
        if(Array.isArray(result) && result.length > 0){
            result = result[0];
        }else{
            result = null;
        }
        return result;
    },

    async getUserByPage(query){
        let currentPage = query.current_page ;
        let prevPage = currentPage - 1;
        let search = {};
        if(query.name){
            search.name = query.name;
        }
        if(query.email){
            search.email = query.email;
        }
        if(query.mobile){
            search.mobile = query.mobile;
        }
        let result = await dbUtils.findDataByPage(
            'user',
            ['id', 'email', 'name', 'mobile', 'sex', 'avatar'],
            search,
            query.sort,
            currentPage * query.per_page,
            prevPage * query.per_page);
        return result;
    },

    /**
     *删除用户
     *
     * @param {*} user_id
     */
    async deleteUser(user_id){
        let result = await dbUtils.deleteDataById(
            'user',
            ['id']
        )
        return result;
    },

    /**
     *更新用户信息
     *
     * @param {*} model
     * @returns
     */
    async updateUser(model){
        let reesult = await dbUtils.updateData('user', model, model.id);
        return result;
    }
};

module.exports = user;