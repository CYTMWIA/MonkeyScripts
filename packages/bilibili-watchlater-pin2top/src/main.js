import './style.css';

function get_bvid_from_elem(elem) {
  let cover = elem.getElementsByClassName('av-pic')[0]
  let url = cover.getAttribute("href")
  return url.substring(url.lastIndexOf("/") + 1)
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

function add_to_watchlater(bvid, csrf, onfulfilled) {
  let api = "https://api.bilibili.com/x/v2/history/toview/add"
  let params = `?bvid=${bvid}&csrf=${csrf}`
  let opts = { method: "POST", credentials: "include", }
  fetch(api + params, opts).then((resp) => {
    onfulfilled()
  }).catch((reason) => {
    console.log(bvid, "失败", reason)
  })
}

function pin_to_top(elem) {
  function cb() {
    elem.parentNode.prepend(elem)
  }
  add_to_watchlater(get_bvid_from_elem(elem), get_csrf_from_cookie(), cb)
}

function append_btn() {
  let videos = document.getElementsByClassName('av-item')
  for (let i = 0; i < videos.length; i++) {
    let vid = videos[i]
    if (!vid.getElementsByClassName("pin2top-btn").length) {
      let state = vid.getElementsByClassName("state")[0]

      let btn = document.createElement("a")
      btn.innerText = "置顶"
      btn.className = "pin2top-btn"
      btn.addEventListener("click", (e) => {
        pin_to_top(vid)
      })

      state.appendChild(btn)
    }
  }
}

setInterval(append_btn, 1000)
