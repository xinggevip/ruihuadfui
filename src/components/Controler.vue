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
      <p>{{activateProfile}}</p>
    </div>
    
    <van-cell is-link :title="currentStepTitle" @click="show = true" value="选择当前环节"/>
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
      show: false,
      actions: [{ name: '环节一' }, { name: '环节二' }, { name: '环节三' }],
      searchKey:"",
      currentStepTitle:"",
      activateTitle:"",
      activateProfile:""
      

    }
  },
  created(){
    this.fetchData()
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
      let [params] = {
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
          console.log(response);

        }).catch(err=>{

        }).finally(()=>{

        })


    },
    onClick(name, title) {
      this.$toast(title);
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

