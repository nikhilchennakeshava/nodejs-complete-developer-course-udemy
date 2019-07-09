# Angular Basics

## Angular cli: to create new angular projects

To install

>npm i -g @angular/cli

this is a scoped package

to check if involved: ng -v

>ng -v

## To create new angular project

>ng new \<project_name>

## To run project

>ng serve

>index.html is the root of the whole project

## To create new component

>ng generate component \<component_name>  
>or  
>ng g c \<component_name>

## To generate module at root level

>ng g module \<module> --flat

## To generate component attached to a module

>ng g c \<component> --module \<module>

## Data binding

bind the data in component instance to the html template.

To constantly update data use setInterval

## Directives

>Directives are methods or commands which tell angular some way to do a certain task.

>ngIf - conditional rendering  
>ngFor - looping

## Inputs

We can take inputs for a component similar to how we send input for normal html tags

>We use @Input() annotation for doing this. in ts file declare a variable as @Input

>But we need to move our method to ngOnInit() from constructor()

## Lifecycle hooks

When a component is written, object is created and constructor called.

```
ngOnInit() - called after initialization - ie populatin with input.
ngOnChanes() - called before ngOnInit
```

The Lifecycle methods are available via interface. Our Component should extend the interfaces.

## To pass parameters to components

You need to declare the object in AppComponent and build that in the constructor. Then you can pass the obj as parameter to child components.
If we are passing an object and not the value directly then we have to angluar to take the object and not as string directly. 
We use [] to specify the parameter.

`<component [obj]="obj"></component>`

## Styling the component

>Each component is self contained and independently styled. the css doesn't clash.
Angular achieves this by adding the [property] selector.

If we want to apply a style globally then we need to mention that in the styles.css file present in src/

## Now to add events and click

We define the function in ts file and then call the function in html usong () syntax.

`<button (click)="<function>()"/>`

## For Two way Data Binding

>We use the ngModel directive

To use ngModel we need a new import in app.module.ts
we need to import FormsModule

`import { FormsModule } from '@angular/forms';`

Then we can use like:
	
`[(ngModel)]="variable"`
	
This syntax is referred to as banana in a box.

### Note

* [] - data flows from component to the view
* () - data flows from view to the component
* {()] - both way data flows

## Module

>@NgModule

Consolidates the different components in an angular project.
It is kinda like a namespace. 

>Each module can contain multiple components.  
>A project can have multiple modules.  

Make a module for each feature.

We can generate modules using:

>ng generate module \<module_name>

To generate components inside a module:

>ng generate component \<module>/\<component_name>

Basically give the folder where we want the component.

To use the components of the sub module in main app module, we have to import the module itself.
But before that the component needs to be exported in the sub module.

>The import we do at @NgModule is the Angular import while the import at top of the page is the TypeScript import.

## Services

Usually we create a component with a view whenever we want to display something in the browser. - Reusable element.
But it need not be the case. All resusable elements need not be views.

We can use component which does not have a view and only does backend work.
We can only create classes without views.
These classes are known as Services in angluar.

>Services are like components and have classes, methods and are resusable.

We can generate service using:

>ng generate service \<service_name>
	
This class has @Injectable annotation which tells that it is an angular service.

To use a service we need to define it in a module where it is gonna be used.

>We need to keep all services in providers.

We have to add the service to the providers parameter of the @NgModule annotation of the module.
This may not be the case in latest angular as the @Injectable annotation comes with providedIn parameter.

After a service is declared in a module then it is available for use in all the components of that module.
This is achieved through dependency injection.

## Note

- @Component - Angular component
- @NgModule - Angular module
- @Injectable - Angular service

- declarations - all components that are part of the module
- imports - all other modules which are part of the module
- providers - all services which are part of the module

## Dependency Injection

If every time we need to initialize, then it creates a lot of problems.
Similar to dependency injection in java.

>To do this, we use the service as argument to the constructor where the service is needed.

This tells angular that the service in constructor is a dependency for that component.

Usually we assign the service to a local variable in the constructor of the component to preserve it. To do this, we can use private in constructor to assign to a local variable.

