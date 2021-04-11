<template>
  <div class="orderdan">
    <!-- <h3>{{type}}</h3> -->
    <mu-list textline="three-line" style="background-color:white">
      <mu-load-more  :loading="loading" @load="load" v-if="list.length > 0">
        <div v-for="(item,index) in list" :key="index">
            <!-- <mu-list-item avatar :ripple="false" button v-on:click="toYuYue(item.id)"> -->
            <!-- <mu-list-item avatar :ripple="false" button :to="'/doctor/' + item.id"> -->
            <mu-list-item avatar :ripple="false" button :to="'/orderprofilee/' + item.registration.rId">
                <!-- 列表项目左侧头像 -->
                <mu-list-item-action>
                  <mu-avatar>
                    <img :src="$global.globalPictureUrl + '/' + item.dtDoctor.dImg">
                  </mu-avatar>
                </mu-list-item-action>
                <!-- 列表项目内容 -->
                <mu-list-item-content>
                  <mu-list-item-title>{{item.dtDoctor.dName}} &nbsp;<span style="font-size:14px;">{{item.dtDoctor.title.tName}}</span> </mu-list-item-title>
                  <mu-list-item-sub-title>
                    <span style="color: rgba(0, 0, 0, .87)">坐诊：</span> <span class="subTitleColor">{{item.dtDoctor.department.dtName}}</span> 
                    <br>
                    <span style="color: rgba(0, 0, 0, .87)">就诊日期：</span> <span class="subTitleColor">{{dateFormatter(item.registration.rDate)}}</span>
                    
                  </mu-list-item-sub-title>
                </mu-list-item-content>
                <!-- 列表右侧按钮 -->
                <mu-list-item-action >
                  <!-- <mu-list-item-after-text>18hr</mu-list-item-after-text> -->
                  <van-button type="info" size="small">查看</van-button>
                  <br>
                </mu-list-item-action>

            </mu-list-item>
          <van-divider :hairline="false" />
        </div>
        <!-- 没有数据了 -->
        <p v-if="!pageInfo.next" class="nulldata">——我是有底线的——</p>
      
        <button v-if="pageInfo.next && !loading" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="load()">点击加载更多</button>

        <!-- load -->
        <!-- <div v-if="loading" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div> -->
      </mu-load-more>
      <h3 v-else style="padding-left:12px;">
        {{showInfo}}
      </h3>
    </mu-list>
  </div>
</template>
<script>
export default {
  name: 'Orderdan',
  components: {
    
  },
  props: {
    va: String,
    ty: Number
  },
  data(){
    return {
      showInfo:'加载中...',
      refreshing: false,
      loading: false,
      // 列表json数组
      list:[],
      // 搜索框的值
      value:'',
      type:this.ty,
      // 分页
      pageInfo:{
        pageNum:1,
        pageSize:5,
        next:false
      }
    }
  },
  watch:{
    // 'va':function(){
    //     this.value = this.va;
    //     // alert(this.value);
    //     this.refresh();
    //   },
    //   'ty':function(){
    //     this.type = this.ty;
    //     alert(this.type);
    //     console.log(this.type);
    //     this.refresh();
    //   }
  },
  created(){
    // alert(this.type);
    this.fetch();
  },
  methods:{
    // 日期格式化
    dateFormatter (time) {
        let datetime = time;
        if(datetime){
            return datetime.slice(0,10);
        }
        return ''
    },
    // 获取数据
    fetch(){
      this.loading = true;
      console.log("fetch Data");
      console.log("/api/order/getorders?pId=" + (JSON.parse(this.$store.state.user)).pId + "&pageNum=" + this.pageInfo.pageNum +"&pageSize="+ this.pageInfo.pageSize + "&rStatus=" + this.type);
      this.$http.get("/api/order/getorders?pId=" + (JSON.parse(this.$store.state.user)).pId + "&pageNum=" + this.pageInfo.pageNum +"&pageSize="+ this.pageInfo.pageSize + "&rStatus=" + this.type).then(response => {
          // 响应成功回调
          console.log(response.data);

          // this.list = response.data.data.pageOrderList.list;
          // console.log(this.list);
          (response.data.data.pageOrderList.list).forEach((item, index) => {
            this.list.push(item);
          })

          if(this.list.length == 0){
            this.showInfo = "无数据";
          }
          
          this.loading = false;
          this.refreshing = false;
          // this.next = response.data.data.pageOrderList.hasNextPage;
          if((response.data.data.pageOrderList.list).length < this.pageInfo.pageSize){
            this.pageInfo.next = false;
          }else{
            this.pageInfo.next = true;
          }
        }),
        function(response) {
          // 响应错误回调
          alert("服务器开小差了");
        };
    },
    // 正在刷新
    refresh () {
      this.refreshing = true;
      // this.$refs.container.scrollTop = 0;
      // setTimeout(() => {
      //   this.refreshing = false;
      // }, 2000)
      this.list = [];
      console.log("list========================");
      console.log(this.list);
      this.loading = true;
      this.pageInfo.pageNum = 1;
      this.fetch();
    },
    // 正在加载
    load () {
      this.loading = true;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 2000)

      this.pageInfo.pageNum += 1;
      this.fetch();
    },
    // 去预约
    toYuYue:function(id){
      // alert("去预约"+id);
      this.$router.push({path:'/doctor',query:{dId:this.id}});

    },
  },
  mounted(){
    
  }
}
</script>
<style scoped lang="less">
// 次要信息文字颜色
  .subTitleColor{
    color: #8B95A3;
  }
  .nulldata{
    text-align: center;
    color: #333;
    line-height: 30px;

  }
</style>