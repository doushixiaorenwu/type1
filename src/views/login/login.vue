<template>
  <div id="login">
    <nav-bar>
      <template #center>
        登录账号
      </template>
       <template #right>
         <div  @click="register" class="right">切换注册</div>
      </template>
    </nav-bar>
    <login-text label="账号" type="text" placeholder="请输入账号" rule="^[0-9a-zA-Z_]{6,12}$" @inputChange="res => (model.username = res)"> </login-text>
    <login-text label="密码" type="password" placeholder="请输入密码" rule="^[0-9a-zA-Z_]{6,12}$" @inputChange="res => (model.password = res)"> </login-text>
    <login-bnt text="登录" @requestText="request"></login-bnt>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar/NavBar'
import LoginText from '@/components/common/LoginText/loginText'
import LoginBnt from '@/components/common/LoginBnt/loginBnt'

import { loginText } from '@/network/login.js'
export default {
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    NavBar,
    LoginText,
    LoginBnt
  },
  methods: {
    async request () {
      const rule = /^[0-9a-zA-Z_]{6,12}$/
      if (rule.test(this.model.username) && rule.test(this.model.password)) {
        const res = await loginText(this.model)
        this.$toast(res.data.msg)
        window.localStorage.setItem('id', res.data.id)
        window.localStorage.setItem('token', res.data.token)
        console.log(res)
        if (res.data.code === 200) {
          // const id = localStorage.getItem('id')
          setTimeout(() => {
            this.$router.push('/user')
          }, 1000)
        }
      } else {
        this.$toast('格式不正确，请重新输入')
      }
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>

.nav-bar {
  background-color: #fff;
  margin-bottom: 1rem;
}
.right{
  font-size: 0.625rem;
}

</style>
