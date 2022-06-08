var test = {
  name: "xiaoming",
  children: [
    {
      name: "xiaoming-1",
      children: [
        {
          name: "xiaoming-1-1"
        }
      ]
    },
    {
      name: "xiaoming-2",
    },
  ]
};

var isObject = (obj) => typeof obj === 'object' && obj !== null
var forEach = (obj, fn) => {
  if(Array.isArray(obj)){
    obj.forEach((item) => {
      fn(item)
    })
  }else{
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn(obj[key])
      }
    }
  }
}

function dfsCopy(data, copy = {}){
  if(!isObject(value)){
    copy[key] = value
  }
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      var value = data[key]
      if(!isObject(value)){
        copy[key] = value
      }else {
        forEach(value, function(item){
          dfsCopy(item, copy)
        })
      }
    }
  }
}

var dfs = {}

dfsCopy(test, dfs)

console.log(dfs)
