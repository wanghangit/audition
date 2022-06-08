/**
 * 并发请求，有最大限制
 * @param {Array} urls 
 * @param {number} maxNum 
 */
function multiRequest(urls, maxNum){
  var len = urls.length;
  var result = []
  var i = 0
  var start = Math.min(len, maxNum)
  return new Promise((resolve, reject) => {
    for (; i < start; i++) {
      http(urls[i]).then((res) => {
        next("success",i,res)
      }).catch((err) => {
        next("error",i,err)
      })
    }
    function next(type,index, data){
      result[index] = {
        type,
        data
      }
      var cur = i++
      if(cur === len){
        resolve(result)
      }
      http(urls[cur]).then((res) => {
        next("success",cur,res)
      }).catch((err) => {
        next("error",cur,err)
      })
    }
  })

}