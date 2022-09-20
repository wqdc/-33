<template>
  <div class="proflie">
    <header>
      <!-- 已经登录的头部框结构-->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>

        <van-row>
          <van-col span="12" class="col">
            <!-- <van-row type="flex" justify="space-around" align="center"> -->
            <van-image width="1.5rem" height="1.5rem" :src="userInfo.photo"/>
            <span class="moibel">{{ userInfo.name }}</span>
            <!-- </van-row> -->
          </van-col>

          <van-col span="7"></van-col>

          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button size="mini" round class="edit-btn" @click="$router.push('/user')"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>

        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的头部框结构  -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="bannerSrc" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- main -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>

      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部区域 -->
    <footer>
      <van-button block v-if="isLogin" @click="btn">退出</van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 单独引出图片作为一个模块  在data里面接收
import bannerSrc from '@/assets/images/mobile.png'
import { getUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      bannerSrc,
      userInfo: []
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async btn() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '确认退出账号？'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        // 用户登录l了继续
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
        console.log(data)
      } catch (error) {
        if (error.response && error.respomse.state) {
          this.$toast.fail('用户验证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.proflie {
  height: 100vh;
  background-color: #f5f7f9;
}
.banner {
  height: 5.33333rem;
  width: 100%;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .text {
    font-size: 30px;
    margin-top: 15px;
    color: #fff;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
    .col {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .moibel {
        color: #fff;
        font-size: 30px;
      }
    }
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      background-color: inherit;
      font-size: 30px;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
main {
  .link {
    margin: 10px 0;
  }
  .toutiao-shoucang {
    color: red;
    font-size: 40px;
  }
  .toutiao-lishi {
    color: orangered;
    font-size: 40px;
  }
}
footer {
  :deep(.van-button) {
    color: red;
  }
}
</style>
