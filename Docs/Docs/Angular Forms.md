# Angular Material and Forms

## To add angular material

>ng add @angular/material

## HttpClient

We can use this to make http calls.

## We need HttpClientModule and FormsModule

```
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
```

## We can use HttpClient, HttpHeaders, HttpParams

```
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Post} from './post';
```

## We can get stuff for RxJs

```
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
```

## We can send params like this

```
const params = new HttpParams().set('userId', '1');
const headers = new HttpHeaders().set('Authorization', 'auth-token');
this.posts = this.http.get(this.URL + '/posts', { params, headers });
```

## In html, we can receive like this

```
<button (click)="getPosts()">Get Posts</button>

<div *ngFor="let post of posts | async">
    {{post | json}}
</div>
```

## We can create new posts

```
createPost() {
  const data: Post = {
    id: null,
    userId: 23,
    title: 'My New Post',
    body: 'Hello World!'
  };

  this.newPost = this.http.post(this.URL + '/posts', data);
}
```

``` 
<button (click)="createPost()">Create Post</button>
<hr> {{ newPost | async | json }}
```

## We can do retry and error catching like this

```
this.newPost = this.http.post(this.URL + '/foo', data)
      .retry(3)
      .catch(err => {
        console.log(err);
        return Observable.of(err);
      });
```

## We can use swagger to generate angular code of endpoints

>https://swagger.io/

## ReactiveFormsModule needs to be imported manually as it is not done automatically

`import { ReactiveFormsModule } from '@angular/forms';`

## We need these for Material

```
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
```

## What is a Reactive Form?

>A reactive form is just an HTML form that’s been wired up with RxJS to manage its state as a realtime stream.  
>This means you can listen to changes to its value as an Observable and react accordingly with validation errors, feedback, database operations, etc.

### When getting started with Reactive Forms, there are really only three classes that you need to know about

* FormControl - An individual form input, checkbox, select, textarea, etc.
* FormGroup - A group of form fields that can be manipulated and validated together.
* FormBuilder - A service that helps you build FormGroups easily.

## To create a basic form, This is all is needed

```
myForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  this.myForm = this.fb.group({
    email: '',
    message: '',
    career: ''
  });
  }
```

>Each form builder comesin with built in observables - valueChanges - this function returns an observable which can be subscribed to get data changes.

`this.myForm.valueChanges.subscribe(console.log);`

### html for basic form

```
<form [formGroup]="myForm">

  Value: {{ myForm.value | json }}

  <hr>

  <mat-form-field>
      <input matInput placeholder="email" formControlName="email">
  </mat-form-field>

  <mat-form-field>
      <textarea matInput placeholder="your message..." formControlName="message"></textarea>
  </mat-form-field>

  <mat-form-field>
      <mat-select formControlName="career" placeholder="career">
          <mat-option value="Magician">Magician</mat-option>
          <mat-option value="Clown">Clown</mat-option>
          <mat-option value="Juggler">Juggler</mat-option>
      </mat-select>
  </mat-form-field>

</form>
```

>The form should be tied to our formgroup.

>Each field should have formControlName which is the name of the field we defined.

https://angularfirebase.com/lessons/basics-reactive-forms-in-angular/

## Angular Table

To generate
  
>ng generate  @angular/material:material-table --name=\<data-table>
