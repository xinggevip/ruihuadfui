<template>
  <div class="logreg" style="text-align: center;width:100%;height:100%;background-color:white;">
    <!-- <h1>选择登录注册</h1> -->

    <!-- 居中 -->
    <van-row type="flex" justify="center" >
      <van-col span="6" style="margin-top:20%;">
        <!-- <img alt="logo" src="../assets/logopro.png" style="width:100%;"> -->
        <img alt="logo" src="../assets/logo.png" style="width:100%;">
      </van-col>
    </van-row>
    <span style="color:#ccc; line-height:40px;">瑞华投票助手</span>


    <van-row type="flex" justify="center" style="margin-top:30%;">
      <van-col span="18">
        <van-button to="/log" round type="info" style="width:100%;margin-top:15%;">登录</van-button>
        <van-button to="/reg" plain hairline round type="info" style="width:100%;margin-top:15px;">注册</van-button>
      </van-col>
    </van-row>
    

    
  </div>
</template>
<script>
export default {
  name: 'logreg',
  components: {
    
  },
  props: {
    va: String,
    ty: Number
  },
  data(){
    return {
      loading:false
    }
  },
  watch:{

  },
  created(){
    
  },
  methods:{

  },
  mounted(){
    
  }
}
</script>
<style scoped lang="less">

</style>
