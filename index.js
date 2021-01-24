const fetch = require('node-fetch')
const { url } = require('./sina.js')
const Feed = require('feed').Feed
const fs = require('fs/promises') // 这种写法需要注意node版本14

const feed = new Feed({
  title: '新浪新闻',
  description: '新浪全球实时财经新闻直播',
  language: 'zh-CN'
})

async function main(){
  // 调接口，获取数据，写入json文件
  const response = await fetch(url, {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10130'}
  })

  const json = await response.json()

  const result = json.result || {}
  if (!result.status || result.status.code !== 0) return
  const items = result.data.feed.list

  items.forEach(item => {
    feed.addItem({
      title: item.rich_text,
      id: item.id,
      link: item.docurl,
      content: '',
      date: new Date(item.create_time)
    })
  })

  // 创建dist文件夹写入文件前，先删除之前的dist文件夹
  await fs.rmdir('./dist', { recursive: true })

  await fs.mkdir('./dist')

  await fs.writeFile('./dist/rss.json', feed.json1())
  await fs.writeFile('./dist/rss.xml', feed.rss2())

  await fs.copyFile('./template/index.html', './dist/index.html')
  await fs.copyFile('./template/page.js', './dist/page.js')
}

main()