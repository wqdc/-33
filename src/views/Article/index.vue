<template>
  <div class="article">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      class="nav-bar"
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      offset
    >
      <div class="content">
        <h3>{{ article.title }}</h3>
        <van-cell :title="article.aut_name" :label="timer" class="cell">
          <!-- 自定义右侧内容 -->
          <template>
            <van-button
              size="small"
              class="btn"
              round
              v-if="!article.is_followed"
              @click="add"
              >+关注</van-button
            >
            <van-button size="small" class="edit" round v-else @click="edit"
              >已关注</van-button
            >
          </template>
          <!-- 自定义左侧内容 -->
          <template #icon>
            <van-image :src="article.aut_photo" alt="" round />
          </template>
        </van-cell>
        <!-- 分割线 -->

        <div
          v-html="article.content"
          class="article article-content markdown-body"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- <ArticleList v-if="article.art_id" :id="article.art_id" :list="board"></ArticleList> -->
        <div v-for="(item, index) in comment" :key="index">
          <comment-list
            :id="isTrue"
            :list="board"
            :item="item"
            @comment="value"
          ></comment-list>
          <article-load
            v-if="isTrue"
            :isTrue="isTrue"
            :items="item"
            :son="son"
            :id="id"
            :art_id="article.art_id"
            @updata="updata"
            @return="res"
          ></article-load>
        </div>
        <footer>
          <div class="btns">
            <van-button
              size="mini"
              :style="{ color: '#ccc' }"
              round
              @click="isShow = true"
              >写评论</van-button
            >
          </div>
          <div class="icon">
            <van-icon name="comment-o" :badge="0" />
            <van-icon
              name="star-o"
              @click="change"
              v-if="!article.is_collected"
            />
            <van-icon
              v-else
              name="star"
              @click="changes"
              :class="{ active: article.is_collected }"
            />
            <van-icon name="good-job-o" />
            <van-icon name="share" />
          </div>
        </footer>
        <article-return
          v-if="isShow"
          :isShow="isShow"
          :article="article.art_id"
          @chang-state="btn"
        ></article-return>
      </div>
    </van-list>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import {
  getArticleAPI,
  getattentionAPI,
  getcancelAPI,
  getMyArticlesAPI,
  getcommentAPI,
  getCancelCollectAPI
} from '@/api'
import ArticleLoad from './components/ArticleLoad.vue'
import ArticleReturn from './components/ArticleReturn.vue'
import CommentList from '@/components/CommentList.vue'
export default {
  data() {
    return {
      article: '',
      timer: '',
      // 留言板
      isShow: false,
      board: {},
      comment: [],
      isTrue: false,
      // 当前评论的id
      id: '',
      son: [],
      // 触底加载
      loading: false,
      finished: false,
      last_id: null,
      perpeg: 1,
      comment_id: null,
      // 评论的评论触底传值
      arr: ''
    }
  },
  methods: {
    // 点击关注
    async add() {
      this.article.is_followed = true
      await getattentionAPI(this.article.aut_id)
    },
    // 点击取消关注
    async edit() {
      await getcancelAPI(this.article.aut_id)
      this.article.is_followed = false
    },
    // 点击当前列表的对象
    async value(i, Boolean) {
      // console.log(i)
      if (i !== {}) {
        this.isTrue = Boolean
        this.id = i.com_id
        // 评论的评论内容
        // console.log(i)
        const { data } = await getcommentAPI('c', this.id)
        console.log(data)
        this.son = data.data.results
        // console.log(this.son)
        this.comment_id = data.data.last_id
        console.log(this.comment_id)
      } else {
        this.isTrue = Boolean
      }
    },
    // 发送评论后的返回值
    sonValue(i) {
      // console.log(i)
      this.board = i
    },
    async btn(i, obj) {
      this.isShow = i
      console.log({ obj })
      // const { data } = await getcommentAPI('a', this.article.art_id)
      // this.son = data.data.results
      this.comment = [obj, ...this.comment]
    },
    // 深度评论的数据更新
    updata(obj) {
      this.son = [obj, ...this.son]
    },
    // 收藏
    async change() {
      this.$toast.loading({
        title: '收藏中'
      })
      try {
        this.article.is_collected = true
        await getMyArticlesAPI(this.$route.query.articleId)
        this.$toast.success('收藏成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 取消收藏
    async changes() {
      this.$toast.loading({
        title: '取消中'
      })
      try {
        this.article.is_collected = false
        await getCancelCollectAPI(this.$route.query.articleId)
        this.$toast.success('取消收藏')
      } catch (error) {
        console.log(error)
      }
    },
    // 触底加载事件
    async onLoad() {
      if (this.$route.query.articleId) {
        try {
          // console.log(this.$route.query.articleId)
          const { data } = await getcommentAPI(
            'a',
            this.$route.query.articleId,
            this.last_id,
            this.perpeg
          )
          // console.log(data)
          // 对进行请求回来的数据进行判断
          // ① 利用请求回来的数组长度判断是否加载
          // ② 利用请求回来的last_id是否与end_id相等进行判断
          console.log(data.data.results.length)
          if (
            data.data.results.length === 0 ||
            data.data.last_id === data.data.end_id
          ) {
            this.finished = true
          }
          this.article = [...this.article, ...data.data.results]
          this.loading = false
        } catch {
          this.error = true
        } finally {
          this.finished = true
          // this.loading = false
        }
      }
      if (this.id) {
        try {
          // console.log(this.$route.query.articleId)
          const { data } = await getcommentAPI(
            'c',
            this.id,
            this.last_id,
            this.perpeg
          )
          // console.log(data)
          // 对进行请求回来的数据进行判断
          // ① 利用请求回来的数组长度判断是否加载
          // ② 利用请求回来的last_id是否与end_id相等进行判断
          console.log(data.data.results.length)
          if (
            data.data.results.length === 0 ||
            data.data.last_id === data.data.end_id
          ) {
            this.finished = true
          }
          this.article = [...this.article, ...data.data.results]
          this.loading = false
        } catch {
          this.error = true
        } finally {
          this.finished = true
          // this.loading = false
        }
      }
    },
    res(i) {
      this.isTrue = i
    }
  },
  components: {
    ArticleLoad,
    ArticleReturn,
    CommentList
  },
  async created() {
    // 获取文章内容
    const res = await getArticleAPI(this.$route.query.articleId)
    if (res.status === 200) {
      this.article = res.data.data
      this.timer = dayjs(this.article.pubdate).fromNow()
    }
    // 获取文章页面的评论列表
    const res1 = await getcommentAPI('a', this.article.art_id)
    // console.log(res1)
    this.last_id = res1.data.data.last_id
    if (res1.status === 200) {
      this.comment = res1.data.data.results
    }
    // 收藏
  },
  mounted() {
    const image = document.querySelectorAll('img')
    console.log(image[0].getAttribute('src'))
    image.forEach((item) => {
      console.log(item.src)
    })
  }
}
</script>

<style lang="less" scoped>
:deep(.nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.content {
  height: calc(100vh - 100px -90px);
  h3 {
    font-size: 36px;
    margin: 0 0 30px;
    padding: 20px 0 0 30px;
  }
  :deep(.article) {
    padding: 54px 32px;
    font-size: 24px;
  }
  .van-image {
    width: 70px !important;
    margin-right: 30px;
    height: 70px;
    border-radius: 50%;
  }

  .btn {
    background-color: #3296fa;
    color: #fff;
    width: 170px;
    height: 60px;
  }
  .edit {
    background-color: #fff;
    color: #000;
    width: 170px;
    height: 60px;
  }
}
.heading {
  font-size: 16px;
}
:deep(footer) {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  // justify-content:space-between;
  .btns {
    // display: block;
    width: 50%;
    height: 90px;
    text-align: center;
    .van-button--mini {
      width: 282px;
      height: 46px;
    }
  }
  .icon {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 40px;
    color: #777777;
  }
}
.article {
  padding-bottom: 100px;
}
.active {
  color: orangered;
}
</style>
