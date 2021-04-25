<template>
  <div class="doctors">

    <!-- <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" v-if="listData.length > 0"> -->
    <mu-load-more :loading="loading" :refreshing="refreshing" @load="load" v-if="listData.length > 0">
      <div v-for="(item,index) in listData" :key="index">
          <!-- <mu-list-item avatar :ripple="false" button :to="'/activate/' + item.id"> -->
          <mu-list-item avatar :ripple="false">
              <!-- 列表项目左侧头像 -->
              <!-- <mu-list-item-action>
                <mu-avatar>
                  <img :src="$global.globalPictureUrl + '/' + item.dImg">
                </mu-avatar>
              </mu-list-item-action> -->
              <!-- 列表项目内容 -->
              <mu-list-item-content>
                <mu-list-item-title><span style="font-size:16px;font-weight:800;">{{item.title}}</span> <span class="subTitleColor">{{item.strone}}</span> </mu-list-item-title>
                <mu-list-item-sub-title>
                  <span style="color: rgba(0, 0, 0, .87)">描述：</span> <span class="subTitleColor">{{item.profile}}</span> 
                  <br>
                  <span style="color: rgba(0, 0, 0, .87)">开始时间：</span> <span class="subTitleColor">{{dateFormat(item.startDate)}}</span>
                  <!-- <br>
                  <van-icon name="friends" color="#1989fabf" style="padding-top:2px;" /> <span class="subTitleColor" style="font-size:12px;vertical-align:top;padding-top:-2px;">{{item.dLimitsNumber}}人预约</span>  -->
                </mu-list-item-sub-title>
              </mu-list-item-content>
              <!-- 列表右侧按钮 -->
              <mu-list-item-action >
                <!-- <mu-list-item-after-text>18hr</mu-list-item-after-text> -->
                <van-button @click="goAct(item)" v-if="showType == 1" type="info" size="small">进入</van-button>
                <van-button @click="editAct(item)" v-if="showType == 2" type="info" size="small">编辑</van-button>
                <van-button v-if="showType == 3" type="info" size="small">编辑</van-button>
                <van-button v-if="showType == 4" type="info" size="small">编辑</van-button>
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
    <h3 v-else style="padding-left:12px;">{{showInfo}}</h3>
    <div style="height:35px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Doctors',
  components: {
    
  },
  props: {
    va: String,
    ty: Number,
    showType:Number
  },
  data(){
    return {
      showInfo:'加载中...',
      refreshing: false,
      loading: false,
      listData:[],
      // 搜索框的值
      value:this.va,
      type:this.ty,
      // 分页
      pageInfo:{
        page:1,
        pageCount:10,
        next:false,
        value:this.va,
        type:this.ty,
        userid:(JSON.parse(this.$store.state.user)).id
      }


    }
  },
  watch:{
      'va':function(){
        this.pageInfo.value = this.va;
        this.refresh();
      },
      'ty':function(){
        this.pageInfo.type = this.ty;
        this.refresh();
      }
  },
  created(){
    this.fetch();
  },
  methods:{
    // 获取数据
    fetch(){
      console.log("fetch Data");
      // console.log("/api/doctor/getdoctors?page="+ this.pageInfo.page +"&pageSize="+ this.pageInfo.pageSize +"&dtId="+ this.type.toString() +"&dName="+ this.value);
      console.log("pageInfo",this.pageInfo);
      this.$post("/activate/getActList", this.pageInfo).then(response => {
          // 响应成功回调
          console.log(response.data);
          // 过滤掉带隐藏属性的活动
          // let arr = response.data.data.records.filter((item,index,arr)=>{
          //   return item.strthree == "1"
          // })
          this.listData = this.listData.concat(response.data.data.records);
          if(response.data.data.current<response.data.data.pages){
            this.pageInfo.next = true;
          }else{
            this.pageInfo.next = false;
          }

          if(this.listData.length == 0){
            this.showInfo = "无数据"
          }

          this.listData = this.listData.map((item,index,arr)=>{
            if(item.strone === "0"){
              item.strone = "未开始"
            }else if(item.strone === "-1"){
              item.strone = "已结束"
            }else {
              item.strone = "进行中"
            }

            return item;
          })

          // this.pageInfo.next = response.data.data.pageDoctorList.hasNextPage;
          // console.log(this.listData);
          // console.log(this.pageInfo.next);
          this.refreshing = false;
          this.loading = false;
        }).catch(err => {
            this.loading = false;
        })
    },
    // 正在刷新
    refresh () {
      this.refreshing = true;
      this.showInfo = "加载中...";
      // this.$refs.container.scrollTop = 0;
      // setTimeout(() => {
      //   this.refreshing = false;
      // }, 2000)
      this.pageInfo.page = 1;
      this.listData = [];
      this.fetch();
    },
    // 正在加载
    load () {
      this.loading = true;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 2000)
      this.pageInfo.page += 1;
      this.fetch();
    },
    // 去预约
    toYuYue:function(id){
      // alert("去预约"+id);
      this.$router.push({path:'/doctor',query:{dId:this.id}});

    },
    dateFormat(value){
      return this.$dateUtil.mToDateStr(value,"yyyy-MM-dd hh:mm")

    },
    goAct(item){
      this.$router.push({name:'activate',params:{actid:item.id}});
    },
    editAct(item){
      this.$router.push({name:'editAct',params:{
        actid:item.id,
        userid:(JSON.parse(this.$store.state.user)).id
        }});
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
