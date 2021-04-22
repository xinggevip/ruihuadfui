<template>
  <div class="dafen">
    <van-nav-bar
      :title="headtitle"
      left-text="关闭"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <van-steps :active="active">
      <van-step>活动详情</van-step>
      <van-step>设置环节</van-step>
      <van-step>设置打分项</van-step>
      <van-step>完成</van-step>
    </van-steps>

    <div v-if="active == 0">
      <van-cell-group>
        <van-field
          v-model="actobj.title" 
          required 
          :error-message="errtitle"
          label="活动标题" 
          placeholder="请输入活动标题" 
        />
        <van-field
          required
          :error-message="errprofile"
          v-model="actobj.profile"
          rows="2"
          autosize
          label="活动介绍"
          type="textarea"
          maxlength="50"
          placeholder="请输入活动介绍"
          show-word-limit
       />
        <van-cell  title="选择开始时间" is-link  :value="date" @click="show = true" />
        <van-calendar v-model="show" :max-range="365"  :formatter="formatter" @confirm="onConfirm" />
      </van-cell-group>
    </div>

    <div v-if="active == 1">
        <van-swipe-cell>
          <div class="step-list-father">
            <p class="step-title">
              标题
          </p>
          <span class="step-profile">
              ddd
          </span>
          </div>
          
          <template #right>
            <van-button square type="primary" text="编辑" />
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
    </div>

    <div v-if="active == 2">
        2
    </div>

    <div v-if="active == 3">
        3
    </div>
    <div class="add-step">
      <van-button @click="addStep" round type="info" style="width:100%;margin-top:15%;" >添加环节</van-button>
    </div>
    

    <div class="btn-father">
      <van-button v-if="active != 0"  @click="pre" plain  round type="info" style="width:100%;margin-top:30px;">上一步</van-button>
      <van-button v-if="active != 3" @click="next" plain  round type="info" style="width:100%;margin-top:30px;">下一步</van-button>
    </div>
    
    <!--  -->
    <van-dialog v-model="stepshow" :title="steptitle" show-cancel-button>
      <van-form>
        <van-field
          v-model="currentStep.title"
          name="环节标题"
          label="环节标题"
          placeholder="请输入环节标题"
          :rules="[{ required: true, message: '环节标题不能为空' }]"
        />
        <van-field
          v-model="currentStep.profile"
          rows="2"
          type="textarea"
          name="环节介绍"
          label="环节介绍"
          placeholder="请输入环节介绍"
          :rules="[{ required: true, message: '环节介绍不能为空' }]"
        />
      </van-form>
    </van-dialog>


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
      
      active: 1,
      date: '',
      show: false,
      headtitle:'创建活动',
      errtitle:'',
      errprofile:'',
      errdate:'',
      stepshow:false,
      steptitle:"添加环节",
      currentStep:{
        id:null,
        activateId:null,
        title:"",
        profile:""
      },
      actobj:{
        id:5,
        title:'',
        profile:'',
        startDate: null,
        strone:'0',
        strtwo:'1',
      },
      stepList:[]

    }
  },
  created(){
    // this.doctor.dId = this.$route.params.dId;
    // 获取医生
    this.fetchData();
    // console.log((JSON.parse(this.$store.state.user)).id);
    console.log(this.$route.params.userid);
    console.log();
  },
  methods:{

    fetchData(){
    },
    onClickLeft(){
      window.history.back(-1);
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.actobj.startDate = date;
      this.date = this.formatDate(date);

    },
    formatter(date){

      return date;
    },
    pre(){
      this.active = this.active - 1;
    },
    next(){
      if(this.active == 0){
        this.createAct();
      }
      
    },
    createAct(){
      // 验证
      // 提交
      console.log(this.actobj);
      let num = 1;
      if(this.actobj.title === ""){
        this.errtitle = "活动标题不能为空"
        num = 2
      };

      if(this.actobj.profile === ""){
        this.errprofile = "活动介绍不能为空"
        num = 2
      }

      if(this.actobj.startDate == null || this.actobj.startDate == ''){
        this.date = "日期不能为空"
        num = 2
      }

      if(this.actobj.title != ""){
        this.errtitle = ""
      };

      if(this.actobj.profile != ""){
        this.errprofile = ""
      }

      if(num === 2){
        return;
      }

      this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });

      this.$post("/activate",this.actobj).then(response=>{
        console.log(response);
        this.actobj = response.data.data;
        this.actobj.startDate = new Date(this.actobj.startDate);
        if(response.data.success){
          this.active = 1;
        }
      }).catch(err=>{

      }).finally(()=>{
          this.$toast.clear();
      })
    },
    addStep(){
      this.stepshow = true
    }



  
  }
}
</script>
<style scoped lang="less">
.step-list-father{
  padding: 2px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(235 237 240);
  // border: 1px solid #ccc;
  // border-top: 1px solid #969799;
}
.btn-father{
  padding: 0 20px;
  box-sizing: border-box;
}
.add-step{
  padding: 0 20px;
  box-sizing: border-box;
}
.step-title{
  font-size: 15px;
  margin: 5px 0px;
}
.step-profile{
  // color: rgba(204, 204, 204, 0.219);
  // color: #969799;
}
.delete-button {
  height: 100%;
}
.van-button--primary {
    height: 100%;
}

</style>

