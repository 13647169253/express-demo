/*
 * @Author: Yerry 
 * @Date: 2020-11-16 14:01:33 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-17 10:23:39
 */


// 导入定义验证规则的模块
const joi = require('@hapi/joi');
/**
 *  allow('')  必填 但是内容可以有 '' 
 *  valid('已发布', '草稿')  必填 值只能是 已发布或草稿
 */
// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const state = joi.string().valid('已发布', '草稿').required();


// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}