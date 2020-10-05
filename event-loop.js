console.log('Event Loop\n');

function whatIsCallstack() {
  function foo() {
    console.log('[foo]: I am here!');

    // throw new Error('damn!');
  }
  
  function bar() {
    console.log('[bar]: I am here!');
    foo();
  }
  
  function baz() {
    console.log('[baz]: I am here!');
    bar();
  }
  
  baz();
}

// we may call our funcs recursively

// talk about block

// Queue:

// ----STACK----
//  ----------
// |          |
// |          |
// |          |
// |          |
// |          |
// |          |

function callbacks() {
  console.log('Hello');

  setTimeout(
    function cb() {
      console.log('World');
    }, 3000);

  console.log('!');
}

function asyncMethod() {
  function asyncForEach(array, cb) {
    array.forEach( 
      // func inner
      item => setTimeout(() => cb(item), 0)
    );
  }

  asyncForEach([1, 2, 3], (a) => console.log('async', a));
  [1, 2, 3].forEach( a => console.log(a) );

  // [1, 2, 3].forEach( a => somethingSlow(a) );
  // it's very slow

  // asyncForEach([1, 2, 3], (a) => somethingSlow(a));

  function somethingSlow(item) {
    // I mean realy sloooooow
  }
}

function interviewCase() {
  function setTimeoutOnly() {
    console.log(1);

    setTimeout(() => console.log(2), 200);

    setTimeout(() => console.log(3), 0);

    console.log(4);
  }

  function promiseInGame() {
    console.log(1);

    setTimeout(() => console.log(2), 0);

    Promise.resolve(3).then(a => console.log(a));

    // WTF
    // new Promise( (res, rej) => {
    //   console.log('p', 1);
    //   console.log('p', 2);
    //   throw new Error('fhdjfhsdjf');
    //   resolve('p' + 3);
    // })
    // // .then(a => console.log(a))
    // .catch(err => console.log('Oops'));

    // // Promise { state: success }

    console.log(4);
  }

  function trickyPromise() {
    console.log(1);

    setTimeout(() => console.log(2), 0);

    new Promise((res, rej) => {
      console.log(3);
      res(4);
    }).then(a => console.log(a));

    console.log(5);
  }  

  function difficultPromiseInGame() {
    console.log(1);

    setTimeout(() => console.log(2), 0);

    Promise.resolve(3)
      .then(a => {
        console.log(a); // 3
        return a + 1; // 4
      })
      .then(a => {
        console.log(a); // 4
        return Promise.resolve(a + 1) // 5
      })
      .then(a => console.log(a)); // 5

    Promise.resolve(6)
      .then(a => console.log(a));

    console.log(7);
  }

  // setTimeoutOnly();
  // promiseInGame();
  // trickyPromise();
  // difficultPromiseInGame();
}

// whatIsCallstack();
// callbacks();  
// asyncMethod();
// interviewCase();
