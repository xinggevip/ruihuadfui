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
  <div class="chengnuo">
    <h3>评委承诺:</h3>
    <p>保证自己的专业知识能力，依法进行独立评审提出评审意见，不受任何单位或个人的干预，保证做到公平！公正！</p>
  </div>

  <van-cell-group>
    <van-field v-model="invitationCode" label="邀请码" placeholder="请输入邀请码" />
    <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
  </van-cell-group>

  <div style="padding:20px"></div>

  <van-row type="flex" justify="center">
      <van-col span="20">
        <van-button v-if="!loading" round type="info" style="width:100%;" @click="onSubmit">进入活动</van-button>
        <van-button v-if="loading" loading loading-text="加载中..." round type="info" style="width:100%;">进入活动</van-button>
      </van-col>
    </van-row>
  
  
  
  



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
      loading:false,
      data:[],
      invitationCode:"",
      name:""

    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    // this.fetch();
  },
  methods:{
    onSubmit(){

    },
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
      


      
    },
    // 预约
    yuyue(time){
      this.doctor.timeStamep = time;

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
.chengnuo{
  position: absolute;
  top: 0px;
  left: 0px;
  padding:40px 20px;
  color: #ffffff;
}
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
  z-index: 999;
}
.bg{
  width: 100%;
  height: 0px;
  padding: 30%;
  // background-color: blue;
  background: url("http://file.market.xiaomi.com/thumbnail/jpeg/w965/ThemeMarket/04af45dc89921c851c9bd8590bdcb5070f8419c03") center;
  background-repeat: no-repeat;
  // position: absolute;
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

