<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="nav-bar">
      <template #title>
        <van-button type="default" icon="search" block round size="small"
          >默认按钮</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 内容区 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <article-list :id="item.id"></article-list>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <van-popup
    v-if="isShow"
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :myChanelEdit="channels"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
// ? 两套系统用vuex里的islogin来判断
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    // 引入vuex里的方法
    ...mapMutations(['SET_MY_CHANNELS']),
    // ------------------------
    // ?？ ===> 相当于 || 常用于语句
    // ?  ===> 可选链操作符， ?前面是undifined，那么不会继续往后面取值
    initChannels() {
      // 设置了请求拦截器  自动添加本地存储的token值
      if (this.isLogin) {
        // 如果是登录状态 有token 直接调用请求数据
        this.getChannel()
      } else {
        // 取出本地存储的频道数据
        const myChannels = this.$store.state.myChannels
        // 如果未登录 没有token 进行判断
        if (myChannels.length === 0) {
          // 如果本地存储数据长度为0  调用请求头token为空对象的axios请求
          this.getChannel()
        } else {
          // 如果本地存储的频道有数据 直接调用本地存储的数据，即vuex里的mychannels
          this.channels = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const {
          data: {
            data: { channels }
          }
        } = await getChannelAPI()
        this.channels = channels
        console.log(channels)
      } catch (error) {
        if (!error.respones) {
          throw error
        } else {
          const status = error.respones.status
          status === 507 ?? this.$toast.fail('请刷新重试')
        }
      }
    },
    async delChannel(id) {
      const newChannel = this.channels.filter((item) => item.id !== id)
      try {
        // ? 发送删除频道
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          //  未登录频道存储本地
          this.SET_MY_CHANNELS(newChannel)
        }
        this.channels = newChannel
        this.$toast.success('删除成功')
      } catch (error) {
        if (error.respones?.status === 401) {
          this.$toast.fail('请登录后重试')
        }
      }
    },
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        // console.log(channel.id, this.channels.length)
        this.channels.push(channel)
      } catch (error) {
        if (error.respones?.status === 401) {
          this.$toast.fail('请登录后重试')
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.initChannels()
  }
}
</script>

<style lang="less" scoped>
// .nav-bar{
//   background-color: #3296fa;
//   :deep(.van-nav-bar__title){
//     max-width: unset;
//     background-color: #5babfb;
//   }
//   .van-button--default {
//     background-color: #5babfb;
//     border: 0;
//     color: #fff;
//     font-size: 30px;
//   }
//   .icon{
//     color: #fff;
//   }
//   .van-button--block{
//     width: 7.4rem;
//   }
// }
.nav-bar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
