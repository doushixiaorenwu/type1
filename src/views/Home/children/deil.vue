<template>
  <div id="deil" @click="article">
    <div class="deil">
      <div class="text">
        <img :src="detailitem.img" alt="" />
        <span class="video">
          <van-icon name="todo-list-o" />
          132
        </span>
        <span class="conent">
          <van-icon name="play-circle-o" />
          {{ detailitem.commentlen ? detailitem.commentlen : 123 }}
        </span>
      </div>
      <p>{{ detailitem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detailitem'],
  methods: {
    article () {
      const id = this.detailitem.id
      if (this.$route.path !== `/article/${id}`) {
        this.$router.push(`/article/${id}`)
      } else {
        this.$toast('强制刷新')
      }
    }
  }
}

</script>

<style scoped lang="less">
#deil {
  .deil {
    font-size: 0.75rem;
    img {
      width: 100%;
    }
    .text {
      font-size: 1rem;
      position: relative;
      .video {
        position: absolute;
        left: 0.3125rem;
        bottom: 0.3125rem;
      }
      .conent {
        position: absolute;
        right: 0.3125rem;
        bottom: 0.3125rem;
      }
    }
  }
}
</style>
