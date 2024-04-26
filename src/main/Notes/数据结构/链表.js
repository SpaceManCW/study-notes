function ListNode(val) {
  this.val = val;
  this.next = null;
}

function LList() {
  this.head = null;
  this.find = find;
  this.length = 0;
  this.append = append;
  this.deleteN = deleteN;
  this.insert = insert;
  this.display = display;
}
//查找节点的方法
function find(item) {
  var currNode = this.head;
  while (currNode.val != item) {
    currNode = currNode.next;
  }
  return currNode;
}
//在末尾插入节点的方法
function append(item) {
  let newNode = new ListNode(item);
  if (this.length == 0) {
    this.head = newNode;
  } else {
    var current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  this.length++;
}
//删除指定节点
function deleteN(item) {
  var current = this.head;
  while (current.val != item) {
    current = current.next;
  }
  current.val = current.next.val;
  current.next = current.next.next;
}
//指定节点后插入节点的方法,将newElement插入到item后面
function insert(newElement, item) {
  var newNode = new ListNode(newElement);
  var current = this.find(item);
  newNode.next = current.next;
  current.next = newNode;
}
//显示链表元素的方法
function display() {
  var arr = [];
  var current = this.head;
  while (current) {
    arr.push(current.val);
    current = current.next;
  }
  return arr;
}
