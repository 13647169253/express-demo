/*
 * @Author: Yerry 
 * @Date: 2020-11-15 18:27:28 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-15 18:38:08
 */
// 导入定义验证规则的模块
const joi = require('@hapi/joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()



// 校验规则对象 - 添加分类
module.exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
}
// 删除分类
module.exports.delete_cate_schema = {
  params: {
    id,
  },
}
// ID查询分类
module.exports.get_cate_schema = {
  params: {
    id,
  },
}
// 更新分类
module.exports.update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  },
}