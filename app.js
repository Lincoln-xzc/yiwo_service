const Koa = require('koa');
const routers = require('./routers/index');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const config = require('./config');

const serssionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST
};

const app = new Koa();

//配置控制台日志中间件
app.use(koaLogger());

//使用ctx.body解析中间件
app.use(bodyParser());

//加载路由中间件
app.use(routers.routes()).use(routers.allowedMethods());


app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})
