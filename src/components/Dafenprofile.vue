<template>
  <div class="dafenprofile">
    <van-nav-bar
      :title="title"
      left-text="关闭"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="father" v-if="scoreItems.length > 0">
      <!-- <h4>当前环节：{{stepName}}</h4> -->
      <!-- <h3 style="color:#ccc">此环节满分为：{{manfen}}</h3> -->
      <p><b>您给出的分数为：</b><span style="font-size:22px">{{currentScore}}</span><span style="color:#ccc;font-size:14px">&nbsp;&nbsp;&nbsp;(满分为{{manfen}})</span></p>
        <div class="numCount-father">
          <div class="numCount" v-for="(item,index) in scoreItems" :key="index">
          <span class="numCount-title">{{index + 1}}. {{item.item_name}}</span>
          <span class="numcount-tip">(最高{{item.max_score}}分)</span>
          <van-stepper disabled @change="onChange" :default-value="0" v-model="scoreItems[index].num_value" :step="Math.round(item.max_score / 10)" input-width="60px" button-size="32px"  min="0" :max="item.max_score" />
        </div>
      </div>

      <van-cell-group>
        <van-field
          disabled
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          show-word-limit
          v-model="pingyuItems[0].str_value" :label="pingyuItems[0].item_name" placeholder="请输入评语" />
      </van-cell-group>

      <van-button disabled @click="submit" plain  round type="info" style="width:100%;margin-top:30px;">提交</van-button>
      
      
    </div>
    <div class="father" v-else>
      <h3>加载中...</h3>
    </div>


  </div>



  
</template>



<script>

export default {
  name: 'Dafenprofile',
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
      pingyuItems:[],
      value:0,
      manfen:0,
      currentScore:0,
      stepName:""
    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    this.fetchData();
  },
  methods:{

    fetchData(){
      this.getStep()
      this.getPlayerById();
      this.getCurrentStepScoreItemList();
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
    getCurrentStepScoreItemList(){
      let actid = this.$route.params.actid;
      let playerid = this.$route.params.playerid;
      let stepid = this.$route.params.stepid;
      let judgeid = this.$route.params.judgeid;
      let params = {
        playerid:playerid,
        stepid:stepid,
        judgeid:judgeid
      };
      this.$postQs("/scorevalue/getYiDaScoreValue",params).then(response=>{
        // this.scoreItems = response.data.data;
        this.manfen = 0;

        this.scoreItems = response.data.data.filter((item,index,arr)=>{
          return item.score_type === 1
        })

        this.pingyuItems = response.data.data.filter((item,index,arr)=>{
          return item.score_type === 2
        })

        this.scoreItems.forEach((item,index,arr)=>{
          this.manfen = this.manfen + item.max_score;
          this.currentScore = this.currentScore + item.num_value;
        })

        console.log("response",response.data.data);
        console.log("scoreItems",this.scoreItems);
        console.log("pingyuItems",this.pingyuItems);
      }).catch(err=>{

      }).finally(()=>{

      })
    },
    getStep(){
      let params = {
        id:this.$route.params.actid
      }
      this.$get("/step/" + this.$route.params.stepid).then(response=>{
        if(response.data.success){
            this.stepName = response.data.data.title;
        }
      }).catch(err=>{

      }).finally(()=>{

      })
    },
    // 关闭
    onClickLeft(){
      window.history.back(-1);
    },
    onChange(value) {
      this.currentScore = 0;
      this.scoreItems.forEach((item,index,arr)=>{
        this.currentScore = this.currentScore + item.value; 
      })
    },
    submit(){
      // alert("提交")
      // 拷贝一份数组
      let params = this.scoreItems.map((item,index,arr)=>{
        let res = {
          scoreitemId:item.id,
          judgeId:this.$route.params.judgeid,
          playerId:this.$route.params.playerid,
          numValue:item.value
        }
        return res;
      });

      // console.log(params);

      this.$post("/scorevalue/dafen",params).then(response=>{
        console.log(response);
      }).catch(err=>{

      }).finally(()=>{

      })

   

    }



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
  .white-space {
    white-space:pre

  }
}

</style>

