==========================================The Complete Node.js Developer Course (3rd Edition)==================================
======================================================Andrew Mead and Rob Percival=============================================

Apps:
	Notes app
	Weather app
	Task manager app
	Chat app
	

===========================================================

Section 2 - Node.js: 

	Node is a way to run javascript outside of the browser.
	Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
	
	JavaScript engine converts javascript code to machine code. V8 engine is written in C++.
	Node is also written in C++.
	
	Nodejs is just a runtime, its not a language.
	
	REPL - Read evaluate Print Loop
	
	In browser - 'window' object, 'document' object
	In node - 'global' object, 'process' object
	
	
	'window' of browser == 'global' of node.
	'document' of browser == 'process' of node.
	
	
	non-blocking I/O - asynchronous - so that browser is not frozen. Similarly in node we can do other stuff while we are waiting.
	
	Asynchronous is best for server side development.
	
	npm - Nodejs' package ecosystem.
	
	
===========================================================

Section 3 - Node.js module system:

	Node modules:
		Libraries of node.
		
	Some functions needs a module to be loaded first to be usable.
	
	Node.js doesn't need semicolon at the end of every line.
	
	We use require() function to import modules.
		const fs = require('fs')
		
	This is the same for custom modules too.
	
	To export a function or variable we need to use module.exports:
		module.exports = name
		
	Exporting multiple objects:
		Always export as object.
		
		const name = 'Nikhil C'

		add = (a, b) => a + b;

		// module.exports = name
		module.exports = {
			add,
			name
	
	To initialize an npm project:
		npm init or
		npm init -y 
		
	This generates an package.json file which is used for keeping config data.
	
	To install a dependency globally:
		npm i -g <dependency>
		
	To install it for the project:
		npm i --save <dependency>
		
	This creates a node-modules directory which is where the dependency code is present.
	
	const validator = require('validator') -> npm module
	const notes = require('./notes') -> custom module
	
	validator module is used for all kinds of validations.
	lodash module is used for many operations on arrays etc
	chalk module is used for formatting text.
	
	console.log(chalk.blue.inverse.bold('hello from chalk'))
	
	Nodemon:
		Tool which automatically runs our nodejs files. live server for nodejs.
		npm i -g nodemon
		
		Then we can specify which file we want to watch.
		
		nodemon app.js
	
	
===========================================================

Section 4 - File System and Command Line args:

	Getting Input from users:
		arguments to node are stored in process global object.
		process.argv
		
		argv[0] = path to node
		argv[1] = path to file
		
		These 2 are default args
		
	Passing arguments using Yargs:
		We can pass arguments easily and parse it using yargs.
		
		node .\app.js add --tile="yoyo"
		
		{ _: [ 'add' ], tile: 'yoyo', '$0': 'app.js' }
		
		We can create our own yargs commands.
		
			yargs.command({ // Add command
				command: 'add',
				describe: 'Adds a new note',
				aliases: ['insert', 'a', 'i'],
				builder: {
					title: {
						describe: 'Note title',
						demandOption: true,
						type: 'string'
					},
					body: {
						describe: 'Note body',
						demandOption: true,
						type: 'string'
					}
				},
				handler: argv => {
					console.log('Title: ', argv.title)
					console.log('Body: ', argv.body)
				}
			})
			.command({ // Remove command
				command: 'remove',
				describe: 'Removes a note',
				aliases: ['delete', 'd', 'r'],
				handler: function() {
					console.log('Removing the note!')
				}
			})
			.command({ // Read command
				command: 'read',
				describe: 'Reads the note',
				handler: function() {
					console.log('Reading the note!')
				}
			})
			.command({ // List command
				command: 'list',
				describe: 'Lists all notes',
				handler: function() {
					console.log('Listing the notes!')
				}
			})
			.demandCommand()
			.help()
			.parse()
			
			
			We need to parse() the yargs to get the result.
			
			node .\app.js add --title hello --body world
			or 
			node .\app.js add --title=hello --body=world
			
		
		To store data as Json:
			We can use JSON.stringify() to convert object to Json string.
			
			const book = {
				title: 'Cut it short',
				author: 'Nikhil'
			}

			const bookJsonString = JSON.stringify(book)
			console.log(bookJsonString)

			const bookJson = JSON.parse(bookJsonString)
			console.log(bookJson)
			
		Arrow functions:
			They don't bind their own this reference. The old reference is maintained.
			
		find() of array is better than filter() when we just want to see if a value exists or not in array.

		
===========================================================

Section 5 - Debugging Node.js:
		
	console.log() is easiest to debug. First tool.
	
	To run in a debugger mode:
		Add debugger wherever we need it.
		Then run the code using:
			node inspect app.js
		Then we can open chrome:
			chrome://inspect
			
		This will work as both chrome and node are build on V8 JavaScript engine.
		
		Then we can use the chrome debugger to debug the code.
		
		We can run restart if we want to debug after closing.
		
	In a stacktrace, the top contains the most useful info whereas the bottom will contain the references to the internal files.
		
	
===========================================================

Section 6 - Asynchronous Node.js(Weather app):

	Call Stack, Callback Queue, Event Loop, Node API:
		
		Call Stack:
			The Call Stack is a simple data structure provided by the V8 JavaScript engine. The job of the call stack is to track the execution of our program and it does that by keeping track of all of the functions that are currently running.
			
			Each node program has a main function which is an anonymous function which provides require, process etc arguments which we use in our programs.
	
			setTimeout() is not a JavaScript function and there is no implementation of it in V8. It is a nod function which is implemented in C++.
	
			The code for Node.js is single threaded but it used other threads in C++ behind the scenes to work asynchronously.
			
			All functions are added to the Call Stack for execution.
			
		Node API:
			Whenever the Call Stack encounters asynchronous code, the code is moved to Node API where it will wait till it can be executed.
			
		Callback Queue:
			When the asynchronous code is ready for execution it will enter the Callback Queue.
			It is a normal queue.
			
		Event Loop:
			It is program which fetches code from the Callback Queue to the Call Stack to be executed. This runs only when the Call Stack is empty with no code to run.
			The event loop needs to wait for the call stack to be empty.
			So this will fetch code from the Callback Queue only after the main() is executed.
			
		Usually (in small programs), Callbacks are run after the main(in case of timeout example). 
			
	HTTP Requests:
		darksky.net API for weather data.
		mapbox for getting geocoding data.
		
		JSON is usually the way in which data is transferred and received in HTTP calls.
		
		In error handling we know that at any point of time, only one of error or response has a value.
		
		we can use npm package 'request' for http calls.
		
		npm init -y for default npm project initialization.
		
		const request = require('request')

		const secretKey = '4018ffab752ef35a8d760801f6632186'
		const url = 'https://api.darksky.net/forecast/4018ffab752ef35a8d760801f6632186/37.8267,-122.4233'

		const qs = {
			units: 'si'
		}

		const options = {
			url: url,
			json: true, // will make the response as a json so that we don't have to parse the resonse everytime
			qs: qs
		}

		request(options, (error, response) => {
			if (error)
				console.error('Error while fetching data')
			else {
				// console.log('Response:', response)
				// const data = JSON.parse(response.body)
				// console.log(data)
				// console.log(data.currently)
				// console.log(response)
				console.log(response.body.currently)
			}
		})
		
	
	Callback Functions:
		So this is a callback function a callback function is nothing more than a function we provide as an argument to another function with the intention of having it called later on.
		
		const geocode = (address, callback) => {
			setTimeout(() => {
				const data = {
					lat: 0,
					long: 0
				}
				callback(data)
			}, 2000)
		}

		geocode('bangalore', (data) => console.log(data))
		
	
	Callback Abstraction:
		
		const request = require('request')

		const geocode = (address, callback) => {
			const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`
			const key = 'pk.eyJ1IjoiYjYzODg0MSIsImEiOiJjand2MHlvcTMwNDA0M3ltaGpjNnp2OGJuIn0.KarZd85SfPnniE_ievHRUQ'
			const qs = {
				access_token: key,
				limit: '3'
			}
			const options = {
				url: url,
				json: true,
				qs: qs
			}
			request(mapbox_options, (error, response) => {
				if (error)
				// callback('Unable to connect to - Map box', undefined)
					callback('Unable to connect to - Map box')
				else if (!response.body.features.length) {
					callback('Invalid request', undefined)
				} else {
					callback(undefined, {
						latitude: response.body.features[0].center[1],
						longitude: response.body.features[0].center[0],
						location: response.body.features[0].place_name
					})
				}
			})
		}

		module.exports = {
			geocode
		}
		
	Callback Chaining:
	
		const geocode = require('./utils/geocode')
		const forecast = require('./utils/forecast')

		const location = process.argv[2]
		if (!location) {
			console.error('Not enough arguments')
		} else {
			geocode.geocode(location, (error, data) => {
				if (error) {
					return console.error(error)
				}
				// console.log('Getting Forecast data for', data.location)
				forecast.forecast(data.latitude, data.longitude, (error, forecastData) => {
					if (error) {
						return console.error(error)
					}
					console.log('Getting Forecast data for', data.location)
					console.log(forecastData)
				})
			})
		}
		
	Destructuring and Objcet shorthand:
		
		const geocode = (address, callback) => {
			const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`
			const key = 'pk.eyJ1IjoiYjYzODg0MSIsImEiOiJjand2MHlvcTMwNDA0M3ltaGpjNnp2OGJuIn0.KarZd85SfPnniE_ievHRUQ'
			const qs = {
				access_token: key,
				limit: '3'
			}
			const options = {
				url,
				json: true,
				qs
			}
			request(options, (error, { body }) => {
				if (error)
				// callback('Unable to connect to - Map box', undefined)
					callback('Unable to connect to - Map box')
				else if (!body.features.length) {
					callback('Invalid request', undefined)
				} else {
					callback(undefined, {
						latitude: body.features[0].center[1],
						longitude: body.features[0].center[0],
						location: body.features[0].place_name
					})
				}
			})
		}
		
		
		const geocode = require('./utils/geocode')
		const forecast = require('./utils/forecast')

		const location = process.argv[2]
		if (!location) {
			console.error('Not enough arguments')
		} else {
			geocode.geocode(location, (error, { latitude, longitude, location }) => {
				if (error) {
					return console.error(error)
				}
				// console.log('Getting Forecast data for', data.location)
				forecast.forecast(latitude, longitude, (error, forecastData) => {
					if (error) {
						return console.error(error)
					}
					console.log('Getting Forecast data for', location)
					console.log(forecastData)
				})
			})
		}
		
		
	HTTP requests using builtin node:
	
		const https = require('https')

		const url = 'https://api.darksky.net/forecast/4018ffab752ef35a8d760801f6632186/37.8267,-122.4233'

		const request = https.request(url, response => {
			let data = ''

			response.on('data', chunk => {
				data = data + chunk.toString()
			})

			response.on('end', () => {
				// console.log(data)
				const body = JSON.parse(data)
				console.log(body)
			})
		})

		request.on('error', error => {
			console.log(error)
		})

		request.end()
		
		
===========================================================

Section 7 - Web Servers(Weather app):
	
	Intro: 
		express is a npm package which provides webserver capabilities.
		That is Express Express makes it really easy to create web servers with note these servers are going to allow us to serve up all of the assets for our web application.
		This includes H2 UML we're going to render to the screen see SS to style our application and client side JavaScript so we can set up all sorts of awesome user interaction now using Express.
		
	Express:
		It is a package for node which helps in creating web servers.

		npm i express

		Express can send plaintext, html elements or Json back as response. 
		If we send an object back as response, then express will automatically stringify it to a Json string.

		const express = require('express')

		const app = express()

		app.set('port', process.env.PORT || 3000)

		// Sending back plaintext
		app.get('', (req, res) => {
			res.send('Hello express!')
		})

	Serving up Static Assets:
		First create a directory which will contain the static assets.
		Ususally convention is to name the directory as public.
		And mention the path in express app. It has to be the absolute path.

		const app = express()
		const public_directory_path = path.join(__dirname, '../public')

		// Serve up Static assets
		app.use(express.static(public_directory_path))

		We can use path package of node to do path manipulation.

		index.html is usually the root html file which iis used to render the home page.

	Dynamic webpages using Templating:
		Handlebars, ejs etc.

		handlebars - template engine.
		hbs - Express.js view engine for handlebars.

		We need to tell Express what Templating engine we are using.

		// Serve up Static assets
		app.use(express.static(public_directory_path))

		// Setting up hbs template engine 
		app.set('view engine', 'hbs')

		app.set('port', process.env.PORT || 3000)

		All the new views should be in a folder called views in root directory.

		We can override by 
			// Serve up Static assets
			app.use(express.static(public_directory_path))

			// Setting up hbs template engine
			app.set('view engine', 'hbs')
			app.set('views', path.join(__dirname, '../views'))

			app.set('port', process.env.PORT || 3000)
		
	Advanced Templating:
		This can be done using partials.
		To use partials we need to require in hbs package.

		Partials are not conplete web pages but just part html pages which are used to render a single element.

		We can use the created partilas in other pages using the syntax:
			{{>partial_name}}

		Usually nodemon will only look for changes in js files. But we can change that behavior.

			nodemon app.js -e js,hbs

		We can use partials to remove the basic html, head and body definition from the views.

		<!DOCTYPE html>
		<html>

		<head>
			<title>{{title}}</title>
			<link rel="stylesheet" href="/css/styles.css">
			<script src="/js/app.js"></script>
		</head>

		<body>
		<h1>{{title}}</h1>

		<div>
			<a href="/">Weather</a>
			<a href="/about">About</a>
			<a href="/help">Help</a>
		</div>
		
		Views:

		    {{>header}}
			
			{{>footer}}

	404 Pages:
		We can catch the non-existant page navigation by creating a get() at the very end of the express.
		We put it at the end as it will be like a catch all default fallback.
		We use the wildcard '*' as the url.

	CSS:
		We can use flex to achieve sticky footer.

			<div class="main-content">
				{{>header}}
				<p>Use this site to get your weather</p>
			</div>
			
			{{>footer}}


			body {
				color: #333333;
				font-family: Arial, Helvetica, sans-serif;
				max-width: 1500px;
				margin: 0 auto;
				padding: 0 15px;
				/* Sticky header */
				display: flex;
				flex-direction: column;
				min-height: 100vh;
			}

			.main-content {
				flex-grow: 1;
			}


		To add icons in tab:
			<link rel="icon" href="/img/weather.png">


===========================================================

Section 8 - Accessing API from Browser(Weather app):

	Query String:
		It will be part of the url which will conatain the information.

		Query string syntax:
			url.com/<something>/users?key=value&key2=value2

		The query string is available in the request object of the node server.
			req.query

		We cannot send two responses to the client.
		If there is some error the we need to send only that. So use return res.send()

	JSON HTTP endpoint:
		We can plug in our other app which makes api calls so that we can send back the value which we get back from the function.
		
	ES6 - Default Function Parameters:
		If we try to destructure an undefined value, we get error.
		So we need to provide an empty object as default value so that we do not get any errors.
		
		foo({bar = baz} = {}){

		}

		We can also defaults for the destructured values.

		In our project, we need to provide a default value or else the program will crash.

	Browser HTTP requests with fetch:
		Used to make HTTP request from client side javascript.
		Once we have it inside of the client side JavaScript the rest is pretty easy now to actually make the HTTP request from client side JavaScript.
		We'll be using the very popular fetch API that is not part of JavaScript.
		It is a browser based API which means it's something we can use in all modern browsers but it's not accessible in node js.
		So the code we write inside of here isn't going to be something you'll be able to use in a back end node script here.
		
		One of the only time we use client side javascript in this Course. Usually its server side javascript.

		fetch('http://localhost:3000/weather?address=bangalore')
			.then((response) => {
				response.json().then((data) => {
					if (data.error) {
						console.log(data.error)
					} else {
						console.log(data.location)
						console.log(data.forecast)
					}
				})
			})
	
	Search form in HTML:
		Usual convention:
			css - keep in head
			js - keep in last line of body
		
		If we keep our javascript refenence in head of html, we will get errors as it is not able to find the properties.
		So we need to keep our js reference at the end of body tag.

		To refernece a an element:

			const weatherForm = document.querySelector('form')
			const search = document.querySelector('input')

			weatherForm.addEventListener('submit', (e) => {
				e.preventDefault()
				const location = search.value

				fetch(`http://localhost:3000/weather?address=${location}`)
					.then((response) => {
						response.json().then((data) => {
							if (data.error) {
								console.log(data.error)
							} else {
								console.log(data.location)
								console.log(data.forecast)
							}
						})
					})
			})

		What happened is that the browser actually refreshed completely and that means that our message was cleared.
		So the default behavior of forms is to completely reload the page and that made sense a long time ago before we had access to good client side JavaScript.
		Now though what we're gonna do is use fetch to fetch the data and we'll dynamically add it onto the fly,
		so we don't need to refresh the page a bunch causing a flash of content or confusing the user.
		We'll be able to preserve everything on the page like what they've typed inside of the input.

		So we need to use this function to prevent loading:
			e.preventDefault()

			This will prevent the browser from refreshing. Here we are telling the browser we will handle everything.

	User Interface:
		We can plugin our code to get data to the ui itself.

		const weatherForm = document.querySelector('form')
		const search = document.querySelector('input')
		const msg1 = document.querySelector('.msg1')
		const msg2 = document.querySelector('#msg2')
			// const forecast = document.querySelector('.forecast')
			// const error = document.querySelector('#error')


			weatherForm.addEventListener('submit', (e) => {
				e.preventDefault()

				const location = search.value

				msg1.textContent = 'Loading...'
				msg2.textContent = ''

				fetch(`http://localhost:3000/weather?address=${location}`)
					.then((response) => {
						response.json().then((data) => {
							if (data.error) {
								msg1.textContent = data.error
							} else {
								msg1.textContent = data.location
								msg2.textContent = data.forecast
							}
						})
					})
			})

	jQuery implementation:

		$(document).ready(function() {
			$('#locationForm').submit(function(e) {
				e.preventDefault()
					// const location = $('#locationForm').serialize()
				const location = $('#location').val()

				$('.msg1').text('Loading...')
				$('#msg2').text('')

				fetch(`http://localhost:3000/weather?address=${location}`)
					.then((response) => {
						response.json().then((data) => {
							if (data.error) {
								$('.msg1').text(data.error)
							} else {
								$('.msg1').text(data.location)
								$('#msg2').text(data.forecast)
							}
						})
					})
			})
		})


===========================================================

Section 9 - Application Deployment(Weather app):

	Heroku:
		Application deployment platform.

	Github:
		A repository for hosting our git projects.
		
	SSH keys:
		Generating a new SSH key

		ls -al ~/.ssh -> to display all ssh keys.
		ssh -T git@github.com -> To add our key to github.

						Open Git Bash.

						Paste the text below, substituting in your GitHub email address.

						$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

						This creates a new ssh key, using the provided email as a label.

						> Generating public/private rsa key pair.

						When you're prompted to "Enter a file in which to save the key," press Enter. This accepts the default file location.

						> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]

						At the prompt, type a secure passphrase. For more information, see "Working with SSH key passphrases".

						> Enter passphrase (empty for no passphrase): [Type a passphrase]
						> Enter same passphrase again: [Type passphrase again]

					Adding your SSH key to the ssh-agent

					Before adding a new SSH key to the ssh-agent to manage your keys, you should have checked for existing SSH keys and generated a new SSH key.

					If you have GitHub Desktop installed, you can use it to clone repositories and not deal with SSH keys. It also comes with the Git Bash tool, which is the preferred way of running git commands on Windows.

						Ensure the ssh-agent is running:
							If you are using the Git Shell that's installed with GitHub Desktop, the ssh-agent should be running.

							If you are using another terminal prompt, such as Git for Windows, you can use the "Auto-launching the ssh-agent" instructions in "Working with SSH key passphrases", or start it manually:

							# start the ssh-agent in the background
							$ eval $(ssh-agent -s)
							> Agent pid 59566

						Add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_rsa in the command with the name of your private key file.

						$ ssh-add ~/.ssh/id_rsa

	Heroku:
		First add ssh  keys to heroku.
			heroku add:keys

		Then we can create project using:
			git create <appname>

		We need to tell heroku it needs to run. 
		So we need to specify the script in package.json

		"scripts": {
			"start": "node src/app.js"
		},


		Then, we can run app using:
			npm run start
		
		Now we need to assign dynamic port for our app:
			const port = process.ar.PORT || 3000
			app.listen(port)

		Next we need to change our fetch so that it doesn't listen to localhost.

		Next we need to push the code to heroku remote.

		To push:
			git push heroku master

	Global and local npm modules:
		Usually don't use global modules for projects as they are not mentioned in the package.json file.
		Use devDependencies instead.

		npm i -D nodemon
		npm i --save-dev nodemon

	
