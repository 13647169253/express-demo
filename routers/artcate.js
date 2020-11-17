/*
 * @Author: Yerry 
 * @Date: 2020-11-15 11:23:04 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-15 18:38:44
 */
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../route_handler/artcate')
// 导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')


// 创建获取文章类别路由
router.get('/cates', artcate_handler.getArticleCates)
// 创建新增文章分类路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
// 创建删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
// 创建根据ID获取文章内容路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById)
// 创建更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)





// 将路由对象共享出去
module.exports = router