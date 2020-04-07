import { count } from './count'
import image from '../images/demo.jpg'
import indexStyle from './style/index.less'

render()
function render() {
  document.addEventListener("DOMContentLoaded", function(){
    const $app = document.getElementById("app")
    console.log('hello webpack')
    // document.write('hello webpack')
    const img = new Image()
    img.src= image
    img.classList.add(indexStyle.pic)
    app.appendChild(img)
    count()
  })
}
if(module.hot){
  module.hot.accept("./count.js",function(){
    render()
  })
}
