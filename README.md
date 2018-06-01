# ld-react

[![npm version](https://img.shields.io/npm/v/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react) [![npm downloads](https://img.shields.io/npm/dm/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react) [![npm](https://img.shields.io/npm/dt/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react) [![npm](https://img.shields.io/npm/l/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react)

> **The quickest and easiest way to integrate launch darkly with react** :tada:

Why this package?
* Easy and fast to use. Two steps to get feature flags into your react app.
* Supports subscription out of the box. You get live changes on the client as you toggle features.
* You automatically get camelCased keys as opposed to the default kebab-cased.
* No need for redux! This package uses the new context api which is available from react ^16.3.0. 
 
## Installation

yarn add ld-react

## Quickstart

1. Wrap your root app `withFlagProvider`:

    ```js
    import {withFlagProvider} from 'ld-react';

    const App = () =>
      <div>
        <Home />
     </div>;
    
    export default withFlagProvider(App, {clientSideId: 'your-client-side-id'});
    ```

2. Wrap your component `withFlags` to get them via props:

    ```js
    import {withFlags} from 'ld-react';

    const Home = props => {
       // flags are available via props.flags
       return props.flags.devTestFlag ? <div>Flag on</div> : <div>Flag off</div>;
    };
 
    export default withFlags(Home);
    ```

That's it!

## API
### withFlagProvider(Component, {clientSideId, user, options})
This is a hoc which accepts a component and a config object with the above properties. 
`Component` and `clientSideId` are mandatory.

For example:

```javascript
import {withFlagProvider} from 'ld-react';

const App = () =>
  <div>
    <Home />
 </div>;

export default withFlagProvider(App, {clientSideId: 'your-client-side-id'});
```

The `user` property is optional. You can initialise the sdk with a custom user by specifying one. This must be an object containing
at least a "key" property. If you don't specify a user object, ld-react will create a default one that looks like this:

```javascript
const defaultUser = {
  key: uuid.v4(), // random guid
  ip: ip.address(),
  custom: {
    browser: userAgentParser.getResult().browser.name,
    device
  }
};
```

For more info on the user object, see [here](http://docs.launchdarkly.com/docs/js-sdk-reference#section-users).

The `options` property is optional. It can be used to pass in extra options such as [Bootstrapping](https://github.com/launchdarkly/js-client#bootstrapping).
For example:

```javascript
withFlagProvider(Component, {
    clientSideId,
    options: {
      bootstrap: 'localStorage',
    },
});
```

### withFlags(Component)
This is a hoc which passes all your flags to the specified component via props. Your flags will be available
as camelCased properties under `this.props.flags`. For example:

```js
import {withFlags} from 'ld-react';

class Home extends Component {
  render() {
    return (
      <div>
        {
          this.props.flags.devTestFlag ? // Look ma, feature flag!
            <div>Flag on</div>
            :
            <div>Flag off</div>
        }
      </div>
    );
  }
}

export default withFlags(Home);
```

### ldClient
Internally the ld-react initialises the ldclient-js sdk and stores a reference to the resultant ldClient object in memory. 
You can use this object to access the [official sdk methods](https://github.com/launchdarkly/js-client) directly. 
For example, you can do things like:

```js
import {ldClient} from 'ld-react';

class Home extends Component {
 
  // track goals
  onAddToCard = () => ldClient.track('add to cart'); 
 
  // change user context
  onLoginSuccessful = () => ldClient.identify({key: 'someUserId'});
  
  // ... other implementation
}
```

For more info on changing user context, see the [official documentation](http://docs.launchdarkly.com/docs/js-sdk-reference#section-changing-the-user-context).

## Example
Check the [example](https://github.com/yusinto/ld-react/tree/master/example) for a fully working spa with 
react and react-router. Remember to enter your client side sdk in the client [root app file](https://github.com/yusinto/ld-react/blob/master/example/src/universal/app.js) 
and create a test flag called `dev-test-flag` before running the example!
