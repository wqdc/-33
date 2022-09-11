<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            block
            round
            type="default"
            native-type="button"
            class="btn"
            size="mini"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="time"
            format="ss秒"
            v-else
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from '@/views/Login/rules'
// 引入API
import { login, sendCodeApi } from '@/api'

import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      time: 60 * 1000,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // 抽离轻提示中的加载框
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        // vant  里面的submit 只有在表单校验成功后才会发送信息
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.$toast.success('登陆成功')
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
      } catch (error) {
        console.log(error)
        // 细分一下失败的情况：每个用户手机号和验证码
        // 拿错提示哪
        // error： 1.js抛出的错误  2.axios封装的err对象
        // axios封装的error对象
        //  - error.response.data 后端返回的数据
        //  - error.response.data.status 后端返回的 状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
        this.$toast.fail('登陆失败')
      }
    },
    async sendCode() {
      // 验证用户是否正确输入手机号
      //  - 1.form表单绑定ref属性
      //  - 2.$refs.form.validate(name)
      await this.$refs.form.validate('mobile')
      this.loading()
      // 发送请求
      try {
        const { data } = await sendCodeApi(this.mobile)
        this.$toast.success('发送验证码成功')
        console.log(data)
      } catch (error) {
        // this.$toast.fail('发送失败')
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 429)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw Error
        }
      }
      // 显示倒计时
      this.isShowCodeBtn = false
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前页面
// vue-cli 提供了语法 :deep() 深度选择器  -> 穿透
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
  .iconfont {
    font-size: 40px;
  }
  .btn {
    height: 0.64rem;
    background-color: #eee;
    color: #a58594;
  }
}
</style>
