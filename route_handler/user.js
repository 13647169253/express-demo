/*
 * @Author: Yerry 
 * @Date: 2020-11-14 18:21:54 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-14 18:54:12
 */
// 导入数据库模块
const db = require('../db/index')
// 导入bcryptjs加密包
const bcrypt = require('bcryptjs')
// 导图 JWT包 生成Token
const jwt = require('jsonwebtoken')
// 导入加密字段
const config = require('../config')


// 注册的处理函数
module.exports.regUser = (req, res) => {
  const userinfo = req.body;
  if (!userinfo.username || !userinfo.password) return res.cc('用户名或密码不能为空！')
  //定义SQL语句查重
  const sql = `select * from ev_users where username=?`
  db.query(sql, [userinfo.username], function (err, results) {
    if (err) return res.cc(err)
    if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
    // 对用户输入的密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 定义sql语句,将数据添加到数据库中
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
      res.cc('注册成功！', 0)
    })
  })
}

// 登录的处理函数
module.exports.login = (req, res) => {
  const userinfo = req.body;
  const sql = `select * from ev_users where username=?`;
  db.query(sql, userinfo.username, function (err, results) {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！')
    // 抽取用户输入的密码和数据库密码进行比对 一样返回true
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败！')
    // 使用剩余参数筛选出 用户名 并将密码和头像链接内容设置为空
    const user = { ...results[0], password: '', user_pic: '' }
    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
    // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
    res.send({ status: 0, message: '登录成功！', token: 'Bearer ' + tokenStr, })
  })
}