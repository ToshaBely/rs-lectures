console.log('Welcome to RS Lecture');

function types() {
  let a = 3;
  let b = 'Hello';
  let c = true;
  let d = null;
  let e;
  let f = Symbol('my-symbol');
  let g = NaN;
  let h = {a:10};
  let i = [1, 2, 3];
  let j = () => {};

  console.log('\n-----Types-----');
  console.log(`${a} - ${typeof a}`);
  console.log(`${b} - ${typeof b}`);
  console.log(`${c} - ${typeof c}`);
  console.log(`${d} - ${typeof d}`);
  console.log(`${e} - ${typeof e}`);
  console.log(f, ` - ${typeof f}`);
  console.log(`${g} - ${typeof g}`);
  console.log(`${h} - ${typeof h}`);
  console.log(`${i} - ${typeof i}`);
  console.log(`${j} - ${typeof j}`);
  console.log(`${j} is Object - ${j instanceof Object}`);

  console.log('\n-----Calling number methods-----');
  console.log(a.toFixed(2));
  console.log(3..toFixed(2));
}

function boolExpression() {
  let a = new Boolean('false');
  let b = new Boolean({});

  console.log('\n-----Boolean-----');
  console.log(`!!new Boolean('false') - ${!!a}`);
  console.log(`!!new Boolean({}) - ${!!b}`);
  console.log(`!![] - ${!![]}`);
  console.log(`!!{} - ${!!{}}`);
  console.log(`!!'' - ${!!''}`);
  console.log(`!!0 - ${!!0}`);
  console.log(`!!'0' - ${!!'0'}`);
}

function functionExplanation() {
  console.log('\n-----Function-----');

  function fn() {
    console.log('args:', arguments);

    // with 'use strict' doesn't work
    console.log('callee:', arguments.callee);
    // there is arguments.callee.caller

    console.log('lenght:', arguments.length);
    console.log('is Array?', arguments instanceof Array);
  }

  let newFn = fn;
  console.log('Name of newFn:', newFn.name);

  fn(123, 456);
}

function scopeAndClosure() {
  console.log('\n-----Scope & Closure-----');

  function inner() {
    function foo(a) {
      let b = 2;
  
      function bar() {
        let c = 3;
  
        console.log(a, b, c);
      }
  
      bar();
    }

    foo(1);
  }

  console.log('[inner scope]');
  inner();

  function outer() {
    let a = 100;
    let b = 200;

    function bar() {
      let c = 3;

      console.log(a, b, c);
    }

    function foo(a) {
      let b = 2;

      bar();
    }

    foo(7);
  }

  console.log('[outer scope]');
  outer();


  function counterInit() {
    let count = 0;

    return {
      add: function(val) {
        count += val;
        return count;
      }
    }
  }

  console.log('[closure]');
  let counter = counterInit();
  console.log(counter.add(4), counter.add(2));
  console.log('have no access to the "count": counter.count =', counter.count);

  function add(a) {
    return function(b) {
      return a + b;
    }
  }

  console.log('[Curring]');
  console.log(add(2)(3));

  let add5 = add(5);
  console.log(add5(3));
  console.log(add5(6));
}

function advancedCurring() {
  function sum(a) {
    let result = a;

    function next(b) {
      result += b;
      return next;
    }

    next.valueOf = function() {
      return result;
    }

    return next;
  }

  console.log('-----Advanced Curring-----');
  
  let result = sum(1)(2)(3)(4);
  console.log('result == 10:', result == 10);
  console.log('result === 10:', result === 10);
  console.log('result + 0:', result + 0);
  // console.log('result:', result);
}

function advancedCurringNew() {
  function calc(a) {
    let list = [a];

    function next(arg) {
      if (typeof arg === 'number') {
        list.push(arg);
        return next;
      } else {
        // Function
        return list.reduce( function (acc, item) {
          return arg(acc, item);
        });
      }
    }

    return next;
  }

  console.log('-----Super Advanced Curring-----');
  
  let calcResult = calc(1)(2)(3)(4);
  let sum = (a, b) => a + b;
  let mul = (a, b) => a * b;
  console.log('calcResult(sum):', calcResult(sum));
  console.log('calcResult(mul):', calcResult(mul));
}

