<template>
  <div class="log">
    <!-- 头部标题 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <mu-container>
      <el-form ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="80px">
        
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="addUser.phone"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="addUser.password"></el-input>
        </el-form-item>

      </el-form>
    </mu-container>

    <van-row type="flex" justify="center">
      <van-col span="20">
        <van-button v-if="!loading" round type="info" style="width:100%;" @click="onSubmit">登录</van-button>
        <van-button v-if="loading" loading loading-text="登录中..." round type="info" style="width:100%;">登录</van-button>
      </van-col>
    </van-row>

  </div>
</template>
<script>
export default {
  name: 'log',
  components: {
    
  },
  props: {
    va: String,
    ty: Number
  },
  data(){
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
      // 用户
      addUser: {
        password: '',
        phone: '',
        
      },
      // 验证规则
      rulesAddUser: {
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
    
  },
  methods:{
    login(){
      this.loading = true;
          this.$post("/user/login",this.addUser).then(response => {
              console.log(response.data);
                if(response.data.success){
                  let objStr = JSON.stringify(response.data.data);
                  this.$store.commit("SET_TOKEN", "123");
                  this.$store.commit("SET_USER", objStr);
                  this.$message.success("登陆成功");
                  // console.log(this.$store.state.username+111111)
                  setTimeout(() => {
                    // TODO 不能用router跳转，否则跳转到的网页无法从vuex取内容
                    window.location.href='/';
                    // this.$router.push("/");
                    // alert(document.location.hostname);
                  }, 1000);
                }else{
                  this.loading = false;
                }
              

          }).catch(err => {
            this.loading = false;
          })
    },
    testLogin(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/");
      }, 2000)
    },
    onSubmit() {
      // console.log('submit!');
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null  // 如果验证失败就不往下继续执行
        console.log(this.addUser);
        this.login();
        // this.testLogin();
      })
    },
    // 返回
    onClickLeft(){
      window.history.back(-1);
    },
  },
  mounted(){
    
  }
}
</script>
<style scoped lang="less">

</style>
