<template>
  <div class="profile">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      
      <div class="header">
        <!-- <van-image
          round
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          :src="$global.globalPictureUrl + '/' + (JSON.parse(this.$store.state.user)).pImg"
          style="margin:30px 15px;vertical-align: middle;"
        /> -->
        <div class="touxaing">
          {{user.username}}
        </div>
        <span style="color:white;font-size:18px;" v-if="this.$store.state.user != null">{{(JSON.parse(this.$store.state.user)).pName}}</span>
        <!-- <van-button to="/editprofile" icon="edit" type="primary" style="width:40px;padding:2px;" color="transparent" /> -->
        <van-button to="/editprofile" icon="setting-o" size="large" color="transparent" type="primary" style="width:50px;position: absolute;right:0px;px;top:0px;" />
      </div>

      <van-grid>
        <van-grid-item icon="orders-o" text="创建活动" :to="'/user/' + user.id + '/createact/'" />
        <van-grid-item icon="notes-o" text="使用文档" to="/report" />
        <van-grid-item icon="contact" text="我的资料" to="/editprofile" />
        <van-grid-item icon="photo-o" text="帮助反馈" @click="duihua()" />
      </van-grid>

      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="退出登录" @click="logout" is-link value="" />
      
    </van-pull-refresh>

  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      isLoading: false,
      user:JSON.parse(this.$store.state.user),
    }
  },

  methods: {
    // 对话框
    duihua(){
      // alert("design by 时同展、高星");
      this.$dialog.alert({
        message: '今天天气不错'
      });
    },
    // 退出登录
    logout(){
      // alert("退出登录");
        this.$store.commit('LOGOUT');
        this.$message.success("已退出登录");
        setTimeout(()=>{
          this.$router.push("/logreg");
        }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.user = JSON.parse(this.$store.state.user)
        this.count++;
      }, 500);
    }
  }
}
</script>

<style scoped lang="less">
.header{
  // border: 1px solid red;
  height: 2.5rem;
  background:url("https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g5/M00/00/03/ChMkJ1fJVdOIZQCkAAEj1gG24A0AAU96AGvZNoAASPu070.jpg") no-repeat;
  background-size: 100% ;
  // padding-bottom: 15%;


}
.touxaing{
  position: relative;
  left: .2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  padding: .125rem;
  font-size: .25rem;
  line-height: 1.25rem;
  text-align: center;
  border-radius: 50% 50%;
  border: 1px solid #ccc;
  background-color: rgba(225, 64, 246, 0.15);
}
</style>
