import './style.css'

let WARNING_TEXT = "/// 警告！您已进入评论区，请远离无谓的网络争吵 ///"

setInterval(() => {
  let maybe_comment_container = document.getElementsByClassName("comment")
  if (maybe_comment_container.length === 0) {
    console.log("获取评论区位置失败")
    return
  }
  let comment_container = maybe_comment_container[0]

  let ws = document.getElementsByClassName("comment-warning-container")
  if (ws.length === 0) {
    let warning_container = document.createElement("div")
    warning_container.className = "comment-warning-container"
    warning_container.innerHTML = WARNING_TEXT
    comment_container.prepend(warning_container)
  }
}, 100)
