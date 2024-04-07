import './style.css';

function open_in_new_tab(url: string) {
  let v = document.createElement("a")
  v.setAttribute("href", url)
  v.click()
}

async function __download_torrent(item_url: string) {
  let resp = await fetch(item_url)
  let html = await resp.text()
  let find_url = html.match(/\/\/.*?\.torrent/)
  if (!find_url) {
    alert("没有找到种子链接")
    return
  }
  let url = find_url[0]
  open_in_new_tab(url)
}

async function download_torrent(item_url: string) {
  try {
    await __download_torrent(item_url)
  } catch (error) {
    let msg = "获取资源页面失败"
    alert(msg)
    console.log(msg, error)
  }
}

function create_button(item_url: string) {
  let btn = document.createElement("button")
  btn.innerText = "种子"
  btn.style.cursor = "pointer"
  btn.onclick = async () => {
    btn.disabled = true
    console.log(item_url)
    await download_torrent(item_url)
    btn.disabled = false
  }
  return btn
}

function append_button(elem: Element) {
  let may_item_urls = elem.querySelectorAll(".title a")
  let item_url = may_item_urls[may_item_urls.length - 1].getAttribute("href")
  if (!item_url) {
    console.log("获取资源链接失败", elem)
    return
  }
  let mount_point = elem.children[3]
  let btn = create_button(item_url)
  mount_point.prepend(btn)
}

let items = document.querySelectorAll("#topic_list > tbody:nth-child(2) > tr")
items.forEach(append_button)
