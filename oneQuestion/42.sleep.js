function sleep(time){
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

sleep(1000).then(() => {
  console.log('heelo')
})

function* sleep1(time){
  yield new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

sleep1(1000).next().value.then((res) => {
  console.log('sleep1')
})