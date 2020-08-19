<template>
  <div id="text">
    <van-field v-model="content" :label="label" :placeholder="placeholder" :type="type" @input="handIup" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  props: ['label', 'placeholder', 'type', 'rule'],
  methods: {
    handIup () {
      const rule = new RegExp(this.rule) // eslint-disable-line no-unused-vars

      if (rule.test(this.content)) {
        this.$emit('inputChange', this.content)
      }
    }
  }
}
</script>

<style></style>
