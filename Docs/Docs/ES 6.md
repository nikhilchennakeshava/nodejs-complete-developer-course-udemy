# EcmaScript 6 Docs

## Topics

01:06 Let 03:15 Constant 04:19 Data Types 05:27 Template Literals 07:09 Tagged Template Literals 09:57 For Of 12:17 Functions 13:48 Rest Parameters 15:11 Arrow Functions 16:32 Reduce 17:19 Filter 18:00 Map 19:05 Objects 22:23 Destructoring 24:04 Classes 27:25 Inheritance 31:45 Symbols 34:28 Arrays 36:16 Sets 38:04 Maps 39:28 forEach 40:03 Promises

## let, const keywords

let and const instead of var to fix scoping issues

## Template literals

```
let name  = 'nikhil';
let str = `my name is ${name}`;
console.log(str);
```

can be used for multiline comments.

## for of loop

## String extra functions

## Exports

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

## Arrow functions

>Map, Reduce and filter

## Object literals

## Destructuring

### Objects

`let { prop1, prop2 } = obj;`

### Arrays

`let [a, b] = arr;`

## classes

classes
get
set
static methods.

## Arrays

```
Array.of(...arr)
Array.from()
```

## Sets

## Promises

```
resolve
reject
then
error
```

```
prom.then()
	.catch()
```
