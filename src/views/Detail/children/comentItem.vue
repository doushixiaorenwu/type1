<template>
  <div>
    <div class="commentItem" v-for="item in item" :key="item.id">
      <div class="top">
        <div class="userImg">
          <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img" />
          <img src="@/assets/img/nav/1.jpg" alt="" v-else />
        </div>
        <div class="content">
          <div class="text">
            <span v-if="item.userinfo.name">{{ item.userinfo.name }}</span>
            <span v-else>名字在哪里</span>
            <span>{{ item.comment_date }}</span>
          </div>
          <div class="text" v-if="!temp">
            {{ item.comment_content }}
            <span class="name" @click="reply(item.comment_id)" >回复</span>

          </div>
          <div class="text" v-else>
            回复 <span class="name">{{ item.parent_user_info.name }} </span>：{{ item.comment_content }} <span class="name" @click="reply(item.comment_id)" >回复</span>
          </div>
        </div>
      </div>
       <comment-item :item="item.child" :temp="true"  @reply="replyItem"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentItem',
  props: ['item', 'temp'],
  methods: {
    // 一级一级网上传
    reply (id) {
      this.$emit('reply', id)
    },
    replyItem (id) {
      this.reply(id)
      console.log(id)
    }
  }
}
</script>

<style scoped lang="less">
.name {
  color: #5090cc;
}
.commentItem {
  margin: .3125rem 0;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    .userImg {
      width: 2.1875rem;
      height: 2.1875rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      .text {
        margin-left: 1rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3125rem;
      }
    }
  }
}
</style>
