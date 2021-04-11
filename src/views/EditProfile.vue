<template>
  <div class="editprofile">
    <!-- 头部标题 -->
    <van-nav-bar
      title="修改资料"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <mu-container>
      <el-form ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="80px">

        <el-form-item prop="phone" label="手机号">
          <el-input v-model="addUser.phone" ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="addUser.password"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="姓名">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>

        <van-row type="flex" justify="center">
          <van-col span="20">
            <van-button v-if="!loading" @click="onSubmit" plain hairline round type="info" style="width:100%;margin-top:15px;">更新资料</van-button>
            <van-button v-if="loading" @click="onSubmit" plain hairline loading loading-text="更新中..." round type="info" style="width:100%;margin-top:15px;">更新资料</van-button>
          </van-col>
        </van-row>
        




      </el-form>
    </mu-container>
    
    
    <div style="height:35px;"></div>
  </div>
</template>
<script>
export default {
  name: 'EditProfile',
  components: {
    
  },
  props: {
    va: String,
    ty: Number
  },
  data() {
    // 身份证验证
      var validID = (rule,value,callback)=>
      {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('身份证号码不正确'))
        }
      }
    // 自定义一个手机号验证规则
    var checkMoblie = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('请输入手机号'))
      }
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error('手机号有误！请重填'))
      } else {
        callback()
      }
    }
    return {
      loading:false,
      isShow:true,
      // 上传地址
      submitting:false,
      disabled:false,
      fileList: [{name: (JSON.parse(this.$store.state.user)).pImg, url: this.$global.globalPictureUrl + '/' + (JSON.parse(this.$store.state.user)).pImg}],
      //文件上传的参数
      dialogImageUrl: '',
      dialogVisible: false,
      dialogTableVisible: false, // 添加用户弹框
      // 添加用户
      // addUser: {
      //   username: '',
      //   password: '',
      //   phone: '',
      //   pSex:'男',
      //   pIdCard:'',
      //   pAddress:'',
      //   pImg:''
      // },
      addUser:JSON.parse(this.$store.state.user),
      // 验证规则
      rulesAddUser: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMoblie, trigger: 'blur' }
        ]
      }
    }
  },
  watch:{

  },
  created(){
    console.log(JSON.parse(this.$store.state.user));
  },
  methods:{
    // 返回
    onClickLeft(){
      window.history.back(-1);
    },
    
    // json转form
    objToForm(obj){
      // 解构Object
      let {keys, values, entries} = Object;
      let str = '';
      for(let key of entries(obj)){
        console.log(key);   // ["name", "Tom"] ["sex", "boy"] ["age", 18]
        // /api/patient/editprofile?属性名称=属性值&
        str = str + '&' + key[0] + '=' + key[1];
      };
      str = str.split("");
      str.shift();
      str = str.join("");
      return str;
    },
    // 修改资料
    updateProfile(){
        this.loading = true;
        this.$put("/user", this.addUser).then(response => {
            console.log("===========================");
            console.log(response);

            if (response.data.success) {
                this.addUser = response.data.data;
                let objStr = JSON.stringify(response.data.data);
                this.$store.commit('SET_USER', objStr);

                this.$message({
                    type: 'success',
                    message: response.data.message,
                    duration: 2000
                });
                this.loading = false;
                setTimeout(() => {
                    // TODO 不能用router跳转，否则跳转到的网页无法从vuex取内容
                    // window.location.href='/#/profile';
                    // this.$router.push("/");
                    // alert(document.location.hostname);
                    this.$router.push("/log");
                  }, 1000);
                // this.$router.push("/log");
            } else {
                this.loading = false;
            }

        }).catch(err => {
            this.loading = false;
        })
      
    },
    onSubmit: function() {
      event.preventDefault();
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null  // 如果验证失败就不往下继续执行
        // alert("验证成功执行下一步");
        console.log(this.addUser);
        // this.reg();
        // this.testreg();
        // console.log(this.objToForm(this.addUser));
        this.updateProfile();
      })
    },
    testreg(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000)
    },
    
  },
  mounted(){
    
  }
}
</script>
<style scoped lang="less">

</style>
