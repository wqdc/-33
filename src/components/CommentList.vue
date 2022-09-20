<template>
  <div class="article">
    <!-- 评论列表 -->
    <van-cell :title="item.aut_name">
      <!-- 自定义左侧单元格外内容 -->
      <template #icon>
        <van-image :src="item.aut_photo"></van-image>
      </template>
      <!-- 自定义右侧插槽 -->
      <template>
        <van-icon name="good-job-o" />
        <span>赞</span>
      </template>
      <!-- 自定义单元格下方内容 -->
      <template #label>
        <p>{{ item.content }}</p>
        <div class="comment">
          <span>{{ item.pubdate | formDate }}</span>
          <van-button
            type="default"
            size="mini"
            round
            class="btn"
            @click="btn(item)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </template>
      <!-- 评论的评论 -->
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    item: {
      type: Object
    },
    comment: {
      type: Array
    }
  },
  data() {
    return {
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
      this.isTrue =
      this.$emit('comment', i, true)
      // console.log(i)
    }
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
</style>
