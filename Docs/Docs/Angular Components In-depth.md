# Angular Components In-depth

## Angular Components In Depth By Javabrains

## To create new angular project with scss instead of css

>ng create new \<project> --style=scss

## Each component has a @Component annotation

selector is the html selector.

## Bootstrap

To add bootstrap, go to https://getbootstrap.com and download bootstrap.

Then add the cdn links in index.html in \<head> section.

We can use bootstrap class ="card"

## Blog list app

We have different blogs all displayed in a list.

Instead of passing multiple args, we can pass a class itself.

To generate a class,

>ng g class \<class>

So we can send collection of properties.

Then we can use ngFor to loop the blogs.

### Blog list app

```
blogPosts: BlogPost[] = [];
constructor() { }

ngOnInit() {
	this.blogPosts.push(new BlogPost('Blog Post 1', 'Summary 1'));
	this.blogPosts.push(new BlogPost('Blog Post 2', 'Summary 2'));
}
```

`<app-blog-post-tile *ngFor="let blogPost of blogPosts" [post]="blogPost"></app-blog-post-tile>`

### Blog tile app

```
<div class="card">
	<div class="class=" card>
		<h5 class="card-title">{{post.title}}</h5>
		<p class="card-text">{{post.summary}}</p>
		<a href="#" class="btn btn-primary">Read</a>
	</div>
</div>
```

## Life Cycle hooks

Each component has certain hooks for lifecycle events.
Each hook needs to implemented for the component where its needed.
We needs to implement the interface.


>Ideally leave constructor only for dependency injections.  
>Keep all the initializations in ngOnInit.

## Pipes

>Pipe is feature which lets us pass in values inside {{}} to a function in html. This can be used to convert async data - data | async | json.

### We can create a pipe using

>ng g pipe \<pipe>

This creates a pipe.ts file.

If we want reusablility of pipe functions, we can keep as pipe.ts else we can put in particular component itself.

```
<div class="card">
	<div class="class=" card>
		<h5 class="card-title">{{post.title}}</h5>
		<p class="card-text">{{post.summary | truncate:[30]}}</p>
		<a href="#" class="btn btn-primary">Read</a>
	</div>
</div>
```

```
export class TruncatePipe implements PipeTransform {

	transform(value: any, args?: any): any {
	const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
	const trail = args.length > 1 ? args[1] : '...';
	return value.length > limit ? value.substring(0, limit) + trail : value;
	}

}
```

## To use pipe in a particular component

We can use dependency injection to use the pipe class to get instance.

>So add the pipe in Providers of app.module.ts

Then we can use it similar to service.

This is needed if we want to use the read more option in our component.

## To create Read more option

We need one more variable which has the full data.

```
<div class="card">
	<div class="class=" card>
		<h5 class="card-title">{{post.title}}</h5>
		<!-- Using pipe operator -->
		<!-- <p class="card-text">{{post.summary | truncate:[30]}}</p> -->
		<!-- Using the function in component -->
		<p class="card-text">
			{{post.summary}}
			<!-- Using buttons to expand and collapse content. -->
			<button class="btn btn-link">
					<span *ngIf="isSummaryTruncated" (click)="showFullSummary()">Expand</span>
					<span *ngIf="!isSummaryTruncated" (click)="showTruncatedSummary()">Collapse</span>
			</button>
		</p>
		<a href="#" class="btn btn-primary">Read</a>
	</div>
</div>
```

```
@Input() post: BlogPost;
	fullSummary: string;
	isSummaryTruncated = true;

	constructor(private truncatePipe: TruncatePipe) { }

	ngOnInit() {
	this.fullSummary = this.post.summary;

	// using function to call
	this.showTruncatedSummary();

	// Commenting this as i created a function for this
	// this.post.summary = this.truncatePipe.transform(this.post.summary, ['35', '.........'] );
	}

	showFullSummary = () => {
	this.post.summary = this.fullSummary;
	this.isSummaryTruncated = false;
	}

	showTruncatedSummary = () => {
	this.post.summary = this.truncatePipe.transform(this.post.summary, ['35', '.........'] );
	this.isSummaryTruncated = true;
	}
```

## Sending events from child to parent component

	Sometimes we may need to send events from child to parent. like in pagination.
	
	So we will change our blogs scheme to make it an array of array of blogposts to accomodate the pagination.
	
```
blogPosts: BlogPost[][] = [[]];

	constructor() { }

	ngOnInit() {
	// old code
	// this.blogPosts.push(new BlogPost('Blog Post 1',
	// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));
	// this.blogPosts.push(new BlogPost('Blog Post 2',
	// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));

	this.blogPosts = [
		[
		new BlogPost('Blog Post 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
		new BlogPost('Blog Post 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
		new BlogPost('Blog Post 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
		new BlogPost('Blog Post 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
		],
		[
		new BlogPost('Blog Post 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
		new BlogPost('Blog Post 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
		new BlogPost('Blog Post 7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
		new BlogPost('Blog Post 8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
		]
```

```
<app-blog-post-tile *ngFor="let blogPost of blogPosts[0]" [post]="blogPost">
</app-blog-post-tile>
<app-paginator></app-paginator>
```

## We can use ngFor on arrays. To use it on pagination, we need to create an array.

>Using Array(number) creates an array of number specified.

Just like we can take inputs to a component, we can send output also.
Output is always an even of type EventEmitter.

## Steps for sending data to parent

>Child should have an Output parameter which is an EventEmitter.  
>This should emit an event whenever we want the change. Usually done through function call binding click syntax.

In parent suscribe to this event by using function syntax:

