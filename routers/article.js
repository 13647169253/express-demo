/*
 * @Author: Yerry 
 * @Date: 2020-11-15 18:52:42 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-17 10:04:53
 */


const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入处理路径的核心模块 
const path = require('path')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')

// 导入文章的路由处理函数模块
const article_handler = require('../route_handler/article')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')
// 创建 multer 的实例对象解析客户端的FormDate数据，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })


// 创建发布文章路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将 文件 类型的数据，解析并挂载到 req.file 属性中
// 将 文本 类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)


// 将路由对象共享出去
module.exports = router