<template>
  <div class="controler">

    <van-nav-bar
      :title="activateTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="father">
      <p>活动详情：</p>
      <p class="tmd">{{activateProfile}}</p>
    </div>
    
    <van-cell is-link :title="currentStepTitle" @click="show = true" value="选择当前环节"/>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    
    <van-search v-model="searchKey" @search="onSearch" placeholder="请输入搜索关键词" /> 

    <div class="father">
      <van-tabs @click="onClick">
        <van-tab title="所有人">
          <div class="playerItem" v-for="(item,index) in listData" :key="index">
            <p style="margin:5px 0px 0px"><b>{{index+1}}.{{item.name}}</b></p>
            <p style="margin:5px 0px;">{{item.company}}&nbsp;{{item.dep}}&nbsp;</p>
            <van-button v-if="item.strone !== '1'" type="info" size="small" style="position:absolute;right:0px;top: 50%;transform:translateY(-50%);" @click="shangtai(item)">上台</van-button>
            <van-button v-if="item.strone === '1'" type="info" disabled  size="small" style="position:absolute;right:0px;top: 50%;transform:translateY(-50%);">上台</van-button>
          </div>
        </van-tab>
        <van-tab title="上台人">
          <div class="playerItem" v-for="(item,index) in listDataOn" :key="index">
            <p style="margin:5px 0px 0px"><b>{{index+1}}.{{item.name}}</b></p>
            <p style="margin:5px 0px;">{{item.company}}&nbsp;{{item.dep}}&nbsp;</p>
            <van-button v-if="item.strone === '1'" type="info" size="small" style="position:absolute;right:0px;top: 50%;transform:translateY(-50%);" @click="xiatai(item)">下台</van-button>
            <van-button v-if="item.strone !== '1'" type="info" disabled  size="small" style="position:absolute;right:0px;top: 50%;transform:translateY(-50%);">上台</van-button>
          </div>
        </van-tab>
        <van-tab title="批量设置">
        <van-row type="flex" justify="center">
          <van-col span="20">
              <van-button @click="updateAllPlayersStatus('on')"  plain hairline round type="info" style="width:100%;margin-top:15px;">所有人上台</van-button>
              <van-button @click="updateAllPlayersStatus('down')"  plain hairline round type="info" style="width:100%;margin-top:15px;">所有人下台</van-button>
            </van-col>
          </van-row>
        </van-tab>
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
      show: false,
      actions: [{ name: '环节一' }, { name: '环节二' }, { name: '环节三' }],
      searchKey:"",
      currentStepTitle:"加载中...",
      activateTitle:"加载中...",
      activateProfile:"加载中...",
      listLoading:false,
      listData:[],// 所有人
      listDataOn:[], // 上台人
      buttonLoading:false

    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    onSearch(){
      this.getAllPlayer();
    },
    shangtai(item){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let params = {
        id:item.id,
        strone:"1"
      }
      this.$put("/player",params).then(response=>{
        if(response.data.success){
          this.getAllPlayer()
        }

      }).catch(err=>{

      }).finally(()=>{
        this.$toast.clear()
      })
    },
    xiatai(item){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let params = {
        id:item.id,
        strone:"0"
      }
      this.$put("/player",params).then(response=>{
        if(response.data.success){
          this.getAllPlayer()
        }

      }).catch(err=>{

      }).finally(()=>{
        this.$toast.clear()
      })
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
        neweList.unshift({
          activateId:this.$route.params.actid,
          id: 0,
          name: "未开始"
        })
        neweList.push({
          activateId:this.$route.params.actid,
          id: -1,
          name: "已结束"
        })
        console.log(neweList);
        this.actions = neweList;

      }).catch(err=>{

      }).finally(()=>{
        this.loading = false;
      })
    },
    geteCurrentStep(){
      this.loading = true;
      let params = {
        id:this.$route.params.actid
      }
      this.$postQs("/step/currentStep",params).then(response=>{
        if(response.data.success != true){
          return ;
        }
        this.currentStepTitle = response.data.data.title;
      }).catch(err=>{

      }).finally(()=>{
        this.loading = false;
      })
    },
    getActivate(){
      this.loading = true;
      this.$get("/activate/"+this.$route.params.actid).then(response=>{
        this.activateTitle = "场控 - " + response.data.data.title;
        this.activateProfile = response.data.data.profile;
      }).catch(err=>{

      }).finally(()=>{
        this.loading = false;
      })
    },
    fetchData(){
      this.getStepList();
      this.geteCurrentStep();
      this.getActivate();
      this.getAllPlayer();
    },
    getAllPlayer(){
      this.loading = true;
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
        console.log("/player/getPlayers",response.data.data.records);
        this.listData = response.data.data.records;
        this.listDataOn = response.data.data.records.filter((item,index,arr)=>{
          return item.strone == '1';
        })
        console.log("listdataOn",this.listDataOn);

      }).catch(err=>{

      }).finally(()=>{
        this.loading = false;
      })
    },
    updateAllPlayersStatus(status){
      let message = ""
      if(status == "on"){
        message = "确定设置所有人上台？"
      }
      if(status == "down"){
        message = "确定将所有人下台？"
      }
      this.$dialog.confirm({
        title: '提示',
          message: message,
        })
        .then(() => {
          // on confirm
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
          let params = {
            actid:this.$route.params.actid,
            status: status,
          }
          this.$postQs("/player/updateAllPlayersStatus", params).then(response=>{
            console.log(response);
          }).catch(err=>{

          }).finally(()=>{
            this.$toast.clear();
          })
        })
        .catch(() => {
          // on cancel
        })
      
    },
    onClick(name, title) {
      // this.$toast(title);
      // this.$toast(name);
      this.getAllPlayer();
    },
    // 返回
    onClickLeft(){
      window.history.back(-1);
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
        this.geteCurrentStep();
      }).catch(err=>{

      }).finally(()=>{
        this.loading = false;
      })


    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      // this.$toast(item.name);
      // this.$toast(item.id)
      this.updateActivate(item.id);

    },
  }
}
</script>
<style scoped lang="less">
.tmd{
  box-sizing: border-box;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
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

