<template>
  <div class="article">
    <!--属性->
    <!-@Load:触底的时候触发Load事件->
    <!-·offset:滚动条和底部距离多少的时候触发Load事件，默认值是380px->
    <!- immediate-check:初渲染的时候是否执oad事件，默认值是true->
    <!-v-modeL="Loading"--
    <!-Loading true,load事件不会被触发->
    <!-Loading为false的时候Load事件会被触发-->
    <!-- <!-Loading会在Load事件执行后，被van-List组件自动设置ture,需要手动的改为时alse-> -->
    <!-- <!-finished:BooLean.false:load事件会被触发true:load事件不会被出发了，并且显示寸inished-text的文本-> -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :error.sync="error"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ActicleItem.vue'
export default {
  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || error.response?.status) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      console.log('getNextPageArticle')
      try {
        const { data } = await getArticles(this.id, this.preTimestamp)
        // 更新数据
        if (!this.preTimestamp) {
          return (this.finished = true)
        }
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally一定会执行
        // 更改loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
