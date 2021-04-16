<template>
  <div class="step">

    <van-button icon="arrow-left" @click="onClickLeft" type="primary" class="fanhui" color="transparent" />

  <div class="bg">
    

  </div>
  <div class="chengnuo">
    <h3>评委承诺:</h3>
    <p>保证自己的专业知识能力，依法进行独立评审提出评审意见，不受任何单位或个人的干预，保证做到公平！公正！</p>
  </div>

  <van-cell-group>
    <van-field v-model="invitationCode" required :error-message="errmsg1" label="邀请码" placeholder="请输入邀请码" />
    <van-field v-model="name" required :error-message="errmsg2" label="姓名" placeholder="请输入姓名" />
  </van-cell-group>

  <div style="padding:20px"></div>

  <van-row type="flex" justify="center">
      <van-col span="20">
        <van-button v-if="!loading" round type="info" style="width:100%;" @click="onSubmit">进入活动</van-button>
        <van-button v-if="loading" loading loading-text="加载中..." round type="info" style="width:100%;">进入活动</van-button>
      </van-col>
    </van-row>
  

  </div>
</template>



<script>

export default {
  name: 'Activate',
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
      name:"",
      errmsg1:"",
      errmsg2:""
      

    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    // this.fetch();
  },
  methods:{
    onSubmit(){
      let num = 1;
      if(this.invitationCode === ""){
        this.errmsg1 = "请输入邀请码"
        num = 2
      };

      

      if(this.name === ""){
        this.errmsg2 = "请输入姓名"
        num = 2
      }

      if(this.invitationCode != ""){
        this.errmsg1 = ""
      };

      if(this.name != ""){
        this.errmsg2 = ""
      }

      if(num === 2){
        return;
      }





      this.loading = true;
      let params = {
        "invitationCode":this.invitationCode,
        "name":this.name
      }
      this.$postQs("/yewu/join",params).then(response=>{
        console.log(response);
        if(response.data.success){
          let codeType = response.data.data.codeType;
          let name = response.data.data.name;
          let userid = response.data.data.userid;
          if(codeType === "1"){
            console.log("转到选手");
            this.$router.push({name:'player',params:{actid:this.$route.params.actid,playerid:userid}});
          }else if(codeType === "2"){
            console.log("转到评委");
            this.$router.push({name:'judge',params:{actid:this.$route.params.actid,judgeid:userid}});
          }else if(codeType === "3"){
            console.log("转到场控");
            this.$router.push({name:'controler',params:{actid:this.$route.params.actid,controlerid:userid}});
          }else{
            this.$message.error("未知异常");
          }
          //  this.$router.push({path:'/',query:{dId:this.id}});
        }

        this.loading = false;
      }).catch(err=>{
        console.log(err);
        this.loading = false;
      })
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

</style>

