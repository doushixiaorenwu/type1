<template>
  <div id="edit-info">
    <div class="info" @click="bannerClick">
      <span>{{ left }}</span
      ><span><slot name="right">
        </slot></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['left'],
  methods: {
    bannerClick () {
      this.$emit('bannerClick')
    }
  }
}
</script>

<style scoped lang="less">
.info {
  padding: 0.625rem 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items:center;
  border-bottom: 0.0625rem #f3f3f3 solid;
  font-size: 0.875rem;
  span {
    margin: 0 1.25rem;
    color: #555;
  }
}
</style>
