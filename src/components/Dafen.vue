<template>
  <div class="dafen">
    <van-nav-bar
      :title="title"
      left-text="关闭"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="father">
      <h1>打分</h1>
        <div class="numCount-father">
          <div class="numCount" v-for="(item,index) in scoreItems" :key="index">
          <span class="numCount-title">{{item.itemName}}</span>
          <span class="numcount-tip">(最高{{item.maxScore}}分)</span>
          <van-stepper :v-model="item.value" :step="Math.round(item.maxScore / 10)" input-width="60px" button-size="32px"  min="0" :max="item.maxScore" />
        </div>
      </div>
      
      
    </div>


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
      title:"加载中...",
      player:null,
      scoreItems:[],
      value:0,
    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    this.fetchData();
  },
  methods:{

    fetchData(){
      this.getPlayerById();
      this.getCurrentStepItemList();
    },
    getPlayerById(){
      let playerid = this.$route.params.playerid;
      this.$get("/player/" + playerid).then(response=>{
        this.player = response.data.data;
        console.log(this.player);
        this.title = "打分 - " + this.player.company + this.player.dep + " " + this.player.name

      }).catch(err=>{

      }).finally(()=>{

      })
    },
    getCurrentStepItemList(){
      let actid = this.$route.params.actid;
      let params = {
        actid:actid
      };
      this.$postQs("/step/currentScoreList",params).then(response=>{
        this.scoreItems = response.data.data;
        console.log(this.scoreItems);
      }).catch(err=>{

      }).finally(()=>{

      })
    },
    // 关闭
    onClickLeft(){
      window.history.back(-1);
    },



  }
}
</script>
<style scoped lang="less">
.father{
  padding: 0px 15px;
  box-sizing: border-box;
}
.numCount{
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
  padding: 18px 0px;
  // margin-top: 10px;
  .numCount-title{
    font-size: 14px;
  }
  .numcount-tip{
    color: #ccc;
  }
  .van-stepper{
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>

