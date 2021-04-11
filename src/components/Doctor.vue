<template>
  <div class="doctor">
    <!-- 头部标题 -->
    <!-- <van-nav-bar
      title="预约挂号"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar> -->
    <van-button icon="arrow-left" @click="onClickLeft" type="primary" class="fanhui" color="transparent" />

  <div class="bg">

  </div>
  
  <div class="father" >
    <div class="ju">
      <span class="ke">{{doctor.dtName}} {{doctor.tName}}</span>
      <div class="left" v-bind:style="{ 'background-image': 'url(' + $global.globalPictureUrl + '/' + doctor.dImg + ')' }">
      <!-- <div class="left" v-bind:style="{ 'background-image': 'url(' + $global.globalPictureUrl + '/' + '5528115430wg43zzo78co8b167.jpg' + ')' }"> -->
        
      </div>
      <div class="right">
        <span class="name">{{doctor.dName}}</span>
        <span class="yu">预约量 <span class="yunum" v-if="data.length > 0">{{yueSun()}}</span></span>
        
      </div>
      
    </div>
  </div>

  
  
  <!-- <div class="like">
    <h4>擅长</h4>
    xxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxooxxoo
  </div> -->

  <!-- <div class="hui">
  </div> -->

  <mu-container class="demo-container" style="background-color:white;padding-top:10px;">
      <mu-row gutter style="padding:0 10px;" v-if="data.length > 0">
        <mu-col span="3" v-for="(item,index) in data" :key="index" class="yuyue">
          <h3 style="color:#333">{{dateFormatter(item.timeStamep)}}</h3>
          <!-- <p>已约：{{item.num}}</p> -->
          <p v-if="item.numbers <= 5" style="color:#1989fa" @click="yuyue(item.timeStamep)">预约</p>
          <p v-else style="color:#8B95A3">约满</p>
            
        </mu-col>
        
      </mu-row>
  </mu-container>

  <div class="hui">
  </div>

  <div class="like">
    <h4>简介</h4>
    <p>{{doctor.dInfo}}</p>
  </div>
  



    <!-- 疾病 -->
  <!-- <mu-container class="demo-container" style="background-color:white;padding-top:10px;">
    <h3 v-if="doctor.dId != null">{{doctor.dId}}</h3>
  </mu-container> -->


    


  </div>
</template>



<script>
import { format } from 'path';

export default {
  name: 'Doctor',
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
      dId:null,
      loading:false,
      title:{
        tFee:10,
      },
      data:[],
      doctor:{
        dId:null,
        dtName:"加载中",
        tName:"加载中",
        dName:"加载中",
        dImg:"",
        dInfo:"加载中",
        dLimitsNumber:1
        
      }
    }
  },
  created(){
    this.doctor.dId = this.$route.params.dId;
    // 获取医生
    this.fetch();
  },
  methods:{
    // 统计预约总数
    yueSun(){
      let sum = 0;
      this.data.forEach(function (item, index, arr){
        sum += item.numbers;
      });
      return sum;
    },
    // 日期格式化
    dateFormatter (time) {
        let datetime = time;
        if(datetime){
            datetime = new Date(datetime);
            // let y = datetime.getFullYear() + '-';
            let mon = datetime.getMonth()+1 + '/';
            let d = datetime.getDate();
            return mon + d;
        }
        return ''
    },
    // 获取医生
    fetch(){
      console.log("/api/doctor/getdoctor?dId="+this.doctor.dId);
      this.$http.get("/api/doctor/getdoctor?dId="+this.doctor.dId).then(response => {
            // 响应成功回调
            console.log(response.data);
            // 医生
            this.doctor = response.data.data.doctor;
            this.doctor.tName = response.data.data.title.tName;
            this.doctor.tFee = response.data.data.title.tFee;
            this.doctor.dtName = response.data.data.department.dtName;
            
            
            // 预约
            this.data = response.data.data.dayNumList;

        }),
        function(response) {
            // 响应错误回调
        };


      
    },
    // 预约
    yuyue(time){
      this.doctor.timeStamep = time;

      // console.log(this.doctor);

      // let objStr = JSON.stringify(this.doctor);

      // let obj = {
      //   date:this.doctor.timeStamep,
      //   dId:this.doctor.dId
      // }

      // let newObj = JSON.stringify(obj);

      // this.$router.push("/submitappointment/" + newObj);


      this.$router.push({path:'/submitappointment',query:{
        date:this.doctor.timeStamep,
        dId:this.doctor.dId
      }});
    },
    // 返回
    onClickLeft(){
      window.history.back(-1);
    }
  }
}
</script>
<style scoped lang="less">
.yuyue{
  text-align:center;
  -moz-box-shadow:0px 1px 7px -4px #333333;
  -webkit-box-shadow:0px 1px 7px -4px #333333;
  box-shadow:0px 1px 7px -4px #333333;
  border-radius: 5px;
  margin-bottom: 10px;
}
.hui{
  height: 10px;
  width: 100%;
  background-color: #f9faf9;
}
.like{
  width: 100%;
  padding: 11px;
  // background-color: yellow;
  word-wrap: break-word;
}
.fanhui{
  position: absolute;
  top: 0px;
  left: 0px;
}
.bg{
  width: 100%;
  height: 0px;
  padding: 13%;
  // background-color: blue;
  background: url("http://file.market.xiaomi.com/thumbnail/jpeg/w965/ThemeMarket/04af45dc89921c851c9bd8590bdcb5070f8419c03") center;
  background-repeat: no-repeat;
}
.father{
  width: 100%;
  padding: 0 10px;
  box-sizing:border-box;
  margin-top: -13%;

  // background-color: aqua;
  .ju{
    width: 100%;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    // border: 1px solid blue;
    box-sizing:border-box;
    padding: 10px;
    position: relative;
    -moz-box-shadow:0px 4px 7px -6px #333333;
    -webkit-box-shadow:0px 4px 7px -6px #333333;
    box-shadow:0px 4px 7px -6px #333333;
    .ke{
        display: inline-block;
        position: absolute;
        bottom: 10px;
        left: 20%;
        padding-left: 15px;
        color: #8B95A3;
        font-size: 16px;
      }
    .left{
      width: 20%;
      height: 0px;
      padding-bottom: 20%;
      float: left;
      // background-color: yellow;
      //background-image: url("http://www.qiangssvip.com/usr/uploads/2019/05/281426999.jpg");
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      
      // float: left;
      
    }
    .right{
      float: left;
      width: 80%;
      height: 100%;
      background-color: yellow;
      box-sizing:border-box;
      padding-left: 10px;
      position: relative;
      
      .name{
        display: inline-block;
        position: absolute;
        top: 0px;
        font-size: 18px;
        font-weight: 900;
      }
      .yu{
        display: inline-block;
        position: absolute;
        top: 0px;
        right: 0px;
        color: #8B95A3;
        .yunum{
          color: orange;
        }
      }
      
    }
    
  }
}
</style>

