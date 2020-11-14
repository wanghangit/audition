class EventBus{
  constructor(){
    this._events = new Map()
  }
  addEventListener(type, fn){
    var handlers = this._events.get(type)
    if(!handlers){
      this._events.set(type,[fn])
    }else{
      handlers.push(fn)
    }
  }
  removeEventListener(type, fn){
    var handlers = this._events.get(type)
    if(handlers){
      var index=-1;
      for (let i = 0; i < handlers.length; i++) {
        if(handlers[i]===fn){
          index = i
          break
        }
      }
      if(index!==-1){
        handlers.splice(index,1)
      }
    }
  }
  emit(type,...args){
    var handlers = this._events.get(type)
    if(handlers){
      for (let i = 0; i < handlers.length; i++) {
        handlers[i].apply(this, args)
      }
    }
  }
}

var bus = new EventBus();
var fn1 = () => {
  console.log('add1')
}
var fn2 = () => {
  console.log('add2')
}
bus.addEventListener("add",fn1)
bus.addEventListener("add",fn2)
bus.emit("add")
bus.removeEventListener("add",fn1)
bus.emit("add")