```
constructor(private service: Service){
}
```

## Service Injection Context

To reuse components, the owner module has to export them and the using module has to import them.

But for Services, if we declare it in app module, then all other components and modules will have access to it.
Services are common across all the modules. they are kept in a shared area.

In normal scenarios it doesn't matter as all modules can access.
The reason that angular doesn't add the service automatically in any modules is because things are different in Lazy loading of modules.
Lazy loading of modules can have multiple service injection context.

## HttpClient

>Used to make Rest calls. Provided out of the box in angular.

HttpClient is a service provided by angular.
To use this, we need to import the HttpClient module. This module has the HttpClient service.

Add it in imports of AppMdule.

>HttpClientModule

`import { HttpClientModule } from '@angular/common/http';`

After importing we can use it like any other module.

We can instantiate using constructor.

```
constructor(private testService: TestService, private http: HttpClient) {
}
```

>The http call we do is an asyc call so we cannot assign it to a variable. - we get Observable object back.

### Observable

>Observable - async object.  
>Observable - called as Promise in AngularJS.

So we need to subscribe on that Observable obj and pass function which will execute when the asyc call is done.

Using this and databinding we can display dynamically the fetched data.

In module.ts,

```
userName: string = '';
response: any;

search = (): any => this.http.get('https://api.github.com/users/' + this.userName).subscribe(response => this.response = response);
```

In html,

```
<div>
	User name: <input type="text" [(ngModel)]="userName">
	<button (click)="search()">Search</button>

	<div *ngIf="response">
		<p>Login Name: {{response.login}}</p>
		<p>No of repos: {{response.public_repos}}</p>
	</div>
</div>
```

>We need to handle the scenario where the response object is undefined at the beginning.
One way to do it is by ngIf as done above.

>Other way is to use ? in front of the object as shown below to indicate don't execute if undefined.

```
<p>Login Name: {{response?.login}}</p>
<p>No of repos: {{response?.public_repos}}</p>
```

## Building Angular Application

Normal way:

>ng serve

ng serve - local dev server

Normally in dev mode, no minification is done.

>In Production, we need all the files to be minified.

At the root, all the web applications contain 3 types of files - html, javascript, css.

To convert to these 3 types of files we can run,

>ng build

This wil generate the dist folder which has our code which can be independently hosted regardless of node, angular versions etc.

We can test this by using http-server. It is a npm package.

>npm i -g http-server

To run thbuild folder,

>http-server dist/build-proj/

In Production, we need to minify the code. To do this, we need to build for Production.

>ng build --prod

This prod mode enable AOP - Ahead of time Compilation which minifies the file.

## Routing

Traditional apps have complete html page loads for routing.

But in angular,most are SPAs - Single Page Applications. Here there is only one page and views are rendered based on routing.

### Principles of angular routing

#### URL based routing - Routes are managed by URLs and not via flags in angular

We need to expose the URLs in angluar applications that takes the user directly to that view.

```
foo.com/view1
foo.com/view2
```

Same angular app is loaded - index.html but based on URL different view are shown.- routing.

#### Component Based routing - Each view is managedby its own component

Isolation.
One root component per view.

#### Angular Routing combines the both and makes use of it

* Define the routes in angluar application.
* For each route, create the URL associated with it.
* And for each route associate a component which acts as root.

### Steps

* Define your route URLs
* Create angluar components for each view(one for each route)
* Configure angular to map route URLs to components.

### To create project with routing

>ng new \<app_name> --routing

This will create a project which has:

>app-routing.module.ts

We will define all the Routing based configs here.

>We define mapping of URLs to component in routes variable which is an array of Route objects.

### Example

```
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewComponentComponent } from './view/view-component/view-component.component';

const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'settings', component: SettingsComponent},
	{path: 'github', component: ViewComponentComponent}
];
```

We see that routes contain the mapping. This mapping will tell angular what component to load.

To tell angular where to display and which component to display,
in app.component.html,

`there is <router-outlet>`

The loaded component is loaded in this element.

