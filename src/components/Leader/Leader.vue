<template>
  <div>
    <el-row class="leader_con">
      <h4>{{'欢迎：' + name}}</h4>
      <el-col :span="4">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="changeTabs">
            <i class="el-icon-menu"></i>学生统计
          </el-menu-item>
          <el-menu-item index="2" @click="changeTabs">
            <i class="el-icon-menu"></i>教师管理
          </el-menu-item>
          <el-menu-item index="3" @click="changeTabs">
            <i class="el-icon-setting"></i>系统设置
          </el-menu-item>
          <el-menu-item index="4" @click="logout">
            <i class="el-icon-setting"></i>用户注销
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" style="float:right">
        <div ref="count" style="display:block">
          <el-tabs type="border-card">

            <img src="../../common/img/chart.jpg" width="200px" />

          </el-tabs>
        </div>
        <div style="display:none" ref='manage'>
          <el-tabs type="border-card">
            <el-tab-pane label="教师管理">教师管理</el-tab-pane>
            <el-tab-pane label="出勤记录">出勤记录</el-tab-pane>
          </el-tabs>
        </div>
        <div style="display:none" ref='setting'>
          <el-tabs type="border-card">
            <el-tab-pane label="专业班级" class="dic">
              <div>
                <label>学院名称：</label>
                <el-select v-model="xyvalue" placeholder="请选择">
                  <el-option v-for="item in xyoptions" :key="item.dxyname" :label="item.dxyname" :value="item.dxyname">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="edit" @click="editxy"></el-button>
              </div>
              <div>
                <label>院系名称：</label>
                <el-select v-model="xivalue" placeholder="请选择">
                  <el-option v-for="item in xioptions" :key="item.dxiname" :label="item.dxiname" :value="item.dxiname">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="edit" @click="editxi"></el-button>
              </div>
              <div>
                <label>专业名称：</label>
                <el-select v-model="zyvalue" placeholder="请选择">
                  <el-option v-for="item in zyoptions" :key="item.dzyname" :label="item.dzyname" :value="item.dzyname">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="edit" @click="editzy"> </el-button>
              </div>
              <div>
                <label>年级名称：</label>
                <el-select v-model="njvalue" placeholder="请选择">
                  <el-option v-for="item in njoptions" :key="item.dnjname" :label="item.dnjname" :value="item.dnjname">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="edit" @click="editnj"></el-button>
              </div>
              <div>
                <label>班级名称：</label>
                <el-select v-model="bjvalue" placeholder="请选择">
                  <el-option v-for="item in bjoptions" :key="item.dbjname" :label="item.dbjname" :value="item.dbjname">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="edit" @click="editbj"></el-button>
              </div>
              <div>
                <el-button @click="addDictionary">添加信息</el-button>
              </div>

              <div>
                <el-table :data="dicArr" height="200" border style="width: 100%">
                  <el-table-column prop="did" label="编号" width="100">
                  </el-table-column>
                  <el-table-column prop="dxyname" label="学院名称" width="165">
                  </el-table-column>
                  <el-table-column prop="dxiname" label="院系名称" width="100">
                  </el-table-column>
                  <el-table-column prop="dzyname" label="专业名称" width="100">
                  </el-table-column>
                  <el-table-column prop="dnjname" label="年级名称" width="100">
                  </el-table-column>
                  <el-table-column prop="dbjname" label="班级名称">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="上课时段">上课时段</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { getCookie, delCookie } from '../../common/js/cookie'
export default {
  data() {
    return {
      dicArr: [],
      xyoptions: [],
      xioptions: [],
      zyoptions: [],
      njoptions: [],
      bjoptions: [],
      xyvalue: '',
      xivalue: '',
      zyvalue: '',
      njvalue: '',
      bjvalue: '',
      name: ''
    }
  },
  mounted() {
    let phoneNum = getCookie('leader')
    this.name = phoneNum
    if (phoneNum === '') {
      this.$router.push('/')
    }
  },
  methods: {
    changeTabs(e) {
      var index = parseInt(e._props.index)
      if (index === 1) {
        this.$refs.count.style.display = 'block'
        this.$refs.manage.style.display = 'none'
        this.$refs.setting.style.display = 'none'
      } else if (index === 2) {
        this.$refs.count.style.display = 'none'
        this.$refs.manage.style.display = 'block'
        this.$refs.setting.style.display = 'none'
      } else if (index === 3) {
        this.$refs.count.style.display = 'none'
        this.$refs.manage.style.display = 'none'
        this.$refs.setting.style.display = 'block'
        this.$http.post('/api/dictionary/dictionaryQuery').then((response) => {
          if (response.data.length) {
            this.dicArr = response.data.slice(0)
            this.xyoptions = response.data.slice(0)
            var hash = {}
            this.xyoptions = this.xyoptions.reduce(function(item, next) {
              hash[next.dxyname] ? '' : hash[next.dxyname] = true && item.push(next)
              return item
            }, [])
            this.xioptions = response.data.slice(0)
            this.xioptions = this.xioptions.reduce(function(item, next) {
              hash[next.dxiname] ? '' : hash[next.dxiname] = true && item.push(next)
              return item
            }, [])
            this.zyoptions = response.data.slice(0)
            this.zyoptions = this.zyoptions.reduce(function(item, next) {
              hash[next.dzyname] ? '' : hash[next.dzyname] = true && item.push(next)
              return item
            }, [])
            this.njoptions = response.data.slice(0)
            this.njoptions = this.njoptions.reduce(function(item, next) {
              hash[next.dnjname] ? '' : hash[next.dnjname] = true && item.push(next)
              return item
            }, [])
            this.bjoptions = response.data.slice(0)
            this.bjoptions = this.bjoptions.reduce(function(item, next) {
              hash[next.dbjname] ? '' : hash[next.dbjname] = true && item.push(next)
              return item
            }, [])
          } else {
            this.$message('网络错误或者其他...')
          }
        })
      }
    },
    addDictionary() {
      let data = {
        'dxyname': this.xyvalue,
        'dxiname': this.xivalue,
        'dzyname': this.zyvalue,
        'dnjname': this.njvalue,
        'dbjname': this.bjvalue
      }
      console.log(data)
      this.$http.post('/api/dictionary/dictionaryAdd', data).then((response) => {
        if (response.statusText === 'OK') {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          this.$message.error('添加失败')
          this.err()
        }
      })
    },
    editxy() {
      this.$prompt('请输入', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你输入的是: ' + value
        })
        this.xyvalue = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    editxi() {
      this.$prompt('请输入', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你输入的是: ' + value
        })
        this.xivalue = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    editzy() {
      this.$prompt('请输入', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你输入的是: ' + value
        })
        this.zyvalue = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    editnj() {
      this.$prompt('请输入', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你输入的是: ' + value
        })
        this.njvalue = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    editbj() {
      this.$prompt('请输入', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你输入的是: ' + value
        })
        this.bjvalue = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 注销
    logout() {
      delCookie('leader')
      this.$router.push('/')
    }

  },
  components: {
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">

.leader_con{
  width :960px;
  height :400px;
  margin :0 auto;
  padding :40px 0px;
}
.dic>div{
margin-top:20px;
}
</style>
