class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload;
    this.nextUpdate = nextUpdate;
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null;
    this.firstUpdate = null;
    this.lastUpdate = null;
  }
  enqueueUpdate(update) {
    // 插入队列
    if (this.firstUpdate == null) {
      this.firstUpdate = this.lastUpdate = update;
    } else {
      this.lastUpdate.nextUpdate = update;
      this.lastUpdate = update;
    }
  }
  forceUpdate() {
    let currentState = this.baseState,
      currentUpdate = this.firstUpdate;
    while (currentUpdate) {
      let payload = currentUpdate.payload;
      let nextState =
        typeof payload === "function" ? payload(currentState) : payload;
      currentState = Object.assign({}, currentState, nextState);
      currentUpdate = currentUpdate.nextUpdate
    }
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState
    return currentState;
  }
}

const queue = new UpdateQueue();
queue.enqueueUpdate(new Update({ name: "小明" }));
queue.enqueueUpdate(
  new Update(() => {
    return { number: 0 };
  })
);
console.log(queue.forceUpdate())