## Default Route and Redirects and wildcards

Route mapping is not one-to-one.
Multiple routes can point to the same component.

For redirect, we can use this syntax:

>{path: '', redirectTo: '/home', pathMatch='full'}

For wildcards, we use '**':

This tells that we match anything.

>{path: '**', component: ErrorComponent}

This is not an error condition according to angluaras its matching wildcards but we can decide which is error URL.

## Child Routes

What if we need to to load parts of page based on URL? We can use child routes for this.

>To create a child route we need to tell angular it is a child route.
We can do this by using children property. Here we can again put array of Routes as children.

```
{
	path: 'settings', 
	component: SettingsComponent,
	children: [
		{path: 'profile', component: SettingsProfileComponent},
		{path: 'contact', component: SettingsContactComponent}
	]
},
```

Then we need to put the router outlet in our settings component too.

```
{
	path: 'settings', 
	component: SettingsComponent,
	children: [
		{path: '', redirectTo: 'profile', pathMatch: 'full'},
		{path: 'profile', component: SettingsProfileComponent},
		{path: 'contact', component: SettingsContactComponent},
		{path: '**', redirectTo: 'profile', pathMatch: 'full'}
	]
	},
```

Angular first tries to resolve redirects and wildcards in that particular level. Only then does it check in global level.

## Next steps

- Eager routing
- Lazy loading routes
- Parameters in Routes
- Access routes via dependency injection.
- Menu based routing.

## Menu based Routing

We can do routing by using menu items instead of users typing the url.

Create a set of \<a> tags with the href to different views.

```
<h1>My app</h1>
<p><a href='/'>Home</a></p>
<p><a href='/settings'>Settings</a></p>
<router-outlet></router-outlet>
```

There is a problem with this as each time we click, the whole page loads. For a SPA this is not acceptable.

To fix this, we need angular to change the route. 

>We do this by using a directive called routerLink.

```
<h1>My app</h1>
<p><a routerLink="home">Home</a></p>
<p><a routerLink="settings">Settings</a></p>
```

Or we can bind the routerLink to a variable and fetch value from ts file.

```
<h1>My app</h1>
<p><a routerLink="home">Home</a></p>
<p><a [routerLink]="settingsRoute">Settings</a></p>
```

But usually we can use ngFor to initialize the routes using a loop:

ts file:

```
routes: any = [
	{linkName: 'Home', url: 'home'},
	{linkName: 'Settings', url: 'settings'}
	];
```

html file:

```
<a *ngFor="let route of routes" [routerLink]="route.url">
	<p>{{route.linkName}}</p>
</a>
```

We can do similar things for sub routes.

## Wrap Up

- Components deep dive.
- Testing - karma, jasmine - unit testing, protractor - endpoint testing.
- Routing deep dive
- RxJS
- State Management - ngRx -- Manage state on client side

---

## To make Search as you type apps

* Use Pipes
* Use RxJS

https://codeburst.io/create-a-search-pipe-to-dynamically-filter-results-with-angular-4-21fd3a5bec5c
https://alligator.io/angular/real-time-search-angular-rxjs/
https://material.angular.io/components/autocomplete/overview
https://medium.com/@nacimidjakirene/angular-search-autosuggest-with-observables-6f42987f80e6

## Routing

>In angular we dont use the href to denote the hyperlinks, we use the routerLink to define it and to tell angluar it is an internal route.
normal href causes angular app to completely reload the page.

For Passing params,

### Animals

html

```
<h1>Animal List</h1>
<ul>
	<li *ngFor="let animal of animals">
		<a [routerLink]="[ '/animals', animal.name ]">{{animal.name}}</a>
	</li>
</ul>
<router-outlet></router-outlet>
```

component

```
animals: any[] = [];

	constructor() {
	this.animals.push({name: 'Lion', desc: 'King'});
	this.animals.push({name: 'Tiger', desc: 'Big Cat'});
	this.animals.push({name: 'Cheetah', desc: 'Fast'});
	}
```

### Animal details

html

