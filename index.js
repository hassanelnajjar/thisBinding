//here you are in node every module wrapped inside a function
// There are four roles apply here to this binding:-
/*
1. Default Binding
function foo(){
  console.log(this.a)
}
var a = 5;
foo() // 5
because when you call foo - it's enter call stack - set the frame as global so this reference to global variable: window and the value of a is 5

2. Implicit Binding
function foo(){
  console.log(this.a)
}
var obj1 = {
  a:5,
  foo:foo
}
var obj2 = {
  a:10,
  foo:foo
}

obj1.foo() // 5
obj2.foo() // 10


// **Implicit lost :-
var bar = obj1.foo
var baz = obj2.foo

var a = 15;
bar() //15 in browser - undefined in node
baz() //15 in browser - undefined in node

3. Explicit binding
function foo(){
  console.log(this.a)
}
var obj1 = {
  a:5,
  foo:foo
}
var obj2 = {
  a:10,
  foo:foo
}



// **Implicit lost :-
var bar = obj1.foo 
var baz = obj2.foo
var a = 15;
bar.call(obj1) // 5  - specify the value of this inside call
baz.call(obj2) // 10 - specify the value of this inside call

// You can use call(thisArg,ArgsList) - apply(thisArgs,ArgsArray) - bind(thisArgs)
*/

function foo() {
  const self = this
  return ()=>{
    console.log(self.a)
  }
}
const obj = {a:4};
const bar = foo.call(obj);
bar() // 4