var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 增加专业班级信息
router.post('/dictionaryAdd', (req, res) => {
  var sql = $sql.leader.add_dic
  var params = req.body
  console.log(sql)
  conn.query(sql, [params.dxyname, params.dxiname, params.dzyname, params.dnjname, params.dbjname], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
