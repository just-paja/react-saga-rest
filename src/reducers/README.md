# Reducers

This is a quick reference for reducer methods. Please also see [constants](../CONSTANTS.md) for default reducer state.

## combine(defaultState, reducers)

Returns reducer collection that responds to actions specified by object. It is used to avoid writing unnecessary switch statements.

This example will respond to USERS_SET, USERS_FETCH_START, USERS_CLEAR.

```javascript
import { combine } from 'react-saga-rest';
const USERS_CLEAR = 'USERS_CLEAR';
const USERS_FETCH_START = 'USERS_FETCH_START';
const USERS_SET = 'USERS_SET';
const initialState = {
  users: [],
  loading: false,
};
const reducer = combine(initialState, {
  [USERS_SET]: (state, action) => ({
    users: action.users,
    loading: false,
  }),
  [USERS_FETCH_START]: state => ({ loading: true }),
  [USERS_CLEAR]: state => ({ ...initialState }),
});
```

## fetchError

Dummy reducer method that is used as a handler of fetch saga error responses.

```javascript
import { combine, fetchError } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USERS_FETCH_FAIL]: fetchError,
});

// Example run

reducer(undefined, {
  type: USERS_FETCH_FAIL,
  missing: true,
  valid: true,
  error: new Error(),
});

// The result

{
  failed: true,
  loading: false,
  missing: true,
  valid: false,
  error: new Error(),
};
```

## fetchStart

Dummy reducer method that is used as a handler of fetch start action.

```javascript
import { combine, fetchStart } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USERS_FETCH_START]: fetchStart,
})

// Example run

reducer(undefined, { type: USERS_FETCH_START });

// The result

{
  failed: false,
  loading: true,
  missing: false,
};
```

## fetchSuccess

Dummy reducer method that is used as a handler of fetch saga success responses.

```javascript
import { combine, fetchSuccess } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USERS_FETCH_SUCCESS]: fetchSuccess,
});

// Example run

reducer(undefined, {
  type: USERS_FETCH_SUCCESS,
  data: [
    { name: 'Robert Horse' },
    { name: 'Hobert Norse' },
  ]
});

// The result

{
  failed: false,
  loading: false,
  missing: false,
  valid: true,
  data: [
    { name: 'Robert Horse' },
    { name: 'Hobert Norse' },
  ],
};
```

## invalidate

Dummy reducer method that is used to invalidate the reducer state.

```javascript
import { combine, invalidate } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USERS_INVALIDATE]: invalidate,
});

// Example run

reducer(undefined, { type: USERS_INVALIDATE });

// The result

{
  loading: false,
  valid: false,
}
```

## invalidateOnCollectionChange(identAttr, actionIdentAttr = null)

Smart reducer method that is used to invalidate the reducer state and reset page on the same time when a parent resource ID changes and the collection state is no longer valid. For example, when you are displaying list of users group on user detail page and display another user.

```javascript
import { combine, invalidateOnCollectionChange } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USER_CHANGE]: invalidateOnCollectionChange('userId'),
});
// Example run

reducer({ userId: 939 }, { type: USER_CHANGE, userId: 10 });

// The result

{
  userId: 10,
  page: 0,
  valid: false,
}
```

## invalidateOnResourceChange(identAttr, actionIdentAttr = null)

Smart reducer method that is used to invalidate the reducer state when a parent resource ID changes and the resource state is no longer valid. For example, when you are displaying user detail page and user ID gets changed.

```javascript
import { combine, invalidateOnResourceChange } from 'react-saga-rest';
const reducer =  combine(initialState, {
  [USER_CHANGE]: invalidateOnResourceChange('userId'),
});

// Example run

reducer({ userId: 939 }, { type: USER_CHANGE, userId: 10 });

// The result

{
  userId: 10,
  valid: false,
}

```

## pageReset

Dummy reducer method used to reset its page to zero.

```javascript
import { combine, pageReset } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USER_PAGE_RESET]: pageReset,
});

// Example run

reducer({ page: 1000 }, { type: USER_PAGE_RESET });

// The result

{
  page: 0,
  valid: false,
}

```

## pageSet

Dummy reducer method used to change its page.

```javascript
import { combine, pageSet } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USER_PAGE_CHANGE]: pageSet,
});

// Example run

reducer({ page: 1000 }, { type: USER_PAGE_CHANGE, page: 20 });

// The result

{
  page: 20,
  valid: false,
}
```

## toggle(property)

Dummy reducer method used to toggle one property value on and off.

```javascript
import { combine, toggle } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USER_TOGGLE_DELETE_MODAL]: toggle('showDeleteModal'),
});

// Example run

reducer({ showDeleteModal: true }, { type: USER_TOGGLE_DELETE_MODAL });

// The result

{
  showDeleteModal: false,
}
```

## turnOff(property)

Dummy reducer method used to turn off one property.

```javascript
import { combine, turnOff } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USER_HIDE_DELETE_MODAL]: turnOff('showDeleteModal'),
});

// Example run

reducer({ showDeleteModal: true }, { type: USER_HIDE_DELETE_MODAL });

// The result

{
  showDeleteModal: false,
}
```

## turnOn(property)

Dummy reducer method used to turn on one property.

```javascript
import { combine, turnOn } from 'react-saga-rest';
const reducer = combine(initialState, {
  [USER_SHOW_DELETE_MODAL]: turnOn('showDeleteModal'),
});

// Example run

reducer({ showDeleteModal: false }, { type: USER_SHOW_DELETE_MODAL });

// The result

{
  showDeleteModal: trues,
}
```