===========================================================

Section 10 - MongoDB and Promises(Task app):

	MongoDB and NoSQL Databases:
		It is a NoSQL database - Document based.
		Open Source database.

		Structure:
			SQL - Tables
			NoSQL - Collections

			SQL - Row/Record
			NoSQL - Documents

			SQL - Columns
			NoSQL - Fields

		SQL:
			Databases -> Tables -> Rows/Records -> Columns 

		NoSQL:
			Databases -> Collections -> Documents -> Fields

	Installing MongoDB:
		Download the zip for MongoDB.
		Put the bin folder of mongo folder in the system path.

		Then run:
			mongod --dbpath=<path-to-mongodb-data>

		This will run mongodb while setting up the folder where the data will stay.

		Then we will get this message:
			waiting for connections on port 27017

		This command needs to be running in order for mongodb to work:
			mongod --dbpath=<path-to-mongodb-data>

	Robo 3T:
		GUI for Robo 3T.
		MongoDb admin tool. 
		This is used to visualize the MongoDB database.

		When we install the Robo tool, we need to connect to mongo.

		Here set the host and port and give a name to the mongodb connection.

		Next we can connect to this.
		We can open shell where we can issue mongo commands.
		The commands are similar to JavaScript.

		We can view the data in Table Mode, Text Mode etc.

	Connecting to MongoDB:
		We need a npm package for MongoDB for us to use in node app.
		We will need the MongoDB drivers for node.

		The npm package is mongodb.

			npm i mongodb

		We need some boilerplate code to connect to MongoDB.

		// Imports for mongodb
		const mongodb = require('mongodb')

		// Connection config for MongoDb
		const MongoClient = mongodb.MongoClient
		const connectionURL = 'mongodb://127.0.0.1:27017'
		const databaseName = 'task-manager'

		MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
			if (error) {
				return console.error('Unable to connect to database')
			}
			console.log('Connected to database')
		})

	Inserting documents:
		
		MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
			if (error) {
				return console.error('Unable to connect to database')
			}

			const db = client.db(databaseName)
			db.collection('users').insertOne({
				name: 'Nikhil',
				age: 24
			})
		})

		Then we can use the Robo UI to see the database.

		Whenever we push a Document to a Collection, ObjectId is added which is unique for that Collection.

		insertOne() is actually asynchronous. So we need a callback function to see if it executed properly.

		MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
			if (error) {
				return console.error('Unable to connect to database')
			}

			const db = client.db(databaseName)
			db.collection('users').insertOne({
				name: 'Nikhil',
				age: 24
			}, (error, result) => {
				if (error) {
					return console.error('Unable to insert user')
				}
				console.log(result.ops)
			})
		})

		InsertMany:
			db.collection('users').insertMany([{
					name: 'Jen',
					age: 25
				},
				{
					name: 'Rachel',
					age: 28
				}
			], (error, result) => {
				if (error) {
					return console.error('Unable to insert users')
				}
				console.log(result.ops)
			})

	ObjectId:
		Field is automatically generated.
		These are guid. This is helpful if we have multiple mongo servers, we won't have clashing of ids.

		We ourselves can generate the ObjectId.

		const id = new ObjectID()
		console.log(id)
		console.log(id.getTimestamp())

	Querying Documents:
		Normal Querying.
		
		db.collection('users').findOne({
			name: 'Jen'
		}, (error, result) => {
			if (error) {
				return console.error('Unable to fetch')
			}
			console.log(result)
		})

		Using find() will not return a callback but will return a cursor using which we can go through the results.
		Similar to SQL.

		db.collection('users').find({ age: 24 }).toArray((error, result) => {
			console.log(result)
		})

		db.collection('users').find({ age: 24 }).count((error, result) => {
			console.log(result)
		})

	Promises:
		Makes it easier for us to manage asynchronous code.
		Used to solve some drawbacks of callbacks.

		Promises are like wrappers on callbacks.

		resolve == result
		reject == error

		Advantages over callbacks:
			Clearer semantics
			we need to check if error occured.
			After asynchronous task we need to do the work ourselves.
			The code is more correct - as we cannot both resolve and reject together.
			Easier to not mess up.

		Callback:

			doWorkCallback = (callback) => {
				setTimeout(() => {
					callback('This is my error')
				}, 2000)
			}

			doWorkCallback((error, result) => {
				if (error) {
					return console.log(error)
				}
				console.log(result)
			})

		Promise:

			const doWorkPromise = new Promise((resolve, reject) => {
				setTimeout(() => {
					// resolve('Success')
					reject('Error occured')
				}, 2000)
			})

			doWorkPromise.then((result) => {
				console.log(result)
			}).catch((error) => {
				console.log(error)
			})

	Updating Documents:

		db.collection('users').updateOne({
			_id: ObjectID('5d07e7baf9c4c0225ef4ec12')
		}, {
			$set: {
				name: 'Melissa'
			}
		}).then(result => {
			console.log(result)
		}).catch((error) => {
			console.log(error)
		})

	Deleting Documents:

		db.collection('users').deleteMany({
			age: 25
		}).then(result => {
			console.log(result)
		}).catch(error => console.log(error))


