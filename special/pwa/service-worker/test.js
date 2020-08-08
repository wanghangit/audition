class Node{
  constructor(value){
    this.value = value
    this.next = null
  }
}

function print(node){
  while(node !== null){
    console.log(node.value)
    node = node.next;
  }
}
var n1 = new Node(1),n2 = new Node(2),n3 = new Node(3)

n1.next = n2;
n2.next = n3;

print(n1)

function reverse(node){
  var prev = null
  var cur = node
  while(cur !== null){
    var nextTemp = cur.next
    cur.next = prev
    prev = cur
    cur = nextTemp
  }
  print(prev)
}

reverse(n1)
