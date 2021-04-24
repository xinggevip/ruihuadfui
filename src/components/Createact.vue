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
            <van-button @click="editStepItem(item)" square type="primary" text="编辑" />
            <van-button @click="deleteStepItem(item)" square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>

        <div class="add-step">
          <van-button @click="addStep" round type="info" style="width:100%;margin-top:15%;" >添加环节</van-button>
        </div>
    </div>

    <div v-if="active == 2">
      <div class="acttwofather">
        <div class="acttwofather-left">

        </div>
        <van-sidebar v-model="activeKey" @change="onStepChange">
          <van-sidebar-item v-for="(item,index) in stepList" :key="index" :title="''+(index+1)+'.'+item.title" />
        </van-sidebar>
        <div class="acttwofather-right">
          <div class="score-item" v-for="(item,index) in stepList" :key="index">
            <div class="score-item-son" v-if="index == activeKey">
                <!-- {{index}} -->
                <van-swipe-cell  v-for="(scoreItem,scoreIndex) in scoreList" :key="scoreIndex">
                  <div class="score-listfather">
                    <span><b>{{scoreItem.itemName}}</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{scoreItem.maxScore}}分</span>
                  </div>
                  
                  <template #right>
                    <van-button @click="editScoreItem(scoreItem)" square type="primary" text="编辑" />
                    <van-button @click="deleteScoreItem(scoreItem)" square text="删除" type="danger" class="delete-button" />
                  </template>
                </van-swipe-cell>

            </div>
              
          </div>
        </div>
      </div>
      <div class="add-step">
        <van-button @click="addScoreItem" round type="info" style="width:100%;margin-top:15%;" >添加打分项</van-button>
      </div>
          

    </div>

    <div v-if="active == 3">
        <div v-for="(item,index) in invitaionList" :key="index">
          {{item.invitationCode}}
        </div>
    </div>
    
    

    <div class="btn-father">
      <van-button v-if="active != 0"  @click="pre" plain  round type="info" style="width:100%;margin-top:30px;">上一步</van-button>
      <van-button v-if="active != 3 && active != 0" @click="next" plain  round type="info" style="width:100%;margin-top:30px;">下一步</van-button>
    </div>
    
    <!-- 添加环节对话框 -->
    <van-dialog v-model="stepshow" :title="steptitle" :beforeClose="beforeClose" show-cancel-button>
      <van-form ref="formData" alidate-first @submit="submitOfAddStep">
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

    <!-- 添加打分项对话框 -->

    <van-dialog v-model="scoreshow" :title="scoretitle" :beforeClose="beforeCloseOfAddScoreItem" show-cancel-button>
      <van-form ref="formDataOfAddScoreItem" alidate-first @submit="submitOfAddScoreItem">
        <van-field
          v-model="currentScoreItem.itemName"
          name="打分名称"
          label="打分名称"
          placeholder="请输入打分名称"
          :rules="[{ required: true, message: '' }]"
        />
        <van-field
          v-model="currentScoreItem.maxScore"
          rows="2"
          type="number"
          name="最高分值"
          label="最高分值"
          placeholder="请输入最高分值"
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
      active: 2,// 步骤条
      activeKey: 0,// 侧边导航
      date: '',
      showCalendar: false,// 日期
      showPicker:false,   // 时间
      time:'',
      headtitle:'创建活动',
      errtitle:'',
      errprofile:'',
      errdate:'',
      stepshow:false,
      scoreshow:false,
      steptitle:"添加环节",
      scoretitle:"添加打分项",
      currentStep:{
        id:null,
        activateId:null,
        title:"",
        profile:""
      },
      actobj:{
        id:12,
        title:'',
        profile:'',
        startDate: null,
        strone:'0',
        strtwo:'1',
        numone:0,
        userId:(JSON.parse(this.$store.state.user)).id,
      },
      stepList:[],
      scoreList:[],
      currentScoreItem:{
        id:null,
        stepId:null,
        itemName:null,
        maxScore:null,
        scoreType:1,

      },
      invitaionList:[],

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
      // 获取环节列表
      this.getStepList();
      // 获取当前活动
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
        // 把活动的strtwo更新为2，表示到了设置打分项环节
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        let params = {
          id:this.actobj.id,
          strtwo:"2"
        }
        this.$put("/activate",params).then(response=>{
          if(response.data.success){
            // 根据环节id获取打分列表
            this.active = this.active + 1;
            this.getScoreItemByStepId();
          }
        }).catch(err=>{

        }).finally(()=>{
          this.$toast.clear();
        })
      }else if(this.active == 2){
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        let params = {
          id:this.actobj.id,
          strtwo:"3"
        }
        this.$put("/activate",params).then(response=>{
          console.log("下一步",response);
          if(response.data.success){
            // 根据环节id获取打分列表
            this.active = this.active + 1;
            // 获取选手、评委、场控验证码
            this.$get("/invitation/getInvitationsByActId/" + this.actobj.id).then(response=>{
              console.log(response);
              this.invitaionList = response.data.data;
            }).catch(err=>{

            }).finally(()=>{

            })
          }
        }).catch(err=>{

        }).finally(()=>{
          this.$toast.clear();
        })

      }
      
    },
    getScoreItemByStepId(){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let params = {
        stepId:this.stepList[this.activeKey].id
      }
      this.$postQs("/scoreitem/onlyGetScoreItems",params).then(response=>{
        console.log(response);
        if(response == null){
          this.scoreList = [];
        }
        this.scoreList = response.data.data.filter((item,index,arr)=>{
          return item.scoreType === 1
        })
      }).catch(err=>{
        this.scoreList = [];
      }).finally(()=>{
        this.$toast.clear();
      })
    },
    onStepChange(index){
      this.getScoreItemByStepId();
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
      this.stepshow = true;
      this.currentStep = {};
      if(this.currentStep.id == null){
        this.steptitle = "添加环节";
      }else{
        this.steptitle = "编辑环节"
      }
    },
    editStepItem(item){
      // alert("编辑"+item.id)
      this.currentStep = {...item};
      this.stepshow = true;
      if(this.currentStep.id == null){
        this.steptitle = "添加环节";
      }else{
        this.steptitle = "编辑环节"
      }
    },

    addScoreItem(){
      this.scoreshow = true;
      this.currentScoreItem = {};
      if(this.currentScoreItem.id == null){
        this.scoretitle = "添加";
      }else{
        this.steptitle = "编辑"
      }
    },
    editScoreItem(item){
      this.scoreshow = true;
      this.currentScoreItem = {...item};
      if(this.currentScoreItem.id == null){
        this.scoretitle = "添加";
      }else{
        this.scoretitle = "编辑"
      }
    },
    beforeCloseOfAddScoreItem(action, done){
      if (action === 'confirm') {
        this.$refs.formDataOfAddScoreItem.submit();
        done();
      } else {
        done();
      }
    },
    submitOfAddScoreItem(){
      this.currentScoreItem.stepId = this.stepList[this.activeKey].id;
      this.currentScoreItem.scoreType = 1;
      this.$post("/scoreitem",this.currentScoreItem).then(response=>{
        if(response.data.success){
          this.$message.success(this.scoretitle + "成功");
          this.getScoreItemByStepId();
        }
      }).catch(err=>{

      }).finally(()=>{

      })
    },




    deleteStepItem(item){

      this.$dialog.confirm({
        title: '提示',
        message:  `确定删除"${item.title}"这项环节吗？`,
      })
        .then(() => {
          this.$del("/step/"+item.id).then(response=>{
            console.log(response);
            if(response.data.success){
              this.$message.success("删除成功")
            }
          }).catch(err=>{

          }).finally(()=>{
            this.getStepList();
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    deleteScoreItem(item){
      this.$dialog.confirm({
        title: '提示',
        message:  `确定删除"${item.itemName}"这个打分项吗？`,
      })
        .then(() => {
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
          this.$del("/scoreitem/"+item.id).then(response=>{
            if(response.data.success){
              this.$message.success("删除成功");
              this.getScoreItemByStepId();
            }
          }).catch(err=>{

          }).finally(()=>{
            this.$toast.clear();
          })

        })
        .catch(() => {
          // on cancel
        });
    },
    // 提交添加或更新环节
    submitOfAddStep(){
      this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        
      this.currentStep.activateId = this.actobj.id;
      this.$post("/step",this.currentStep).then(response=>{
        console.log(response);
        this.stepList.push(response.data.data);
      }).catch(err=>{

      }).finally(()=>{
        this.$toast.clear();
        this.getStepList();
      })
    }, 
    // 添加或更新环节
    beforeClose(action, done){


      if (action === 'confirm') {
        this.$refs.formData.submit();
        done();
      } else {
        done();
      }
    },



  
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
.acttwofather{
  display: flex;
  border-top: 1px solid #ccc;
}
.acttwofather-right{
  flex-grow: 1;
  // padding: 10px;
}
.score-listfather{
  padding: 20px 5px;
  border-bottom: 1px solid #ccc;
  font-size: 13px;
}


</style>

