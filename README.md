# GFW Water [![Code Climate](https://codeclimate.com/github/wri/gfw-water/badges/gpa.svg)](https://codeclimate.com/github/wri/gfw-water)

### Getting Started
Before you can begin, make sure you have [node.js](https://nodejs.org/en/).

Install all the front end dependencies.

```shell
npm install
```

Then start the server and your ready to go.  The app will be served at [http://localhost:3000](http://localhost:3000). You can test the various pages at localhost:3000/index.html and localhost:3000/map.html.


```shell
npm start
```

### Scripts
There are several scripts configured in the package.json for different purposes.  The three main scripts are detailed below.  There are some extra ```postinstall```, ```optimize```, and ```babel``` scripts which are just helpers.

###### Developing
Will start up browser-sync and serve the app out of the build folder at [http://localhost:3000](http://localhost:3000).

```shell
npm start
```

###### Distribution
Will minify and bundle all the code and prepare a distribution ready package in a ```dist``` folder.

```shell
npm run dist
```

###### Tests
Runs Intern and eslint based on the rules defined in ```.eslintrc```.

```shell
npm test
```

### Contributing
Please branch off of the develop branch.  Do all of your development in a feature branch and once you are ready to merge to develop, commit your branch and submit a pull request.

Also, please make sure your contributions pass tests before submitting a pull request.  Tests include unit tests and linter.  We are using Intern and Chai for tests and the eslint cli to lint all javascript.  Run your test with the following:
```shell
npm test
```

### Deployment
The master branch should always be stable and contain release code. Before submitting a pull request from develop to master, make sure the develop branch has been thoroughly tested and passes ```npm test```.  If it is a valid release candidate, please run the following commands to update the version and tag a release, and then submit a pull request to master.  If ```npm test``` fails it will not be accepted.

```shell
npm version {major|minor|patch}
git push origin develop
git push origin --tags
```

Run the ```npm version``` command with major, minor, or patch depending on how you want to increment the version number. Version number is in major.minor.patch (0.0.1), following [semver](http://semver.org/).  Use ```npm version patch --no-git-tag-version``` if you need to increment the version number but are not ready to tag it as a release version. This will increment the version number but won't auto commit or auto generate a tag.
