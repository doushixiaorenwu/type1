<template>
  <div id="user">
    <top-bar :img="model.user_img"></top-bar>
    <img src="../../assets/img/content/123.jpg" alt="" class="bg" />
    <user-info :userimg="model.user_img"></user-info>
    <div class="user-info">
      <h3>{{ model.name }}</h3>
      <p>{{ model.user_desc ? model.user_desc : '这个人很神秘，神秘都没写' }}</p>
    </div>
    <div class="tabel">
      <span>动态</span>
      <span>视频</span>
    </div>
  </div>
</template>

<script>
import UserInfo from './children/UserInfo'
import TopBar from '@/components/content/topBar'
// import { mapMutations } from 'vuex'

import { UserInfoData } from '../../network/login'
export default {
  data () {
    return {
      model: {
        name: '',
        user_img: '',
        user_desc: '',
        gender: ''
      }
    }
  },
  components: {
    UserInfo,
    TopBar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.userInfo()
    }
  },
  methods: {
    async userInfo () {
      const id = window.localStorage.getItem('id')
      const res = await UserInfoData(id)
      if (res.status !== 200) return this.$toast.fail('err')
      this.model = res.data[0]
    }
  }
}
</script>

<style scoped lang="less">
#user {
  height: 100vh;

  .bg {
    width: 100%;
    height: 120px;
    vertical-align: middle;
  }
  .user-info {
    font-size: 0.875rem;
    padding-left: 0.75rem;
    border-bottom: 0.0625rem #ccc solid;
    padding-bottom: 10px;
    h3 {
      margin-bottom: .625rem;
    }
    p {
      color: #c2c2c2;
    }
  }
  .tabel {
    height: 30vh;
    padding: 0.625rem 0.9375rem;
    color: #757575;
    font-size: 0.875rem;
    span {
      margin-right: 16px;
    }
  }

}
</style>
