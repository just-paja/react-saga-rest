# Constants

To get constants, use one of these.

```javascript
import { defaultResourceState } from 'redux-saga-resources';
```

```javascript
import * as constants from 'redux-saga-resources/constants';
```

## Reducer constants

### defaultResourceState

Should be used as a default resource reducer state. It can be easily extended when you want your reducer to do more.

```javascript
import { defaultResourceState, combine } from 'redux-saga-resources';
```

```javascript
const reducer = combine(defaultResourceState, reducers);
```

or to extend the default state

```javascript
const initialState = {
  ...defaultResourceState,
  size: 5,
};

const reducer = combine(initialState, reducers);
```

### defaultCollectionState

Should be used as a default collection reducer state. It can be easily extended when you want your reducer to do more.

```javascript
import { defaultCollectionState, combine } from 'redux-saga-resources';
```

```javascript
const reducer = combine(defaultCollectionState, reducers);
```

or to extend the default state

```javascript
const initialState = {
  ...defaultCollectionState,
  size: 5,
};
```

## Actions constants

### ACTION_FAIL

Name for fail action used in fetch sagas

### ACTION_START

Name for start action used in fetch sagas

### ACTION_SUCCESS

Name for success action used in fetch sagas.

## Flags

### FLAG_FAILED

Name of the failed flag. Describes a failed request. Used in actions, progress and reducers.

### FLAG_LOADING

Name of the loading flag. Describes a pending request. Used in actions, progress and reducers.

### FLAG_MISSING

Name of the missing flag. Describes a 404 response. Used in actions, progress and reducers.

### FLAG_REQUIRED

Name of the required flag. Describes resource that should be (re)requested. Used in progress.

### FLAG_VALID

Name of the valid flag. Describes resource that is invalid. Used in actions, progress and reducers.


## State constants

### STATE_DATA

Name of the data key. Contains reducer data.

### STATE_ERROR

Name of the error key. Contains reducer error. Used in actions, progress selector and reducers.

### STATE_ERROR_LIST

Name of the error list key. Contains combined list of progress. Used in progress selector.

### STATE_PAGE

Name of the page key. Contains page number. Used in reducer and selectors.

### STATE_SIZE

Name of the page size key. Contains page size. Used in reducer and selectors.

### STATE_TOTAL

Name of the total key. Contains number of total items in the database when paging. Used in reducer and selectors.