===========================================================

Section 11 - REST APIs and Mongoose(Task app):

	Mongoose:
		Popular npm package for MongoDB.
		Useful for data model creation.
		Validation of data.

		It is an ODM.
		ODM - Object Document Mapper.

		npm i mongoose
	
		Mongoose uses mongodb behind the scenes.

		const mongoose = require('mongoose')

		mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
			useNewUrlParser: true,
			useCreateIndex: true
		})

		const User = mongoose.model('User', {
			name: {
				type: String
			},
			age: {
				type: Number
			}
		})

		const user = new User({
			name: 'Nikhil',
			age: 24
		})

		user.save().then((result) => {
			console.log('Result:', result)
		}).catch((error) => {
			console.log('Error:', error)
		})

	Data Validation and Sanitization:
		Validating means checking if the data is of proper syntax and as such.
		Sanitization refers to cleaning/altering of data before using.

		Mongoose doesn't have many good built-in validators.
		So we can build custom validator.

		But it's best to use a npm package for validation.

		validator is the npm package for this:

			npm i validator

		This validator has many in-built functions.

		email: {
			type: String,
			required: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid')
				}
			}
		},

		We can set a default value for any fields.

		We can also sanitize.

		const User = mongoose.model('User', {
			name: {
				type: String,
				required: true,
				trim: true
			},
			email: {
				type: String,
				required: true,
				trim: true,
				lowercase: true,
				validate(value) {
					if (!validator.isEmail(value)) {
						throw new Error('Email is invalid')
					}
				}
			},
			password: {
				type: String,
				required: true,
				minlength: 7,
				trim: true,
				validate(value) {
					if (value.toLowerCase().includes('password')) {
						throw new Error('Password is invalid. It cannot contain "password"')
					}
				}
			},
			age: {
				type: Number,
				default: 0,
				validate(value) {
					if (value < 0) {
						throw new Error('Age must be a positive number')
					}
				}
			}
		})

	Structuring a REST API:
		REST - Representational State Transfer
		API - Application Programming Interface

		API are set of tools for sowtware building.
		REST are predefined operations.

		Requests are usually HTTP Requests.
		Response are usually JSON response.

		Predefined Operations are usually - CRUD - Post, Get, Patch, Delete.

		Create:
			POST: /tasks

		Read:
			GET: /tasks
			GET: /tasks/:id

		Update:
			PATCH: /tasks/:id

		Delete:
			DELETE: /tasks/:id

		HTTP Request:
			<HTTP method> <path> <HTTP protocol>
			Accept: <>
			Connection: <>
			Authorization: Bearer/basic

			Body


	Postman:
		Used to make HTTP requests.

	Resource Creation Endpoints:
		We can send data via Postman using Body of the request and selecting raw data with application/json.
		We can create start scripts. and run them via:
			npm run <scriptname>

		Put each mongoose model into separate files.
		Then use it in index.js.
		When we require() a file then that js file is actually executed.
		So we can use require() to connect to database.

		// Telling express to parse incoming requests as JSON.
		app.use(express.json())

		// Create User
		app.post('/users', (req, res) => {
			const user = new User(req.body)

			user.save().then((result) => {
				res.status(201).send(result)
			}).catch((e) => {
				res.status(400).send(e)
					// res.send(e)
			})
		})

	Resource Reading Endpoints:
		For reading, mongoose has some builtin methods.

		// Get all Users
		app.get('/users', (req, res) => {
			User.find({}).then((users) => {
				res.send(users)
			}).catch((e) => {
				res.status(500).send()
			})
		})

		Express provides us route parameters which we can use to fetch a particular resource.

		// Get all Tasks
		app.get('/tasks', (req, res) => {
			Task.find({}).then((tasks) => {
				res.send(tasks)
			}).catch((e) => {
				res.status(500).send()
			})
		})

		// Get a specific Task
		app.get('/tasks/:id', (req, res) => {
			const _id = req.params.id

			Task.findById(_id).then((task) => {
				if (!task) {
					return res.status(404).send()
				}
				res.send(task)
			}).catch((e) => {
				res.status(500).send()
			})
		})

		For fetching a particular resource, we can use many of the functions provided by mongoose.

	Promise Chaining:
		Similar to Callback Chaining, we can chain Promises too.

		We can return a new Promise in the then() callback of one promise to chain promises.

		// Using Promise Chanining
		add(1, 2).then((sum) => {
			console.log(sum)
			return add(sum, 3)
		}).then((sum2) => {
			console.log(sum2)
		}).catch((e) => {
			console.log(e)
		})

		In Mongoose, we can use it as:
			User.findByIdAndUpdate('5d092e0b5092f94970666af9', { age: 1 })
				.then((user) => {
					console.log(user)
					return User.countDocuments({ age: 1 })
				}).then((result) => {
					console.log(result)
				}).catch((e) => {
					console.log(e)
				})

		To get rid of deprecation warnings:
			const mongoose = require('mongoose')

			mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false
			})


	Async/Await:
		Set of tools which makes it easier to work with promises.
		Makes it easier to work with asynchronous code.

		async functions always returns a promise.
		That promise is fulfilled with the value which we return from the function.

		const doWork = async() => {
			return 'nikhil'
		}

		doWork().then((result) => {
			console.log(result)
		}).catch((e) => {
			console.log(e)
		})

		await operators can only be used with async functions.

		await is useful whenever we work with any functions that returns a promise.

		In Async/Await we can have all individual results in the same scope.

		In mongoose,
			const updateAgeAndCount = async(id, age) => {
				const user = await User.findByIdAndUpdate(id, { age })
				const count = await User.countDocuments({ age })
				return count
			}

			updateAgeAndCount('5d092e0b5092f94970666af9', 2).then((count) => {
				console.log(count)
			}).catch((e) => {
				console.log(e)
			})

	Integrating Async/Await:
		We can turn our callbacks in express to async by denoting them as async.

		// Get a specific User
		app.get('/users/:id', async(req, res) => {
			const _id = req.params.id

			try {
				const user = await User.findById(_id)
				if (!user) {
					return res.status(404).send()
				}
				res.send(user)
			} catch (error) {
				res.status(500).send(error)
			}
		})

	Resource Updating Endpoints:
		PATCH HTTP method is used for updating.

		We can update using the req.body as the new object and we need to runValidators: true as we need to check data before entering into database.

		// Update User
		app.patch('/users/:id', async(req, res) => {
			// check if user tries to update non-updatable fields.
			const allowedUpdates = ['name', 'email', 'password', 'age']
			const updates = Object.keys(req.body)

			const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
			if (!isValidOperation) {
				res.status(400).send({ error: 'Invalid update!' })
			}

			try {
				const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

				// No user to update
				if (!user) {
					return res.status(404).send()
				}

				// Updated successfully
				res.send(user)
			} catch (error) {
				res.status(400).send(error)
			}
		})

	Resource Deleting Endpoints:
		// Delete Task
		app.delete('/tasks/:id', async(req, res) => {
			try {
				const task = await Task.findByIdAndDelete(req.params.id)

				// No task to delete
				if (!task) {
					return res.status(404).send()
				}

				// Deleted successfully
				res.send(task)
			} catch (error) {
				res.status(500).send(error)
			}
		})

	Separate Route files:
		We need to create new Routers for this.
		Then set up the routes.
		Register the router.

		// Second Router
		const router = new express.Router()

		// Set up routes
		router.get('/test', (req, res) => {
			console.log('From second router')
		})

		// Register the router
		app.use(router)

		----

		const express = require('express')
		const { Task } = require('../models/task')

		const router = new express.Router()

		// Create Task
		router.post('/tasks', async(req, res) => {
			const task = new Task(req.body)

			try {
				const result = await task.save()
				res.status(201).send(result)
			} catch (error) {
				res.status(400).send(error)
			}

			// task.save().then((result) => {
			//     res.status(201).send(result)
			// }).catch((e) => {
			//     res.status(400).send(e)
			//         // res.send(e)
			// })
		})

		// Get all Tasks
		router.get('/tasks', async(req, res) => {
			try {
				const tasks = await Task.find({})
				res.send(tasks)
			} catch (error) {
				res.status(500).send(error)
			}

			// Task.find({}).then((tasks) => {
			//     res.send(tasks)
			// }).catch((e) => {
			//     res.status(500).send()
			// })
		})

		// Get a specific Task
		router.get('/tasks/:id', async(req, res) => {
			const _id = req.params.id

			try {
				const task = await Task.findById(_id)
				if (!task) {
					return res.status(404).send()
				}
				res.send(task)
			} catch (error) {
				res.status(500).send(error)
			}

			// Task.findById(_id).then((task) => {
			//     if (!task) {
			//         return res.status(404).send()
			//     }
			//     res.send(task)
			// }).catch((e) => {
			//     res.status(500).send()
			// })
		})

		// Update Task
		router.patch('/tasks/:id', async(req, res) => {
			// check if user tries to update non-updatable fields.
			const allowedUpdates = ['description', 'completed']
			const updates = Object.keys(req.body)

			const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
			if (!isValidOperation) {
				res.status(400).send({ error: 'Invalid update!' })
			}

			try {
				const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

				// No task to update
				if (!task) {
					return res.status(404).send()
				}

				// Updated successfully
				res.send(task)
			} catch (error) {
				res.status(400).send(error)
			}
		})

		// Delete Task
		router.delete('/tasks/:id', async(req, res) => {
			try {
				const task = await Task.findByIdAndDelete(req.params.id)

				// No task to delete
				if (!task) {
					return res.status(404).send()
				}

				// Deleted successfully
				res.send(task)
			} catch (error) {
				res.status(500).send(error)
			}
		})

		module.exports = {
			router
		}


