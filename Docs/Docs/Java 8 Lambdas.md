# Lambdas Docs

## Lambdas

- Enables Functional Programming.
- Concise code.
- Support for parallel processing.
- easier to use libraries.

## OOP

>Everything is an Object.  
>All code blocks are associated with classes and objects.

## Passing behavior in OOP

>Pass interface with different methods to execute different behaviors.  
>We are not passing a behavior but an object with a behavior.

## Functions as values

`aBlockOfCode = () -> sysout(...);`

## Functional Interfaces

>Denoted by @FunctionalInterface annotation

It is an interface with only one abstract function.

>Lambdas need Functional Interfaces. Each Lambda is of a Functional Interface type. 

>Lambdas should match with the method signature of the Functional Interface.

>Lambdas are executed by calling the interface method on it.

We are implementing an interface by implementing the function.

There are many Functional Interfaces inbuilt in java - Predicate, Supplier, Consumer ...

`Thread myLambdaThread = new Thread(() -> sysout(started thread));`

## Type Inference

There is binding between lambda and the interface. So we can pass the lambda directly without assigning to a Functional Inference.
Because of this the syntax is a lot shorter.

## Exception handling in Lambdas

We use wrapper lambdas.

Intercept the lambda and put try catch block in wrapper lambda.

## Closures

Lambdas have a snapshot of the values at the time it gets created.
So we can retain values. The values of all vars are frozen.

>Lambdas does not remove this bindings. That is they retain this value of the class itself and does not point to lambda.

## Method References

Alternate way to write lambdas.

Syntax

>Class::Method

```
public static void main(String[] args) {

	Map<Integer, String> HOSTING = new HashMap<>();
	HOSTING.put(1, "linode.com");
	HOSTING.put(2, "heroku.com");
	HOSTING.put(3, "digitalocean.com");
	HOSTING.put(4, "aws.amazon.com");

	//Map -> Stream -> Filter -> Map
	Map<Integer, String> collect = HOSTING.entrySet().stream()
			.filter(map -> map.getKey() == 2)
			.collect(Collectors.toMap(p -> p.getKey(), p -> p.getValue()));

	System.out.println(collect); //output : {2=heroku.com}

	Map<Integer, String> collect2 = HOSTING.entrySet().stream()
			.filter(map -> map.getKey() <= 3)
			.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

	System.out.println(collect2); //output : {1=linode.com, 2=heroku.com, 3=digitalocean.com}

}
```

## Streams

Lambdas are useful in looping and in stream operations.

>forEach()

>list.forEach(System.out::println);

>Source - list  
>Filter operation  
>Terminal operation - end operation.  
