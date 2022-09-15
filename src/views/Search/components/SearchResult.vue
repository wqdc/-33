<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了~~~"
    >
      <van-cell
        :title="item.title"
        v-for="item in result"
        :key="item.art_id"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perpeg: 10,
      result: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        if (Math.random() < 0.4) {
          throw new Error()
        }
        const { data } = await getResultAPI(
          this.page++,
          this.perpag,
          this.keywords
        )
        // 进行判断  如果请求回来的数据是空数组那么，为已加载完成的状态，                            结束触底事件
        if (data.data.results.length === 0) {
          this.finished = true
        }
        // console.log(data)
        // 保存数据
        this.result = [...this.result, ...data.data.results]
        // this.loading = false
      } catch {
        this.error = true
      } finally {
        // 不管成功还是失败都会触发这个事件
        // 关闭loading 触底事件
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// overlay 用法基本上与 auto 相同
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
