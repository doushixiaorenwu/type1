<template>
  <div id="info" v-if="Object.keys(info).length !== 0">
    <div class="text">
      <span>{{ info.category.title }}</span>
      <span>{{ info.name }}</span>
    </div>
    <div class="user-info">
      <span>{{ info.userinfo.name }}</span>
      <span>16.5W</span>
      <span>5647</span>
      <span>{{ info.date }}</span>
    </div>
    <div class="content">
      <div class="item">
        <div @click="collection" :class="{ active: success }"><van-icon name="star" /> 收藏</div>
        <div @click="download" :class="{ active: downloadSuc }"><van-icon name="add-square" />关注</div>
        <div><van-icon name="share" />分享</div>
      </div>
      <div class="comment">评论</div>
    </div>
  </div>
</template>

<script>
import { collection, collectionInit, download, downloadInit } from '../../../network/home'
export default {
  data () {
    return {
      success: null,
      downloadSuc: null
    }
  },
  props: ['info'],
  mounted () {
    this.collInit()
    this.subInit()
  },
  watch: {
    $route () {
      this.collInit()
    }
  },

  methods: {
    async collection () {
      const articleId = this.$route.params.id
      const id = localStorage.getItem('id')
      if (localStorage.getItem('token')) {
        const res = await collection(id, articleId)
        console.log(res)
        if (res.data.code == 200) {
          this.success = true
          this.$toast(res.data.msg)
        } else { this.success = false }
      }
    },

    // 接口问题 302
    async collInit () {
      const articleId = this.$route.params.id
      const id = localStorage.getItem('id')
      if (localStorage.getItem('token')) {
        const res = await collectionInit(id, articleId)
        console.log(res)
      }
    },
    async download () {
      const articleId = this.info.userid
      const id = localStorage.getItem('id')
      if (localStorage.getItem('token')) {
        const res = await download(id, articleId)
        console.log(res)
        if (res.data.code == 200) {
          this.downloadSuc = true
          this.$toast(res.data.msg)
        } else { this.downloadSuc = false }
      }
    },
    // 接口问题 302
    async subInit () {
      const articleId = this.info.userid
      const id = localStorage.getItem('id')
      if (localStorage.getItem('token')) {
        const res = await downloadInit(id, articleId)
        console.log(res)
      }
    }
  }
}
</script>

<style scoped lang="less">
#info {
  padding: 0.9375rem;
  .text {
    span:nth-of-type(1) {
      margin: 0 0.7rem;
      color: #fb7299;
      background-color: #f4f4f4;
      border-radius: 25%;
      font-size: 0.875rem;
    }
  }
  .user-info {
    font-size: 0.75rem;
    padding-top: 0.9375rem;
    span:nth-child(1) {
      color: #000;
    }
    span {
      margin: 0 0.6rem;
      color: #c4c5c5;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 0.9375rem;
    font-size: 0.875rem;

    .item {
      display: flex;
      align-items: center;
      .active {
        color: #fb9277;
      }
      div {
        padding-right: 0.9375rem;
      }
    }
  }
}
</style>
