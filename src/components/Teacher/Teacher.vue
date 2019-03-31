<template>
  <div class="con">
    <el-row class="teacher_con">
      <h4>{{'欢迎：' + tid}}</h4>
      <el-col :span="4">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="classinfo">
            <i class="el-icon-menu"></i>班级管理
          </el-menu-item>

          <el-menu-item index="2" @click="changeTabs">
            <i class="el-icon-setting"></i>系统设置
          </el-menu-item>
          <el-menu-item index="3" @click="logout">
            <i class="el-icon-setting"></i>用户注销
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" style="float:right">
        <div ref="count" style="display:block">
          <el-tabs type="border-card">
            <el-tab-pane label="扫码签到">

              <el-select v-model="listVaule" placeholder="请选择" @change="select">
                <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <div class="qr_img">
                <svg id="svg" width="300" height="300">
                  <g id="qrcode" ref="qrcode" />
                </svg>
              </div>
              <el-button type="primary" @click="zoom(1.1)">放大</el-button>
              <el-button type="primary" @click="zoom(0.9)">缩小</el-button>
            </el-tab-pane>
            <el-tab-pane label="出勤记录">
              <el-button type="primary" @click="queryRecord">查询</el-button>
              <div style="margin-top:10px">
                <el-table :data="recordArr" height="200" border style="width: 100%">
                  <el-table-column prop="sname" label="姓名" width="80">
                  </el-table-column>
                  <el-table-column prop="ssex" label="性别" width="80">
                  </el-table-column>
                  <el-table-column prop="sphone" label="电话" width="150">
                  </el-table-column>
                  <el-table-column prop="qdate" label="考勤时间" width="230">
                  </el-table-column>
                  <el-table-column prop="q.qtime" label="考勤状态">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="display:none" ref='manage'>
          <el-input placeholder="待访问地址" v-model="qrURL">
            <template slot="prepend">Http://</template>
          </el-input>
          <div class="select">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QRCode from '../../common/js/qrcode'
import { getCookie, delCookie } from '../../common/js/cookie'
export default {
  data() {
    return {
      name: '',
      tid: '',
      classid: '',
      list: [],
      listVaule: '',
      qrURL: `http://tigerzhang.com`,
      scale: 1,
      options: [{
        value: '08:00',
        label: '08:00'
      }, {
        value: '10:00',
        label: '10:00'
      }, {
        value: '14:00',
        label: '14:00'
      }, {
        value: '16:00',
        label: '16:00'
      }, {
        value: '19:00',
        label: '19:00'
      }],
      value: '',
      recordArr: []
    }
  },
  mounted() {
    let phoneNum = getCookie('teacher')
    this.name = phoneNum
    if (phoneNum === '') {
      this.$router.push('/')
    }
  },
  created() {
    this.tid = localStorage.getItem('teacher_info')
  },
  methods: {
    classinfo() {
      let data = {
        'id': this.tid
      }
      this.$axios.post('/api/class/teacherClass', data).then((response) => {
        console.log(response.data)
        if (response.data) {
          var listObj = {}
          for (let i = 0; i < response.data.length; i++) {
            listObj.label = response.data[i].did + ' 编号 ' + response.data[i].dnjname + '级 ' + response.data[i].dzyname + '专业 ' + response.data[i].dbjname + '班'
            listObj.value = response.data[i].did + ' 编号 ' + response.data[i].dnjname + '级 ' + response.data[i].dzyname + '专业 ' + response.data[i].dbjname + '班'
            if (this.list.length === 0) {
              this.list.push(listObj)
            }
          }
        }
      })
      this.$refs.count.style.display = 'block'
      this.$refs.manage.style.display = 'none'
    },
    changeTabs(e) {
      var index = parseInt(e._props.index)
      if (index === 2) {
        this.$refs.count.style.display = 'none'
        this.$refs.manage.style.display = 'block'
      }
    },
    // 创建二维码图片
    createQr(did) {
      const qrcode = new QRCode(document.getElementById('qrcode'), {
        width: 100,
        height: 100,
        useSVG: true
      })
      qrcode.makeCode(this.qrURL + '?did=' + did + '&time=' + this.value)
    },
    // 放大或者缩小
    zoom(num) {
      var svg = document.getElementById('svg')
      this.scale = this.scale * num
      if (this.scale < 0.5 || this.scale > 1.1) {
        return
      } else {
        svg.setAttribute('transform', 'scale(' + this.scale + ')')
      }
    },
    // 考勤记录查询
    queryRecord() {
      let data = {
        'classno': 31
      }
      this.$axios.post('/api/record/recordQuery', data).then((response) => {
        console.log(response)
        if (response.data) {
          this.recordArr = response.data.slice(0)
        } else {
          this.err()
        }
      })
    },
    // select
    select() {
      const did = this.listVaule.slice(0, this.listVaule.indexOf('编号'))
      this.createQr(did)
    },
    logout() {
      delCookie('teacher')
      localStorage.removeItem('teacher_info')
      this.$router.push('/')
    }
  },
  components: {
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
.con{
  margin-bottom :20px
}
.teacher_con{
  width :960px;
  margin :0 auto;
  padding :40px 0px;
}
.select,.qr_img {
  margin-top: 20px;
}
#svg{
  margin-left :20px
  margin-bottom : 20px
}
</style>
