<template>
  <div>
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
      @click="
        $router.push({
          path: '/article',
          query: {
            articleId: article.art_id
          }
        })
      "
    />
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
      @click="
        $router.push({
          path: '/article',
          query: {
            articleId: article.art_id
          }
        })
      "
    >
      <van-image width="100" height="100" :src="article.cover.images[0]" />
    </van-cell>
    <van-cell
      v-else-if="article.cover.type === 3"
      :title="article.title"
      :label="label"
      @click="
        $router.push({
          path: '/article',
          query: {
            articleId: article.art_id
          }
        })
      "
    >
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          width="100"
          height="100"
          :src="item"
          @click="
            $router.push({
              path: '/article',
              query: {
                articleId: article.art_id
              }
            })
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /*eslint-disable*/
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name}${comm_count}评论${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style></style>
