/*
 * @Author: Yerry 
 * @Date: 2020-11-15 08:43:43 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-15 11:36:30
 */
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入处理函数文件
const userinfo_handler = require('../route_handler/userinfo')
// 导入验证数据合法性文件
const expressJoi = require('@escook/express-joi')
//导入认证规则文件
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')


// 创建获取用户信息路由
router.get('/userinfo', userinfo_handler.getUserInfo)
// 创建修改用户基本信息路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 创建密码重置路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updataPassword)
// 创建更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)







// 将路由对象共享出去
module.exports = router