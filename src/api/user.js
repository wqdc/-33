import request from '@/uitles/request'
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
