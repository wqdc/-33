<template>
  <div class="article">
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      open
    >
      <van-nav-bar
        :title="`${items.reply_count}条回复`"
        left-arrow
        @click-left="btns"
      ></van-nav-bar>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        offset
      >
        <comment-list :item="items"></comment-list>
        <van-cell title="全部评论" />
        <comment-list
          v-for="(item, index) in son"
          :key="index"
          :item="item"
        ></comment-list>
        <div class="btns">
          <van-button
            size="large"
            :style="{ color: '#ccc' }"
            round
            @click="publish"
            >写评论</van-button
          >
        </div>
      </van-list>
      <article-return
        v-if="isShow"
        :isShow="isShow"
        :article="id"
        @chang-state="btn"
      :art_id="art_id" ></article-return>
    </van-popup>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList.vue'
import ArticleReturn from './ArticleReturn.vue'
// import { setCommentAPI } from '@/api'
export default {
  name: 'list',
  components: { CommentList, ArticleReturn },
  props: {
    items: {
      type: Object
    },
    isTrue: {
      type: Boolean
    },
    id: {
      tpre: String
    },
    son: {
      tpre: Array
    },
    arr: {
      tpre: Array
    },
    // 文章id
    art_id: {
      type: String
    }
  },
  data() {
    return {
      show: true,
      message: '',
      item: '',
      isShow: false,
      finished: false,
      loading: false,
      last_id: ''
    }
  },
  methods: {
    publish() {
      // console.log(this.isShow)
      this.isShow = true
    },
    async btn(i, obj) {
      this.isShow = i
      this.$emit('updata', obj)
    },
    onLoad() {
      console.log(this.arr)
      if (
        this.arr.data.data.results === 0 ||
        this.data.last_id === this.arr.data.end_id
      ) {
        this.finished = true
      }
    },
    btns() {
      this.show = false
      this.$emit('return', this.show)
    }
  },
  async created() {
    // this.show = this.isTrue
    this.item = this.items
    // console.log(this.item)
    console.log(this.id)
  }
}
</script>

<style lang="less" scoped>
:deep(.article) {
  padding: 54px 0;
  font-size: 24px;
}
.van-image {
  width: 70px !important;
  margin-right: 30px;
  height: 70px;
  border-radius: 50%;
}
.comment {
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  .van-button__text {
    text-align: center;
    line-height: 48px;
    width: 135px;
    height: 48px;
  }
  span {
    margin-right: 0px;
  }
  :deep(.van-button--mini) {
    padding: 0;
  }
}
.btns {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 102px;
  text-align: center;
  background-color: #ccc;
  :deep(.van-button--large) {
    margin-top: 5px;
    color: #000;
    height: 90px;
    width: 80%;
  }
}
</style>
