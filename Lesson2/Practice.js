function assignProperty3(obj, prop, value) {
  while (!obj[prop]) {
    obj = Object.getPrototypeOf(obj);
    if (!obj) {
      return;
    }
  }
  obj[prop] = value;
  return value;
} // Assignment expressions implicitly return the value;

// Also check hasOwnProperty rather than just indexing

function assignProperty2(obj, prop, value) {
  while (obj) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = value;
      break;
    }
    obj = Object.getPrototypeOf(obj);
  }
}

function assignProperty(obj, prop, value) {
  if (obj === null) {
    return;
  } else if (obj.hasOwnProperty(prop)) {
    obj[prop] = value;
    return;
  } else {
    obj = Object.getPrototypeOf(obj);
    return assignProperty(obj, prop, value);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

(function foo() {
  console.log('Hi');
});

function foo() {
  function foo2() {
    console.log(this);
  }
  return foo2;
}

// foo()();

"use strict";
function foo() {
  console.log("this refers to: " + this);
}

foo(); // this refers to: undefined

// Execution Context

// function logNum() {
//   console.log(this.num);
// }

// let obj = {
//   num: 42
// };

// logNum.call(obj);
// obj.logNum = logNum;


let obj = {
  func: function() {
    return this;
  },
  foo: 1
};

let context = obj.func();

console.log(context);

let abfunction = function(a,b) {
  let fn = this;
  return function() {
    console.log(fn);
  }
}

abfunction();

// function testArgs(...args) {
//   console.log(args);
// }

// testArgs(1,2,3);

let obj2 = {
  a: 5,
  sum: function(num) {
    return this.a + Number(num);
  }
}

let obj3 = {
  a: 3
}
let ten = obj2.sum.bind(obj3,[7]);

console.log(ten());

let context2 = {
  a: 1,
  foo: function() {
    let self = this;
    function doo() {
      console.log(self.a);
    }

    doo();
  }
}

context2.foo();


let foo1 = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  },
  roo: function() {
    console.log(this.a);
  }
}

foo1.incrementA();
foo1.incrementA();
foo1.incrementA();
console.log(foo1.a);
let doo1 = Object.create(foo1)


doo1.roo();

let logResult = function(func) {
  let result = func();
  console.log(result);
  return result;
};

let foo3 = function() {
  let self = this;
  let sue = {
    name: 'Sue Perkins',
    age: 37,
    myAge() {
      console.log(self);
      return `${self.name} is ${self.age} years old`;
    },
  };
  logResult(sue.myAge);
};

foo3();