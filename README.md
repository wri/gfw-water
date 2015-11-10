# GFW Water [![Code Climate](https://codeclimate.com/github/wri/gfw-water/badges/gpa.svg)](https://codeclimate.com/github/wri/gfw-water)

### Getting Started
Before you can begin, make sure you have [node.js](https://nodejs.org/en/) and [gulp](http://gulpjs.com/) installed.

Install all the front end dependencies.

```
npm install
```

Then start the server and your ready to go.  The app will be served at [http://localhost:3000](http://localhost:3000). You can test the various pages at localhost:3000/index.html and localhost:3000/map.html.


```
npm start
```

### Scripts
There are several scripts configured in the package.json for different purposes.  The three main scripts are detailed below.  There are some extra ```postinstall```, ```optimize```, and ```babel``` scripts which are just helpers.

###### Developing
Will start up browser-sync and serve the app out of the build folder at [http://localhost:3000](http://localhost:3000).

```
npm start
```

###### Distribution
Will minify and bundle all the code and prepare a distribution ready package in a ```dist``` folder.

```
npm dist
```

###### Tests
Runs Intern and eslint based on the rules defined in ```.eslintrc```.

```
npm test
```

### Contributing

Please make sure your contributions pass tests before committing.  Tests include unit tests and eslint.  We are using Intern and Chai for tests and the eslint cli to lint all javascript.  To run the tests, just run the following.
```
npm test
```
