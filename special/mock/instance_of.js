function instance_of(L,R){
  const p = R.prototype;
  while(L!==null){
    if(L.__proto__ === p){
      return true
    }else{
      L = L.__proto__
    }
  }
  return false
}