import React from 'react';
import {FlagConsumer} from './ldContext';
// import {SimpleCache} from 'simple-cache-provider';

// const withFlags = (Component) => props =>
//   <SimpleCache.Consumer>
//     {
//       cache =>
//         <FlagConsumer>
//           {
//             flags => <Component suspenseCache={cache} flags={flags} {...props}/>
//           }
//         </FlagConsumer>
//     }
//   </SimpleCache.Consumer>;

const withFlags = (Component) => props =>
  <FlagConsumer>
    {
      flags => <Component flags={flags} {...props}/>
    }
  </FlagConsumer>;

export default withFlags;