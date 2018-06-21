import React from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import {withFlagProvider} from 'ld-react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 50px 50px 50px;
`;

const App = () =>
  <Container>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/home">
        <Redirect to="/"/>
      </Route>
      <Route path="/contact" component={Contact}/>
    </Switch>
  </Container>;

// Set clientSideId to your own Client-side ID. You can find this in
// the dashboard under Account settings / Projects
export default withFlagProvider(App, {clientSideId: '57df4354dd79c70721bcb507'});