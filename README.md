# Redux saga resources

[![CircleCI](https://circleci.com/gh/just-paja/react-saga-rest.svg?style=shield)](https://circleci.com/gh/just-paja/react-saga-rest)
[![Maintainability](https://api.codeclimate.com/v1/badges/fccfdf83eccc364a72b9/maintainability)](https://codeclimate.com/github/just-paja/react-saga-rest/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fccfdf83eccc364a72b9/test_coverage)](https://codeclimate.com/github/just-paja/react-saga-rest/test_coverage)

Collection of utility functions for [React](https://reactjs.org) [redux](https://redux.js.org), [redux-saga](https://github.com/redux-saga/redux-saga) and [reselect](https://github.com/reactjs/reselect) created to speed up development of React applications that follow the same pattern ofcommunicating with [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)ful API.

## How to use

See the documentation inside this repository.

* [Components](./src/components)
* [Constants](./src/CONSTANTS.md)
* [Mappers](./src/mappers.md)
* [Prop Types](./src/PROPTYPES.md)
* [Reducers](./src/reducers)
* [Sagas](./src/sagas)
* [Selectors](./src/selectors)


## Installation

```shell
npm install --save react-saga-rest
```

## Dependencies

It requires react, redux, redux-saga and reselect as peer dependency. This library should be able to take any version of the library since some stable API release.

## Contributing

Open an issue or send a pull request.

To build the package, run

```shell
npm run build
```
