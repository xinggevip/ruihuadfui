<template>
  <div class="judge">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="切换环节"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    /> -->

    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <div class="father">
      <!-- <h3>评委</h3> -->
      <!-- <p><b>环节列表：</b></p>
      <ul>
        <li v-for="(item,index) in items" :key="index">{{item}} <span style="color:red;" v-if="index == 2">&nbsp;&nbsp;&nbsp;&nbsp;☜当前环节</span></li>
      </ul> -->
      <p><b>详情:</b></p>
      <p>{{profile}}</p>
      
    </div>
    
    <van-search v-model="searchKey" @search="onSearch" placeholder="请输入搜索关键词" /> 
    <div class="father">
      <van-tabs @click="onClick">
        <van-tab title="可打分">
          <div v-if="kedaList.length === 0">
            <h3>加载中...</h3>
          </div>
          <div class="playerItem" v-for="(item,index) in kedaList" :key="item.index">
            <p style="margin:5px 0px 0px"><b>{{index+1}}.{{item.name}}</b></p>
            <p style="margin:5px 0px;">{{item.company}}&nbsp;{{item.dep}}&nbsp;</p>
            <van-button v-if="item.yida != true" type="info" size="small" style="position:absolute;right:0px;top: 50%;transform:translateY(-50%);" @click="goDafen(item)">打分</van-button>
            <van-button v-else disabled type="info" size="small" style="position:absolute;right:0px;top: 50%;transform:translateY(-50%);" @click="goDafen(item)">打分</van-button>
          </div>
        </van-tab>
        <van-tab title="已打分">
          <div v-if="kedaList.length === 0">
            <h3>加载中...</h3>
          </div>
          <div class="playerItem" v-for="(item,index) in yidaList" :key="item.index">
            <p style="margin:5px 0px 0px"><b>{{index+1}}.{{item.name}}</b>&nbsp;&nbsp;&nbsp;<b>{{item.sum_score}}分</b></p>
            <p style="margin:5px 0px;">{{item.company}}&nbsp;{{item.dep}}&nbsp;</p>
            <van-button type="info" size="small" style="position:absolute;right:0px;top: 50%;transform:translateY(-50%);" @click="goDafenProfile(item)">查看</van-button>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    
    

    

  

  </div>
</template>



<script>

export default {
  name: 'Judge',
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
      loading:false,
      data:[],
      actions: [{ name: '环节一' }, { name: '环节二' }, { name: '环节三' }],
      invitationCode:"",
      name:"",
      searchKey:"",
      title:"加载中...",
      profile:"加载中...",
      yidaList:[],
      kedaList:[],
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
      show:false,

    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    this.fetchData();
  },
  methods:{
    onSelect(item) {
      this.show = false;
      // this.$toast(item.name);
      // this.$toast(item.id)
      this.updateActivate(item.id);
    },
    getStepList(){
      this.loading = true;

      let params = {
        actid:this.$route.params.actid
      }
      this.$postQs("/step/steplist",params).then(response=>{
        console.log(response);
        if(response.data.success != true){
          return ;
        }
        let list = response.data.data;
        let neweList = list.map((item,index,arr)=>{
          item.name = item.title
          return item;
        });
        this.actions = neweList;
      }).catch(err=>{

      }).finally(()=>{
        this.loading = false;
      })
    },
    updateActivate(currentStepId){
      this.loading = true;
      let item = {
        id:this.$route.params.actid,
        strone:"" + currentStepId
      }
      this.$put("/activate",item).then(response=>{
        if(response.data.success){
          this.$message.success(response.data.message);
        }
        this.getStep();
      }).catch(err=>{

      }).finally(()=>{
        this.loading = false;
      })


    },
    onClickRight(){
      this.show = true;
    },
    fetchData(){
      this.getStep();
      this.getKeDa();
      // this.getYiDa();
      this.getStepList();
    },
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
      // this.$toast(title);
      this.getKeDa();
      // this.getYiDa();
    },
    onSearch(){
      this.getKeDa();
    },
    getStep(){
      let params = {
        id:this.$route.params.actid
      }
      this.$postQs("/step/currentStep",params).then(response=>{
        console.log(response);
        if(response.data.success){
            this.title = "评委 - " + response.data.data.title;
            this.profile = response.data.data.profile;
        }
      }).catch(err=>{

      }).finally(()=>{

      })
    },
    getKeDa(){
      let params = {
        "actId": this.$route.params.actid,
        "name": this.searchKey,
        "pageNum": 0,
        "pageSize": 5000,
        "stepId": 0
      }
      this.$post("/player/getPlayers",params).then(response=>{
        if(!response.data.success){
          return ;
        }
        console.log(response.data.data.records);
        // this.kedaList = response.data.data.records;
        let kedaList = response.data.data.records.filter((item,index,arr)=>{
          return item.strone == '1';
        })

        let params2 = {
          actid:  this.$route.params.actid,
          judgeid:this.$route.params.judgeid,
          playername: this.searchKey,
        }
        // console.log("/player/findYidafenPlayers");
        this.$postQs("/player/findYidafenPlayers",params2).then(response2=>{
          
          console.log("findYidafenPlayers",response2);
          this.yidaList = response2.data.data
          kedaList.map((item,index,arr)=>{
            this.yidaList.forEach((item2, index2, arr2)=>{
              if(item.id === item2.player_id){
                item.yida = true;
              }
            })
            return item;

          })

          this.kedaList = kedaList;

        }).catch(err=>{

        }).finally(()=>{
        })



      }).catch(err=>{

      }).finally(()=>{
      })
    },
    getYiDa(){
      let params = {
        actid:  this.$route.params.actid,
        judgeid:this.$route.params.judgeid,
        playername: this.searchKey,
      }
      // console.log("/player/findYidafenPlayers");
      this.$postQs("/player/findYidafenPlayers",params).then(response=>{
        
        console.log("findYidafenPlayers",response);
        this.yidaList = response.data.data
      }).catch(err=>{

      }).finally(()=>{
      })
    },
    goDafen(item){
      // alert(item.id);
      // alert(this.$route.params.playerid)
      this.$router.push({
        name:'dafen',
        params:{
          actid:this.$route.params.actid,
          judgeid:this.$route.params.judgeid,
          playerid:item.id
        }
      });
    },
    goDafenProfile(item){
      console.log("goDafenProfile的item",item);
      this.$router.push({
        name:'dafenprofile',
        params:{
          actid:this.$route.params.actid,
          judgeid:item.judge_id,
          playerid:item.player_id,
          stepid:item.step_id
        }
      })
    },

    // 返回
    onClickLeft(){
      window.history.back(-1);
    },



  }
}
</script>
<style scoped lang="less">
.judge{
  // padding: 20px;
  // box-sizing: border-box;

}

.playerItem{
  border-bottom: 1px solid #ccc;
  position: relative;
}
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

