<template>
  <div class="controler">

    <van-nav-bar
      title="场控-销售技能大赛"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="father">
      <p>活动详情：</p>
      <p>这是一段详情</p>
    </div>
    
    <van-cell is-link title="环节一" @click="show = true" value="选择当前环节"/>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    
    <van-search v-model="searchKey" placeholder="请输入搜索关键词" /> 

    <div class="father">
      <van-tabs @click="onClick">
        <van-tab title="所有人">内容 1</van-tab>
        <van-tab title="上台人">内容 2</van-tab>
      </van-tabs>
    </div>


  </div>
</template>



<script>

export default {
  name: 'Controler',
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
      items:["环节一","环节二","环节三","环节四"],
      show: false,
      actions: [{ name: '环节一' }, { name: '环节二' }, { name: '环节三' }],
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
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.$toast(item.name);
    },
  }
}
</script>
<style scoped lang="less">
.father{
  padding: 0px 15px;
  box-sizing: border-box;
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

