import './style.css'

let WARNING_TEXT = "/// 警告！您已进入评论区，请远离无谓的网络争吵 ///"

function find_comment_container() {
  let v20240909 = document.getElementById("commentapp")
  if (v20240909) return v20240909

  let old_comment_container = document.getElementsByClassName("comment")
  if (old_comment_container.length) return old_comment_container[0]

  return null
}

setInterval(() => {
  let comment_container = find_comment_container()
  if (comment_container === null) {
    console.log("获取评论区位置失败")
    return
  }

  let ws = document.getElementsByClassName("comment-warning-container")
  if (ws.length === 0) {
    let warning_container = document.createElement("div")
    warning_container.className = "comment-warning-container"
    warning_container.innerHTML = WARNING_TEXT
    comment_container.prepend(warning_container)
  }
}, 100)
