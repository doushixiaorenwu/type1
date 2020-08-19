<template>
  <div id="register">
    <nav-bar>
      <template #center>
        注册账号
      </template>
      <template #right>
         <div  @click="login" class="right">切换登录</div>
      </template>
    </nav-bar>
    <login-text label="姓名" type="text" class="name" placeholder="请输入姓名" rule="^[0-9a-zA-Z_]{6,12}$"  @inputChange="res => (model.name = res)"> </login-text>
    <login-text label="账号" type="text" placeholder="请输入账号" rule="^[0-9a-zA-Z_]{6,12}$"  @inputChange="res => (model.username = res)"> </login-text>
    <login-text label="密码" type="password" placeholder="请输入密码" rule="^[0-9a-zA-Z_]{6,12}$"  @inputChange="res => (model.password = res)"> </login-text>
    <login-bnt text="注册" @requestText="request"></login-bnt>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar/NavBar'
import LoginText from '@/components/common/LoginText/loginText'
import LoginBnt from '@/components/common/LoginBnt/loginBnt'

import { registerText } from '@/network/login.js'
export default {
  data () {
    return {
      model: {
        name: '',
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
      if (rule.test(this.model.name) && rule.test(this.model.username).trim() && rule.test(this.model.password)) {
        const res = await registerText(this.model)
        this.$toast(res.data.msg)
        window.localStorage.setItem('id', res.data.id)
        window.localStorage.setItem('token', res.data.objtoken)
        if (res.status === 200) {
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        }
      } else {
        this.$toast('格式不正确，请重新输入')
      }
    },
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.nav-bar {
  background-color: #fff;
}
.name {
  margin: 1rem 0;
}
.right{
  font-size: 0.625rem;
}
</style>
