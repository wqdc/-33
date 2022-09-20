import request from '@/utils/request'
export const getArticleAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
export const getattentionAPI = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
export const getcancelAPI = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {*} type  a-获取文章评论列表 c-获取评论回复列表
 * @param {*} source 文章id或评论id
 * @param {*} offset 获取的数据的偏移量
 * @param {*} limit 获取列表内容的个数
 * @returns
 */
export const getcommentAPI = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
// eslint-disable-next-line camelcase
export const setCommentAPI = (target, content, art_id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id
    }
  })
}

/**
 * @param {String} id 文章的id
 * @returns 收藏文章
 */
export const getMyArticlesAPI = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 *
 * @param {String} id
 * @returns 取消收藏文章
 */
export const getCancelCollectAPI = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}
