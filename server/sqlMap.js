// sql语句
var sqlMap = {
  // 用户
  leader: {
    query: 'select * from account where sphone = ? and spass = ?',
    query_dic: 'select * from dictionary order by did desc',
    add_dic: 'insert into dictionary(dxyname,dxiname,dzyname,dnjname,dbjname) value(?,?,?,?,?)'
  },
  teacher: {
    query: 'select * from teacher where tphone = ? and tpassword = ?',
    class: 'select d.did , d.dnjname,d.dzyname,d.dbjname from teacher t,dictionary d,teacherclass  tc where t.tid = ? and tc.dictionaryid = d.did and tc.teacherid = t.tid',
    record_query: 'select s.sname,s.ssex,s.sphone, q.qtime, q.qteachermsg from qdrecord q,student s where q.studentno = s.sno  and  s.classno= ?'
  },
  student: {
    query: 'select * from student where sphone = ? and spassword = ?',
    record_qd: 'insert into qdrecord(studentno,qdate,qtime) values (?,?,?)'
  }
}

module.exports = sqlMap

