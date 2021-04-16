<template>
  <div class="dafen">
    <van-nav-bar
      :title="title"
      left-text="关闭"
      left-arrow
      @click-left="onClickLeft"
    />
    <h1>打分</h1>


  </div>
</template>



<script>

export default {
  name: 'Dafen',
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
      loading:false,

    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    this.fetchData();
  },
  methods:{


    // 关闭
    onClickLeft(){
      window.history.back(-1);
    },



  }
}
</script>
<style scoped lang="less">


</style>

