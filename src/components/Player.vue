<template>
  <div class="player">

    <h1>选手</h1>
    <p>环节列表：</p>
    <ul>
      <li v-for="(item,index) in items" :key="index">{{item}}</li>
    </ul>

  

  </div>
</template>



<script>
import { format } from 'path';

export default {
  name: 'player',
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
      loading:false,
      items:["环节一","环节二","环节三","环节四"],
      data:[],
      invitationCode:"",
      name:""

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

    // 返回
    onClickLeft(){
      window.history.back(-1);
    }
  }
}
</script>
<style scoped lang="less">
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

