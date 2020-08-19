<template>
  <div id="home" v-if="Object.keys(category).length !==0">
    <top-bar />
    <div class="parent">
      <van-tabs v-model="active" syicky>
        <van-tab v-for="item in category" :key="item._id" :title="item.title">
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
            <div class="detail">
              <detail-item class="detailitem" :detailitem="item1" v-for="(item1, i) in item.list" :key="i"> </detail-item>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
      <van-icon class="icon" name="setting-o" @click="$router.push('/edithome')" />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/content/topBar'
import DetailItem from './children/deil'

import { getCategory, detailData } from '@/network/home'
export default {
  data () {
    return {
      category: [],
      active: 0
    }
  },
  components: {
    TopBar,
    DetailItem
  },
  watch: {
    active () {
      this.selectArticle()
    }
  },

  created () {
    this.selectCategory()
  },
  activated () {
    if (localStorage.getItem('add')) {
      const category = JSON.parse(localStorage.getItem('add'))
      this.changCategory(category)
    }
  },

  methods: {
    async selectCategory () {
      if (localStorage.getItem('add')) {
        return
      }
      const res = await getCategory()
      if (res.status !== 200) return this.$toast.fail('获取数据失败')
      this.changCategory(res.data)
    },

    changCategory (data) {
      const category1 = data.map((item, index) => {
        item.list = []
        item.page = 0
        item.pagesize = 10
        item.loading = false
        item.finished = false
        return item
      })
      this.category = category1
      this.selectArticle()
    },
    categoryItem () {
      const categoryItem = this.category[this.active]
      return categoryItem
    },
    async selectArticle () {
      const categoryItem = this.categoryItem()
      const id = categoryItem._id
      const page = (categoryItem.page += 1)
      const pagesize = categoryItem.pagesize
      const res = await detailData(id, page, pagesize)
      categoryItem.list.push(...res.data)
      categoryItem.loading = false
      if (res.data.length < categoryItem.pagesize) {
        categoryItem.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.selectArticle()
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
#home {
  background-color: #fff;
  .parent {
    position: relative;
    .icon {
      position: absolute;
      z-index: 5;
      right: 0;
      top: 1.944vw;
      padding: 0.3125rem 0.625rem;
      background-color: white;
    }
  }
}
.detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    width: 45%;
    margin: 0.3125rem 0;
  }
}
</style>
