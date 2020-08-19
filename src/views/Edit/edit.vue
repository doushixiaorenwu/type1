<template>
  <div id="edit" v-if="Object.keys(this.model).length !== 0">
    <top-bar class="bar"></top-bar>
    <edit-info left="头像" class="left"
      ><template #right>
        <van-uploader :after-read="afterRead" preview-size="2.1875rem" class="uploader"/>
        <img class="mine" :src="model.user_img" alt="" v-if="model.user_img"/>
        <img class="mine" src="../../assets/img/nav/1.jpg" v-else alt=""
      /></template>
    </edit-info>
    <edit-info left="昵称" @bannerClick="show = true"
      ><template #right> {{ model.name }} </template></edit-info
    >
    <edit-info left="账号"
      ><template #right> {{ model.username }} </template></edit-info
    >
    <edit-info left="性别" @bannerClick="gendershow = true"
      ><template #right> {{ model.gender }} </template></edit-info
    >
    <edit-info left="出生日期"><template #right></template></edit-info>
    <edit-info left="个性签名" @bannerClick="textshow = true"
      ><template #right> {{ model.user_desc }}</template></edit-info
    >
    <van-dialog v-model="show" title="昵称" show-cancel-button @confirm="confirmName" @cancel="cancelVau">
      <van-field v-model="value" placeholder="请修改昵称" autofocus />
    </van-dialog>
    <van-dialog v-model="textshow" title="个性签名" show-cancel-button @confirm="confirmText" @cancel="cancelVau">
      <van-field v-model="value" placeholder="请修改个性签名" type="textarea" autofocus />
    </van-dialog>
    <van-action-sheet v-model="gendershow" :actions="actions" cancel-text="取消" close-on-click-action @select="onSelect" />
    <login-bnt text="返回个人中心" @requestText="mine"></login-bnt>
  </div>
</template>

<script>
import TopBar from '@/components/content/topBar'
import EditInfo from './children/EditInfo'
import LoginBnt from '@/components/common/LoginBnt/loginBnt'

import { UserInfoData } from '@/network/login'
import { Uploaderimg, UserUpdat } from '@/network/edit'

export default {
  data () {
    return {
      model: {
        name: '',
        user_img: '',
        user_desc: '',
        gender: ''
      },
      textshow: false,
      show: false,
      gendershow: false,
      value: '',
      actions: [
        { name: '男', val: '1' },
        { name: '女', val: '2' }
      ],
      pattern: /^[0-9a-zA-Z_]{1,16}$/
    }
  },
  components: {
    TopBar,
    EditInfo,
    LoginBnt
  },

  methods: {
    async userInfo () {
      const id = window.localStorage.getItem('id')
      const res = await UserInfoData(id)
      if (res.status !== 200) return this.$toast.fail('err')

      this.model = res.data[0]
      console.log(res)
    },
    afterRead (file) {
      const fromdata = new FormData()
      fromdata.append('file', file.file)
      Uploaderimg(fromdata).then(res => {
        this.model.user_img = res.data.url
      })
      this.EditData()
    },
    EditData () {
      UserUpdat(localStorage.getItem('id'), this.model).then(res => {
        if (res.status === 200) {
          this.$toast('修改成功')
        }
      })
    },
    confirmName () {
      if (this.pattern.test(this.value)) {
        this.model.name = this.value
        this.EditData()
      }

      this.value = ''
    },
    confirmText () {
      this.model.user_desc = this.value
      this.EditData()
      this.value = ''
    },

    cancelVau () {
      this.value = ''
    },
    onSelect (item) {
      console.log(item)
      this.model.gender = item.name
      this.EditData()
      this.gendershow = false
    },
    mine () {
      this.$router.push('/user')
    }
  },

  created () {
    this.userInfo()
  }
}
</script>

<style scoped lang="less">
#edit {
  height: 100vh;
  background-color: #f4f4f4;

  .bar {
    margin-bottom: 0.9375rem;
  }
  .left {
    position: relative;
    .uploader {
      position: absolute;
      opacity: 0;
    }
  }
  .mine {
    width: 2.1875rem;
    border-radius: 50%;
  }
}
</style>
