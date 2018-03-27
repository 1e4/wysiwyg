# ItsaWYSIWYG

A very tiny, highly configurable javascript WYSIWYG editor with zero dependencies.

## Getting Started

All you need to get started is to instantiate the WYSIWYG, it takes 1 parameter which is the class name of the 
editable content area.

JS

```javascript
new Wysiwyg('editable');
```

HTML

_Note that within the `div.editable` there is another div, this child div must wrap all content, this is to be 
changed by `1.0.0`_

```html
<div class="editable">
    <div>This is just some simple text</div>
</div>
```


### Prerequisites

If you would like to build form source then the following prerequisites are required

```
NPM
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
$ npm install itsawysiwyg
```

Or optionally if you use Yarn

```
$ yarn add itsawysiwyg
```

To serve the demo application run 

```
$ npm run hot
```

This uses webpacks builtin web server, head over to the URL it lists, by default it is `http://localhost:8080`

## Running the tests

There are no tests sorry :(

## Built With

* [Font Awesome](https://fontawesome.com/) - They provide the optional icons for the toolbar
* [Javascript](http://es6-features.org) - Javascript ES6, every feature by default is completely native to the 
browser, there are no 3rd party Javascript libraries included
* [SCSS](https://sass-lang.com/) - We use SCSS for the demo application

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/1e4/wysiwyg/tags). 

## Authors

* **Ian Milliken** - *Initial work* - [Twitter](https://twitter.com/1e4_)

See also the list of [contributors](https://github.com/1e4/wysiwyg/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details