```
<div *ngIf="animal | async as animal">
	<h1>{{animal.name}}</h1>
	<p>{{animal.desc}}</p>
</div>
```

component

```
animals: any[] = [];
	animal: any;
	constructor(private route: ActivatedRoute) {
	this.animals.push({name: 'Lion', desc: 'King'});
	this.animals.push({name: 'Tiger', desc: 'Big Cat'});
	this.animals.push({name: 'Cheetah', desc: 'Fast'});
	}

	ngOnInit() {
	this.animal = this.route.paramMap.pipe(
		switchMap(
		params => {
			const name = params.get('name');
			return this.animals.filter(r => r.name === name);
		}
		)
	);
	}
```
	
### We can use ActivatedRoute to get the currently opened route to get params

```
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
```

## To get params in routing

While defining the route, we need to define as

`a [routerLink]="[ '/animals', animal.name ]">{{animal.name}}</a>`

## We can also navigate to a page directly from component using Typescript

We need the router for this.
We take router as a property and initialize.

```
clickHandler() {
	const confirm = prompt('Yo you wanna hit that?');
	if (confirm === 'yes') {
		this.router.navigate(['animals']);
	}
	}
```

`<button (click)="clickHandler()">Animals</button>`
  
## To have a catch all route

> Create a route with path: '**' - wildcard route which acts as error handling.

Keep this at end of routemap

>{path: '**', component: ErrorComponent}

## We can use redirects

But we need to give pathMatch parameter for this.

## We can highlight which link we are on by using routerLinkActive directive which assigns a class which can be used to do some css

`<a routerLinkActive="active" [routerLink]="[ '/animals', animal.name ]">{{animal.name}}</a>`

## Guards

Used to protect routes.

>Guard is a special service which interacts with router.

### To generate a guard

>ng g guard \<guard>  
>ng g guard admin

### We can implement special interfaces like

- CanActivate
- CanActivateChild
- CanLoad

### CanActivate will only activate the route if the guard resolves to true

```
{
	path: 'animals',
	component: AnimalsComponent,
	canActivate: [AdminGuard],
	children: [
		{path: ':name', component: AnimalDetailsComponent}
	]
	}
	
	
canActivate(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
	// alert('Yo you a stranger!');
	// return false;

	return timer(1000).pipe(
		map(v => !!v),
		tap(v => alert('Yo you a stranger!'))
	);
	}
```

## Resolve

>Will preload data into our component.

We need to make changes in our guard, component as well as the route.

```
export class PreloadGuard implements Resolve<any> {
	animals: any[] = [];
	animal: any;
	constructor() {
	this.animals.push({name: 'Lion', desc: 'King'});
	this.animals.push({name: 'Tiger', desc: 'Big Cat'});
	this.animals.push({name: 'Cheetah', desc: 'Fast'});
	}

	resolve(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<any> {
		const name = next.paramMap.get('name');
		return this.animals.filter(r => r.name === name).shift();
	}
}
```

```
export class AnimalDetailsComponent implements OnInit {
	animals: any[] = [];
	animal: any;
	constructor(private route: ActivatedRoute) {
	this.animals.push({name: 'Lion', desc: 'King'});
	this.animals.push({name: 'Tiger', desc: 'Big Cat'});
	this.animals.push({name: 'Cheetah', desc: 'Fast'});
	}

	ngOnInit() {
	// Normal way:

	// this.animal = this.route.paramMap.pipe(
	//   switchMap(
	//     params => {
	//       const name = params.get('name');
	//       return this.animals.filter(r => r.name === name);
	//     }
	//   )
	// );


	// Using guards - data is fetched from guard

	this.animal = this.route.data;
	}

}
```

```
const routes: Routes = [
	{path: 'lazy', loadChildren: './lazy.module#LazyModule'},
	{path: '', component: HomeComponent},
	{
	path: 'animals',
	component: AnimalsComponent,
	// canActivate: [AdminGuard],
	resolve: [PreloadGuard],
	children: [
		{path: ':name', component: AnimalDetailsComponent}
	]
	},
	{path: '**', component: ErrorComponent}
];
```

---