===========================================================

Section 12 - API Authentication and Security(Task app):

	Securely Storing Passwords:
		Passwords should never be stored in plaintext.
		Hashed passwords needs to be stored.

		Hashing algorithm - bcrypt.

		npm package:
			npm i bcryptjs

		Hashing algorithms are different than Encrypting algorithms.
		In Encrypting algorithms, we can get the plaintext back. 
		But in Hashing algorithms, we can never get the plaintext back.

		const bcrypt = require('bcryptjs')

		const myFunction = async() => {
			const password = 'Red12345!'
			const hashedPassword = await bcrypt.hash(password, 8)

			console.log(password)
			console.log(hashedPassword)

			const isMatch = await bcrypt.compare(password, hashedPassword)
			console.log(isMatch)
		}

		myFunction()

		We need to use the Middleware provided by mongoose to hash user's passwords before saving.
		We need to use the save middleware.
		First we need to define the schema of the Mongoose model first before creating the model.

		We can use the life cycle hooks:
			userSchema.pre('save', async function(next) {
				const user = this

				console.log('just before saving')
				next()
			})

		For updating, the current method will not work, so we need to change the methods.
		Some of the mongoose methods will not work well with middleware. So we need to be careful.

		// To make the middleware work
        const user = await User.findById(req.params.id)

        // No user to update
        if (!user) {
            return res.status(404).send()
        }

        // Using bracket notation as we want to use dynamically
        updates.forEach(update => user[update] = req.body[update])
        const updatedUser = await user.save()

		Now the 'pre' hook is run on 'save' so password will get hashed.


	Logging in Users:
		We need to log in users by making them enter credentials. We will create a new route for this.

		// User login
		router.post('/users/login', async(req, res) => {
			try {
				const user = await User.findByCredentials(req.body)
				res.send(user)
			} catch (error) {
				res.status(400).send(error)
			}
		})

		We can define new custom functions on the Mongoose model.

		// Validating the credentials
		userSchema.statics.findByCredentials = async({ email, password } = {}) => {
			const user = await User.findOne({ email })
			if (!user) {
				throw new Error('Incorrect Email')
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				throw new Error('Incorrect Password')
			}

			return user
		}

		We need the email to be unique across all users:
			email: {
				type: String,
				required: true,
				unique: true,
				...

		We need to drop database so that proper indexing will happen.

	
	JWT - JSON Web Token:
		Except for signup and login, all other routes will be authenticated.

			npm i jsonwebtoken

		// Testing jwt
		const jwt = require('jsonwebtoken')

		const myFunction = async() => {
			const token = jwt.sign({ _id: '12345' }, 'thisismycourse')
			console.log(token)
		}

		myFunction()

		We need to pass a cryptoKey ie the secret using which user can authenticate.

		Each JWT has 3 parts:
		eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NSIsImlhdCI6MTU2MDk3NDM1MH0.g93BsIeKuJIctfNEtgDYgST60TgmvlDsCZKS4-MvXPo

		The parts are separated by periods.
			
			eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
			The first part is a base64 encoded JSON string - Header - conatins meta information like what kinda token and what algorithm was used.
			
			eyJfaWQiOiIxMjM0NSIsImlhdCI6MTU2MDk3NDM1MH0
			The second part is a base64 encoded JSON string - Payload - conatins the data provided by user. 
			
			g93BsIeKuJIctfNEtgDYgST60TgmvlDsCZKS4-MvXPo
			The last part is a base64 encoded JSON string - Signature - used to verify the token. 

		// Testing jwt
		const jwt = require('jsonwebtoken')

		const myFunction = async() => {
			// Generate token with expiry date
			const token = jwt.sign({ _id: '12345' }, 'thisismycourse', { expiresIn: '1 day' })
			console.log(token)

			// Verify token using token and the secret
			const data = jwt.verify(token, 'thisismycourse')
			console.log(data)
		}

	Generating Authentication Tokens - JWT:
		schema.stattics.foo - foo is a model method - Model methods.
		schema.methods.foo - foo is an instance method - Instance methods.

		We need normal function for this as we need to bind the this. Cannot use arrow functions.
		This will be similar to middleware.

		// Instance method
		// Generate Auth tokens
		userSchema.methods.generateAuthToken = async function() {
			const user = this

			// generate token
			const token = jwt.sign({ _id: user._id.toString() }, 'thisismycourse', { expiresIn: '1 day' })

			// add token to user
			user.tokens = user.tokens.concat({ token })
			await user.save()

			return token
		}

		Next the server needs to keep track of the user so that the user can login via multiple devices.

		Adding to User schema:
			
			....
						age: {
					type: Number,
					default: 0,
					validate(value) {
						if (value < 0) {
							throw new Error('Age must be a positive number')
						}
					}
				},
				tokens: [{
					token: {
						type: String,
						required: true
					}
				}]
			})
		
		Here tokens is an array of tokens.
		In Mongo, this will be a sub-document. So each token object will have its ObjectID.


	Express Middleware:
		We can use some middleware so that we can authenticate users before they can perform any actions.

		To do this we need to run the custome middleware in our code. 
		For this, we need to use app.use().
		This needs to be at the top of the declarations before any other middleware.

		We can create a new hook using express.

		app.use((req, res, next) => {
			console.log(req.method, req.path)
			next()
		})

		We need to call the next() function so that the execution will continue.

		We can use this for multiple purposes like maintenance mode ...

		// Maintainence mode
		app.use((req, res, next) => {
			res.status(503).send('Site is currently down for maintenance. Check back soon!')
		})

	Accepting Authentication Tokens:
		It's better to organize all middleware in a separate folder.

		The middleware in index.js will be associated with every single route in our app.
		For auth middleware, we dont want this.

		We can add our middleware to a particular route by - adding the function as the second parameter while setting up the route.

			// Get all Users
			router.get('/users', auth, async(req, res) => {
				try {
					const users = await User.find({})
					res.send(users)
				} catch (error) {
					res.status(500).send(error)
				}
			})

		The client needs to put their Authentication jwt and send it as headers along with all their requests.
		This way they can be authenticated.

		The Headers will be of key/value pairs.

		Key - Authorization
		Value - Bearer <token>

		For basic authentication:
			Key - Authorization
			Value - Basic <token>
		
		We can get the token sent by client on Authorization header. Then use it to authenticate.
		
		const auth = async(req, res, next) => {
			try {
				const token = req.header('Authorization').replace('Bearer ', '')
				const decoded_token = jwt.verify(token, 'thisismycourse')

				// check user
				const user = await User.findOne({ _id: decoded_token._id, 'tokens.token': token })

				if (!user) {
					throw new Error()
				}

				// send the user back in request for further use
				req.user = user

				// resume execution
				next()
			} catch (error) {
				return res.status(401).send({ error: 'User not authorized. Please send valid JWT' })
			}
		}

		Now as authentication is present a user should not be able to see other users' details.
		So /users will now be useless.

		So we can repurpose it to see profile of the user.

		// Will not be correct after auth 
		// repurposing as user profile view
		// Get own profile
		router.get('/users/me', auth, async(req, res) => {
			res.send(req.user)
		})

	Advanced Postman:
		Environments:
			Multiple environments can be configured.
			We can setup the environments and then use them as 
				{{env_variable}}

		Authorization:
			We can generalize Authorization by not putting in header directly but rather putting in Authorization tab under Bearer token.

			Or we can put Authorization in the Collection lever itself and then Inherit from Parent for all other requests.

		Environment Variable:
			We can use an environment variable to store the token so that it is stored and updated automatically and no manual steps are needed.
			We can do this by writing JavaScript code under Tests tab of the request.

			if(pm.response.code === 200) {
				pm.environment.set("auth_token", pm.response.json().token);
			}

	Logging Out:
		The User needs to have the ability to log out of the application. 
		If a user has different seessions on different devices then we will only need to logout of the particular device only.
		So proper token needs to be matched.

		// User logout
		router.post('/users/logout', auth, async(req, res) => {
			try {
				req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
				await req.user.save()
				res.send('Logged out succesfully')
			} catch (error) {
				res.status(500).send(error)
			}
		})

		We can also logout of all the sessions - gmail, netflix etc.

		// User logout all
		router.post('/users/logoutAll', auth, async(req, res) => {
			try {
				req.user.tokens = []
				await req.user.save()
				res.send('Logged out succesfully in all devices')
			} catch (error) {
				res.status(500).send(error)
			}
		})

	Hiding Private Data:
		We shouldn't send tokens or password back to user.
		It needs to be hidden from the user.

		So we need to use a method to restrict the data.

		// Instance method
		// Generate Public profile
		userSchema.methods.getPublicProfile = async function() {
			const user = this

			// generate userObject
			const userObject = user.toObject()

			// deleting sensitive information
			delete userObject.password
			delete userObject.tokens

			return userObject
		}

		This is the manual way as we need to call the function everytime.
		This is not feasible and needs to be automated.

		To do this we need to change the method name to 'toJSON'
		No other change will be required.

		userSchema.methods.toJSON = function() {
			const user = this
			...
		}

		Now all user will have data modified.

		toJSON:
			We can use this to modify what the object will be.
			This is a default method which will be called whenever JSON.stringify(obj) is called.

		
	Authenticating User Endpoints:
		Now we know that since a user can only see his details, we don't need the fetch user by id call anymore.
		Similarly a user can only delete his own profile.

		// Delete User
		router.delete('/users/me', auth, async(req, res) => {
			try {
				await req.user.remove()
				res.send(req.user)
			} catch (error) {
				res.status(500).send(error)
			}
		})

		Next our update will also need to change.

		// Update User
		router.patch('/users/me', auth, async(req, res) => {
			// check if user tries to update non-updatable fields.
			const allowedUpdates = ['name', 'email', 'password', 'age']
			const updates = Object.keys(req.body)

			const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
			if (!isValidOperation) {
				res.status(400).send({ error: 'Invalid update!' })
			}

			try {
				// Using bracket notation as we want to use dynamically
				updates.forEach(update => req.user[update] = req.body[update])
				await req.user.save()

				// Updated successfully
				res.send(req.user)
			} catch (error) {
				res.status(400).send(error)
			}
		})

	User/Task Relationship:
		First, the task needs to contain the id of the user who created it.

		const Task = mongoose.model('Task', {
			description: {
				type: String,
				required: true,
				trim: true
			},
			completed: {
				type: Boolean,
				default: false
			},
			owner: {
				type: mongoose.Schema.Types.ObjectId,
				required: true
			}
		})

		Then we need to update the post method
			// Create Task
			router.post('/tasks', auth, async(req, res) => {
				const task = new Task({
					...req.body,
					owner: req.user._id
				})

				try {
					const result = await task.save()
					res.status(201).send(result)
				} catch (error) {
					res.status(400).send(error)
				}
			})

		While creating the Task model, for the owner parameter we can create a ref to the User model so that we can connect the two more easily.

		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}

		Then we can populate the ref using the actual referred object.

		Now finding user of a given task:

			const main = async() => {
				const task = await Task.findById('5d0cc00f6929993480b9c13f')
				await task.populate('owner').execPopulate()
				console.log(task.owner)
			}

		Next finding all tasks of a given user:

			For this, we need to create a virtual property. This will be the relationship between the two entities.
			It is not actual data which is stored in a database.

			// virtual property
			userSchema.virtual('tasks', {
				ref: 'Task',
				localField: '_id',
				foreignField: 'owner'
			})

		In file:

			const main = async() => {
				// // finding user of a given task
				// const task = await Task.findById('5d0cc00f6929993480b9c13f')
				// await task.populate('owner').execPopulate()
				// console.log(task.owner)

				// finding all tasks of a given user
				const user = await User.findById('5d0cbedcb44d384ca8f20d3c')
				await user.populate('tasks').execPopulate()
				console.log(user.tasks)
			}

	Authenticating Task Enpoints:
		We need to ensure that the auth and relationship is maintained.

		For getting the task by id, we can just do:
			const task = await Task.findOne({ _id, owner: req.user._id })
		
		Next for updating a task:
			// get task
        	const task = await Task.findByOne({ _id: req.params.id, owner: req.user._id })

		For deleting:
			const task = await Task.findByOneAndDelete({ _id: req.params.id, owner: req.user._id })

	Cascade Delete Tasks:
		If a user is deleted, then all his tasks also needs to be deleted.
		We can again use express middleware for this. 
		Create new hook for this.

		// Hook to delete all the tasks of users when user is deleted
		userSchema.pre('remove', async function(next) {
			const user = this

			// deleting all taks for the user
			await Task.deleteMany({ owner: user._id })

			// telling the middleware we are done and to proceed with normal execution.
			next()
		})


