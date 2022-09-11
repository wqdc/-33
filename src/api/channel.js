// 所有有关频道的接口

import request from '@/utils/request'

/**
 * 用户自己的接口
 * @returns  promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
