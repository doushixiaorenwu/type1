<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center">首页</slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.nav-bar{
    display: flex;
    height: 2.75rem;
    text-align: center;
    line-height: 2.75rem;
}
.left{
    width:4rem;

}
.right{
    width:5rem;

}
.center{
    flex: 1;
}

</style>
