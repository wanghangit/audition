let A1 = { type: "div", key: "A1" };
let B1 = { type: "div", key: "B1", return: A1 };
let B2 = { type: "div", key: "B2", return: A1 };
let C1 = { type: "div", key: "C1", return: B1 };
let C2 = { type: "div", key: "C2", return: B1 };

A1.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;
let nextUnitOfWork = A1;
let start = Date.now()
function sleep(d) { // 模拟线程的占用
  for (let i = Date.now(); Date.now() - i < d;) {}
}


function workloop(deadline) {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if(!nextUnitOfWork){
    console.log(`render阶段结束`)
    console.log(Date.now()-start)
  }else{
    window.requestIdleCallback(workloop, {
      timeout: 1000
    })    
  }
}

function beginWork(fiber) {
  sleep(20)
  console.log(`start:${fiber.key}`);
}

function CompleteUnitOfWork(fiber) {
  console.log(`end:${fiber.key}`);
}

function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) {
    return fiber.child;
  }
  while (fiber) {
    CompleteUnitOfWork(fiber); // 当前节点都遍历完成
    if (fiber.sibling) {
      // 没有子节点，遍历兄弟节点
      return fiber.sibling;
    }
    fiber = fiber.return; // 找到父节点
  }
}

window.requestIdleCallback(workloop, {
  timeout: 1000
})

