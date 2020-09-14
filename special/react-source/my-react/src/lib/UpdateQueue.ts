import { RObject } from "./type";

export class Update {
  payload: RObject|Function;
  nextUpdate?: Update;
  constructor(payload: RObject) {
    this.payload = payload
  }
}

export class UpdateQueue {
  firstUpdate: Update | null;
  lastUpdate: Update | null;

  constructor() {
    this.firstUpdate = null;
    this.lastUpdate = null;
  }
  enqueueState(update: Update) {
    if (!this.lastUpdate) {
      this.firstUpdate = this.lastUpdate = update
    } else {
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = update
    }
  }
  forceUpdate(state: RObject) {
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      let payload = currentUpdate.payload
      let nextState = typeof payload === 'function' ? payload(state) : payload;
      state = Object.assign({}, state, nextState)
      currentUpdate = currentUpdate.nextUpdate || null
    }
    this.firstUpdate = this.lastUpdate = null
    return state;
  }
}