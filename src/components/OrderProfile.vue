<template>
  <div class="orderprofilee">
    <!-- 头部标题 -->
    <van-nav-bar
      title="预约详情"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <mu-list>
      <mu-list-item avatar :ripple="false" v-if="data != null">
          <!-- 列表项目左侧头像 -->
          <mu-list-item-action>
            <mu-avatar>
              <img :src="$global.globalPictureUrl + '/' + data.dtDoctor.dImg">
            </mu-avatar>
          </mu-list-item-action>
          <!-- 列表项目内容 -->
          <mu-list-item-content>
            <mu-list-item-title>{{data.dtDoctor.dName}}</mu-list-item-title>
            <mu-list-item-sub-title>
              <span class="subTitleColor">{{data.dtDoctor.department.dtName}}</span> <span class="subTitleColor">{{data.dtDoctor.title.tName}}</span>
              <!-- <br>
              <span style="color: rgba(0, 0, 0, .87)">擅长：</span> <span class="subTitleColor">{{item.like}}</span> -->
              
            </mu-list-item-sub-title>
          </mu-list-item-content>
          

      </mu-list-item>
    </mu-list>

    <div class="hui">
    </div>

    <div class="yuestate">
      预约成功
    </div>

    <div class="hui">
    </div>

    <table class="tb" v-if="data != null">
      <tr>
        <td><span class="title">就诊时间 </span></td>
        <td><span class="subtit">{{dateFormatter(data.registration.rDate)}}</span></td>
      </tr>
      <tr>
        <td><span class="title">就诊地址 </span></td>
        <td>{{data.dtDoctor.department.dtRoomNumber}}</td>
      </tr>
      <tr>
        <td><span class="title">就诊人 </span></td>
        <td>{{data.patient.pName}}</td>
      </tr>
      <tr>
        <td><span class="title">预约价格 </span></td>
        <td>{{data.dtDoctor.title.tFee}}</td>
      </tr>
      <tr>
        <td><span class="title">验证码 </span></td>
        <td>{{data.registration.rId}}</td>
      </tr>

    </table>



    <!-- <div class="hui">
    </div> -->

    <!-- <van-button type="primary" size="small" @click="change(0)">待就诊</van-button>
    <van-button type="primary" size="small" @click="change(1)">待支付</van-button>
    <van-button type="primary" size="small" @click="change(2)">带取药</van-button>
    <van-button type="primary" size="small" @click="change(3)">已完成</van-button> -->


    <div class="report">
      <van-steps 
      :active="active"
      >
        <van-step>待就诊</van-step>
        <van-step>待支付</van-step>
        <van-step>待取药</van-step>
        <van-step>已完成</van-step>
      </van-steps>
    </div>

    <div class="report" v-if="active == 0">
      <span v-if="countTime(dayNum) < 0">预约已过期，请重新预约</span>
      <span v-else>距离就诊日期还有{{countTime(dayNum)}}天</span>
      
    </div>

    <div class="report" v-if="active > 0">
      <h4 v-if="active == 1">待支付药品</h4>
      <h4 v-if="active == 2">待取药</h4>
      <h4 v-if="active == 3">已取药</h4>

      <div v-if="active > 0">
        <table v-if="data.pAndmList.length > 0">
          <tr v-for="(item,index) in data.pAndmList" :key="index">
            <td>{{item.medicine.mName}} </td>
            <td style="color:red">{{item.medicine.mPrice}}￥</td>
            <td> * {{item.prescription.psNumber}}</td>
            
          </tr>
          <!-- <tr>
            <td>麻沸散</td>
            <td> * 1</td>
            <td style="color:red">20￥</td>
          </tr> -->
        </table>
      </div>
      

      <p style="text-align:center" v-if="active == 2">
        [取药码]
        <br>
        <span style="font-size:50px;">{{data.registration.rId}}</span> 
      </p>

      <van-row type="flex" justify="end" v-if="active == 1">
        <van-col span="5" style="text-align: right;line-height:28px;color:red;">58￥ </van-col>
        <van-col span="8"><van-button type="info" size="small" style="width:100%">去支付</van-button></van-col>
      </van-row>
      
      <van-divider />
      <h4>就诊报告</h4>
      <p><i>{{data.registration.rInfo}}：</i> {{data.registration.rRemark}}</p>
      

    </div>

    <div style="height:55px;"></div>




  </div>
</template>
<script>
import { type } from 'os';
export default {
  name: 'OrderProfilee',
  components: {
    
  },
  props: {
    va: String,
    ty: Number
  },
  data(){
    return {
      // 剩余天数
      dayNum:'',
      active: 0,
      loading:false,
      rid:null,
      data:null,
    }
  },
  watch:{

  },
  created(){
    
    this.rid = this.$route.params.rid;
    this.fetch();
  },
  methods:{
    // 计算时间差
    countTime(time){
      if(time == ''){
          return '';
      }
      console.log(typeof time);
      time = time.replace(/-/g, '/'); // "2010/08/01";
      // 创建日期对象
      let date = new Date(time).getTime();
      let today = new Date(new Date().toLocaleDateString()).getTime();
      console.log("date = " + date);
      console.log("today = " + today);
      var days = (date - today)/(1*24*60*60*1000);
      console.log(days);
      return  days;
    },
    // 日期格式化
    dateFormatter (time) {
        let datetime = time;
        if(datetime){
            return datetime.slice(0,10);
        }
        return ''
    },
    // 获取数据
    fetch(){
      this.loading = true;
      console.log("fetch Data");
      console.log("/api/order/getorder?rId=" + this.rid);
      this.$http.get("/api/order/getorder?rId=" + this.rid).then(response => {
          // 响应成功回调
          
          this.data = response.data.data;
          console.log(this.data);
          // 状态
          this.active = response.data.data.registration.rStatus - 1;
          // if(response.data.data.registration.rStatus == 1){
          //   this.active = 0;
          // }else if(response.data.data.registration.rStatus == 3){
          //   this.active = 2;
          // }else if(response.data.data.registration.rStatus == 5){
          //   this.active = 4;
          // }
          // 预约日期
          this.dayNum = this.dateFormatter(response.data.data.registration.rDate);
        }),
        function(response) {
          // 响应错误回调
          alert("服务器开小差了");
        };
    },
    // 改变状态
    change(num){
      this.active = num;
    },
    // 返回
    onClickLeft(){
      // window.history.back(-1);
      this.$router.push("/");
    }
  },
  mounted(){
    
  }
}
</script>
<style scoped lang="less">
.report{
  padding: 12px;
  box-sizing: border-box;
  
}
.tb{
  margin-top: 2px;
  width: 100%;
  tr{
    display: block;
    width: 100%;
    // padding: 6px 4px;
    box-sizing: border-box;
    border-bottom: 1px solid #f3f1f1;
    td{
      width: 100px;
      .title{
        display: inline-block;
        padding: 8px 12px;
        box-sizing: border-box;
        font-weight: 600;
      }
      .subtit{
        display: inline-block;
        box-sizing: border-box;
        color:#1989fa;
      }
    }
  }
}
.hui{
  height: 10px;
  width: 100%;
  background-color: #f9faf9;
}
.yuestate{
  width: 100%;
  padding:10px 16px;
  box-sizing: border-box;
  color: orange;
}
</style>