function workWithThis() {
  let obj = {
    field: 5,
    print: function() {
      console.log(this.field);
    }
  }

  function outer() {
    console.log('from outer', this.field);
  }

  console.log('-----this-----');
  obj.print();

  obj.outer = outer;
  obj.outer();
  outer();

  let separateFn = obj.print;
  console.log('\nseparateFn');
  separateFn();

  let arrowObj = {
    field: 123,
    print: function() {
      return () => {
        console.log(this.field);
      }
    }
  }

  obj.print = arrowObj.print();
  let separatePrint = arrowObj.print();

  console.log('\nprint arrow func');
  arrowObj.print()();
  obj.print();
  separatePrint();
  arrowObj.print().call(obj);
  console.log('end\n');
}

function bindCallApply() {
  function outer(a, b) {
    console.log('from outer', this.field, a, b);
  }

  let obj = {
    field: 42
  }

  outer.call(obj, 1, 2);
  outer.apply(obj, [4, 5]);

  let newObj = {
    field: 'new Field'
  }
  let newOuter = outer.bind(newObj, 2);
  newOuter(5);

  obj.outer = newOuter;
  obj.outer();

  (function() {
    // arguments is pseudo array, but NOT AN ARRAY
    console.log('arguments.forEach -', arguments.forEach);
    Array.prototype.forEach.call(arguments, (val) => console.log(val));
  })(10, 24, 36);
}

function funcClass() {
  function User(name) {
    this.name = name;
  }

  let user = new User('Vasya');
  console.log(user);

  function SimpleReturn() {
    this.field = 42;
    return 3;
  }

  function ObjectReturn() {
    this.field = 43;
    return {
      notField: 44
    }
  }

  console.log(new SimpleReturn());
  console.log(new ObjectReturn());

  function SecureUser(name, password) {
    User.call(this, name);
    this.password = password;
  }

  // SecureUser.prototype.fn = () => console.log('from proto');

  console.log(new SecureUser('Petya', '123456'));
  // new SecureUser('Petya', '123456').fn();
}

function protoFunc() {
  (function() {
    // set proto chain

  let baseObj = {
    first: 1
  };

  let obj = {
    second: 2
  };

  obj.__proto__ = baseObj;
  console.log(obj.first, obj.second);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // do smth...
    }
  }

  // for..in + .hasOwnProperty

  // Object.create(null) - obj without proto
  })();

  (function() {
    function User() {
      // ...
    }

    function SecureUser() {
      // ...
      this.__proto__ = User;
    }
  })();
  
  (function() {
    function User() {
      // ...
    }

    User.prototype.print = function(){
      console.log('print from user');
    };

    function SecureUser(pass) {
      User.apply(this, arguments);
      this.pass = pass;
    }

    // set __proto__ = User
    // only for using in constructor to set __proto__
    // ignore non-object
    // SecureUser.prototype.__proto__ = User.prototype;

    // the same as 
    SecureUser.prototype = Object.create(User.prototype);
    SecureUser.prototype.constructor = SecureUser;


    let user = new SecureUser('123');
    // to create the same obj:
    let anotherUser = new user.constructor('456');
    console.log(user, anotherUser);
    user.print();

    // user -> SecureUser.prototype -> User.prototype
  })();
}

function stringInterpolation() {
  let a = {b: 7};
  let str = `aaa${6+13}ooo ${a}`;

  console.log(`${11}abc${3+4}ooi${123}`);
  console.log`${11}abc${3+4}ooi${123}`;
  // ['','abc', 'ooi', ''] 11 7 123
}

function computedProps() {
  let a = 123;
  let b = 456;
  let o = {a, b} // {a: a, b: b}

  let ob = {
    ['a7']: 'abcd',
    [7 + 2]: 4,
    [undefined]: 5
  }

  console.log(ob);
  console.log(ob['a7'], ob[9], ob['undefined'], ob[undefined]);
}

function defaultArgs() {
  function fn(a = 6, b = 5) {
    return a + b;
  }

  console.log(fn(1));
}

function restArgs() {
  function fn(a, ...b) {
    console.log(`a: ${a}`);
    console.log(`b: ${b}, b.length: ${b.length}`);
    console.log();
  }

  console.log('()');
  fn();

  console.log('(1)');
  fn(1);

  console.log('(1, 2)');
  fn(1, 2);

  console.log('(1, 2, 3)');
  fn(1, 2, 3);
}

