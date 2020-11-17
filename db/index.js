/*
 * @Author: Yerry 
 * @Date: 2020-11-14 18:35:32 
 * @Last Modified by: Yerry
 * @Last Modified time: 2020-11-17 09:30:55
 */
const mysql = require('mysql')

const db = mysql.createPool({
  host: '192.168.85.62',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})

/* const sql = `select * from users`;
db.query(sql, (err, results) => {
  if (err) return console.log(err);
  console.log(results);
})
 */
module.exports = db