===========================================================

Section 13 - Sorting, Pagination and Filtering(Task app):

	Timestamps:
		We can have Mongoose/Mongo provide timestamps for us. We can do this by anabling Schema options.

		const taskSchema = new mongoose.Schema({
			...
			owner: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'User'
			}
		}, {
			timestamps: true
		})

	Filtering Data:
		We use the querystring for this.
		We can set up a qs param so that user can filter out the tasks which are completed only.

		We can enable new options in populate() function.

		// GET /tasks?completed=true
		// Get all Tasks
		router.get('/tasks', auth, async(req, res) => {
			const match = {}
			if (req.query.completed) {
				match.completed = req.query.completed === 'true'
			}
			try {
				const tasks = await req.user.populate({
					path: 'tasks',
					match
				}).execPopulate()
				res.send(req.user.tasks)
			} catch (error) {
				res.status(500).send(error)
			}
		})

	Pagination:
		3 ways to implement:
			Using Page numbers.
			Using Load more option.
			Infinite scroll.
		
		We can use limit and skip to manage pagination.
		Here we need new options in populate().

		const tasks = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()

	Sorting:
		Similar to pagination we need to add options in populate().

		router.get('/tasks', auth, async(req, res) => {
			const match = {}
			const sort = {}

			if (req.query.completed) {
				match.completed = req.query.completed === 'true'
			}

			if (req.query.sortBy) {
				const parts = req.query.sortBy.split(':')

				// setting sort option dynamically with ternary operator
				sort[parts[0]] = parts[1] === 'dsc' ? -1 : 1
			}

			try {
				const tasks = await req.user.populate({
					path: 'tasks',
					match,
					options: {
						limit: parseInt(req.query.limit),
						skip: parseInt(req.query.skip),
						sort
					}
				}).execPopulate()
				res.send(req.user.tasks)
			} catch (error) {
				res.status(500).send(error)
			}
		})

	
