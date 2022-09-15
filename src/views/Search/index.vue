<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        show-action
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
      <!-- 搜索历史/建议/结果 -->
      <!-- <search-history></search-history>
      <search-suggestion></search-suggestion>
      <search-result></search-result> -->
      <component
        :is="componentName"
        :keywords="keywords"
        @change-keywords="onSearch"
      ></component>
    </form>
  </div>
</template>

<script>
import SearchHistroy from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistroy,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistroy'
      }
      if (this.isShowSearchResult) {
        return SearchResult
      }
      return SearchSuggestion
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      this.keywords = keywords
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
// class和style的特殊性
//  - vue自动帮你把class和style合并到组件的根节点上
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
