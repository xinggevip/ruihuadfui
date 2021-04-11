<template>
  <div class="submitappointment">
    <!-- 头部标题 -->
    <van-nav-bar
      title="提交预约"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <!-- 预约单 -->
    <div class="father">
      <div class="yuyuedan">
        <!-- <p style="font-size:1px">
          <br>
        </p> -->
        <h3>挂号预约单</h3>
        <div class="hr">
        </div>
        <div class="hr2">
        </div>
        <div class="info" v-if="date != null && doctor != null">
          <table >
            <tr>
                <td><span class="title">就诊科室</span></td>
                <td>{{doctor.dtName}}</td>
            </tr>
            <tr>
                <td><span class="title">就诊医生</span></td>
                <td>{{doctor.dName}}[{{doctor.tName}}]</td>
            </tr>
            <tr>
                <td><span class="title">就诊时间</span></td>
                <td>{{dateFormatter(date)}}</td>
            </tr>
            <tr>
                <td><span class="title">诊查费</span></td>
                <td><span style="color:orange">{{doctor.tFee}}元( <span v-if="doctor.dLimitsNumber == 1">门诊号</span> <span v-else>专家号</span> )</span></td>
            </tr>
        </table>


        </div>
      </div>
    </div>
    
    <van-row type="flex" justify="center" class="sub">
      <van-col span="20">
        <van-button v-if="!loading" @click="onSubmit" hairline round type="info" style="width:100%;margin-top:15px;">提交预约</van-button>
        <van-button v-if="loading" @click="onSubmit"  hairline loading loading-text="提交中..." round type="info" style="width:100%;margin-top:15px;">提交预约</van-button>
      </van-col>
    </van-row>

  </div>
</template>
<script>
export default {
  name: 'SubmitAppointment',
  components: {
    
  },
  props: {
    va: String,
    ty: Number
  },
  data(){
    return {
      loading:false,
      date:null,
      doctor:null,
    }
  },
  watch:{

  },
  created(){
    if(this.$route.query.date){
        this.date = Number(this.$route.query.date);
        console.log(this.$route.query.date);
    }
    if(this.$route.query.dId){
        console.log(this.$route.query.dId);
        this.fetch(this.$route.query.dId);
    }
  },
  methods:{
    // 日期格式化
    dateFormatter (time) {
        let datetime = time;
        if(datetime){
            datetime = new Date(datetime);
            let y = datetime.getFullYear() + '年';
            let mon = datetime.getMonth()+1 + '月';
            let d = datetime.getDate() + '日';
            return y + mon + d;
        }
        return ''
    },
    // 获取医生
    fetch(dId){
      console.log("/api/doctor/getdoctor?dId="+dId);
      this.$http.get("/api/doctor/getdoctor?dId="+dId).then(response => {
            // 响应成功回调
            console.log(response.data);
            // 医生
            this.doctor = response.data.data.doctor;
            this.doctor.tName = response.data.data.title.tName;
            this.doctor.tFee = response.data.data.title.tFee;
            this.doctor.dtName = response.data.data.department.dtName;
            
            
            // 预约
            // this.data = response.data.data.dayNumList;

        }),
        function(response) {
            // 响应错误回调
            alert("服务器开小差了");
        };
    },
    // 返回
    onClickLeft(){
      window.history.back(-1);
    },
    // 提交预约
    sub(){
      console.log("/api/patient/appointment?dateTime=" + this.date + "&pId=" + (JSON.parse(this.$store.state.user)).pId + "&dId=" + this.doctor.dId);
      this.$http.post("/api/patient/appointment?dateTime=" + this.date + "&pId=" + (JSON.parse(this.$store.state.user)).pId + "&dId=" + this.doctor.dId).then(response => {
            // 响应成功回调
            console.log(response.data);
            this.$message.success(response.data.msg);
            this.loading = false;
            this.$router.push("/orderprofile/" + response.data.data.registration.rId);
            

            
        }),
        function(response) {
            // 响应错误回调
        };
    },
    onSubmit(){
      this.loading = true;
      // setTimeout(() => {
      //   this.loading = false;
      //   this.$router.push("/orderprofile");
      // }, 2000)
      this.sub();
    }
  },
  mounted(){
    
  }
}
</script>
<style scoped lang="less">
.sub{
  position: absolute;
  bottom: 80px;
  width: 100%;
}
.father{
  width: 100%;
  padding: 0 10px;
  box-sizing:border-box;
  .yuyuedan{
    border-radius: 10px;
    text-align: center;
    width: 100%;
    -moz-box-shadow:0px 3px 9px -5px #333333;
    -webkit-box-shadow:0px 3px 9px -5px #333333;
    box-shadow:0px 3px 9px -5px #333333;
    padding: 10px;
    .hr{
      width: 100%;
      padding-bottom: 4px;
      border-top: 2px double #c5c5c5;
    }
    .hr2{
      width: 100%;
      padding-bottom: 10px;
      border-top: 1px double #e3e3e3;
    }
    .info{
      text-align:left;
      .title{
        color: #8B95A3;
      }
    }
  }
}

</style>