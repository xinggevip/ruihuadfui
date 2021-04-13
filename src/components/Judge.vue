<template>
  <div class="judge">
    <van-nav-bar
      title="第一环节"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="father">
      <!-- <h3>评委</h3> -->
      <!-- <p><b>环节列表：</b></p>
      <ul>
        <li v-for="(item,index) in items" :key="index">{{item}} <span style="color:red;" v-if="index == 2">&nbsp;&nbsp;&nbsp;&nbsp;☜当前环节</span></li>
      </ul> -->
      <p><b>详情:</b></p>
      <p>这是一段介绍</p>
      
    </div>
    
    <van-search v-model="searchKey" placeholder="请输入搜索关键词" /> 
    <div class="father">
      <van-tabs @click="onClick">
      <van-tab title="待打分">内容 1</van-tab>
      <van-tab title="已打分">内容 2</van-tab>
    </van-tabs>
    </div>
    

    

  

  </div>
</template>



<script>

export default {
  name: 'Judge',
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
      loading:false,
      data:[],
      items:["环节一","环节二","环节三","环节四","结束"],
      invitationCode:"",
      name:"",
      searchKey:""

    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    // this.fetch();
  },
  methods:{
    onSubmit(){
      this.loading = true;
      let params = {
        "invitationCode":this.invitationCode,
        "name":this.name
      }
      this.$postQs("/yewu/join",params).then(response=>{
        console.log(response);
        this.loading = false;
      }).catch(err=>{
        console.log(err);
        this.loading = false;
      })
    },
    onClick(name, title) {
      this.$toast(title);
    },

    // 返回
    onClickLeft(){
      window.history.back(-1);
    },



  }
}
</script>
<style scoped lang="less">
.judge{
  // padding: 20px;
  // box-sizing: border-box;
  .father{
    padding: 0px 10px;
  }
}
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

