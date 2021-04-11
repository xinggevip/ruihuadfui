<template>
  <div class="order" style="background-color:white">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <!-- 头部标题 -->
      <van-nav-bar
        title="我的挂号单"
        @click-right="onClickRight"
      >
        <!-- 右侧搜索 -->
        <!-- <van-icon name="search" slot="right" /> -->
      </van-nav-bar>
      <!-- 标签导航 -->
      <van-tabs v-model="activeName" swipeable sticky color="#1989fa">
        
        <van-tab title="进行中">
          
          <Orderdan :ty="-1" />

        </van-tab>
        <van-tab title="已结束">
          
          <Orderdan :ty="5" />



        </van-tab>
        <!-- <van-tab title="所有订单">
          
          <Orderdan :ty="3" />

        </van-tab> -->

      </van-tabs>





    <!-- </van-pull-refresh> -->
    <div style="padding-bottom:30px;"></div>

  </div>
</template>

<script>
import Orderdan from '../components/Orderdan.vue'
export default {
  name: 'Order',
  // props: {
  //   msg: String
  // }
  components: {
    Orderdan
  },
  data(){
    return {
      // 默认选中标签
      activeName: 0,
      // 统计刷新次数
      count:0,
      // 是否正在加载
      isLoading: false,
      allOrderList:[]
      
    }
  },
  created(){
    
  },
  methods:{

    // 取消支付
    toRevPayWidthNoPay:function(id){
      alert("取消支付"+id);
    },
    toPayWidthNoPay:function(id){
      alert("去支付"+id);
    },
    // 去支付
    // 点击未支付项目
    toOrderProFile:function(id){
      alert("点击了未支付列表"+id);
    },
    // 点击搜索
    onClickRight:function(){
      alert("点击了搜索");
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
}
</script>

<style scoped lang="less">

</style>
