# JavaScript Docs

## Objects:

>Everything is an object in JavaScript.  
>Can use dot or bracket notation to access properties of an object.

>Javascript can have multiple arguments in functions.  
>Functions can be arguments.  
>All functions are objects.  

>JavaScript is Function scoped.

>IIFE - immediately invoked function expressions.

## JavaScript has variable hoisting

It has 2 steps - Compilation and Interpretation.

As javascript compiles the code it notes down all the variables and in the execution step it executes the code. So if a var declaration is written below its definition also it works.

strict mode resolves this.

Each function expression has its own closure and new set of values.

>Two default arguments to every function - arguments and this.

>Async callbacks will have problem with closures.  
>Can solve with IIFE and local vars.

## Constructor Functions

JavaScript functions that create objects.

We can call a function in constructor mode by using new keyword.

`var emp = new Employee('Jim');`

Constructor functions are denoted like classes in java - Employee - name with starting capital letter.

### Normal Function

```
function employee(name) {
	var obj = {};
	obj.name = name;
	return obj;
}
```

### Constructor Function

```
function Employee(name) {
	this.name = name;
}
```

## Function execution types

* foo()
* obj.foo()
* new Foo()
* foo.call(obj)

## Prototypes

>Used to mimic classes behavior.

Every time a function is created, 2 objects are created for that.

>One is the function object itself  
>The other is the Prototype object.

`function foo() {}`

foo has a property called prototype which points to the Prototype object.

Now when we do,

`var obj = new Foo();`

obj has a property __proto__ which points to Prototype object of foo.

`foo.prototype === obj.__proto__`

>Property lookup - If a property is not present in object it looks for the property in the prototype object of parent and only if not found there it is undefined.

This can mimic inheritance.

>Prototype lookup happens at runtime. - We can add new properties at any point and all objects get that.

## Object Function

```
								Object                     	 		Prototype
									prototype <---------------->constructor      __proto__ ------->null
																	^
																	|
																	|
																	|
																	|
																	|	
																	|
																	|
foo function                 	 	foo's Prototype					|
	prototype <---------------->constructor		__proto__ -----------
								^
								|
fooObj								|
	__proto__ ------------------
```

## JavaScript 6

We have Named exports and Default ecports

### Named

`import { ... } from './...'`

### Default

`import ... from './...'`

>While importing custom classes, we use './...' as from path
otherwise we use '...'

## Rest operator

>converts list of numbers to array of numbers.  
>used in varargs

## Spread operator

>converts array of numbers to list  
>can be used in concat
