function render(template, data){
  const reg = /\{\{(\w+)\}\}/
  const matched = template.match(reg)
  if(matched){
    template = template.replace(matched[0], data[matched[1]])
    render(template, data)
  }else{
    console.log(template)
    return
  }
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined
