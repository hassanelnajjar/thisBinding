
The Following rules from [KYLE SIMPSON Book - You Don’t Know JS Book - this & Object Prototypes](https://www.amazon.com/You-Dont-Know-JS-Prototypes/dp/1491904151) 
### There are four roles apply here to this binding:-
1. Default Binding

```javascript
function foo() {
    console.log(this.a) 
  }
  var a = 5;
foo() // 5
```
because when you call foo - it's enter call stack - set the frame as global so this reference to global variable: window and the value of a is 5

2. Implicit Binding
```javascript
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
```

### Implicit lost :-
```javascript
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


var bar = obj1.foo
var baz = obj2.foo

var a = 15;
bar() //15 in browser - undefined in node
baz() //15 in browser - undefined in node
```
Please read [this](https://stackoverflow.com/questions/27031663/default-binding-of-this-is-different-from-chrome-browser-and-node-js?fbclid=IwAR3gaEMal91jTtzLWyCHuJHFQaFwH0X90RqhonPX83j5HoIoUYnMaQPAciQ) to know why the result undefined in node

3. Explicit binding
```javascript
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


var bar = obj1.foo 
var baz = obj2.foo
var a = 15;
bar.call(obj1) // 5  - specify the value of this inside call
baz.call(obj2) // 10 - specify the value of this inside call

```
You can use call(thisArg,ArgsList) - apply(thisArgs,ArgsArray) - bind(thisArgs)

These topic form mdn to learn more about [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) , [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) , [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

4. new Binding
```javascript
function foo(a){
  this.a = a
}
var bar = new foo(3) //new convert bar to be an object an set a as  a property and set 3 as it's value 
console.log(bar.a) // 3

```
# Safer this
```javascript
function foo(a,b) {
console.log( "a:" + a + ", b:" + b );
}
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```
> However, there’s a slight hidden “danger” in always using null when
you don’t care about the this binding. If you ever use that against a
function call (for instance, a third-party library function that you don’t
control), and that function does make a this reference, the default
binding rule means it might inadvertently reference (or worse, mu‐
tate!) the global object ( window in the browser).
Obviously, such a pitfall can lead to a variety of bugs that are very
difficult to diagnose and track down.


> Perhaps a somewhat “safer” practice is to pass a specifically set up
object for this that is guaranteed not to be an object that can create
problematic side effects in your program


### Create Object Without as Prototypes : Safer this
```javascript
const obj = Object.create(null)
```

## Example :-
```javascript
function foo(a,b) {
console.log( "a:" + a + ", b:" + b );
}
// our DMZ empty object
var DMZ = Object.create( null );
// spreading out array as parameters
foo.apply( DMZ, [2, 3] ); // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind( DMZ, 2 );
bar( 3 ); // a:2, b:3
```


# Arrow Function in ES6
> ES6 arrow-functions use
lexical scoping for this binding, which means they inherit the this
binding (whatever it is) from its enclosing function call

```javascript
function foo() {
  const self = this
  return ()=>{
    console.log(self.a)
  }
}
const obj = {a:4};
const bar = foo.call(obj);
bar() // 4
```

Determining the this binding for an executing function requires
finding the direct call-site of that function. Once examined, four rules
can be applied to the call-site, in this order of precedence:
1. Called with new ? Use the newly constructed object.
2. Called with call or apply (or bind )? Use the specified object.
3. Called with a context object owning the call? Use that context
object.
4. Default: undefined in strict mode , global object otherwise.
