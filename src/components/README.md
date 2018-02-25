# Components

### ResourceProgressInfo

Higher order component used to display progress information - loading, error, object missing. If it passes these checks, then it renders wrapped component. It takes four components that represent the progress state.

```javascript
import { ResourceProgressInfo } from 'react-saga-rest';

import ResourceLoader from './ResourceLoader'
import ResourceError from './ResourceError'
import ResourceNotFound from './ResourceNotFound'

const UserList = (list) => (
  <div>
    {list.map(user => <div>{user.nameFull}</div>)}
  </div>
);

return ResourceProgressInfo(
  ResourceLoader,
  ResourceError,
  ResourceNotFound,
  UserList,
);
```
