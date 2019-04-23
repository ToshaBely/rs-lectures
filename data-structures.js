console.log('Data Structures with JS');

// In this code ES6 Class syntax is using to improve readability,
// but in this case we have no private fields

function workWithArray() {
  // ---Creation---
  let array = [];

  // let array = new Array();
  // let array = new Array(3);
  // let array = new Array(3, 4, 5);

  console.log(array);

  function addItem() {
    array.push('abc');
    array.push('foo');
    array.push('bar');

    array.unshift('first');
    array.unshift('second');
    array.unshift('third');

    console.log(array);
  }

  function getItem() {
    console.log('[get 0]:', array[0]);
    console.log('[get 4]:', array[4]);

    array[1] = 'new value';

    console.log(array);
  }

  function removeItem() {
    console.log('[pop]:', array.pop());
    console.log('[shift]:', array.shift());

    console.log(array);
  }

  addItem();
  getItem();
  removeItem();
}

function workWithLinkedList() {
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.length = 0;
    }
  
    add(value) {
      if (this.length === 0) {
        this.head = new Node(value);
      } else {
        let current = this.head;
  
        while(current.next) {
          current = current.next;
        }
  
        current.next = new Node(value);
      }
  
      this.length++;
    }

    insert(position, value) {
      if (position < 0 || this.length < position) {
        return false;
      }

      let node = new Node(value);

      if (position === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let prev = null;
        let index = 0;

        while (index < position) {
          prev = current;
          current = current.next;
          index++;
        }

        prev.next = node;
        node.next = current;
      }

      this.length++;
    }
  
    removeAt(position) {
      if (position < 0 || this.length <= position ) {
        return null;
      }
  
      let current = this.head;

      if (position === 0) {
        this.head = current.next;
      } else {
        let prev = null;
        let index = 0;
  
        while (index < position) {
          prev = current;
          current = current.next;
          index++;
        }
  
        prev.next = current.next;
      }
  
      this.length--;
      return current.value;
    }

    remove(element) {
      this.removeAt( this.indexOf(element) );
    }

    indexOf(element) {
      let current = this.head;
      let index = 0;

      while (current) {
        if (current.value === element) {
          return index;
        }

        current = current.next;
        index++;
      }

      return -1;
    }

    get(position) {
      if (position < 0 || this.length <= position ) {
        return null;
      }

      let current = this.head;
      let index = 0;

      while (index < position) {
        current = current.next;
        index++;
      }

      return current.value;
    }
  
    isEmpty() {
      return this.length === 0;
    }

    size() {
      return this.length;
    }
  
    print() {
      let current = this.head;
  
      while(current) {
        console.log(current.value);
        current = current.next;
      }
    }
  }

  function addItem() {
    console.log('\n---Add Item---');

    list.add( {a: 1} );
    list.add( {a: 2} );
    list.add( {a: 3} );
    
    list.insert(2, payload);

    list.insert(0, {a: 5});
    list.insert(5, {a: 6});

    list.print();
  }

  function getItem() {
    console.log('\n---Get Item---');

    console.log('get(4):', list.get(4));
    console.log('get(0):', list.get(0));
    console.log('get(-5):', list.get(-5));

    console.log('indexOf {a: 5}:', list.indexOf({a: 5}));
    console.log('indexOf payload:', list.indexOf(payload));
  }

  function removeItem() {
    console.log('\n---Remove Item---');

    console.log('Before:');
    list.print();

    list.remove(payload);

    console.log('After:');
    list.print();
  }
  
  // ---Creation---
  console.log('\n\n---Linked List---');
  let list = new LinkedList();
  let payload = {a: 4};

  addItem();
  getItem();
  removeItem();
}

