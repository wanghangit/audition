class LazyMan{
  constructor(name){
    this.name = name;
    this.task = []
    console.log("i am "+name)
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next(){
    var fn = this.task.shift()
    fn&&fn()
  }
  eat(name){
    var self = this
    var fn = function(){
      console.log('i am eating'+name)
      self.next()
    }
    this.task.push(fn)
    return this
  }
  sleep(time){
    var self = this
    var fn = function(){
      setTimeout(() => {
        console.log("wait"+time)
        self.next()
      }, time)
    }
    this.task.push(fn)
    return this
  }
}

var lazyMan = new LazyMan("xiaoming")

lazyMan.eat("rou").sleep(100).eat("yu")

