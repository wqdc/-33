<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        size="mini"
        style="color: red; border-color: red"
        round
        class="btn"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          :text="item.name"
          v-for="(item, index) in myChanelEdit"
          :key="item.id"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMychannel(item, index)"
        />
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <!-- 标题 -->
    <van-cell title="推荐频道" />
    <!-- 频道 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :text="item.name"
          v-for="item in recommendChannels"
          :key="item.id"
          icon="plus"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api/channel'
export default {
  props: {
    myChanelEdit: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allItem) => {
        return !this.myChanelEdit.find((editItem) => {
          return allItem.id === editItem.id
        })
      })
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelAPI()
      console.log(data)
      this.allChannels = data.data.channels
    },
    handleMychannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        // 删除
        console.log(1)
      } else {
        // 关闭并跳转
        this.$emit('change-active', index)
      }
    }
  },
  created() {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
:deep(.btn) {
  width: 100px;
  font-size: 30px;
}
.channel-edit {
  padding-top: 92px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
