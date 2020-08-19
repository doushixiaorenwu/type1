<template>
  <div id="comment">
    <div class="title">
      <span>评论</span><span>({{ len }})</span>
    </div>
    <div class="userinfo">
      <div class="info">
        <img :src="user.user_img" alt="" v-if="user.user_img" />
        <img src="@/assets/img/nav/1.jpg" alt="" v-else />
      </div>
      <input type="text" placeholder="说点什么呢" v-model="value" ref="commentVal" />
      <button @click="click">发表</button>
    </div>
    <div class="commentItem" v-for="item in data" :key="item.id">
      <div class="top">
        <div class="userImg">
          <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img" />
          <img src="@/assets/img/nav/1.jpg" alt="" v-else />
        </div>
        <div class="content">
          <div class="text">
            <span>{{ item.userinfo.name }}</span>
            <span>{{ item.comment_date }}</span>
          </div>
          <div class="text">{{ item.comment_content }}
            <span class="name" @click="reply(item.comment_id)" >回复</span>
             </div>
          <comment-item :item="item.child"  @reply="reply" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment, conmentData, postComment } from '@/network/home'
import CommentItem from './comentItem'
import { dateFormat } from '@/common/date'
export default {
  components: {
    CommentItem
  },
  data () {
    return {
      user: '',
      data: '',
      len: '',
      value: '',
      comment: {
        comment_content: '',
        comment_date: '',
        parent_id: null,
        article_id: ''

      }

    }
  },

  created () {
    if (localStorage.getItem('token')) {
      this.getDta()
    }
    this.commentInfo()
  },
  methods: {
    async getDta () {
      const id = localStorage.getItem('id')
      const res = await getComment(id)
      if (res.status !== 200) return this.$toast.fail('获取数据失败')
      this.user = res.data[0]
    },
    async click () {
      if (!localStorage.getItem('id') && !localStorage.getItem('token')) return this.$toast.fail('请先登录')
      const date = new Date().getTime()
      this.comment.comment_date = dateFormat(date)
      if (this.value.trim().length !== 0) {
        this.comment.comment_content = this.value
      } else {
        this.$toast.fail('请输入内容')
      }

      this.comment.article_id = this.$route.params.id
      const id = localStorage.getItem('id')
      const res = await postComment(id, this.comment)
      this.value = ''
      this.commentInfo()
      if (res.status !== 200) return this.$toast.fail('发表评论失败')
      this.$toast('发表并评论成功')
    },
    async commentInfo () {
      const id = this.$route.params.id
      const res = await conmentData(id)
      this.len = res.data.length
      const data = this.commemtData(res.data)
      this.data = data
    },
    reply (id) {
      this.comment.parent_id = id
      this.$refs.commentVal.focus()
    },

    //  递归没评论
    commemtData (data) {
      function fn (temp) {
        const arr = []
        for (let i = 1; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
        }
        return arr
      }
      return fn(null)
    }

  },
  filters: {
    dateFormat (val) {
      const date = new Date(val * 1000)
      return dateFormat(date)
    }
  }
}
</script>

<style scoped lang="less">
#comment {
  margin: 0.9375rem 0.7rem 0 1.2rem;

  .title {
    margin-bottom: 0.625rem;
    span:nth-of-type(2) {
      margin-left: 0.9375rem;
      color: #ccc;
    }
  }
  .userinfo {
    margin-bottom: 0.625rem;
    display: flex;
    align-items: center;

    .info {
      width: 2rem;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    input {
      height: 1.875rem;
      margin-left: 0.9375rem;
      background-color: #eee;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      padding: 0 0.625rem;
    }
    button {
      margin-left: 0.9375rem;
      background-color: #ff9db5;
      width: 3rem;
      height: 1.5rem;
      border-radius: 1.5625rem;
    }
  }
  .commentItem {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 0.0625rem solid #eee;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      .userImg {
        margin-left: 0.1rem;
        width: 2.1875rem;
        height: 2.1875rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name{
        color: #5090cc;
      }
      .content {
        flex: 1;
        .text {padding-bottom: .3125rem;
          margin-left: 1rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.3125rem;
        }
      }
    }
  }
}
</style>
