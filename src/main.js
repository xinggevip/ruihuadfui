import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Global from './components/Global'


// import mdui from 'mdui'

// 引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入museui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);

// 导入封装的axios
import {get,post,postQs,put} from "./utils/api";
import {strUtil,arrUtil,dateUtil} from "./utils/utils";

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put

Vue.prototype.$strUtil = strUtil
Vue.prototype.$arrUtil = arrUtil
Vue.prototype.$dateUtil = dateUtil
// post参数会自动序列化
Vue.prototype.$postQs = postQs
Vue.prototype.$global = Global;
// 使用museui
Vue.use(MuseUI);
// 使用vant组件
Vue.use(Vant);
Vue.use(ElementUI);

Vue.config.productionTip = false

// http://shitz.cn:8181


router.beforeEach((to, from, next) => {
  const token = store.state.token;
  
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next();
    } else {
      console.log('该页面需要登陆');
      next('/logreg');
      // next();
    }
  } else {
    next();
  }


})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
