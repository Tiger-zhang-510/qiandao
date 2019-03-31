<template>
  <div class="student_con">
    <h4>{{'欢迎：' + name}}</h4>
    <el-button type="primary" @click="qd">课堂签到</el-button>
    <el-button type="primary">申请请假</el-button>
    <el-button type="primary">查看考勤</el-button>
    <el-button type="primary">修改信息</el-button>
    <el-button type="primary" @click="logout">用户注销</el-button>
  </div>
</template>

<script>
import { getCookie, delCookie } from '../../common/js/cookie'
// import { GetQueryString } from '../../common/js/getUrlParam'
export default {
  data() {
    return {
      name: '',
      studentno: ''
    }
  },
  mounted() {
    let phoneNum = getCookie('student')
    this.name = phoneNum
    if (phoneNum === '') {
      this.$router.push('/')
    }
  },
  methods: {
    qd() {
      let data = {
        'studentno': '',
        'qdate': '',
        'qtime': ''
      }
      let date = new Date()
      let sno = getCookie('studentno')
      // let qstarttime = GetQueryString('time')
      // console.log(qstarttime)
      data.studentno = sno
      data.qdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      data.qtime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      this.$axios.post('/api/record/recordQd', data).then((response) => {
        if (response.statusText === 'OK') {
          this.$message({
            type: 'success',
            message: '签到成功'
          })
        } else {
          this.$message.error('签到失败')
          this.err()
        }
      })
    },
    logout() {
      delCookie('student')
      delCookie('studentno')
      this.$router.push('/')
    }
  },
  components: {

  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">

.student_con{
  width :960px;
  height :220px;
  margin :0 auto;
  padding :20px 0px;
}
</style>
