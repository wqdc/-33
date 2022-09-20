/* eslint-disable camelcase */
import request from '@/utils/request'
// 引入wuex里的store
// import store from '@/store'
/**
 *
 * @param {String} moobile 手机号
 * @param {Number} code 验证码
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
export const sendCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

export const uploadPhotoAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    // 当data穿的是一个表单数据的时候会自动添加请求头,写不写都一样
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: fm
  })
}

// 获取用户信息
export const uploadUserInfoAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 编辑用户信息
// eslint-disable-next-line camelcase
export const getuploadUserInfoAPI = (obj) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
