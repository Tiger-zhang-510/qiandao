<template>
  <div>
    <el-row :gutter="0">
      <div class="con">
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
          <div class='logo'>
            <p style="font-size:30px;font-weight:bold;margin-top: 10px;">TIGER</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12">
        <div class="con_right">
          <ul>
            <li style="margin-top: 20px;">
              <span>{{time}}</span>
            </li>
          </ul>
        </div>
        </el-col>
      </div>
    </el-row>
    <div class="jumbotron">
      <div class="jumbotron_con">
        <h1 class="">前端开发</h1>
        <p class="">张虎的二维码签到程序</p>
      </div>
    </div>
  </div>
</template>

<script>
import startTime from '../../common/js/time'
export default {
  data() {
    return {
      time: 0
    }
  },
  created() {
    var me = this
    setInterval(function() {
      me.TimeShow()
    }, 1000)
  },
  methods: {
    TimeShow() {
      this.time = startTime()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
@import '../../common/stylus/index';
.clear{
  clear: both;
}
.con {
  display: flex;
  justify-content:space-around;
  background:#BDBDBD;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  text-align :center
}
.logo{
  font-size : $font-size-large-x;
}

.jumbotron{
	text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 30px rgba(0, 0, 0, 0.075);
	background: linear-gradient(45deg, rgb(2, 0, 49) 0px, rgb(109, 51, 83) 100%) repeat scroll 0% 0% transparent;
	box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.2) inset, 0px -3px 7px rgba(0, 0, 0, 0.2) inset;
	color: white;
}
.jumbotron .jumbotron_con{
  padding:50px 30px;
}
.jumbotron .jumbotron_con h1{
  font-size : 30px;
}
.jumbotron .jumbotron_con p{
  margin-top:30px;
}
</style>
