Promise.retry = function(fn,times){
  return new Promise((resove,reject) => {
    fn().then(res => {
      resove(res)
    }).catch((err) => {
      if(!times){
        reject(err)
      }
      return Promise.retry(fn,times-1)
    })
  })
}