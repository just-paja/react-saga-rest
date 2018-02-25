# Redux saga resources

[![CircleCI](https://circleci.com/gh/just-paja/redux-saga-resources.svg?style=shield)](https://circleci.com/gh/just-paja/redux-saga-resources)
[![Maintainability](https://api.codeclimate.com/v1/badges/bd67aac0e16f66e5b30f/maintainability)](https://codeclimate.com/github/just-paja/redux-saga-resources/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bd67aac0e16f66e5b30f/test_coverage)](https://codeclimate.com/github/just-paja/redux-saga-resources/test_coverage)

Collection of utility functions for [React](https://reactjs.org) [redux](https://redux.js.org), [redux-saga](https://github.com/redux-saga/redux-saga) and [reselect](https://github.com/reactjs/reselect) created to speed up development of React applications that follow the same pattern ofcommunicating with [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)ful API.

## How to use

See the documentation inside this repository.

* [Constants](./src/CONSTANTS.md)
* [Reducers](./src/reducers)
* [Selectors](./src/selectors)
* [Sagas](./src/sagas)
* [Components](./src/components)
* [Prop Types](./src/PROPTYPES.md)


## Installation

```shell
npm install --save redux-saga-resources
```

## Dependencies

It requires react, redux, redux-saga and reselect as peer dependency. This library should be able to take any version of the library since some stable API release.

## Contributing

Open an issue or send a pull request.

To build the package, run

```shell
npm run build
```
