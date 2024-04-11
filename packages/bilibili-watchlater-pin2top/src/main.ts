import './style.css';

function get_bvid_from_elem(elem: Element) {
  let cover = elem.getElementsByClassName('av-pic')[0]
  let url = cover.getAttribute("href")
  if (url)
    return url.substring(url.lastIndexOf("/") + 1)
  else
    return ""
}

function get_csrf_from_cookie() {
  let cookie_items = document.cookie.split(";")
  for (let i = 0; i < cookie_items.length; i++) {
    let item = cookie_items[i].trim()
    if (item.startsWith("bili_jct=")) {
      return item.substring(item.indexOf("=") + 1)
    }
  }
  return ""
}

async function add_to_watchlater(bvid: string, csrf: string) {
  let api = "https://api.bilibili.com/x/v2/history/toview/add"
  let params = `?bvid=${bvid}&csrf=${csrf}`
  let opts: RequestInit = { method: "POST", credentials: "include", }
  try {
    await fetch(api + params, opts)
  } catch (error) {
    console.log(bvid, "失败", error)
  }
}

async function remove_from_watchlater(bvid: string, csrf: string) {
  let api = "https://api.bilibili.com/x/v2/history/toview/del"
  let params = `?bvid=${bvid}&csrf=${csrf}`
  let opts: RequestInit = { method: "POST", credentials: "include", }
  try {
    await fetch(api + params, opts)
  } catch (error) {
    console.log(bvid, "失败", error)
  }
}

async function pin_to_top(elem: Element) {
  await add_to_watchlater(get_bvid_from_elem(elem), get_csrf_from_cookie())
  if (elem.parentNode)
    elem.parentNode.prepend(elem)
}

async function remove(elem: Element) {
  await remove_from_watchlater(get_bvid_from_elem(elem), get_csrf_from_cookie())
  if (elem.parentNode)
    elem.parentNode.removeChild(elem)
  // 滚动，触发下方视频的封面获取
  window.scrollBy(0, 1)
  window.scrollBy(0, -1)
}

function create_button(text: string, className: string, onclick: () => any) {
  let btn = document.createElement("button")
  btn.innerText = text
  btn.className = className
  btn.onclick = async (_) => {
    btn.disabled = true
    await onclick()
    btn.disabled = false
  }
  return btn
}

function check_and_append_buttons() {
  let videos = document.getElementsByClassName('av-item')
  for (let i = 0; i < videos.length; i++) {
    let vid = videos[i]
    if (!vid.getElementsByClassName("pin2top-btn").length) {
      let state = vid.getElementsByClassName("state")[0]

      // 移除原有按钮
      state.innerHTML = ""

      // 删除视频
      let btn_remove = create_button("删除", "pin2top-btn del", async () => {
        await remove(vid)
      })
      // 置顶视频
      let btn_pin2top = create_button("置顶", "pin2top-btn", async () => {
        await pin_to_top(vid)
      })

      state.appendChild(btn_remove)
      state.appendChild(btn_pin2top)
    }
  }
}

setInterval(check_and_append_buttons, 1000)
