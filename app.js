const Koa = require('koa');
const routers = require('./routers/index');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const config = require('./config');
const koaSwagger = require('koa2-swagger-ui');
const static = require('koa-static');
const path = require('path');

const serssionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST
};

const app = new Koa();

const staticPath = './api-docs';

//配置控制台日志中间件
app.use(koaLogger());

//使用ctx.body解析中间件
app.use(bodyParser());

//加载路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

//配置静态文件
app.use(static(
    path.join(__dirname, staticPath)
));

//配置swagger
app.use(
    koaSwagger({
        routePrefix: '/swagger',
        swaggerOptions:{
            url: '/swagger.yaml', // example path to json
        }
    })
);

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})
