# is-dom-document [![NPM Version][npm-image]][npm-url] ![File Size][filesize-image] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Monitor][greenkeeper-image]][greenkeeper-url]

> Determine if an object is a [`Document`](https://mdn.io/Document) (from any `Realm`).


## Installation

[Node.js](http://nodejs.org) `>= 10` is required. To install, type this at the command line:
```shell
npm install is-dom-document
```


## Importing

ES Module:
```js
import isDOMDocument from 'is-dom-document';
```

CommonJS Module:
```js
const isDOMDocument = require('is-dom-document');
```


## Usage

```js
isDOMDocument(window.document); //-> true
isDOMDocument({}); //-> false
````


[npm-image]: https://img.shields.io/npm/v/is-dom-document.svg
[npm-url]: https://npmjs.com/package/is-dom-document
[filesize-image]: https://img.shields.io/badge/size-400B%20gzipped-blue.svg
[travis-image]: https://img.shields.io/travis/stevenvachon/is-dom-document.svg
[travis-url]: https://travis-ci.org/stevenvachon/is-dom-document
[coveralls-image]: https://img.shields.io/coveralls/stevenvachon/is-dom-document.svg
[coveralls-url]: https://coveralls.io/github/stevenvachon/is-dom-document
[greenkeeper-image]: https://badges.greenkeeper.io/stevenvachon/is-dom-document.svg
[greenkeeper-url]: https://greenkeeper.io/