===========================================================

Section 14 - File Uploads(Task app):

	Adding Support for File Uploads:
		Express by default does not support file uploads. We can use a npm package for this.

		npm i multer

		We can use multer to use any kinda of file upload be it images or pdfs.

		multer comes with its own middleware which we need to use.
			multer.single()

		// Testing file uploads
		const multer = require('multer')

		const upload = multer({
			dest: 'images'
		})

		app.post('/upload', upload.single('upload'), (req, res) => {
			res.send()
		})

		We need to send this data as form-data in Postman.
		The key in Postman needs to match with the single() function we defined. And select type as file.

		Initially the file will be in binary format. Later we will learn on how to get the correct file type.

	Validating File Uploads:
		We can add validations for file size and also file type.
		
		We can configure fileSize in the multer object limits section.

		// set file upload directory
		const upload = multer({
			dest: 'avatars',
			limits: {
				// filesize is in bytes
				fileSize: 1000000
			}
		})

		For the file type restrictions we need to add one more object in the multer definitions.

		const upload = multer({
			dest: 'images',
			limits: {
				// filesize is in bytes
				fileSize: 1000000
			},
			fileFilter(req, file, cb) {
				if (!file.originalname.endsWith('.pdf')) {
					return cb(new Error('File must be a pdf'))
				}
				cb(undefined, true)
			}
		})

		We can use match() with regular expressions so that we can have better restrictions.

		const upload = multer({
			dest: 'images',
			limits: {
				// filesize is in bytes
				fileSize: 1000000
			},
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(doc|docx)$/)) {
					return cb(new Error('File must be a word document'))
				}
				cb(undefined, true)
			}
		})

	Handling Express errors:
		We need to display the error in a json format.
		For this, we need to define a callback in the method.

		app.post('/upload', upload.single('upload'), (req, res) => {
			res.send()
		}, (error, req, res, next) => {
			res.status(400).send({ error: error.message })
		})

	Adding images to user profiles:
		We first need to put the image upload url behind authentication.

		Usually in all huge productin apps the profile pic is not stored in a separate folder in the filesytem but in the form of binary data 
		as part of the user prfile.

		The type will be Buffer.

		avatar: {
			type: Buffer
		}

		// Upload profile pic
		router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
			req.user.avatar = req.file.buffer
			await req.user.save()
			res.send()
		}, (error, req, res, next) => {
			res.status(400).send({ error: error.message })
		})

		We can see our binary data in the web by using:

			<img src="data:image/jpg;base64,binary_data"/>

	Serving up files:
		We can send back the profile pics using,

		// Serving profile pic
		router.get('/users/:id/avatar', async(req, res) => {
			try {
				const user = await User.findById(req.params.id)

				if (!user || !user.avatar) {
					throw new Error()
				}

				// setting the response header
				res.set('Content-Type', 'image/jpg').send(user.avatar)
			} catch (error) {
				res.status(404).send()
			}
		})

	Auto-cropping and Image formatting:
		We can use a npm module for this.
		We no longer need to send profile pic back every time, so we can hide them like we did for password.

			npm i sharp

		// Upload profile pic
		router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
			//req.user.avatar = req.file.buffer

			const buffer = await sharp(req.file.buffer)
				.resize({
					width: 250,
					height: 250
				}).png().toBuffer()

			req.user.avatar = buffer
			await req.user.save()
			res.send()
		}, (error, req, res, next) => {
			res.status(400).send({ error: error.message })
		})

	
===========================================================

Section 15 - Sending Emails(Task App):
		
	SendGrid:
		It is a npm module using which we can send emails.

		It is not working for me.

		const sgMail = require('@sendgrid/mail')

		const sendGridAPIKey = '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'

		sgMail.setApiKey(sendGridAPIKey)

		sgMail.send({
			to: 'b1499547@urhen.com',
			from: 'andrew@mead.io',
			subject: 'first mail',
			text: 'first one'
		})

	Sending Welcome and cancellation emails:

		const sendWelcomeEmail = ({ email, name } = {}) => {
			sgMail.send({
				to: email,
				from: 'andrew@mead.io',
				subject: 'Welcome to The Company',
				text: `Welcome to the company ${name}. Hope you enjoy!`
			})
		}

	Environment Variables:
		Typically environment Variables should never be present in production code.
		We need to use configuration for these.

		For Security and Customizability we need Environment Variables.

		We can keep all our configurations in a separate folder called config.
		There we can keep one .env for each situation.

		dev.env for development.

		We need to store key-value pairs in that.

		We can use npm package to help with this:
			npm i env-cmd -D

		To run we need to add this in the package.json scripts.
		
		"scripts": {
			"start": "node src/index.js",
			"dev": "env-cmd ./config/dev.env nodemon src/index.js"
		},

	Creating a Production MongoDB Database:
		In production deployment, we need a MongoDB hosting service which will host our database.
		So that heroku can connect to that.

		We can use MongoDB Atlas for this.
		We need to build our first cluster.
		A cluster is a collection of servers for our db.

		First we need to customize.
		
		We need MongoDB compass to be installed in our local machine.

		Do configurations as shown in video.

	Deploy to heroku:
		Create a new heroku app:
			heroku create <appname>

		To view config variables in heroku,
			heroku config

		To set config variables in heroku,
			heroku config:set <key>=<value>

		Then push our code to heroku github:
			git push heroku master


===========================================================

