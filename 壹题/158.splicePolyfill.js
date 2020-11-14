Array.prototype.spliceMock = function(start, num, ...child){
  let len = this.length;
  if(start<0){
    if(Math.abs(start)>len-1){
      start=0
    }else{
      start = start+len
    }
  }
  const copy = [...this]
  const arr = [];
  this.length = 0;
  let i = 0;
  for (; i <= start; i++) {
    this[i] = copy.shift()
  }
  for (let j = 0; j < num; j++) {
    arr.push(copy.shift())
  }
  for (let j = 0; j < child.length; j++) {
    this[i++] = child[j]
  }
  while(copy.length>0){
    this[i++] = copy.shift()
  }
  this.length = i;
  return arr
}

const test = [1,2,3,4,5,6]
console.log(test.spliceMock(2,2,7,8),test)