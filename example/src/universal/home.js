import React, {Component} from 'react';
import {withFlags} from 'ld-react';

class Home extends Component {
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
        <div>
          To run this example:
          <ul>
            <li>In app.js, set clientSideId to your own Client-side ID. You can find this in the dashboard underAccount settings / Projects.</li>
            <li>Create a flag called 'dev-test-flag' in your project and turn it on and off.</li>
          </ul>
        </div>
        {
          this.props.flags.devTestFlag ?
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
              The random number generator is turned off. Go to your launch darkly dashboard to turn it on.
            </div>
        }
      </div>
    );
  }
}

export default withFlags(Home);