Section 16 - Testing Node.js(Task App):

	Jest Testing Framework:
		For any production app, there should be automated testing.

		Popular frameworks are jest and Mocha.

		All testing dependencies should be development dependencies.

		npm i jest -D

		Jest is a zero configuration testing framework.

		We need a new script in our scripts.
			"test": "jest"

		Then we can run:
			npm test

		We need a new dir for our test scripts.
		And create a new test file using .test.js extension.
		
		Next, we need to create a test case.

		test('Init testing framework - Jest', () => {

		})

		Test cases are assumed to be success unless specified otherwise.

		Why Tests are important:
			Saves time
			Generates reliable software
			Gives flexibility to developers
				Refactoring
				Collabarating
				Profiling
			Peace of mind

	Writing Tests and Assertions:

		const total = calculateTip(10, .3)

		if (total !== 13) {
			throw new Error(`Total tip should be 13. Got ${total}`)
		}

		The above is basic way of doing this. We can change this by using assert statements.

		test('Should calculate total with tip', () => {
			expect(calculateTip(10, .3)).toBe(13)
		})

		There are various ways of using expect which can be seen in the docs.

	Testing Asynchronous Code:
		To run jest whenever we change any tests:
			In package.json:
				"scripts": {
					"start": "node src/index.js",
					"dev": "env-cmd ./config/dev.env nodemon src/index.js",
					"test": "jest --watch"
				},

		We can check more Jest cli options in docs.

		We need to be careful here.

		test('Async test demo', () => {
			setTimeout(() => {
				expect(1).toBe(2)
			}, 2000)

			// expect(1).toBe(2)
		})

		The above code will fail instead of passing.
		So to fix this we need to tell jest that we are testing async code.

		test('Async test demo', (done) => {
			setTimeout(() => {
				expect(1).toBe(2)
				done()
			}, 2000)

			// expect(1).toBe(2)
		})

		The above code will make sure test is not completed until we call done.

		For Promises and Async/Await there are better ways to do this.

		// Callback way of testing
		test('Async test demo', (done) => {
			setTimeout(() => {
				expect(2).toBe(2)
				done()
			}, 2000)

			// expect(1).toBe(2)
		})

		// Promises way of testing
		test('Async Promises Add 2 numbers', (done) => {
			add(2, 3).then(sum => {
				expect(sum).toBe(5)
				done()
			})
		})

		// Async/await way of testing
		test('Async Async/await Add 2 numbers', async() => {
			// const sum = await add(2, 3)
			// expect(sum).toBe(5)

			// const sum = await add(2, 3)
			expect(await add(2, 3)).toBe(5)
		})

	Testing an Express Application:
		For testing, similar to dev environment we need a test environment.
		Also we need a test database where we can make the calls for our API.

		Now similar to our dev script we need to use env-cmd for our test script too.

		"scripts": {
			"start": "node src/index.js",
			"dev": "env-cmd ./config/dev.env nodemon src/index.js",
			"test": "env-cmd ./config/test.env jest --watch"
		},

		One more configuration needed is the jest configuration. Here we need to specify the jest test environment.

		"jest": {
			"testEnvironment": "node"
		},

		For testing the express routes, we can a module called supertest.
			npm i supertest

		We will need slight restructuring for this to function properly as test cases need access to our express app before we start it.


		const request = require('supertest')
		const { app } = require('../src/app')

		test('Should sign up new user', async() => {
			await request(app).post('/users').send({
				name: 'Nikhil',
				email: 'nikhil@admin.com',
				password: 'mypass099'
			}).expect(201)
		})

		Now we will need to wipe out the database before running each test so that we can get proper results.

	Jest setup and teardown:
		We can use jest lifecycle methods to configure jest.

		// before each
		beforeEach(async() => {
			await User.deleteMany()
		})

		The above code will run before each test case.

		const request = require('supertest')
		const { app } = require('../src/app')
		const { User } = require('../src/models/user')

		const userOne = {
			name: 'User 1',
			email: 'user1@admin.com',
			password: 'user199'
		}

		// before each
		beforeEach(async() => {
			await User.deleteMany()
			await new User(userOne).save()
		})

		test('Should sign up new user', async() => {
			await request(app).post('/users').send({
				name: 'Nikhil',
				email: 'nikhil@admin.com',
				password: 'mypass099'
			}).expect(201)
		})

		test('Should login user', async() => {
			await request(app).post('/users/login').send({
				email: userOne.email,
				password: userOne.password
			}).expect(200)
		})

		test('Should not login non existant user', async() => {
			await request(app).post('/users/login').send({
				email: userOne.email,
				password: 'badpassword!!2'
			}).expect(400)
		})

	Testing with Authentication:
		If we want to test with authentication, then we need to mock the jwt and the data.

		const userOneId = new mongoose.Types.ObjectId()
		const userOne = {
			_id: userOneId,
			name: 'User 1',
			email: 'user1@admin.com',
			password: 'user199',
			tokens: [{
				token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
			}]
		}

		// before each
		beforeEach(async() => {
			await User.deleteMany()
			await new User(userOne).save()
		})

		test('Should get user profile', async() => {
			await request(app)
				.get('/users/me')
				.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
				.send()
				.expect(200)
		})

	Advanced Assertions:
		We can do complex assertions in our app and not just http status code.
		We might need to check the response body.

		Never go overboard with the test cases. Test only for possible scenarios.

		test('Should sign up new user', async() => {
			const response = await request(app).post('/users').send({
				name: 'Nikhil',
				email: 'nikhil@admin.com',
				password: 'mypass099'
			}).expect(201)

			// Assert that the database was changed correctly
			const user = await User.findById(response.body.result._id)
			expect(user).not.toBeNull()

			// Assertions about the response
			expect(response.body).toMatchObject({
				result: {
					name: 'Nikhil',
					email: 'nikhil@admin.com',
				},
				token: user.tokens[0].token
			})

			// Assert about password stored in database
			expect(user.password).not.toBe('mypass099')
		})

	Mocking Libraries:
		We might need to mock npm modules. The modules might be custom or global.
		Ex- SendGrid

		We create a new directory for creating our mocks.
			__mocks__

		Next for each module we need to mock, we need a js file for that.

		module.exports = {
			send() {},
			setApiKey() {}
		}

		More info can be found in docs.

	Wrapping up User tests:
		To test with static content we can use Fixtures.

		And this directory is gonna be called fixtures in the testing world a fixture or fixtures plural are things that allow you to set up the environment your tests are going to run in.

		toBe() uses === operator.

		To compare objects, we need to use toEqual()

		For images

		test('Should upload profile pic of user', async() => {
			await request(app)
				.post('/users/me/avatar')
				.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
				.attach('avatar', 'tests/fixtures/profile-pic.jpg')
				.expect(200)

			const user = await User.findById(userOneId)
			expect(user.avatar).toEqual(expect.any(Buffer))
		})

		test('Should update valid user fields', async() => {
			await request(app)
				.patch('/users/me')
				.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
				.send({
					name: 'Mike'
				})
				.expect(200)

			const user = await User.findById(userOneId)
			expect(user.name).toEqual('Mike')
		})

	Test Suites:
		We should create a new Test Suite so that everything is neatly organized.

		We can keep a db config file in fixtures so that we can access it in all test suites.

		To prevent the test suites from interfering with each other, we need to add an option to run jest in series instead of asynchronously.

		"scripts": {
			"start": "node src/index.js",
			"dev": "env-cmd -f ./config/dev.env nodemon src/index.js",
			"test": "env-cmd -f ./config/test.env jest --runInBand --watch"
		},

		We can create some more dummy data and do testing based on that.

		test('Should not delete tasks of other users', async() => {
			const response = await request(app)
				.delete(`/tasks/${taskOne._id}`)
				.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
				.send()
				.expect(404)

			const task = await Task.findById(taskOne._id)
			expect(task).not.toBeNull()
		})

	Extra Test Ideas:

		//
		// User Test Ideas
		//
		// Should not signup user with invalid name/email/password
		// Should not update user if unauthenticated
		// Should not update user with invalid name/email/password
		// Should not delete user if unauthenticated

		//
		// Task Test Ideas
		//
		// Should not create task with invalid description/completed
		// Should not update task with invalid description/completed
		// Should delete user task
		// Should not delete task if unauthenticated
		// Should not update other users task
		// Should fetch user task by id
		// Should not fetch user task by id if unauthenticated
		// Should not fetch other users task by id
		// Should fetch only completed tasks
		// Should fetch only incomplete tasks
		// Should sort tasks by description/completed/createdAt/updatedAt
		// Should fetch page of tasks


===========================================================		

