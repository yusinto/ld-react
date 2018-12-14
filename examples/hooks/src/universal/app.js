import React from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import {useLaunchDarkly} from 'ld-react';
import {createGlobalStyle} from 'styled-components';
import Home from './home';
import Contact from './contact';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Courier;
  }
  
  body {
    background: #E8F3ED;
  }
  
  h1 {
    color: #578CB9;
  }
`;

const App = () => (
  <div>
    <GlobalStyle/>
    <main>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home">
          <Redirect to="/"/>
        </Route>
        <Route path="/contact" component={Contact}/>
      </Switch>
    </main>
  </div>
);

export default () => useLaunchDarkly(App, {clientSideId: '59b2b2596d1a250b1c78baa4'});
