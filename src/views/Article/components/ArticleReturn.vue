<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '15%' }"
      class="content"
      @click-overlay="btn"
    >
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        class="board"
      />
      <p @click="giveout">发布</p>
    </van-popup>
  </div>
</template>

<script>
import { setCommentAPI } from '@/api'
export default {
  props: {
    isShow: {
      type: Boolean
    },
    article: {
      type: String
    },
    // 文章id 用来判断是那个文章的评论
    art_id: {
      type: String
    }
  },
  data() {
    return {
      message: '',
      show: false
    }
  },
  methods: {
    async giveout() {
      this.$toast.loading({
        title: '发布中'
      })
      const res = await setCommentAPI(this.article, this.message, this.art_id)
      // console.log({ res })
      const data = res.data.data.new_obj
      this.$toast.success('发布成功')
      this.show = false
      this.$emit('chang-state', this.show, data)
    },
    btn() {
      this.show = false
      this.$emit('chang-state', this.show)
    }
  },
  created() {
    this.show = this.isShow
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  align-items: center;
  .board {
    width: 600px;
    height: 160px;
    margin: 0 auto;
    background-color: #f5f7f9;
  }
  p {
    font-size: 30px;
    padding-right: 30px;
    color: #c4daef;
  }
}
</style>
