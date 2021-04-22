<template>
  <div class="dafen">
    <van-nav-bar
      :title="headtitle"
      left-text="返回"
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
      <van-form @submit="onSubmit">
        <van-field
          v-model="actobj.title"
          name="活动标题"
          label="活动标题"
          placeholder="请输入活动标题"
          :rules="[{ required: true, message: '' }]"
        />
        <van-field
          v-model="actobj.profile"
          rows="2"
          type="textarea"
          name="活动介绍"
          label="活动介绍"
          placeholder="请输入活动介绍"
          :rules="[{ required: true, message: '' }]"
        />
        <van-field
          readonly
          clickable
          name="开始日期"
          :value="date"
          label="开始日期"
          placeholder="点击选择日期"
          @click="showCalendar = true"
          :rules="[{ required: true, message: '' }]"
        />
        <van-field
          readonly
          clickable
          name="开始时间"
          :value="time"
          label="开始时间"
          placeholder="点击选择时间"
          @click="showPicker = true"
          :rules="[{ required: true, message: '' }]"
        />
        <div class="btn-father">
          <van-button native-type="submit" plain  round type="info" style="width:100%;margin-top:30px;">下一步</van-button>
        </div>
        


      </van-form>

      <van-calendar v-model="showCalendar" :max-range="365"  :formatter="formatter" @confirm="onConfirm" />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="time"
          @confirm="onConfirmTime"
          @cancel="showPicker = false"
        />
      </van-popup>

    </div>

    <div v-if="active == 1">
        <van-swipe-cell  v-for="(item,index) in stepList" :key="index">
          <div class="step-list-father"  >
            <p class="step-title">
              {{index + 1}}.&nbsp;&nbsp;{{item.title}}
          </p>
          <span class="step-profile">
              {{item.profile}}
          </span>
          </div>
          
          <template #right>
            <van-button square type="primary" text="编辑" />
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>

        <div class="add-step">
          <van-button @click="addStep" round type="info" style="width:100%;margin-top:15%;" >添加环节</van-button>
        </div>
    </div>

    <div v-if="active == 2">
        2
    </div>

    <div v-if="active == 3">
        3
    </div>
    
    

    <div class="btn-father">
      <van-button v-if="active != 0"  @click="pre" plain  round type="info" style="width:100%;margin-top:30px;">上一步</van-button>
      <van-button v-if="active != 3 && active != 0" @click="next" plain  round type="info" style="width:100%;margin-top:30px;">下一步</van-button>
    </div>
    
    <!--  -->
    <van-dialog v-model="stepshow" :title="steptitle" :beforeClose="beforeClose" show-cancel-button>
      <van-form>
        <van-field
          v-model="currentStep.title"
          name="环节标题"
          label="环节标题"
          placeholder="请输入环节标题"
          :rules="[{ required: true, message: '' }]"
        />
        <van-field
          v-model="currentStep.profile"
          rows="2"
          type="textarea"
          name="环节介绍"
          label="环节介绍"
          placeholder="请输入环节介绍"
          :rules="[{ required: true, message: '' }]"
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
      
      active: 0,
      date: '',
      showCalendar: false,// 日期
      showPicker:false,   // 时间
      time:'',
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
        id:null,
        title:'',
        profile:'',
        startDate: null,
        strone:'0',
        strtwo:'1',
        userId:(JSON.parse(this.$store.state.user)).id,
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
    
    getStepList(){

      let params = {
        actid:this.actobj.id,
      }
      this.$postQs("/step/steplist",params).then(response=>{
        console.log(response);
        if(response.data.success != true){
          return ;
        }
        this.stepList = response.data.data;


      }).catch(err=>{

      }).finally(()=>{

      })
    },
    onClickLeft(){
      window.history.back(-1);
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      // console.log(date);
      this.showCalendar = false;
      // this.actobj.startDate = date;
      this.date = this.formatDate(date);

    },
    onConfirmTime(time) {
      this.time = time;
      this.showPicker = false;
    },
    formatter(date){

      return date;
    },
    pre(){
      this.active = this.active - 1;
    },
    next(){
      if(this.active == 1){

      }
      
    },
    onSubmit(){


      console.log(this.actobj);

      let riqiarr = this.date.split('/').map((item,index,arr)=>{
        return parseInt(item);
      })

      let timearr = this.time.split(':').map((item,index,arr)=>{
        return parseInt(item);
      })

      let date = new Date();
      date.setFullYear(riqiarr[0]);
      date.setMonth(riqiarr[1] - 1);
      date.setDate(riqiarr[2]);
      date.setHours(timearr[0]);
      date.setMinutes(timearr[1]);
      date.setSeconds(0);
      console.log(date);
      // console.log(date.getMilliseconds());
      console.log(this.$dateUtil.mToDateStr(date.getTime(),'yyyy-MM-dd hh:mm:ss'));

      this.actobj.startDate = date.getTime();

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
          this.getStepList();
        }
      }).catch(err=>{

      }).finally(()=>{
          this.$toast.clear();
      })
    },
    addStep(){
      this.stepshow = true
    },
    beforeClose(action, done){
      console.log("关闭前");
      if (action === 'confirm') {
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
        if(this.currentStep.id == null){
          this.steptitle = "添加环节";
          this.currentStep.activateId = this.actobj.id;
          this.$post("/step",this.currentStep).then(response=>{
            console.log(response);
            this.stepList.push(response.data.data);
          }).catch(err=>{

          }).finally(()=>{
            this.$toast.clear();
            done();
          })

        }else{
          this.steptitle = "编辑环节"
        }

      } else {
        done();
      }
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

