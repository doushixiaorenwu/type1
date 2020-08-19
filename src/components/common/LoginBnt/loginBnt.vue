<template>
  <div id="btn" @click="requestText">
    <div class="text"> {{text}}</div>

  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  },
  methods: {
    requestText () {
      this.$emit('requestText')
    }
  }

}
</script>

<style scoped>
.text{
    height: 3.125rem;
    background-color: #ff9db5;
    border-radius: 1.5625rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: .625rem .625rem;
}

</style>
