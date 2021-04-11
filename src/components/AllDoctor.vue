<template>
  <div class="alldoctor">
    <!-- 头部标题 -->
      <!-- <van-nav-bar
        title="医生"
        @click-right="onClickRight"
      >
        右侧搜索
        <van-icon name="search" slot="right" />
      </van-nav-bar> -->
      <!-- 搜索框 -->
    <van-search placeholder="请输入搜索关键词" @search="onSearch" v-model="value" />

      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>

      <mu-list textline="three-line" style="background-color:white">

            <Doctors :va="key" :ty="value1" />

        </mu-list>
  </div>
</template>
<script>
import Doctors from '../components/Doctors.vue'

export default {
  name: 'AllDoctor',
  components: {
    Doctors
  },
  data() {
    return {
      loading:false,
      // 搜索关键词
      value:'',
      // 类型激活
      value1: 0,
      // 传的关键字
      key:'',
      option1: [
        { text: '全部科室', value: 0 },
        { text: '内科', value: 1 },
        { text: '外科', value: 2 },
        { text: '妇产科', value: 3 },
        { text: '儿科', value: 4 },
        { text: '中医康复科', value: 5 }
      ],
    }
  },
  created(){
      if(this.$route.query.value){
        this.value = this.$route.query.value;
        this.key = this.$route.query.value;
        // alert(this.value);
      }
      // if(this.$route.query.type){
      //   this.value1 = this.$route.query.type;
      //   // alert(this.value1);
      // }
      if(this.$route.params.typeid){
        if(this.$route.params.typeid != "-1"){
          this.value1 = parseInt(this.$route.params.typeid);
        }
      }
      // console.log(this.$route.params.typeid);
  
  
  },
  mounted(){
    
  },
  methods:{
    onSearch(){
      // alert("搜索");
      this.key = this.value;
    },
    
  }
}
</script>
