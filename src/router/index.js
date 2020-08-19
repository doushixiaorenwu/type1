import Vue from 'vue'
import VueRouter from 'vue-router'
const Register = () => import('@/views/Register/register.vue')
const Login = () => import('@/views/login/login.vue')
const UserInfo = () => import('@/views/userInfo/user.vue')
const Edit = () => import('@/views/Edit/edit.vue')
const Home = () => import('@/views/Home/home.vue')
const Detail = () => import('@/views/Detail/detail.vue')
const EditHome = () => import('@/views/Home/children/edithome.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/user',
    component: UserInfo
  },
  {
    path: '/edit',
    component: Edit,
    meta: {
      istoken: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/article/:id',
    component: Detail
  },
  {
    path: '/edithome',
    component: EditHome
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // if (to.path === '/login') return next()

  const token = window.localStorage.getItem('token')
  const id = window.localStorage.getItem('id')
  if (!token && !id && to.meta.istoken) {
    next('/login')
    Vue.prototype.$toast.fail('请重新登录!')
  } else {
    next()
  }
})
export default router
