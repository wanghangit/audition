const fs = require("fs")
const path = require("path")

// create folder
fs.mkdir(path.resolve(__dirname, "./test"), (err) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(`create`)
})

// create file
fs.writeFile(path.resolve(__dirname, "./test", "hello.txt"), "hello", (err) => {
  if(err){
    console.log(err)
    return
  }
  console.log(`create file`)
  fs.appendFile(path.resolve(__dirname, "./test", "hello.txt"), "this is append file", (err) => {
    if(err){
      console.log(err)
      returnl
    }
    console.log(`append file`)
  })
})