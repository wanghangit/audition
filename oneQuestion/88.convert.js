function convert(list){
  const map = {}
  let res = []
  list.forEach(l => {
    map[l.id] = l
  });
  for (let i = 0; i < list.length; i++) {
    const cur = list[i]
    if(cur.parentId === 0){
      res.push(cur)
      continue
    }
    if(cur.parentId in map){
      const p = map[cur.parentId]
      p.chilren = p.chilren || []
      p.chilren.push(cur)
    }
  }
  return res
}

let list =[
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
];

console.log(convert(list))