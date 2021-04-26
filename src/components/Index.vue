<template>
  <div class="hello ">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- 搜索框 -->
    <!-- <van-search placeholder="请输入搜索关键词" @search="onSearch" v-model="value" /> -->
    <!-- 轮播图 -->
    <mu-container>
      <mu-row class="swiper">
        <van-swipe :autoplay="4000" :loop="true" indicator-color="#fff">
          <van-swipe-item v-for="(image, index) in SwiperImg" :key="index">
            
            <img :src="image">
            
          </van-swipe-item>
        </van-swipe>
      </mu-row>
    </mu-container>
    <!-- 滚动消息 -->
    <div class="gundong">
      <van-notice-bar
      :text="tianqi"
      left-icon="volume-o"
    />
    </div>
    
    <!-- 页面导航 -->
    
    <!-- <van-row class="dhfather">
      <van-col span="12" style="text-align:center" @click="toDisease">
        <van-icon name="add-o" style="font-size:18px;" color="#504DE3" /> <span style="font-size:19px;"> <b style="color:#333">找疾病</b> </span> <br>
        <span class="subTitleColor">找准对症，便捷就医</span> 
      </van-col>
      <van-col span="12" style="text-align:center" @click="toAllDoctor">
        <van-icon name="manager-o" style="font-size:18px;" color="#504DE3" /> <span style="font-size:19px;"> <b style="color:#333">去挂号</b> </span> <br>
        <span class="subTitleColor">快速找到对症专家</span> 
      </van-col>
    </van-row> -->
    <!-- <mu-divider></mu-divider> -->
    <!-- 名义列表 -->

        <mu-list textline="three-line" style="background-color:white">

            <mu-sub-header><h3 style="color:#333">热门活动</h3></mu-sub-header>


            <Doctors :va="key" :ty="value1" :showType="showType" :change="change" />

        </mu-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Doctors from '../components/Doctors.vue'

export default {
  name: 'Index',
  components: {
    Doctors
  },
  props: {
    msg: String
  },
  data(){
    return {
      tianqi:'喜欢做的事不要总说以后， 来日并不方长； 今天的拥抱不要留给明天， 后会可能无期。',
      key:'',
      value1:1,
      showType:1,// 1首页2草稿、三进行中、四已结束
      // 列表json数组
      
      // 搜索框的值
      value:'',
      // 轮播图地址
      // SwiperImg: [
      //   "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg",
      //   "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg",
      //   "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg",
      //   "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34729/14/3948/120618/5cbeee07Efbe17ec5/d57ddd4fbbbc09e0.jpg!cr_1125x549_0_72!q70.jpg.dpg",
      //   "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34423/17/5378/97852/5cbecd7bE73730c2f/76e5359d8fb3a1e1.jpg!cr_1125x549_0_72!q70.jpg.dpg"
      // ],
      SwiperImg: [
        // "https://kano.guahao.cn/Ucq255224161?resize=800x350",
        // "https://kano.guahao.cn/X4c264868021?resize=800x350",
        "http://218.28.47.6:8090/seeyon/fileUpload.do?method=showRTE&type=image&fileId=-778190809597982369",
        // "https://www.qiangssvip.com/usr/uploads/2020/04/2146004560.png"
        
      ],
      change:0,
      isLoading:false

    }
  },
  created(){
    
  },
  methods:{
    
    onRefresh(){
      this.change = this.change + 1
      this.isLoading = true
      setTimeout(()=>{
        this.isLoading = false
      },500)
    },

    // 找疾病
    toDisease(){
      this.$router.push("/disease");
    },
    // 找医生
    toAllDoctor(){
      this.$router.push("/choice");
      // this.$router.push("/alldoctor/-1");
    },
    // 去预约
    toYuYue:function(id){
      alert("去预约"+id);
    },
    // 去搜索
    onSearch:function(){
      // alert("去搜索页");
      this.$router.push({path:'/alldoctor/-1',query:{value:this.value}});
    },

  }
}
</script>
<style scoped lang="less">
.gundong{
  // padding:0px 10px;
  // box-sizing: border-box;
}
.swiper {
    margin-top: 10px;
    width: 100%;
    height: 3.4rem;
    // background-color: red;
    .van-swipe{
      width: 100%;height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: #fff;
    }
  }

  .dhfather{
    // margin-top: 10px;
    // background: pink;
    padding: 20px 0;
    background-color: white;
  }
  // 次要信息文字颜色
  .subTitleColor{
    color: #8B95A3;
  }
</style>