function workWithDoublyLinkedList() {
  class Node {
    constructor (value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }
  
  class DoublyLinkedList {
    constructor () {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    add(value) {
      const newNode = new Node(value);

      if (this.length === 0) {
        this.head = newNode
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;

        this.tail = newNode;
      }
  
      this.length++;
    }

    insert(position, value) {
      if (position < 0 || this.length < position) {
        return false;
      }

      let node = new Node(value);

      if (position === 0) {
        node.next = this.head;
        this.head.prev = node;

        this.head = node;
      } else if (position === this.length) {
        this.tail.next = node;
        node.prev = this.tail;

        this.tail = node;
      } else {
        let current = this.head;
        let prev = null;
        let index = 0;

        while (index < position) {
          prev = current;
          current = current.next;
          index++;
        }

        prev.next = node;
        node.prev = prev;

        node.next = current;
        current.prev = node;
      }

      this.length++;
    }
  
    removeAt(position) {
      if (position < 0 || this.length <= position ) {
        return null;
      }
  
      let current;

      if (position === 0) {
        current = this.head;

        this.head = this.head.next;
        this.head.prev = null;
      } else if(position === this.length - 1) {
        current = this.tail;

        this.tail = this.tail.prev;
        this.tail.next = null;
      } else {
        current = this.head;

        let prev = null;
        let index = 0;
  
        while (index < position) {
          prev = current;
          current = current.next;
          index++;
        }
  
        prev.next = current.next;
        current.next.prev = prev;
      }
  
      this.length--;
      return current.value;
    }

    remove(element) {
      this.removeAt( this.indexOf(element) );
    }

    indexOf(element) {
      let current = this.head;
      let index = 0;

      while (current) {
        if (current.value === element) {
          return index;
        }

        current = current.next;
        index++;
      }

      return -1;
    }

    get(position) {
      if (position < 0 || this.length <= position ) {
        return null;
      }

      let current = this.head;
      let index = 0;

      while (index < position) {
        current = current.next;
        index++;
      }

      return current.value;
    }
  
    isEmpty() {
      return this.length === 0;
    }

    size() {
      return this.length;
    }
  
    print() {
      let current = this.head;
  
      while(current) {
        console.log(current.value);
        current = current.next;
      }
    }
  }

  function addItem() {
    console.log('\n---Add Item---');

    list.add( {a: 1} );
    list.add( {a: 2} );
    list.add( {a: 3} );
    
    list.insert(2, payload);

    list.insert(0, {a: 5});
    list.insert(5, {a: 6});

    list.print();
  }

  function getItem() {
    console.log('\n---Get Item---');

    console.log('get(4):', list.get(4));
    console.log('get(0):', list.get(0));
    console.log('get(-5):', list.get(-5));

    console.log('indexOf {a: 5}:', list.indexOf({a: 5}));
    console.log('indexOf payload:', list.indexOf(payload));
  }

  function removeItem() {
    console.log('\n---Remove Item---');

    console.log('Before:');
    list.print();

    list.remove(payload);

    console.log('After:');
    list.print();
  }
  
  // ---Creation---
  console.log('\n\n---Doubly Linked List---');
  let list = new DoublyLinkedList();
  let payload = {a: 4};

  addItem();
  getItem();
  removeItem();
}

function workWithStack() {
  class Node {
    constructor (value) {
      this.value = value;
      this.next = null;
    }
  }

  class Stack {
    constructor () {
      this.head = null;
      this.length = 0;
    }

    push(value) {
      const node = new Node(value);

      if (this.head) {
        node.next = this.head;
        this.head = node;
      } else {
        this.head = node;
      }

      this.length++;
    }

    pop() {
      const current = this.head;
      this.head = this.head.next;
      this.length--;

      return current.value;
    }

    peek() {
      return this.head.value;
    }

    isEmpty() {
      return this.length === 0;
    }

    size() {
      return this.length;
    }

    print() {
      let current = this.head;
  
      while(current) {
        console.log(current.value);
        current = current.next;
      }
    }
  }

  function addItem() {
    console.log('\n---Add Item---');

    console.log('isEmpty?', stack.isEmpty());

    console.log('add element:', 'a');
    stack.push('a');

    console.log('add element:', 'b');
    stack.push('b');

    console.log('add element:', 'c');
    stack.push('c');

    console.log('add element:', 'd');
    stack.push('d');

    console.log('add element:', 'e');
    stack.push('e');

    console.log('after push - isEmpty?', stack.isEmpty());

    stack.print();
  }

  function getItem() {
    console.log('\n---Get Item---');

    console.log('Top element:', stack.peek());
  }

  function removeItem() {
    console.log('\n---Remove Item---');

    console.log('Before:');
    stack.print();

    console.log('remove element:', stack.pop());
    console.log('remove element:', stack.pop());

    console.log('After:');
    stack.print();
  }

  // ---Creation---
  console.log('\n\n---Stack---');
  let stack = new Stack();

  addItem();
  getItem();
  removeItem();
}

function workWithQueue() {
  class Node {
    constructor (value) {
      this.value = value;
      this.next = null;
    }
  }

  class Queue {
    constructor () {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    
    enqueue(value) {
      const node = new Node(value);

      if (this.head) {
        this.tail.next = node;
        this.tail = node;
      } else {
        this.head = node;
        this.tail = node;
      }

      this.length++;
    }

    dequeue() {
      const current = this.head;
      this.head = this.head.next;
      this.length--;

      return current.value;
    }

    front() {
      return this.head.value;
    }

    isEmpty() {
      return this.length === 0;
    }

    size() {
      return this.length;
    }

    print() {
      let current = this.head;
  
      while(current) {
        console.log(current.value);
        current = current.next;
      }
    }
  }

  function addItem() {
    console.log('\n---Add Item---');

    console.log('isEmpty?', queue.isEmpty());
    queue.enqueue('a');
    queue.enqueue('b');
    queue.enqueue('c');
    queue.enqueue('d');
    queue.enqueue('e');
    console.log('after push - isEmpty?', queue.isEmpty());

    queue.print();
  }

  function getItem() {
    console.log('\n---Get Item---');

    console.log('First in Queue:', queue.front());
  }

  function removeItem() {
    console.log('\n---Remove Item---');

    console.log('Before:');
    queue.print();

    console.log('remove element:', queue.dequeue());
    console.log('remove element:', queue.dequeue());

    console.log('After:');
    queue.print();
  }

  // ---Creation---
  console.log('\n\n---Queue---');
  let queue = new Queue();

  addItem();
  getItem();
  removeItem();
}

function workWithSet() {
  class MySet {
    constructor() {
      this.items = {};
    }

    has(value) {
      return this.items.hasOwnProperty(value);
    }

    add(value) {
      if (!this.has(value)) {
        this.items[value] = value;
        return true;
      }
      return false;
    }

    remove(value) {
      if (this.has(value)) {
        delete this.items[value];
        return true;
      }
      return false;
    }

    size() {
      return Object.keys(this.items).length;
    }

    values() {
      return Object.keys(this.items);
    }
  }

  function union(left, right) {
    let result = new MySet();

    left.values().forEach( val => result.add(val) );
    right.values().forEach( val => result.add(val) );

    return result;
  }

  function intersection(left, right) {
    let result = new MySet();

    left.values()
      .filter( val => right.has(val) )
      .forEach( val => result.add(val) );

    return result;
  }

  function difference(source, other) {
    let result = new MySet();

    source.values()
      .filter( val => !other.has(val) )
      .forEach( val => result.add(val) );

    return result;
  }

  function isSubset(smallSet, bigSet) {
    if (smallSet.size() > bigSet.size()) {
      return false;
    }

    return smallSet.values().every( val => bigSet.has(val) );
  }

  function basic() {
    console.log('\n\n---Set---');
    let set = new MySet();

    console.log('\nadd element:', 1);
    set.add(1);
    console.log('values:', set.values());
    console.log('Has 1:', set.has(1));
    console.log('size:', set.size());

    console.log('\nadd elements:', 'a,', '{param: "a"}');
    set.add('a');
    set.add({param: 'a'});
    console.log('values:', set.values());
    console.log('Has 1:', set.has(1));
    console.log('size:', set.size());

    console.log('\nremove element:', 1);
    set.remove(1);
    console.log('values:', set.values());
    console.log('Has 1:', set.has(1));
    console.log('size:', set.size());

    console.log('\nhas {param: "a"}', set.has({param: 'a'}));
    console.log('has {abc: "a"}', set.has({abc: 'a'}));
    
    console.log(set);

    let s = new Set();
    s.add('a');
    s.add(1);
    s.add({param: 'a'});

    console.log('\nhas {param: "a"}', s.has({param: 'a'}));
    console.log('has {abc: "a"}', s.has({abc: 'a'}));
    console.log(s.values());
    console.log(s);
  }

  function upperLevel() {
    let first = new MySet();
    first.add(1);
    first.add(2);
    first.add(3);
    first.add(4);
    
    let second = new MySet();
    second.add(3);
    second.add(4);
    second.add(5);
    second.add(6);

    console.log('Fisrt set:', first.values());
    console.log('Second set:', second.values());

    console.log('Union:', union(first, second).values());
    console.log('Intersection:', intersection(first, second).values());
    console.log('Difference:', difference(first, second).values());
    console.log('Is Subset:', isSubset(first, second));
  }

  // basic();
  upperLevel();
}

function workWithMap() {
  class MyMap {
    constructor() {
      this.items = {};
    }

    set(key, value) {
      this.items[key] = value;
    }

    get(key) {
      return this.has(key) ? this.items[key] : undefined;
    }

    remove(key) {
      if (this.has(key)) {
        delete this.items[key];
        return true;
      }

      return false;
    }

    has(key) {
      return this.items.hasOwnProperty(key);
    }

    keys() {
      return Object.keys(this.items);
    }

    values() {
      return this.keys()
        .map( key => this.items[key] );
    }

    size() {
      return Object.keys(this.items).length;
    }

    isEmpty() {
      return Object.keys(this.items).length === 0;
    }
  }

  console.log('\n\n---Map---');
  let map = new MyMap();

  console.log('\nAdd items');
  console.log('isEmpty:', map.isEmpty());

  console.log('add [key: "a", value: "First letter"]');
  map.set('a', 'First letter');

  console.log('add [key: "b", value: "Second letter"]');
  map.set('b', 'Second letter');

  console.log('add [key: "y", value: "Some letter"]');
  map.set('y', 'Some letter');

  console.log('isEmpty:', map.isEmpty());
  console.log('size:', map.size());
  console.log('keys:', map.keys());
  console.log('values:', map.values());

  console.log('\nGet Item');
  console.log('has "b":', map.has('b'));
  console.log('has "c":', map.has('c'));

  console.log('get "b":', map.get('b'));
  console.log('get "c":', map.get('c'));

  console.log('\nRemove Item');
  console.log('[before] keys:', map.keys());
  console.log('[before] values:', map.values());
  
  console.log('remove item with key = "b"', map.remove('b'));
  console.log('remove item with key = "another key"', map.remove('another key'));

  console.log('[after] keys:', map.keys());
  console.log('[after] values:', map.values());
}

function workWithBST() {
  class Node {
    constructor(value) {
      this.value = value;
      this.parent = null;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    constructor() {
      this.root = null;
    }

    add(value) {
      this.root = addWithin(this.root, value);

      function addWithin(node, value) {
        if (!node) {
          return new Node(value);
        }

        if (node.value === value) {
          return node;
        }

        if (value < node.value) {
          node.left = addWithin(node.left, value);
        } else {
          node.right = addWithin(node.right, value);
        }

        return node;
      }
    }

    has(value) {
      return searchWithin(this.root, value);

      function searchWithin(node, value) {
        if (!node) {
          return false;
        }

        if (node.value === value) {
          return true;
        }

        return value < node.value ? 
          searchWithin(node.left, value) : 
          searchWithin(node.right, value);
      }
    }

    remove(value) {
      this.root = removeNode(this.root, value);

      function removeNode(node, value) {
        if (!node) {
          return null;
        }

        if (value < node.value) {
          node.left = removeNode(node.left, value);
          return node;
        } else if (node.value < value) {
          node.right = removeNode(node.right, value);
          return node;
        } else {
          // equal
          if (!node.left && !node.right) {
            return null;
          }

          if (!node.left) {
            node = node.right;
            return node;
          }

          if (!node.right) {
            node = node.left;
            return node;
          }

          let minFromRight = node.right;
          while (minFromRight.left) {
            minFromRight = minFromRight.left;
          }
          node.value = minFromRight.value;

          node.right = removeNode(node.right, minFromRight.value);

          return node;
        }
      }
      
    }

    min() {
      if (!this.root) {
        return null;
      }

      let node = this.root;
      while (node.left) {
        node = node.left;
      }

      return node.value;
    }

    max() {
      if (!this.root) {
        return null;
      }

      let node = this.root;
      while (node.right) {
        node = node.right;
      }

      return node.value;
    }

    leftTraverse(cb) {
      doLeft(this.root, cb);

      function doLeft(node, cb) {
        if (node) {
          doLeft(node.left, cb);
          cb(node.value);
          doLeft(node.right, cb);          
        }
      }
    }

    rightTraverse(cb) {
      doRight(this.root, cb);

      function doRight(node, cb) {
        if (node) {
          doRight(node.right, cb);
          cb(node.value);
          doRight(node.left, cb);
        }
      }
    }
  }

  function addItem() {
    console.log('\nAdd Item');
    console.log('add 13, 15, 14, 9, 20, 19, 21, 6, 11');

    bst.add(13);
    bst.add(15);
    bst.add(14);
    bst.add(9);
    bst.add(20);
    bst.add(19);
    bst.add(21);
    bst.add(6);
    bst.add(11);
  }

  function getItem() {
    console.log('\nGet Item');

    console.log('has 10', bst.has(10));
    console.log('has 15', bst.has(15));
    console.log('\n', bst);

    console.log('\nLeft Traverse:');
    bst.leftTraverse((val) => console.log(val));

    console.log('\nRight Traverse:');
    bst.rightTraverse((val) => console.log(val)); 

    console.log('min:', bst.min());
    console.log('max:', bst.max());
  }

  function removeItem() {
    console.log('\nRemove Item');

    bst.remove(15)
    console.log('remove 15');
    console.log(bst);

    console.log('\nLeft Traverse:');
    bst.leftTraverse((val) => console.log(val));
  }

  console.log('\n\n---Binary Search Tree---');
  const bst = new BinarySearchTree();

  addItem();
  getItem();
  removeItem();  
}

function workWithHeap() {
  class Heap {
    constructor() {
      this.items = [];
      this.last = 0;
    }

    add(value) {
      const swap = (firstPos, secondPos) => {
        let temp = this.items[ firstPos ];
        this.items[ firstPos ] = this.items[ secondPos ];
        this.items[ secondPos ] = temp;
      };

      this.last++;
      this.items[this.last] = value;

      let currentPosition = this.last;
      let parentPosition;
      let parent;

      while(currentPosition > 1) {
        parentPosition = Math.floor(currentPosition / 2);
        parent = this.items[ parentPosition ];

        if (parent < value) {
          return;
        }
        
        swap(parentPosition, currentPosition);
        currentPosition = parentPosition;
      }
    }

    getFirst() {
      return this.items[1];
    }

    removeFirst() {
      const swap = (firstPos, secondPos) => {
        let temp = this.items[ firstPos ];
        this.items[ firstPos ] = this.items[ secondPos ];
        this.items[ secondPos ] = temp;
      };

      if (this.last === 0) {
        return;
      }

      let value = this.items[ this.last ];
      this.items[1] = value;
      this.items.length = this.last;
      this.last--;

      let currentPosition = 1;
      let leftChildPos;
      let rightChildPos;

      while (currentPosition <= this.last) {
        leftChildPos = 2 * currentPosition;
        rightChildPos = 2 * currentPosition + 1;

        if ((leftChildPos > this.last) && (rightChildPos > this.last)) {
          // leaf node
          return;
        }

        if ( (leftChildPos <= this.last) && (this.items[leftChildPos] < value) ) {
          swap(currentPosition, leftChildPos);
          currentPosition = leftChildPos;
        } else if ( (rightChildPos <= this.last) && (this.items[rightChildPos] < value) ) {
          swap(currentPosition, rightChildPos);
          currentPosition = rightChildPos;
        } else {
          return;
        }
      }
    }

    print() {
      console.log(this.items.slice(1));
    }
  }

  console.log('\n\n---Min Heap---');
  let heap = new Heap();
  heap.add(31);
  heap.add(26);
  heap.add(14);
  heap.add(42);
  heap.add(19);
  heap.print();

  console.log('Min:', heap.getFirst());

  console.log('\nRemove min item');
  heap.removeFirst();
  console.log('Min:', heap.getFirst());

  heap.print();
}

// workWithArray();
// workWithLinkedList();
// workWithDoublyLinkedList();
// workWithStack();
// workWithQueue();
// workWithSet();
// workWithMap();
// workWithBST();
// workWithHeap();
