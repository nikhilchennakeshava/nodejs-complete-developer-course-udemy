# RxJs Docs

## Creating Observables
Need to unsubscribe to prevent memory leaks.

`var button = document.querySelector('button');`

>An observer is just an object which implements next(), error() and complete() functions.

```
var observer = {
	next: function(value) {
	console.log(value);
	},
	error: function(error) {
	console.log(error);
	},
	complete: function() {
	console.log('Completed');
	}
};
```

>Observable is a function which has observer object abd which can emit values async.

>Observer has to subscribe to get the value or use pipe in html to get the value from observable.

Using pipes, we dont need to subscribe and unsubscribe.

```
//Rx.Observable.fromEvent(button, 'click')
var subscription = Rx.Observable.create(function(obs) {
	//obs.next('A value');
	//obs.error('Error');
	//setTimeout(function() {
	//	obs.complete();
	//  obs.next('A second value');
	//}, 2000);
	button.onclick = function(event) {
	obs.next(event);
	}
})
	.subscribe(observer);
	
setTimeout(function() {
	subscription.unsubscribe();
}, 5000);
```

>Observables are like a stream of async values. Any observer can access these values.

We can use many operators in this.

## Map operator

Is performed on an Observable which returns another Observable.

```
var observable = Rx.Observable.interval(1000);
var observer = {
	next: function(value) {
	console.log(value);
	}
};

observable.map(function(value) {
	return 'Number: ' + value;
}).throttleTime(1900).subscribe(observer);
```

## To update old projects with RxJs 6

>npm i --save rxjs-compat

This provides backward compatability.

### RxJs changes

Package structure got changed. updated imports and operators.

pipe()

Some operators renamed.

#### Changed operators

```
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromPromise } from 'rxjs';
	
	...
	
usually :
	from 'rxjs';
	from 'rxjs/operators';
```

## Pipeable operators

```
import { map, throttle } from 'rxjs/operators';

someObservable.pipe(
	map(),
	throttle(),
	...
).subscibe();
```

>Pipes can combine infinite number of operators.

### Names that got changed

* do() -> tap()
* catch() -> catchError()
* switch() -> switchAll()
* finally() -> finalize()
* throw() -> throwError()

## RxJs Subject

```
var subject = new Rx.Subject();

subject.subscribe({
	next: function(value) {
	console.log(value);
	},
	error: function(error) {
	console.log(error);
	},
	complete: function() {
	console.log('Complete');
	}
});

subject.subscribe({
	next: function(value) {
	console.log(value);
	}
});

subject.next('A new data piece');
subject.complete();
subject.next('New value');
```

>Subjects inherit observables but one main difference is that it is not passive.  
>We can call the next method manually. This is different than in observable as we have to wait for the next method to be called.

>Subject is both an Observable and an Observer.

## filter() operator

```
var observable = Rx.Observable.interval(1000);

observable
.filter(function(value) {
	return value % 2 == 0;
})
.subscribe({
	next: function(value) {
	console.log(value);
	},
	error: function(error) {
	console.log('Error: ', error);
	}
});
```

## debounceTime() and distinctUntilChanged()

Used in input validation and autofill forms.

>debounceTime is different than throttleTime as debounceTime will wait for the time mentioned when no user input is done.

>distinctUntilChanged checks whether previous emit was same as current one. If same then no emit is made.

```
var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');

observable
.map(event => event.target.value)
.debounceTime(500)
.distinctUntilChanged()
.subscribe({
	next: function(value) {
	console.log(value);
	}
});
```

## scan() vs reduce()

```
var observable = Rx.Observable.of(1,2,3,4,5);

observable
.scan((total, currentValue) => {
	return total + currentValue;
}, 0)
.subscribe({
	next: function(value) {
	console.log(value);
	}
});
```

>Scan gives us intermediate values but reduce gives us only final values.

## pluck():

```
var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');

observable
.pluck('target', 'value')
.debounceTime(500)
.distinctUntilChanged()
.subscribe({
	next: function(value) {
	console.log(value);
	}
});
```

>Pluck can be used to pluck properties of an object. It works only on objects.

## mergeMap()

>useful to merge results of 2 observables.

```
var input1 = document.querySelector('#input1');
var input2 = document.querySelector('#input2');

var span = document.querySelector('span');

var obs1 = Rx.Observable.fromEvent(input1, 'input');
var obs2 = Rx.Observable.fromEvent(input2, 'input');

obs1.mergeMap(
	event1 => {
	return obs2.map(
		event2 => event1.target.value + ' ' + event2.target.value
	)
	}
).subscribe(
	combinedValue => span.textContent = combinedValue
);
```

We use inner observable which takes in value of outer observable and merges both values.

Until the inner observable emits the value, the outer observable is helpless.

## switchMap()

```
var button = document.querySelector('button');

var obs1 = Rx.Observable.fromEvent(button, 'click');
var obs2 = Rx.Observable.interval(1000);

obs1.switchMap(
	event => {
	return obs2
	}
).subscribe(
	(value) => console.log(value)
);
```

>It allows emission whenever another observable emits a value.

>It cancels old subscriptions automatically. Useful when we want to perform one thing whenever another specific event occurs.
	
## BehaviorSubject

```
var clickEmitted = new Rx.BehaviorSubject('Not clicked');
var button = document.querySelector('button');
var div = document.querySelector('div');

button.addEventListener('click', () => clickEmitted.next('Clicked!'));

clickEmitted.subscribe(
	(value) => div.textContent = value
);
```

>This is similar to Subject but one difference is that it can have an initial value.  
>This BehaviorSubject emits a value when it is defined itself which acts as default.
