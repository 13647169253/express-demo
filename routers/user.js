/*
 * @Author: Yerry 
 * @Date: 2020-11-14 18:35:16 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-14 18:41:17
 */

const express = require('express')
// 创建路由对象
const router = express.Router()
// 引入路由处理方法模块
const userHandler = require('../route_handler/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 创建用户注册路由
router.post('/regUser', expressJoi(reg_login_schema), userHandler.regUser)
// 创建用户登录路由
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

// 将路由对象共享出去
module.exports = router