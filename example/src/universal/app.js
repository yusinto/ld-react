import React from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import useLaunchDarkly from './useLaunchDarkly';

const App = () => (
  <div>
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
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

export default () => useLaunchDarkly(App, {clientSideId: '59b2b2596d1a250b1c78baa3'});