function classesES6() {
  class MyClass {
    constructor(name) {
      this.name = name;
    }

    fn() {
      // your code
    }
  }

  class MyNewClass extends MyClass {
    constructor(name, pass) {
      super(name);
      this.pass = pass;
      this._field = 0;
    }

    static print() {
      console.log('static');
    }

    fn() {
      super.fn(); // не обязательно вызывать метод предка
      console.log('done');
    }

    get field() {
      console.log('get field');
      return 10;
    }

    set field(val) {
      if (val > 10) {
        return;
      }

      this._field = val;
    }
  }

  MyNewClass.print();
  let newClass = new MyNewClass('abc', 213);
  console.log(newClass.field);
}

function spreadRest() {
  let arr = [0, 1, 2, 3];
  let b = [...arr, 4, 5];
  console.log(b);

  let obj = {
    a: [1, 2, 3],
    b: 2
  };

  let c = {
    ...obj,
    a: [...obj.a, 4, 5, 6],
    c: 3
  };
  console.log(c);
}

function findFindIndex() {
  let arr = [4, 5, 6];
  console.log(
    'val:', arr.find(val => val > 5),
    'idx:', arr.findIndex(val => val > 5)
  );

  console.log([{a: 1, b: 2}, {a:3, b: 4}].find(val => val.a === 1));
}

function repeatIncludes() {
  let str = 'abc';
  console.log(str.repeat(4));
  console.log(str.includes('b'));

  let res = [1, 2].includes(2);
  console.log(res);
}

function iteratorGenerator() {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  let it = gen();
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());

  function* range(start, end, step) {
    let current = start;

    while(current <= end) {
      yield current;
      current += step;
    }
  }

  console.log([...range(1, 15, 3)]);

  function* fact() {
    let n = 1;
    let current = n;

    while(true) {
      yield current;
      current *= ++n;
    }
  }

  let f = fact();
  console.log(
    f.next().value,
    f.next().value,
    f.next().value,
    f.next().value,
    f.next().value
  );


  Number.prototype[Symbol.iterator] = function* () {
    for (let i = 0; i < this; i++) {
      yield i;
    }
  }

  console.log([...10]); // [0, 2, 3, ... , 9]
}

function arrayMethods() {
  let res = [];
  res.push( [1, 2, 3].map(val => val * 2) );
  res.push( [1, 2, 3].filter(item => [1, 2, 4, 8].includes(item)) );
  res.push( [1, 2, 3].every(item => item > 2) );
  res.push( [1, 2, 3].some(item => item > 2) );
  res.push( [1, 2, 3].reduce((acc,item) => acc + item) );
  res.push( [1, 2, 3].join('-') );
  
  res.forEach( item => console.log(item) );

  let a = '1 2 3';
  console.log(eval(a.replace(/ /g, '+')));
  // don't use eval function :)

  let b = '1234';
  console.log(
    b.split('')
      .reduce((acc, item) => acc + +item, 0)
    );
}

function promises() {
  let p = new Promise((res, rej) => {
    setTimeout(() => res('hello'), 2000);
  });

  p.then(data => {
    console.log(data);
    return data + ' World';
  })
  .then(a => console.log(a));

  Promise.all([
    Promise.resolve('First'),
    new Promise((res, rej) => res('Second')),
    new Promise((res, rej) => setTimeout(() => res('Third'), 0))
  ])
  .then(results => {
    results.forEach(result => console.log('from All:', result));
  })
  .catch((err) => console.log('something went wrong', err));

  Promise.race([
    new Promise((res, rej) => setTimeout(() => res('Third'), 0)),
    new Promise((res, rej) => res('Second')),
    Promise.resolve('First'),
  ])
  .then(result => {
    console.log('from Race:', result);
  })

  // Promise.resolve
  // Promise.reject
  // Promise.all
  // Promise.race
}

function proxyES6() {
  let obj = {
    a: 1
  };

  let a = new Proxy(obj, {
    get(target, key) {
      console.log(target, key);
      return target.hasOwnProperty(key) ?
        target[key] : 9;
    }
  });

  console.log(a.a, a.b);
}

// types();
// boolExpression();
// functionExplanation();

// scopeAndClosure();
// advancedCurring();
// advancedCurringNew();
// workWithThis();
// bindCallApply();
// funcClass();
// protoFunc();

// ----ES6----
// stringInterpolation();
// computedProps();
// defaultArgs();
// restArgs();
// classesES6();
// spreadRest();
// findFindIndex();
// repeatIncludes();
// iteratorGenerator();
// arrayMethods();
// promises();
proxyES6();