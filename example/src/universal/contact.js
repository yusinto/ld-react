import React, {Component} from 'react';
import withFlags from './withFlags';

class Contact extends Component {
  state = {randomNumber: 0};

  onClickGenerateRandom = () => {
    const min = 1;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    this.setState({randomNumber});
  };

  render() {
    return (
      <div>
        <h1>This is the contact page</h1>
        <p>
          Check out my blog at <a href="http://reactjunkie.com" target="_blank"
                                  rel="noopener noreferrer">reactjunkie.com</a>
        </p>
        {
          // TODO: Fix! This fails if /contact is hit directly because ldclient is not ready yet.
          // Use a Timeout component to check if ldClient ready
          this.props.ldClient.variation('dev-test-flag', false) ?
            <div>
              <p>
                SSE works! If you turn off your flag in launch darkly, your app will respond without a browser refresh.
                Try it!
              </p>
              <button onClick={this.onClickGenerateRandom}>Generate random number</button>
              <p>{this.state.randomNumber}</p>
            </div>
            :
            <div>
              The random number generator is turned off.
            </div>
        }
      </div>
    );
  }
}

export default withFlags(Contact);