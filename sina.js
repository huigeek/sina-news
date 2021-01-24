// 主要拼接API接口路径
const endpoint = 'https://zhibo.sina.com.cn/api/zhibo/feed'
const params = new URLSearchParams({
  page: 1,
  page_size: 100,
  zhibo_id: 152,
  tag_id: 0,
  dire: 'f',
  dpc: 1,
  type: 0,
})

module.exports = {
  endpoint,
  params,
  url: endpoint + '?' + params.toString(),
}