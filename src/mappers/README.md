# Components

### ContainerProgress

Renders [ContainerProgress](../components) component capable of displaying loading progress of a scene.

```javascript
import { mapContainerProgress } from 'react-saga-rest';

import LoaderComponent from './LoaderComponent'
import ErrorComponent from './ErrorComponent'
import NotFoundComponent from './NotFoundComponent'

const UserList = (list) => (
  <div>
    {list.map(user => <div>{user.nameFull}</div>)}
  </div>
);

return mapContainerProgress(UserList, {
  LoaderComponent,
  ErrorComponent,
  NotFoundComponent,
  onResourceChange: () => ({
    type: 'RESOURCE_REQUIRED',
  }),
  onExit: () => ({
    type: 'RESOURCE_DROPPED',
  }),
  progressSelector: state => state.item.progress,
});
```

### SceneProgress

Renders [SceneProgress](../components) component capable of displaying loading progress of a scene. It is assumed that a scene is rendered using React Router, so it expects to receive history and location props from outside.

```javascript
import { mapSceneProgress } from 'react-saga-rest';

import LoaderComponent from './LoaderComponent'
import ErrorComponent from './ErrorComponent'
import NotFoundComponent from './NotFoundComponent'

const UserList = (list) => (
  <div>
    {list.map(user => <div>{user.nameFull}</div>)}
  </div>
);

return mapSceneProgress(UserList, {
  LoaderComponent,
  ErrorComponent,
  NotFoundComponent,
  onResourceChange: () => ({
    type: 'RESOURCE_REQUIRED',
  }),
  onExit: () => ({
    type: 'RESOURCE_DROPPED',
  }),
  progressSelector: state => state.item.progress,
});
```
