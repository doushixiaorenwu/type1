<template>
  <div>
    <top-bar />
    <van-divider dashed class="line">现有栏目</van-divider>
    <div class="topBox">
      <span class="item" v-for="(item, i) in model" :key="item._id" @click="sub(i)">{{ item.title }} </span>
    </div>
    <van-divider dashed hairline class="subline">已删除栏目</van-divider>
    <div class="topBox">
      <span class="subitem" v-for="(item,i) in submodel" :key="item._id" @click="add(i)">{{ item.title }} </span>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/content/topBar'
import { getCategory } from '@/network/home'

export default {
  data () {
    return {
      model: [],
      submodel: []
    }
  },
  components: {
    TopBar
  },
  created () {
    if (localStorage.getItem('add') && localStorage.getItem('sub')) {
      this.model = JSON.parse(localStorage.getItem('add'))
      this.submodel = JSON.parse(localStorage.getItem('sub'))
      return
    }
    this.getdata()
  },
  watch: {
    model () {
      localStorage.setItem('add', JSON.stringify(this.model))
      localStorage.setItem('sub', JSON.stringify(this.submodel))
    }
  },
  methods: {
    async getdata () {
      const res = await getCategory()
      this.model = res.data
    },
    sub (i) {
      if (this.model.length <= 3) return this.$toast.fail('不能少于3个标签')
      this.submodel.push(this.model[i])
      this.model.splice(i, 1)
    },
    add (i) {
      this.model.push(this.submodel[i])
      this.submodel.splice(i, 1)
    }
  }
}
</script>

<style scoped lang="less">
.line {
  border-color: #1989fa;
  color: #1989fa;
  padding: 0 1rem;
}
.subline {
  border-color: red;
  color: red;
  padding: 0 1rem;
}
.topBox {
  padding: 0 1.25rem;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 20%;
    padding: 0.5rem 0;
    margin: 0.5rem 0.5rem;
    text-align: center;
    border: 2px solid #1989fa;
    color: #1989fa;
  }
  .subitem {
    width: 20%;
    padding: 0.5rem 0;
    margin: 0.5rem 0.5rem;
    text-align: center;
    border: 2px solid red;
    color: red;
  }
}
</style>
