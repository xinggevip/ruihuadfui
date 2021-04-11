<template>
  <div class="choice">
    <!-- 头部标题 -->
    <van-nav-bar
      title="选择挂号"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <van-row type="flex" justify="center" style="margin-top:10%;">
      <van-col span="12">
        
        <div class="circle men" @click="tomen">
          门诊号
        </div>
        <br>
        <br>

        <div class="circle zhuan" @click="toAllDoctor">
          专家号
        </div>
      </van-col>
    </van-row>

  </div>
</template>
<script>
export default {
  name: 'choice',
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
    // 返回
    onClickLeft(){
      window.history.back(-1);
    },
    // 找医生
    tomen(){
      this.$router.push("/doctor/7");
      // this.$router.push("/alldoctor/-1");
    },
    // 找医生
    toAllDoctor(){
      this.$router.push("/alldoctor/-1");
    },
  },
  mounted(){
    
  }
}
</script>
<style scoped lang="less">
.circle{
  width: 100%;
  height: 0;
  color: white;
  // background-color: aquamarine;
  // background-color: #1989fa;
  
  padding-top: 50%;
  padding-bottom: 50%;
  text-align: center;
  border-radius: 50%;
  // padding-bottom: 50%;
}
.men{
  background: #2193b0;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #6dd5ed, #2193b0);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #6dd5ed, #2193b0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.zhuan{
  background: #36D1DC;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>