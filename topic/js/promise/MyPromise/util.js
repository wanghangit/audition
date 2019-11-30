const PROMISE_ID = Math.random().toString(36).substring(2)
let uid = 0
function warn(msg){
  console.warn(msg)
}

function nextId(){
  return uid++
}

module.exports = {
  warn,
  nextId,
  PROMISE_ID
}