Section 17 - Real-Time Web Applications with Socket.io (Chat App)

	Creating the Chat App project:
		Setting up the dependencies, project structure with express.

	WebSockets:
		Used to create real time apps.
		WebSocket Protocol.
		This protocol can allow full-duplex communication.
		Many clients can connect to the server.

		But in this case we'll be using web sockets with no JSA to create our real time chat application.
		So what I want to do in this video is just talk about exactly what web sockets are and how they're going to help us achieve our goal the goal of a real time application.
		Now like with the HTTP protocol of the web socket protocol is going to allow us to set up communication.

		THere is a persistent connection between client and server.

		WebSocket protocol is different from HTTP protocol.

		Either client or server can initiate communication.


	Socket.io:
		npm package for WebSockets.

		npm i socket.io

		For this we need to configure express in a different way. We need to refactor the express definition.
		We need to set up the http server and then pass the server to socket function.

		const http = require('http')
		const socketio = require('socket.io')

		const app = express()

		// config socket.io
		const server = http.createServer(app)
		const io = socketio(server)

		Then we need to define what to do on connection.

		// socket function
		io.on('connection', () => {
			console.log('new web socket connection')
		})

		// Start the server using refactored http
		server.listen(port, () => {
			console.log(`Listening on port ${port}`)
		})

		The above code is the server side of socket.io. Next we need to configure the client side.

		The client side version of the socket library.

		<script src="/socket.io/socket.io.js"></script>

		In public folder, create a new js file which is client side js.

		<script src="/socket.io/socket.io.js"></script>
    	<script src="/js/chat.js"></script>

		Because we have loaded the client side version of the library, we can use the functions in our client side js file.

	Socket.io Events:
		We can use a dummy counter example to figure out to send messages between client and server.
		Each method has socket object has a parameter which contains information about that connection. We can use that to send the messages.

		The messages are sent via events.

		// server socket function
		io.on('connection', (socket) => {
			console.log('new web socket connection')

			// send messaage to client via event
			socket.emit('countUpdated')
		})

		At client:

		const socket = io()

		// client socket function
		socket.on('countUpdated', (count) => {
			console.log('count has been updated', count)
		})

		// server socket connection function
		io.on('connection', (socket) => {
			console.log('new web socket connection')

			// send messaage to client via event
			socket.emit('countUpdated', count)

			socket.on('increment', () => {
				count++
				socket.emit('countUpdated', count)
			})
		})

		For client:
		
		$(document).ready(function() {
			const socket = io()

			// client socket function
			socket.on('countUpdated', (count) => {
				console.log('count has been updated', count)
				$('#count').text(count)
			})

			$('#increment').click(function() {
				// alert('clicked')
				socket.emit('increment')
			})
		})

		To emit to all connections:

		// will emit to all connections
        io.emit('countUpdated', count)

	Implementing Sockets:

		socket.on('message', (message) => {
			console.log(message)
		})

		$('#message-form').submit(function(e) {
			e.preventDefault()
			const message = $('#message').val()

			socket.emit('sendMessage', message)
		})

		server:

		// welcome message
		socket.emit('message', 'Welcome!')

		socket.on('sendMessage', (message) => {
			io.emit('message', message)
		})

	Broadcasting Events:
		Useful when we want to broadcast some messages.

		Broadcasted events are emitted to all other connections except the source connection.

		// broadcast message
    	socket.broadcast.emit('message', 'A new user has joined!')

		socket.emit - emit to that particular connection
		socket.broadcast.emit - emit to all other connections except the source connection
		io.emit - emit to all connections.

		When a client disconnects, we use socket.on()

		// when client disconnects
		socket.on('disconnect', () => {
			io.emit('message', 'A user has left!')
		})

	Sharing your location:
		We can use Browser Geolocation API to get user location.

		// Browser based Geolocation
		$('#send-location').click(function() {
			if (!navigator.geolocation) {
				return alert('Geolocation is not supported by your browser!')
			}

			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position)
			})
		})

		server:

		// server socket connection function
		io.on('connection', (socket) => {
			console.log('New WebSocket connection')

			// welcome message
			socket.emit('message', 'Welcome!')

			// broadcast message
			socket.broadcast.emit('message', 'A new user has joined!')

			// listen to message
			socket.on('sendMessage', (message) => {
				io.emit('message', message)
			})

			// listen to location
			socket.on('sendLocation', (coords) => {
				io.emit('message', `Location: ${coords.latitude}, ${coords.longitude}`)
			})

			// when client disconnects
			socket.on('disconnect', () => {
				io.emit('message', 'A user has left!')
			})
		})

		client:

		// Browser based Geolocation
		$('#send-location').click(function() {
			if (!navigator.geolocation) {
				return alert('Geolocation is not supported by your browser!')
			}

			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position)

				// sending location from client to server
				socket.emit('sendLocation', {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				})
			})
		})

		Sending google maps link:

		// listen to location and send link to google maps
		socket.on('sendLocation', (coords) => {
			io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
		})

	Event Acknowledgements:
		Allows the receiver of the event to acknowledge that it has received the event and message.

		Event acknowledgements will be the last paramater to the emit function. It is usually a callback function.

		client:

		$('#message-form').submit(function(e) {
			e.preventDefault()
			const message = $('#message').val()

			socket.emit('sendMessage', message, (message) => {
				console.log('The message was delivered', message)
			})
		})

		server:

		// listen to message
		socket.on('sendMessage', (message, callback) => {
			io.emit('message', message)
			callback('Delivered!')
		})

		We can use a npm package to filter bad words.

		npm i bad-words

		$('#message-form').submit(function(e) {
			e.preventDefault()
			const message = $('#message').val()

			socket.emit('sendMessage', message, (error) => {
				if (error) {
					return console.log('Error', error)
				}
				console.log('Message Delivered')
			})
		})

		// listen to message
		socket.on('sendMessage', (message, callback) => {
			const filter = new BadWordsFilter()

			if (filter.isProfane(message)) {
				return callback('Profanity is not allowed!')
			}

			io.emit('message', message)
			callback()
		})

	
	Form and Button States:
		We can change the form so that when an action is being performed we don't allow other stuff.

		$('#message-form').submit(function(e) {
			e.preventDefault()
			const message = $('#message').val()

			// disable form while sending a message
			$('#send-btn').attr('disabled', 'disabled')

			socket.emit('sendMessage', message, (error) => {
				if (error) {
					return console.log('Error', error)
				}
				console.log('Message Delivered')

				// enable form after message sent
				$('#send-btn').removeAttr('disabled')
				$('#message').val('')
				$('#message').focus()
			})
		})

	Rendering Messages:
		Using mustache to render to browser.
		moment.js to work with time.

		We need to use mustache templating to render our messages in our ui.

		<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>

		const messageTemplate = '<div><p>{{message}}</p></div>'

		socket.on('message', (message) => {
			console.log(message)

			// displaying messages using mustache template
			// console.log($('#message-template').html())
			// const messageHtml = Mustache.to_html($('#message-template').html(), {
			//     message
			// })
			const messageHtml = Mustache.to_html(messageTemplate, { message })
			$('#messages').append(messageHtml)
		})

	Rendering Location Messages:
		We can make it such that we can render locations separately.
		
		socket.on('locationMessage', (url) => {
			console.log(url)
			const locationMessageHtml = Mustache.to_html(locationMessageTemplate, { url })
			$('#messages').append(locationMessageHtml)
		})

	Timestamps:
		We can use momentjs for this.
		Usually getTime() returns the number of seconds passed since Jan 1, 1970. This date is the Unix epoch.

		To get the timestamps its better to send objects back and forth between servers and clients.

		// utils
		const generateMessage = (text) => {
			return {
				text,
				createdAt: new Date().getTime()
			}
		}

		// server
		// using functions and objects
    	socket.emit('message', generateMessage('Welcome!'))

		// client
		const messageHtml = Mustache.to_html(messageTemplate, {
            message: message.text
        })
        $('#messages').append(messageHtml)

		// momentjs
		const messageHtml = Mustache.to_html(messageTemplate, {
            message: message.text,
            // createdAt: message.createdAt
            createdAt: moment(message.createdAt).format('h:mm A')
        })

	Styling the Chat App:
		Use the style sheet to customize the application.

	Join Page:
		We can add ajoi page.

		<div class="centered-form">
			<div class="centered-form__box">
				<h1>Join</h1>
				<form action="/chat">
					<label>Display Name</label>
					<input type="text" name="username" placeholder="Display Name" required>
					<label>Room</label>
					<input type="text" name="room" placeholder="Room" required>
					<button>Join</button>
				</form>
			</div>
		</div>

	Socket.io Rooms:
		We can use the qs library for working with querystrings.

		// Options in query
    	const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

		Then we can set up a new event which emits for joining.

		// joining room
    	socket.emit('join', { username, room })
		
		Socket has some room specific features.

		// join
		socket.on('join', ({ username, room }) => {
			socket.join(room)
		})

		io.to.emit -> emits event to everybody in a room 
		socket.broadcast.to.emit -> emit to everyone except the sender in a room

		// join
		socket.on('join', ({ username, room }) => {
			// join the room
			socket.join(room)

			// using functions and objects
			socket.emit('message', generateMessage('Welcome!'))

			// broadcast message
			socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))

			// // broadcast message
			// socket.broadcast.to(room).emit('message', generateMessage('A new user has joined!'))
		})

	Storing Users:
		Users needs to be stored so that we can keep track of them.

		const users = []

		// addUser
		const addUser = ({ id, username, room }) => {
			// clean the data
			username = username.trim().toLowerCase()
			room = room.trim().toLowerCase()

			// validate the data
			if (!username || !room) {
				return {
					error: 'Username and room are required!'
				}
			}

			// check for existing user
			const existingUser = users.find(user => user.room === room && user.username === username)

			// validate username
			if (existingUser) {
				return {
					error: 'Username already taken!'
				}
			}

			// store user
			const user = { id, username, room }
			users.push(user)

			// return stored user
			return { user }
		}

		// removeUser
		const removeUser = (id) => {
			// find index
			const index = users.findIndex(user => user.id === id)

			// if index === -1 then no match
			// return the user removed
			if (index !== -1) {
				return users.splice(index, 1)[0]
			}
		}

		// getUser
		const getUser = (id) => {
			return users.find(user => user.id === id)
		}

		// getUsersInroom
		const getUsersInroom = (room) => {
			room = room.trim().toLowerCase()
			return users.filter(user => user.room === room)
		}

		module.exports = {
			addUser,
			removeUser,
			getUser,
			getUsersInroom
		}

	Tracking Users joining and leaving:
		Every socket connection comes with a socket connection.

		socket.on('join', (options, callback) => {
			// add user
			// const { user, error } = addUser({ id: socket.id, username, room })
			const { user, error } = addUser({ id: socket.id, ...options })

			// error display if any
			if (error) {
				return callback(error)
			}

			// join the room
			socket.join(user.room)

			// using functions and objects
			socket.emit('message', generateMessage('Welcome!'))

			// broadcast message
			socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))

			callback()

			// // broadcast message
			// socket.broadcast.to(room).emit('message', generateMessage('A new user has joined!'))
		})

		// when client disconnects
		socket.on('disconnect', () => {
			// remove user
			const user = removeUser(socket.id)

			if (user) {
				io.to(user.room).emit('message', generateMessage(`${user.username} has left!`))
			}
		})

		// joining room
		socket.emit('join', { username, room }, (error) => {
			if (error) {
				alert(error)
				location.href = '/'
			}
		})

	Sending Messages to Rooms:
		We can make autocomlete off by
			<input id="message" type="text" placeholder="Message" required autocomplete="off">

		// listen to message
		socket.on('sendMessage', (message, callback) => {
			// fetch user data
			const user = getUser(socket.id)

			const filter = new BadWordsFilter()

			if (filter.isProfane(message)) {
				return callback('Profanity is not allowed!')
			}

			io.to(user.room).emit('message', generateMessage(user.username, message))
			callback()
		})

	Rendering User List:

		// send list of users in room
		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInroom(user.room)
		})

		socket.on('roomData', ({ users, room }) => {
			const sidebarHtml = Mustache.to_html(sidebarTemplate, {
				users,
				room
			})
			$('#sidebar').html(sidebarHtml)
		})


		const sidebarTemplate = '<h2 class="room-title">{{room}}</h2><h3 class="list-title">Users</h3><ul class="users">{{#users}}<li>{{username}}</li>{{/users}}</ul>'

	Autoscrolling:
		// autoscroll
    const autoscroll = () => {
        // new message
        const $newMessage = $('#messages:last-child')

        // height of new message
        const newMessageMargin = parseInt($newMessage.css('marginBottom'))
        const newMessageHeight = $newMessage.outerheight() + newMessageMargin

        // visible height
        const visibleHeight = $('#messages').outerheight()

        // height of messages container
        const containerHeight = $('#messages').prop('scrollHeight')

        // how far have i scrolled
        const scrollOffset = $('#messages').scrollTop() + visibleHeight

        if (containerHeight - newMessageHeight <= scrollOffset) {
            $('#messages').animate({
                scrollTop: containerHeight
            }, 1000)
        }
    }

	// working solution
	$('#messages').animate({
		scrollTop: parseInt($('#messages').prop('scrollHeight'))
	}, 500)


===========================================================

Section 18 - Wrapping Up:

	New Feature Ideas:
		Weather App:
			Allow user to use geolocation API to get weather for their location instead of tyoing in the address.

		Todo App:
			Allow users to upload images for individual todos.

		Chat App:
			Let users pick from list of active rooms or type in custom room name instead of typing the name.

	What to do next?:
		GraphQL
		React
		
		
===========================================================
===========================================================		