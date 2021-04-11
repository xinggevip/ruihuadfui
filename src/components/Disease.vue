<template>
  <div class="disease">
    <!-- 头部标题 -->
    <van-nav-bar
      title="找疾病"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <!-- 疾病 -->

  <mu-container class="demo-container" style="background-color:white;padding-top:10px;">
      <mu-row gutter style="padding:0 10px;">
        <mu-col span="3" v-for="item in data" :key="item.id" style="margin-bottom:20px;">
          <van-button plain hairline  color="#7232dd" size="small" style="width:100%;" @click="toAllDoctor(item.type)">{{item.name}}</van-button>
        </mu-col>
        
      </mu-row>
  </mu-container>
    


  </div>
</template>



<script>

export default {
  name: 'Disease',
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
      data:[
        {
          id:1,
          name:"冠心病",
          type:1,
        },
        {
          id:2,
          name:"高血压",
          type:1,
        },
        {
          id:3,
          name:"鼻炎",
          type:1,
        },
        {
          id:4,
          name:"肠炎",
          type:1,
        },
        {
          id:5,
          name:"皮肤过敏",
          type:2,
        },
        {
          id:6,
          name:"脑血管病",
          type:2,
        },
        {
          id:7,
          name:"脑外伤",
          type:2,
        },
        {
          id:8,
          name:"肾结石",
          type:2,
        },
        {
          id:9,
          name:"不孕不育",
          type:2,
        },
        {
          id:10,
          name:"阴道炎",
          type:2,
        },
        {
          id:11,
          name:"小儿感冒",
          type:3,
        },
        {
          id:12,
          name:"抽动症",
          type:3,
        },
        {
          id:13,
          name:"骨折",
          type:3,
        },
        {
          id:14,
          name:"关节炎",
          type:3,
        },
        {
          id:15,
          name:"白内障",
          type:3,
        },
        {
          id:16,
          name:"近视",
          type:4,
        },
        {
          id:17,
          name:"眼底病",
          type:4,
        },
        {
          id:18,
          name:"牙痛",
          type:4,
        },
        {
          id:19,
          name:"牙周炎",
          type:4,
        },
        {
          id:20,
          name:"口腔修复",
          type:4,
        },
      ]

    }
  },
  methods:{
    // 所有医生
    toAllDoctor(type){
      // this.$router.push({path:'/alldoctor',query:{type:type}});
      this.$router.push('/alldoctor/' + type);
    },
    // 返回
    onClickLeft(){
      window.history.back(-1);
    }
  }
}
</script>
<style scoped lang="less">
.demo-container {
  .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-cell {
    box-sizing:border-box;
    border-radius: 4px;
    height: 36px;
    // background: rgba(255, 255, 255, 0.8);
    
    border: 1px solid blue;
    // background-color: blue;
  }
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell{
  background: rgba(0, 0, 0, 0.54);
}
</style>

