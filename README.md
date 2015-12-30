# GFW Water [![Code Climate](https://codeclimate.com/github/wri/gfw-water/badges/gpa.svg)](https://codeclimate.com/github/wri/gfw-water)

### Getting Started
Before you can begin, make sure you have [node.js](https://nodejs.org/en/).

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
Please branch off of the develop branch.  Do all of your development in a feature branch and once you are ready to merge to develop, commit your branch and submit a pull request.

If your pushing to develop branch but it is not ready for deployment, you can skip the ```npm version``` command (See [Releasing](#Releasing)) or you can run ```npm version patch --no-git-tag-version``` to not generate a tag but increment the version, either way, tags should be for release versions only whereas staging versions may need the version incremented for cache busting purposes (the package.json version number is used in the CI process).

Also, please make sure your contributions pass tests before committing.  Tests include unit tests and eslint.  We are using Intern and Chai for tests and the eslint cli to lint all javascript.  Run your test with the following:
```
npm test
```

### <a name='Releasing'></a>Releasing
The master branch should always be stable and contain release code. Make sure the develop branch has been thoroughly tested and is considered stable before submitting a pull request to master.  Also, once the code is stable and ready to merge, before you submit a pull request to master, please run the following commands from terminal in the develop branch.

```shell
npm version {major|minor|patch}
git push origin develop
git push origin --tags
```

Run the ```npm version``` command with major, minor, or patch depending on how you want to increment the version number. Version number is in major.minor.patch (0.0.1), following [semver](http://semver.org/).
