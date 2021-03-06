export class Update{
  constructor(payload){
    this.payload = payload
  }
}

export class UpdateQueue{
    constructor(){
      this.firstUpdate = null
      this.lastUpdate = null;
      this.baseState = null;
    }
    equeueState(update){
      if(this.lastUpdate){
        this.lastUpdate.nextUpdate = update
        this.lastUpdate = update
      }else{
        this.firstUpdate = this.lastUpdate = update
      }
    }
    forceUpdate(state){
      let currentUpdate = this.firstUpdate;
      while(currentUpdate){
        const nextState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(state) : currentUpdate.payload
        state = Object.assign({}, state, nextState)
        currentUpdate = currentUpdate.nextUpdate;
      }
      this.firstUpdate = this.lastUpdate = null;
      return state;
    }
    
}