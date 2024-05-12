# Forkify Web Application 2024

## About the Project
The project is based on the API from Forkify V2. The Forkify website shows all the recipes from the API and allows adding new recipe data. It also includes local storage in the JavaScript code. There are buttons for increasing or decreasing servings, along with a bookmark feature as well.

## Getting Started

First download all available resources of this my repositories.
Save in your personal laptop or computer.


### Requirement Tech Stack

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [SCSS](https://sass-lang.com/)
- [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [Webpack](https://webpack.js.org/)
- [NPM](https://www.npmjs.com/)

### Perquisite
- [NPM Parcel](https://www.npmjs.com/package/parcel)
```sh
npm i parcel
```

- [NPM CORE JS](https://www.npmjs.com/package/core-js)

```
import 'core-js/stable'; //polyfilling all code support old version in js
```

- [NPM Fraction](https://www.npmjs.com/package/regenerator-runtime)

```sh
npm i fractional
```

- [NPM Regenerator Runtime](https://www.npmjs.com/package/regenerator-runtime)

```
import 'regenerator-runtime/runtime'; //polyfilling all async await for es6 for support modern new promises ajax
```


### How to Install

1. Get a free API Key at [Forkify API_KEY](https://forkify-api.herokuapp.com/v2)
2. Clone the repo
```sh
git clone https://github.com/itechpaulj/forkify-app.git
```
3. Install NPM packages
```sh
npm install
```
4. Enter your API in `config.js`
```JS
const KEY = ${YOUR KEY}
```