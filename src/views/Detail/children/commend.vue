<template>
  <div id="commend">
    <deil class="item" :detailitem="item" v-for="(item, i) in model" :key="i" />
  </div>
</template>

<script>
import { getCommend } from '@/network/home'

import deil from '../../Home/children/deil'

export default {
  data () {
    return {
      model: {}
    }
  },
  components: {
    deil
  },
  created () {
    this.commenddata()
  },
  watch: {
    $route () {
    //   console.log('123')
      this.commenddata()
    }
  },
  methods: {
    async commenddata () {
      const res = await getCommend()
      if (res.status !== 200) return this.$toast.fail('获取数据失败')

      this.model = res.data
    }
  }
}
</script>

<style scoped lang="less">
#commend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 45%;
    margin: 0.3125rem 0;
  }
}
</style>
