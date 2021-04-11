import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../components/Index.vue'
import Order from '../components/Order.vue'
import Report from '../components/Report.vue'
import Profile from '../components/Profile.vue'
import AllDoctor from '../components/AllDoctor.vue'
import Disease from '../components/Disease.vue'
import Doctor from '../components/Doctor.vue'
import LogReg from '../views/LogReg.vue'
import Log from '../views/Log.vue'
import Reg from '../views/Reg.vue'
import Choice from '../components/Choice.vue'
import SubmitAppointment from '../components/SubmitAppointment.vue'
import OrderProfile from '../components/OrderProfile.vue'
import OrderProfilee from '../components/OrderProfilee.vue'
import EditProfile from '../views/EditProfile.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:'/',
    children:[
      {
        path:'/',
        name:'index',
        component:Index,
        meta:{
          requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/order',
        name:'order',
        component:Order,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/report',
        name:'report',
        component:Report,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/profile',
        name:'profile',
        component:Profile,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/alldoctor/:typeid',
        name:'alldoctor',
        component:AllDoctor,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/disease',
        name:'disease',
        component:Disease,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/doctor/:dId',
        name:'doctor',
        component:Doctor,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/choice',
        name:'choice',
        component:Choice,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/submitappointment',
        name:'submitappointment',
        component:SubmitAppointment,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/orderprofile/:rid',
        name:'orderprofile',
        component:OrderProfile,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path:'/orderprofilee/:rid',
        name:'orderprofilee',
        component:OrderProfilee,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      }

    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/logreg',
    name:'logreg',
    component:LogReg
  },
  {
    path:'/log',
    name:'log',
    component:Log
  },
  {
    path:'/reg',
    name:'reg',
    component:Reg
  },
  {
    path:'/editprofile',
    name:'editprofile',
    component:EditProfile,
    meta:{
      requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
