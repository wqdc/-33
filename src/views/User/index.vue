<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="nav-bar"
    />
    <!-- 信息 -->
    <input
      type="file"
      hidden
      ref="file"
      accept=".jpg,.png"
      @change="selectPhoto"
    />
    <!-- 信息更新 -->
    <!-- 头像 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="30px" height="30px" :src="avator"></van-image>
    </van-cell>
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 增加v-if来根据弹出层的展示和隐藏进行创建和销毁----》 因为使用cropper插件的时候所渲染的图片是由cropper创建的新的节点，点击多次以后所传图片会增加一个隐藏属性，导致新选择的图片无法显示。当销毁后重新创建节点的时候就会进行数据的重新渲染，所传数据也是最近的数据 -->
      <updata-avator
        :photo="photo"
        v-if="isShowPhoto"
        :avator.sync="avator"
      ></updata-avator>
    </van-popup>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      @click="btn"
      :value="userInfo.name"
    ></van-cell>
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 头部导航 -->
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="number"
        maxlength="11"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      @click="isShowSex = true"
      :value="sex[userInfo.gender]"
    ></van-cell>
    <van-popup v-model="isShowSex" round position="bottom">
      <van-picker
        v-if="isShowSex"
        show-toolbar
        :defaultIndex="index"
        :columns="sex"
        @cancel="isShowSex = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 时间 -->
    <van-cell
      title="生日"
      is-link
      @click="showPicker = true"
      :value="userInfo.birthday"
    ></van-cell>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        @confirm="onConfirm1"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
// 1.点击修改头像
// -手动的触发input:file的点击事件
// 2.input:file
// accept：规定file选择文件的类型
// hidden:：等于display:none
import dayjs from '@/utils/dayjs'
import UpdataAvator from './UpdataAvator/UpdataAvator.vue'
import { resolveBase64 } from '@/utils/index'
import { uploadUserInfoAPI, getuploadUserInfoAPI } from '@/api'
export default {
  components: { UpdataAvator },
  data() {
    return {
      // 控制照片弹出层
      isShowPhoto: false,
      photo: '',
      avator: '',
      userInfo: '',
      // 控制昵称弹出层
      isShowName: false,
      message: '',
      // 控制性别弹出层
      isShowSex: false,
      value: '',
      sex: ['男', '女'],
      index: 0,
      // 时间
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17)
    }
  },
  methods: {
    // 头像
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   console.log(e.target.result)
      // }
      // file对象转换成base64
      const base64 = await resolveBase64(file)
      // 用数据接收，方便用于传递给子组件
      this.photo = base64
      this.userInfo.photo = this.photo
      // 展示弹窗
      this.isShowPhoto = true

      // 解决不能连续选择同一张图片的bug
      this.$refs.file.value = ''
    },
    // 昵称
    btn() {
      this.isShowName = true
      this.message = this.userInfo.name
    },
    // 弹出层
    onClickLeft() {
      this.isShowName = false
    },
    async onClickRight() {
      this.userInfo.name = this.message
      await getuploadUserInfoAPI(this.userInfo)
      this.isShowName = false
    },
    // 性别
    async onConfirm(value) {
      this.value = value
      this.index = this.sex.indexOf(this.value)
      this.userInfo.gender = this.sex.indexOf(this.value)
      await getuploadUserInfoAPI(this.userInfo)
      this.isShowSex = false
    },
    // 时间
    async onConfirm1(time) {
      // 引入插件格式化时间
      this.value = dayjs(time).format('YYYY-MM-DD')
      // 新建变量接收格式化的时间，替换字符串 '-' ---> ','
      const timer = this.value.replace('-', ',').replace('-', ',')
      // 传入时间戳  实现数据回流
      this.currentDate = new Date(timer)
      this.userInfo.birthday = this.value
      await getuploadUserInfoAPI(this.userInfo)
      this.showPicker = false
    },
    cancel() {
      this.showPicker = false
    }
  },
  async created() {
    const data = await uploadUserInfoAPI()
    // 判断请求数据是否成功
    if (data.status === 200) {
      this.userInfo = data.data.data
      this.avator = this.userInfo.photo
      this.index = this.userInfo.gender
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
