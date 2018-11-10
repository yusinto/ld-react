import React, {useState} from 'react';
import {useFlags} from 'ld-react';

export default function Home() {
  const [randomNumber, setRandomNumber] = useState(0);
  const {devTestFlag} = useFlags();

  const onClickGenerateRandom = () => {
    const min = 1;
    const max = 100;
    const newNumber = Math.floor(Math.random() * (max - min)) + min;
    setRandomNumber(newNumber);
  };

  return (
    <div>
      <h1>Welcome to ld-react example</h1>
      <div>
        To run this example:
        <ul>
          <li>
            In app.js, set clientSideId to your own Client-side ID. You can find this in the dashboard underAccount
            settings / Projects.
          </li>
          <li>Create a flag called dev-test-flag in your project and turn it on and off.</li>
        </ul>
      </div>
      {
        devTestFlag ?
          <div>
            <p>
              SSE works! If you turn off your flag in launch darkly, your app will respond without a browser refresh.
              Try it!
            </p>
            <button type="button" onClick={onClickGenerateRandom}>Generate random number</button>
            <p>{randomNumber}</p>
          </div>
          :
          <div>
            The random number generator is turned off. Go to your launch darkly dashboard to turn it on.
          </div>
      }
    </div>
  );
}