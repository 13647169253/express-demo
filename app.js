/*
 * @Author: Yerry 
 * @Date: 2020-11-14 18:14:42 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-17 11:07:00
 */
// 引入 express
const express = require('express');

// 创建服务器对象
const app = express();
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
// 配置一个解析application/x-www-form-urlencoded的中间件
app.use(express.urlencoded({ extended: false }))
// 导入并注册路由模块
const userRouter = require('./routers/user')
const userinfoRouter = require('./routers/userinfo')
const artCateRouter = require('./routers/artcate')
const articleRouter = require('./routers/article')
// 使用中间件定义res.cc响应处理函数
app.use(function (req, res, next) {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

//注册路由之前,配置解析 Token 的中间件：
const config = require('./config')
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))


// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
// 创建路由 
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/article', artCateRouter)
app.use('/my/article', articleRouter)
app.use('/api/uploads', express.static('/uploads'))

// 定义错误中间件捕获错误
const joi = require('@hapi/joi')
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 登录身份验证错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})






// 监听端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));