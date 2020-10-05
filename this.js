console.log('-----this-----');

function workWithThis() {
    let obj = {
        field: 5,
        print: function() {
            console.log('print fn:', this.field);
        }
    };

    function firstRound() {
        console.log('\nobj.print()');
        obj.print();
    }

    function secondRound() {
        function outer() {
            console.log('from outer', this.field);
        }

        console.log('\nouter()');
        outer();

        obj.outer = outer;
        console.log('\nobj.outer()');
        obj.outer();

        let separateFn = obj.print;
        console.log('\nseparateFn');
        separateFn();

        console.log(' - Think about ReferenceType');

        // o1 = {
        //     innerObj: {
        //         field: 10,
        //         print: function() {
        //             console.log('inner object', this.field);
        //         }
        //     },
        //     field: 66
        // };

        // o1.innerObj.print();
    }

    function withDifferentTypes() {
        console.log('\nobj.print()');
        obj.print();

        console.log('\n(obj.print)();');
        (obj.print)();

        console.log('\n(obj.print = obj.print)()');
        (obj.print = obj.print)();

        console.log('\n(obj.print || obj.print)()');
        (obj.print || obj.print)();

        console.log('\n[obj.print][0]()');
        [obj.print][0]();
    }

    function callBindApply() {
        function someFn() {
            console.log('print from some fn:', this.field);
        }

        console.log('\ncall & apply:');

        someFn.call(obj);
        someFn.apply(obj);

        console.log('\nbinded fn:');
        let binded = someFn.bind(obj);
        binded();

        console.log('\nbinded with call & apply:');
        let anotherObj = {
            field: 'another',
        };

        binded.call(anotherObj);
        binded.apply(anotherObj);
    }

    function extraRound() {
        let arrowObj = {
            field: 123,
            print: function() {
                return () => {
                    console.log('arrow print fn:', this.field);
                }
            }
        };

        arrowObj.print();
        
        // obj.print = arrowObj.print();
        // let separatePrint = arrowObj.print();
    
        // console.log('\nprint arrow func');

        // arrowObj.print()();
        // obj.print();
        // separatePrint();
        // arrowObj.print().call(obj);

        console.log('end\n');
    }

    // firstRound();
    // secondRound();
    // withDifferentTypes();
    // callBindApply();
    // extraRound();
}

function checkGlobalThis() {
    function withStrict() {
        'use strict';

        console.log('\n with strict mode, this:', this);
    }

    withStrict();
}

function thisWithConstructor() {
    function A() {
        this.a = 42;
    }

    function B() {
        this.a = 42;

        return 'for what?';
    }

    function C() {
        this.a = 42;

        return {
            a: 'meaning of life',
        };
    }

    console.log('\nwith constructors:')
    console.log(' - simple constructor:', new A());
    console.log(' - constructor which returns primitive:', new B());
    console.log(' - constructor which returns another object:', new C());

    // console.log('\nJust B()', B());
}

function additionalFeatures() {
    Number.prototype[Symbol.iterator] = function* () {
        console.log('\n I am inside generator function');

        for(let i = 0; i <= this; i++) {
            yield i;
        }
    }

    String.prototype.isFirstLetterCapitalA = function() {
        if (this.length === 0) {
            return false;
        }

        return this[0] === 'A';
    }

    let number = 6;
    console.log([...number]);

    console.log('\nAlphabet - is first A?  - ', 'Alphabet'.isFirstLetterCapitalA());
    console.log('Bird - is first A? -  ', 'Bird'.isFirstLetterCapitalA());
}

function inerestingInterviewIssues() {
    function amIArnold() {
        function User(login) { 
            this.login = login;
            this.getName = () => this.login;
        }
        
        let arnold = new User('Arnold');

        console.log(arnold.getName());
        console.log(arnold.getName.call({login: 'John Doe'}));
    }

    function withArguments() {
        length = 10;
        function fn() {
            console.log(this.length);
        }

        var o = {
            length: 2,
            method: function(fn) {
                fn();
                arguments[0]();
            }
        }

        o.method(fn, 123, 456);
    }

    // amIArnold();
    // withArguments();
}

// workWithThis();

// console.log('window & this:', this === window); // works with browsers console
// console.log(this);
// checkGlobalThis();

// thisWithConstructor();
// additionalFeatures();
// inerestingInterviewIssues();


/**
 * Example with inner calls
 */
// function foo() {
//     function bar() {
//         return this.x;
//     }

//     return bar();
//     // return bar.call(this);
// }

// const obj = {x: 10, test: foo};
// console.log('Result of inner calls:', obj.test());
/**
 * End of example
 */
