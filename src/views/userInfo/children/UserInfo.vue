<template>
  <div id="user-info">
    <div class="left">
      <div class="info">
        <img :src="userimg" alt="" class="bg" v-if="userimg" />
        <img src="@/assets/img/nav/1.jpg" alt="" class="bg" v-else />
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="content">
          <span>0</span>
          <p>粉丝</p>
        </div>
        <div class="content">
          <span>0</span>
          <p>关注</p>
        </div>
        <div class="last content">
          <span>0</span>
          <p>获赞</p>
        </div>
      </div>
      <div class="text" @click="editInfo">编辑资料</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userimg'],
  methods: {
    editInfo () {
      this.$router.push('edit')
    }
  }
}
</script>

<style lang="less" scoped>
#user-info {
  height: 6.875rem;
  display: flex;
  justify-content: space-between;
  .left {
    width: 9.375rem;
    .info {
      width: 6.25rem;
      height: 6.25rem;
      background-size: 100%;
      margin: -0.625rem 0 0 1.25rem;
      .bg {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    .top {
      display: flex;
      justify-content: space-around;
      font-size: 0.875rem;
      .content {
        flex: 1;
        margin: 0.625rem;
        text-align: center;
      }
      .last {
        border-right: none;
      }
      p {
        color: #ccc;
      }
    }
    .text {
      width: 90%;
      height: 1.875rem;
      line-height: 1.875rem;
      text-align: center;
      border: 0.0625rem pink solid;
      color: pink;
      border-radius: 0.3125rem;
    }
  }
}
</style>
