<template>
  <div>
    <ArticleItem v-for="item in articles" :key="item.art_id" :article="item"></ArticleItem>
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
      articles: []
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
    }
  }
}
</script>

<style></style>
