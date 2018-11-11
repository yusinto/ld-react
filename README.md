# ld-react

[![npm version](https://img.shields.io/npm/v/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react) [![npm downloads](https://img.shields.io/npm/dm/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react) [![npm](https://img.shields.io/npm/dt/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react) [![npm](https://img.shields.io/npm/l/ld-react.svg?style=flat-square)](https://www.npmjs.com/package/ld-react)

> **The quickest and easiest way to integrate launch darkly with react** :tada:

Why this package?
* Easy and fast to use. Two steps to get feature flags into your react app.
* Uses hooks and context api under the hood. No redux required. 
* Supports subscription out of the box. You get live changes on the client as you toggle features.
* You automatically get camelCased keys as opposed to the default kebab-cased.
 
## Installation

yarn add ld-react@next

## Quickstart

1. Call `useLaunchDarkly` hook with your App:

    ```js
    import {useLaunchDarkly} from 'ld-react';

    const App = () =>
      <div>
        <Home />
     </div>;
    
    export default () => useLaunchDarkly(App, {clientSideId: 'your-client-side-id'});
    ```

2. `useFlags` in your component to get flags:

    ```js
    import {useFlags} from 'ld-react';

    const Home = () => {
       const {devTestFlag} = useFlags();
       return devTestFlag ? <div>Flag on</div> : <div>Flag off</div>;
    };
 
    export default Home;
    ```

That's it! 

## API
### useLaunchDarkly(Component, {clientSideId, user, options})
This is a custom hook which accepts a component and a config object with the above properties. 
`Component` and `clientSideId` are mandatory.

For example:

```javascript
import {useLaunchDarkly} from 'ld-react';

const App = () =>
  <div>
    <Home />
 </div>;

// GOTCHA: export a function because hooks can only be used inside function components
export default () => useLaunchDarkly(App, {clientSideId: 'your-client-side-id'});
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
useLaunchDarkly(Component, {
    clientSideId,
    options: {
      bootstrap: 'localStorage',
    },
});
```

### useFlags()
This is a custom hook which returns an object containing all your flags. Your flags will be available
as camelCased properties. For example:

```js
import {useFlags} from 'ld-react';

const Home = () => {
   const {devTestFlag} = useFlags();
   return devTestFlag ? <div>Flag on</div> : <div>Flag off</div>;
};

export default Home;
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
Check the [example](https://github.com/yusinto/ld-react/tree/master/examples/hooks) for a fully working spa with 
react and react-router. Remember to enter your own client side sdk in useLaunchDarkly hook 
and create a test flag called `dev-test-flag` before running the example!
