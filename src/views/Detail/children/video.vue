<template>

  <div>
      <div class="article">
        <video :src="info" controls></video>
      </div>
  </div>
</template>

<script>
export default {
  props: ['info']

}
</script>

<style scoped lang="less">
.article{
  width: 100%;
  video{
    width: 100%;
  }
}

</style>
