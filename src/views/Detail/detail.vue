<template>
  <div id="detail">
    <top-bar />
    <video-info :info="model.content" />
    <info  :info='model'/>
    <commend />
    <comment />
  </div>
</template>

<script>
import TopBar from '@/components/content/topBar'
import VideoInfo from './children/video'
import info from './children/info'
import commend from './children/commend'
import comment from './children/comment'

import { getArticle } from '@/network/home'

export default {
  data () {
    return {
      model: {
      }
    }
  },
  components: {
    TopBar,
    VideoInfo,
    info,
    commend,
    comment
  },
  watch: {
    $route () {
      this.articleData()
    }
  },
  created () {
    this.articleData()
  },
  methods: {
    async articleData () {
      const id = this.$route.params.id
      const res = await getArticle(id)
      if (res.status !== 200) return this.$toast.fail('获取数据失败')
      this.model = res.data[0]
    }

  }
}
</script>

<style scoped lang="less">
#detail{
  background-color: #fff;
}
</style>
