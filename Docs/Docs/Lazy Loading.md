# Lazy Routing Docs

## Lazy Routing

Let’s create a module that will be lazy loaded, along with a couple components.

>The --flat flag prevents a directory from being created, then we can easily add components to the module via the Angular CLI.

>ng g module lazy --flat  
>ng g component lazy-parent --module lazy  
>ng g component lazy-child --module lazy  

Inside the lazy module we need to import the RouterModule. Two things to notice here:

>The route path to the component is path: 'load-me', even though it will actually be activated on lazy/load-me. This is a child route, which you will see come together in step 3  
>The RouterModule calls forChild(routes).

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyParentComponent } from './lazy-parent/lazy-parent.component';
import { LazyChildComponent } from './lazy-child/lazy-child.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'load-me', component: LazyParentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LazyParentComponent,
    LazyChildComponent
  ]
})
export class LazyModule { }
```

And here’s what the LazyParentComponent looks like. Just looping over the child component a few times.

```
<div *ngFor="let name of ['Foo', 'Bar', 'Baz']">
  <p>Hi, my name is {{name}}. I'm a lazy child component.</p>

  <lazy-child></lazy-child>
</div>
```

Your Angular CLI config might append an app prefix to the component selector name. If so, make sure remove the prefix and for the last section to work properly. For example…

`@Component({ selector: 'lazy-child' })`

## Step 3 - Point the App Router to the Lazy Module

The final step is to point the lazy route to the lazy module from the app router. 

We can do this with the loadChildren property with the path to the module file, then reference the module itself with a hash #. 

This tells angular to only load LazyModule when the lazy url is activated.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'lazy', loadChildren: './lazy.module#LazyModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
