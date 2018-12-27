const Koa = require('koa');
const routers = require('./routers/index');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const config = require('./config');
const koaSwagger = require('koa2-swagger-ui');
const static = require('koa-static');
const path = require('path');
const errorHandle = require('./middlewares/errorHandle');
const jwt = require("koa-jwt");
const secret = 'jwt_secret';
const cors = require('koa2-cors');

const serssionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST
};

const app = new Koa();

const staticPath = './api-docs';

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false; // 允许来自所有域名请求
        }
        return 'http://localhost:8090'; // 这样就能只允许 http://localhost:8090 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: false,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

//配置控制台日志中间件
app.use(koaLogger());

//使用ctx.body解析中间件
app.use(bodyParser());

//jwt 设置
app.use(jwt({
    secret
}).unless({
    path: [/\/signUp/, /\/signIn/]
}));

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

//错误全局捕获
app.use(errorHandle);

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})
