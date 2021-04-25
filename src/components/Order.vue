<template>
  <div class="order" style="background-color:white">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <!-- 头部标题 -->
      <van-nav-bar
        title="活动管理"
      >
        <!-- 右侧搜索 -->
        <!-- <van-icon name="search" slot="right" /> -->
      </van-nav-bar>
      <!-- 标签导航 -->
      <van-tabs v-model="active" swipeable sticky color="#1989fa">
        
        <van-tab title="草稿">
        </van-tab>

        <van-tab title="进行中">

        </van-tab>
        <van-tab title="已结束">
        </van-tab>

      </van-tabs>

      <mu-list textline="three-line" style="background-color:white">
            <Doctors va="" :ty="type" :showType="type" />

        </mu-list>






    <!-- </van-pull-refresh> -->
    <div style="padding-bottom:30px;"></div>

  </div>
</template>

<script>
import Doctors from '../components/Doctors.vue'
export default {
  name: 'Order',
  // props: {
  //   msg: String
  // }
  components: {
    Doctors
  },
  data(){
    return {
      // 默认选中标签
      active: 0,
      // 统计刷新次数
      count:0,
      // 是否正在加载
      isLoading: false,
      allOrderList:[],
      type:2,
      
    }
  },
  watch:{
    active:function(newValue, oldValue){
      console.log("当前的活动状态索引为",newValue);
      // 获取环节列表
      if(newValue == 0){
        this.type = 2
      }
      // 获取打分项目
      if(newValue == 1){
        this.type = 3
      }
      // 获取验证码列表
      if(newValue == 2){
        this.type = 4
      }
    }
  },
  created(){
    
  },
  methods:{

  }
}
</script>

<style scoped lang="less">

</style>
