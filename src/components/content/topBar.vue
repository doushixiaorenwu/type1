<template>
<div id="top">
     <nav-bar>
      <template #left>
        <img class="left" src="../../assets/img/nav/logo.png" alt="" @click="home" />
      </template>
      <template #center>
        <div>
          <van-icon name="search" class="search" />
          <input class="center" type="text" placeholder="请输入关键词" />
        </div>
      </template>
      <template #right>
        <div class="right">
          <img class="mine" :src="img" alt="" @click="user" v-if="img" />
          <img class="mine" src="../../assets/img/nav/1.jpg" alt="" @click="user" v-else />
          <p @click="$router.push('/login')">登录/注册</p>
        </div>
      </template>
    </nav-bar>
</div>
</template>

<script>
import NavBar from '../../components/common/NavBar/NavBar'

export default {
  props: ['img'],
  components: {
    NavBar
  },
  methods: {
    home () {
      if (this.$route.path === '/home') return this.$toast('强制刷新')
      this.$router.push('/home')
    },
    user () {
      if (this.$route.path === '/user') return this.$toast('强制刷新')
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped lang='less'>
#top{
  background-color: #fff;
  .left {
    height: 2.375rem;
  }
  .center {
    height: 1.875rem;
    width: 90%;
    padding-left: 1.875rem;
    color: #666;
    background-color: #f4f4f4;
    border: none;
    border-radius: 1.25rem;
    font-size: 0.75rem;
  }
  .search {
    transform: translate(1.5625rem, 0.3125rem);
    color: #666;
  }
  .right {
    font-size: 0.75rem;
    .mine {
      width: 1.375rem;
      vertical-align: middle;
      border-radius: 50%;
    }
    p {
      width: 3.4375rem;
      height: 1.5625rem;
      line-height: 1.5625rem;
      background-color: rgb(250, 157, 214);
      display: inline-block;
      color: #fff;
      border-radius: 0.3125rem;
    }
  }
}

</style>
