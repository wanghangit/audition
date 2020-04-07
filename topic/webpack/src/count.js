let num = 0
export function count(){
  const $div = document.createElement("div")
  $div.setAttribute("id", "counter")
  $div.innerHTML = num
  $div.onclick = function(){
    num++
    $div.innerHTML = num
  }
  document.getElementById("app").appendChild($div)
}