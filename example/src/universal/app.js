import React from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import {withFlagProvider} from 'ld-react';

const App = () =>
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
  </div>;

// Set clientSideId to your own Client-side ID. You can find this in
// the dashboard under Account settings / Projects
export default withFlagProvider(App, {clientSideId: '57df4354dd79c70721bcb507'});