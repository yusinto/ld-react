import React, {Component, Timeout} from 'react';
import withFlags from './withFlags';
// import {createResource} from 'simple-cache-provider';

// const resource = createResource(async ({flags, targetFlag}) => {
//   const value = flags[targetFlag];
//   if (value) {
//     return value;
//   }
//
//   await new Promise(resolve => {
//     setTimeout(() => resolve(flags[targetFlag]), 1500);
//   });
// }, ({targetFlag}) => targetFlag);
//
// const Placeholder = props => {
//   return (
//     <Timeout ms={50}>
//       {didTimeout => {
//         return didTimeout ? 'hello' : props.children;
//       }}
//     </Timeout>
//   );
// };

class Contact extends Component {
  state = {randomNumber: 0};

  onClickGenerateRandom = () => {
    const min = 1;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    this.setState({randomNumber});
  };

  render() {
    const {flags: {devTestFlag}} = this.props;
    // const devTestFlag = resource.read(this.props.suspenseCache, {flags, targetFlag: 'devTestFlag'});
    // let componentToRender = <div>Loading...</div>;
    // if (typeof devTestFlag !== 'undefined') {
    //   if (devTestFlag) {
    //     componentToRender =
    //
    //   } else {
    //     componentToRender =
    //
    //   }
    // }

    return (
      <div>
        <h1>This is the contact page</h1>
        <p>
          Check out my blog at <a href="http://reactjunkie.com" target="_blank"
                                  rel="noopener noreferrer">reactjunkie.com</a>
        </p>
        <Experiment flag="devTestFlag">
          <Variant value={true}>

          </Variant>
          <Variant value={false}>

          </Variant>
          <Loading>

          </Loading>
        </Experiment>
        {
          toggle(
            devTestFlag,
            <div>
              <p>
                SSE works! If you turn off your flag in launch darkly, your app will respond without a browser refresh.
                Try it!
              </p>
              <button onClick={this.onClickGenerateRandom}>Generate random number</button>
              <p>{this.state.randomNumber}</p>
            </div>,
            <div>
              The random number generator is turned off.
            </div>,
            <div>Loading...</div>
          )
        }
      </div>
    );
  }
}

const ContactWithFlags = withFlags(Contact);
export default ContactWithFlags;

// export default class ContactWrapper extends Component {
//   render() {
//     return (
//       <Placeholder>hello</Placeholder>
//     );
//   }
// }