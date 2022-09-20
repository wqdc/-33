<template>
  <div class="article">
    <!-- 评论列表 -->
<comment-list :item="list" ></comment-list>
      <!-- 评论的评论 -->
    <article-load
      :list="items"
      v-if="isTrue"
      :isTrue="isTrue"
      :id="items.aut_id"
    ></article-load>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
// import { getcommentAPI } from '@/api'
import ArticleLoad from './ArticleLoad.vue'
import CommentList from '@/components/CommentList.vue'
export default {
  components: { ArticleLoad, CommentList },
  props: {
    id: {
      type: String
    },
    list: {
      type: Object
    }
  },
  data() {
    return {
      comment: [],
      timer: '',
      isTrue: false,
      items: {}
    }
  },
  filters: {
    formDate(value) {
      return dayjs(value).fromNow()
    }
  },
  methods: {
    btn(i) {
      this.isTrue = true
      this.items = this.comment[i]
    }
  }
  // async created() {
  //   const res = await getcommentAPI('a', this.id)
  //   if (res.status === 200) {
  //     this.comment = res.data.data.results
  //   }
  //   console.log(this.isTrue)
  // }
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
</style>
