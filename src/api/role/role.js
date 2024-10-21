import request from '@/utils/request'

// 常量
const api_name = '/admin/system/sysRole/'
export default {
// 列表
  getPageList(page, limit, searchObj) {
    return request({
      // 接口路径
      // url: '/admin/system/sysRole' + page + '/' + limit,
      url: `${api_name}/${page}/${limit}`,
      method: 'get', // 提交方式
      // 参数
      params: searchObj
    })
  },

  // 根据id删除数据
  removeById(id) {
    return request({
      // 接口路径
    //  url: `${api_name}/reove/${id}`,
      url: `${api_name}/remove/${id}`,
      method: 'delete' // 提交方式
    })
  }

}
