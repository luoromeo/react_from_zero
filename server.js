const webpack = require('webpack');
const config = require('./webpack.config.js');
const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    // configObject = require("./config"),
    jwt = require('jsonwebtoken'),
    app = express(),
    request = require('request'),
    path = require('path'),
    log4js = require("log4js"),
    // utils = require("./utils"),
    ejs = require('ejs'),
    EventEmitter = require('events').EventEmitter;
var jsonParser = bodyParser.json();
var http = require('http');
var URL = require('url');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// log4js.configure({
//     appenders: [
//         {type: 'console'},
//         {
//             type: 'dateFile',
//             filename: 'logs/normal.log',
//             layout: {type: 'basic'},
//             pattern: '.yyyy-MM-dd',
//             alwaysIncludePattern: true,
//             category: 'normal'
//         }
//     ],
//     levels: {
//         normal: 'INFO'
//     }
// });

log4js.configure({
    appenders: {
        out: { type: 'console' },
        result: { type: 'dateFile', filename: 'logs/normal.log',layout: {type: 'basic'},"pattern":".yyyy-MM-dd.log", alwaysIncludePattern:true},
        default: { type: 'dateFile', filename: 'logs/default.log', layout: {type: 'basic'},"pattern":"yyyy-MM-dd.log",alwaysIncludePattern:true},
    },
    categories: {
        default: {
            appenders: ['out', 'default'], level: 'info'
        },
        result: {
            appenders: ['result'], level: 'info'
        },
    }
});

const normalLog = log4js.getLogger("normal");

// app.use(log4js.connectLogger(normalLog, {level: 'trace', format: ':method :url'}));

let env = process.env.NODE_ENV;

const isProduction = env === 'production';

const isDeveloping = !isProduction;

app.use(cookieParser());

//通过localhost可以访问项目文件夹下的所有文件，等于动态为每个静态文件创建了路由
// const compiler = webpack(config);

app.use(express.static(path.join(__dirname, '/dist')))
// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// app.use(require('webpack-hot-middleware')(compiler));

app.get(['/*'], function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// app.post('/login', jsonParser, function (req, res) {
//     let username = req.body.username;
//     let pwd = req.body.password;
//     let url = req.headers.referer;
//     // console.log("------"+configObject.agUrl)
//     // 使用oauth2的方式调用ag接口
//     request.post("http://120.77.124.71:8003/login?username=" + username + "&password=" + pwd + "&url=" + url,
//     // request.post("http://120.76.222.26:8003/login?username=" + username + "&password=" + pwd + "&url=" + url,
//         {
//             timeout: 5000,
//         }, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 normalLog.info("case登录【" + username + "," + pwd + ",AG返回:" + body);
//                 // todo try catch
//                 let userResult = JSON.parse(body);
//                 if (userResult.code != 0) {
//                     res.json({code: "-1", message: userResult.message});
//                     // res.clearCookie('myPosToken');
//                     return;
//                 }
//                 userResult.content.url = 'home';
//
//                 let user = userResult.content;
//
//                 let entry = 'login';
//
//                 var token = createToken(userResult.content);
//
//
//                 buildCookie(res,token,user,entry);
//
//                 res.json({code: "0", message: userResult.message,content:userResult.content});
//
//                 normalLog.info(userResult)
//
//                 return;
//             } else {
//                 event.emit('agError', res,"","case登录【" + username + "," + pwd + "】", body, response, error);
//                 return;
//             }
//         });
//
// });


let event = new EventEmitter();

// function createToken(content){
//     return jwt.sign({
//         "accountUuid": content.accountUuid,
//         "account": content.account,
//         "mobile": content.mobile,
//         "email": content.email,
//         "realName": content.realName,
//         "gender": content.gender,
//         "birthday": content.birthday,
//         "idCardNum": content.idCardNum,
//         "marriageStatus": content.marriageStatus,
//         "originPlace": content.originPlace,
//         "idType": content.idType,
//         "telephone": content.telephone,
//         "type": content.type,
//         "address": content.address,
//         "memo": content.memo,
//         "user_token": content.user_token,
//         "residentUuid": content.residentUuid,
//         "cropId": content.cropId,
//         "checkInTime": content.checkInTime
//     },
//     'shhhhh',
//     {
//         expiresIn: '1days',
//         issuer: 'server',
//         audience: 'client',
//         subject: 'case'
//     }
// );
// }

// function buildCookie(res,token,user,entry){
//     res.cookie('myPosToken', token, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
//     res.cookie('mypwd', user.user_token, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
//     res.cookie('myComId', user.communityUuid, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
//     res.cookie('myorg', user.communityName, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
//     res.cookie('myPosInfo', user, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
//     res.cookie('entry', entry, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
// }
//
// // 与ag交互发生错误
// event.on('agError', function (res, errHtmlMessage, errLogMessage, body, response, err) {
//     normalLog.error(errLogMessage + ",AG返回:" + body + ",response:" + response + ",error:" + err);
//     res.json({code: "-1", message: "服务器发生异常，请稍后再试"});
//     return;
// });
//
// app.post('/logout', function (req, res) {
//     res.clearCookie('myPosToken');
//     res.json({code: "0", message: "注销成功"});
// });

//监听全局异常,防止程序崩溃
// app.use(function (err, req, res, next) {
//     normalLog.error("发生全局异常:" + err);
//     res.json({code: "-1", message: "服务器发生异常,请稍后再试"});
//     return;
// });


app.listen(5000, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:5000');
});