fetch('./rss.json')
.then(async function(response){
  const res = await response.json()
  const items = res.items

  const list = document.querySelector('.list')

  const batch = document.createDocumentFragment()
  items.forEach(item => {
    const li = document.createElement('li')
    const p = document.createElement('p')
    const timeObj = new Date(item.date_modified)
    p.innerHTML = `${item.title}(<a href="${item.url}" target="_blank">${timeObj.getFullYear()}-${timeObj.getMonth()+1}-${timeObj.getDate()} ${timeObj.getHours()}:${timeObj.getMinutes()}</a>)`
    li.appendChild(p)
    batch.appendChild(li)
  })
  list.appendChild(batch)
})