```
<app-blog-post-tile *ngFor="let blogPost of blogPosts[currentPage]" [post]="blogPost">
</app-blog-post-tile>
<app-paginator [numberOfPages]="blogPosts.length" (pageNumberClick)="updatePage($event)">
</app-paginator>
```

Then using a custom function, updat the values.
	
## In angular, Each component is encapsulated

If we use a css style for one component, it is applied only for that component.

Angular creates extra qualifiers to the selectors to make it component specific.

If we want to change this behavior, we can do this by adding one more parameter in @Component annotation:

>encapsulation: ViewEncapsulation.Emulated

## Host selector

If we want a child component to change css of the parent then we can use the host selector.

## ViewChild

>This is used when parent needs to call method of child component.  
>useful for scenarios like expand all...

>Here first, we need to inject the child component in the parent. Then we annotate that as @ViewChild.
and we need to pass in the id for that. id is generally denoted using # in html.

This works for single child.

>But if we need multiple, we need @ViewChildren.

We need to use QueryList\<child>.

Code available.

## Using Services

Keep components clean and keep the logic out of component and put in service.

## Smart components vs Dumb Components

Always draw out the component tree before building an application.

>smart - self contained, controller components  
>dumb - presentational, reusable

## ngClass

Conditional styling using conditional classes. When we want our components to behave differently in some situautions.
We can use ngClass to do independent behavior.

`[ngClass}="{'<class>': boolean}"`

```
<div class="card blog-tile" [ngClass]="{'fav': post.isFav}">
	<div class="card-body">
		<h5 class="card-title">{{post.title}}</h5>
		<!-- Using pipe operator -->
		<!-- <p class="card-text">{{post.summary | truncate:[30]}}</p> -->
		<!-- Using the function in component -->
		<p class="card-text">
			{{post.summary}}
			<!-- Using buttons to expand and collapse content. -->
			<button class="btn btn-link">
					<span *ngIf="isSummaryTruncated" (click)="showFullSummary()">Expand</span>
					<span *ngIf="!isSummaryTruncated" (click)="showTruncatedSummary()">Collapse</span>
			</button>
		</p>
		<a href="#" class="btn btn-primary" (click)="toggleFavorite()">Mark Favorite</a>
		<a href="#" class="btn btn-primary">Read</a>
	</div>
</div>
```

## Change detection in angular

We can use this for mass maintenance.

We can tell angular what changeDetection we  need.

>We can change this in @Component annotation of a component.

`changeDetection: ChangeDetectionStrategy.<value>`

OnPush is for immutable objects.

## Directives

In latest angular, directives are referred to those attributes which are added to other elements and cannot exist on own - ngClass, ngFor, ngIf etc.

We can generate directives using:

>ng g directive \<directive>

Then we can use that element selector as a directive.

In directive class, we need to catch hold of the referencing component using:

>ElementRef

Then we can check for events using @HostListener

```
@Directive({
	selector: '[appHighlight]'
})
export class HighlightDirective {
	// <!-- using variable to pass -->
	@Input() color = 'yellow';

	// <!-- Using attribute to pass-->
	// @Input('appHighlight') color = 'yellow';

	constructor(private element: ElementRef) {
	// element.nativeElement.style.backgroundColor = 'yellow';
	}

	// @HostListener('mouseenter') addHighlight = () => this.element.nativeElement.style.backgroundColor = 'yellow';

	@HostListener('mouseenter') addHighlight = () => this.element.nativeElement.style.backgroundColor = this.color;

	@HostListener('mouseleave') removeHighlight = () => this.element.nativeElement.style.backgroundColor = null;
}
```

```
<div class="card blog-tile" [ngClass]="{'fav': post.isFav}">
	<div class="card-body">
		<!-- using variable to pass -->
		<h5 class="card-title" appHighlight color="green">{{post.title}}</h5>

		<!-- Using attribute to pass-->
		<!-- <h5 class="card-title" appHighlight="green">{{post.title}}</h5> -->

		<!-- Using pipe operator -->
		<!-- <p class="card-text">{{post.summary | truncate:[30]}}</p> -->

		<!-- Using the function in component -->
		<p class="card-text">
			{{post.summary}}
			<!-- Using buttons to expand and collapse content. -->
			<button class="btn btn-link">
					<span *ngIf="isSummaryTruncated" (click)="showFullSummary()">Expand</span>
					<span *ngIf="!isSummaryTruncated" (click)="showTruncatedSummary()">Collapse</span>
			</button>
		</p>
		<a href="#" class="btn btn-primary" (click)="toggleFavorite()">Mark Favorite</a>
		<a href="#" class="btn btn-primary">Read</a>
	</div>
</div>
```

## ngContent

Content projection.

When we need a component to take other DOM elements as inputs, we need this.

In our component, we use:

`<ng-content></ng-content>`

to display all the elements that were defined when defining the component.

This can be used to provide the structure for reusable components.

Can be used to create a page shell or an application shell.

## Multi slot content projection

Instead of sending all the markup together, we can select what markup we need using selectors.

```
<div>
	<ng-content select="[header]"></ng-content>
</div>
<div>
	<ng-content select="[body]"></ng-content>
</div>
<div>
	<ng-content select="[footer]"></ng-content>
</div>
```

```
<!-- content projection -->
<app-shell>
	<h1 header>Header</h1>
	<app-blog-list body></app-blog-list>
	<h2 footer>Footer</h2>
</app-shell>
```

It need not be id selector. We can use class selector too

## ContentChild

This is used to get hold of children markup for use in ts file.
Similar to View children.

Here use the # to mark as similar to viewchild. 
Then use:

`@ContentChild to define similar to viewchild.`

## Conclusion: Topics

- Angular components
- Pipes
- Life cycle hooks
- Events
- View Encapsulation
- Change detection
- Directives
- Content projection
- Multi-slot content projection
