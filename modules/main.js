console.log('ES6, AirBnB, Modules');

// import { test as funcFromModule, MY_FIELD, NOT_NINJA } from './harmony-module';
// import myModuleFunc from './default-harmony-module';

function esVariables() {
  console.log('\nES6 Variables');

  function valueScope() {
    let a = 9;

    console.log('[before "if" scope]:', a);

    if (true) {
      let a = 2;
      console.log('[inside "if" scope]:', a);
    }

    console.log('[outside "if" scope]:', a);
  }

  function typicalInterviewIssue() {
    console.log('\nInterview issue');

    console.log('\nWork with var & setTimeout');
    
    for (var i = 0; i < 5; i++) {
      setTimeout(() => console.log('var', i), 0);
    }

    // setTimeout(() => console.log('\nWork with let & setTimeout'), 30);
    
    // for (let i = 0; i < 5; i++) {
    //   setTimeout(() => console.log('let', i), 40);
    // }

    console.log(i);
  }

  function varInside() {
    console.log('\nWork with var:');
    console.log('[Do we know about i]:', i);

    for (var i = 0; i < 2; i++) {
      // do smth...
    }

    console.log('[Do we know about i after for-loop]:', i);
  }

  function letInside() {
    console.log('\nWork with let:');
    console.log('[Do we know about i]:', i);

    for (let i = 0; i < 2; i++) {
      // do smth...
    }

    console.log('[Do we know about i after for-loop]:', i);
  }

  function constValue() {
    let nonConst = 10;
    const trueConst = 20;

    console.log('\n[Non-const value]:', nonConst);
    console.log('[Const value]:', trueConst);

    console.log('\n[Let`s change values]');
    
    nonConst = 5;
    console.log('[Non-const value]:', nonConst);

    // trueConst = 15;
    // console.log('[Const value]:', trueConst);
  }

  function constObject() {
    const obj = { a: 1 };
    const array = [1, 2, 3];

    console.log('\n[Const object]:', obj);
    console.log('[Const array]:', array);

    console.log('\nLet`s change them');

    obj.text = 'new field';
    console.log('[Const object]:', obj);

    array[1] = 99;
    array.push(456);
    console.log('[Const array]:', array);
  }

  // valueScope();
  // typicalInterviewIssue();
  // varInside();
  // letInside();
  // constValue();
  // constObject();
}

function esArrowFunc() {
  function fullBody() {
    console.log('\nFull body function');

    function doSomeStuff() {}

    function oldFn(arg) {
      doSomeStuff();

      return {
        arg,
        result: true
      };
    }
  
    const newFn = (arg) => {
      doSomeStuff();

      return {
        arg,
        result: true
      };
    };

    console.log('[oldFn result]:', oldFn('abc'));
    console.log('[newFn result]:', newFn('abc'));
  }

  function returnPrimitive() {
    console.log('\nReturn primitive example');

    function oldFn() {
      return 4;
    }
  
    const newFn = () => 4;

    console.log('[oldFn result]:', oldFn());
    console.log('[newFn result]:', newFn());
  }

  function returnObject() {
    console.log('\nReturn object example');

    function oldFn() {
      return {
        result: false,
      };
    }
  
    const newFn = () => ({
      result: false,
    });

    console.log('[oldFn result]:', oldFn());
    console.log('[newFn result]:', newFn());
  }

  function thisFn() {
    console.log('\n This on function example');

    console.log(this);

    function oldFn() {
      return this;
    }

    const newFn = () => {
      return this;
    }

    const obj = {
      a: 5,
      oldFn,
      newFn
    };

    console.log('\nobjects func'); 
    console.log('[this from oldFn]:', obj.oldFn());
    console.log('[this from newFn]:', obj.newFn());

    console.log('\nbase func with .call'); 
    console.log('[this from oldFn]:', oldFn.call({ a: 5 }));
    console.log('[this from newFn]:', newFn.call({ a: 5 }));

    console.log('\nobjects func with .call'); 
    console.log('[this from oldFn]:', obj.oldFn.call({ a: 5 }));
    console.log('[this from newFn]:', obj.newFn.call({ a: 5 }));

    console.log('\nobjects func with .call after .bind'); 
    console.log('[this from oldFn]:', obj.oldFn.bind({status: 'binded'}).call({ a: 5 }));
    console.log('[this from newFn]:', obj.newFn.bind({status: 'binded'}).call({ a: 5 }));
  }

  // fullBody();
  // returnPrimitive();
  // returnObject();
  // thisFn.call({ context: 'from bind' });
}

function modules() {
  function useIIFE() {
    console.log('\nUse IIFE');

    function appendParam() {
      let app = {name: 'use IIFE'};

      console.log('\nAppend Param');
      console.log('[APP before calling module]:', app);

      (function (app = {}) {
        app.val = 'new val from module';
      })(app);

      console.log('[APP after calling module]:', app);
    }

    function createModule() {
      console.log('\nCreate Module');

      const newModule = (() => {
        function someFn() {
          // do some stuff
        }

        const myModule = {
          someFn,
          someVal: 'Value from module'
        };

        return myModule;
      })();

      console.log(newModule);
    }

    function isolatedContext() {
      console.log('\nIsolated Context');

      let someField = 'outer';
      console.log('[someField outside of module]:', someField);

      (() => {
        let someField = 'inner';

        function fn() {
          console.log('Hello function');
        }

        function doSomething() {
          console.log('[someField in module]:', someField);
          fn();
        }

        doSomething();
      })();

      console.log('[AFTER someField outside of module]:', someField);
    }

    // appendParam();
    // createModule();
    // isolatedContext();
  }

  function useCommonJS() {
    console.log('\nUse CommonJS');

    // const a = require('./module-a');

    // console.log('[Call function from module]:', a.fn());
    // console.log('[Get value from module]:', a.variable);
    // console.log('\n[Whole import]:', a);

    // console.log('\n[Whole import from default export module]:', require('./default-module'));
  }

  function useHarmony() {
    console.log('\nUse Harmony\n');

    funcFromModule();
    console.log('[Field from harmony module]:', MY_FIELD);
    console.log('[Not Ninja field from harmony module]:', NOT_NINJA);

    console.log('\n[Default harmony module]:', myModuleFunc());
  }

  // useIIFE();
  // useCommonJS();
  // useHarmony();
}

// esVariables();
// esArrowFunc();
// modules();
