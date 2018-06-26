import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import {withFlagProvider} from 'ld-react';
import styled, {keyframes} from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: 30px 50px;
`;

const GridItem = styled.div`
  background: #6772e5;
  grid-column: 3 / span 3
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  position: relative;
`;

const ArrowUp = styled.div`
  margin-left: 40px;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #73AD21;
`;

const MenuTitle = styled.div`
  &:hover {
    opacity: 0.5;
  }
  flex-grow: 1;
  text-align: center;
`;

const MoveItemDevelopers = keyframes`
  from {
    left: 180px;
  }
  
  to {
    left: 280px; 
  }
`;

const MoveItemCompany = keyframes`
  from {
    left: 280px;
  }
  
  to {
    left: 380px; 
  }
`;

const GridItem2 = styled.div`
  // background: #73AD21;
  grid-column: 1 / span 6
  grid-row: 2 / span 1
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  position: relative;
  align-self: start;
`;

const ShowItem = keyframes`
  from {
    opacity: 0;
    transform: skew(-15deg);
  }
  
  to {
    opacity: 1;
  }
`;

const HideItem = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;

const ProductItem = styled.div`
  background: #73AD21;
  position: absolute;
  top: 0;
  left: 180px;
  width: 250px;
  height: 350px;
  opacity: 1;
  border-radius: 5px;
  animation-duration: ${props => {
  if (props.animation === 'move') return '0.4s';
  if (props.animation === 'show') return '0.6s';
  return '0.8s';
}
  };
  animation-name: ${({animation, category}) => {
  if (animation === 'move') {
    if (category === 'products') return ShowItem;
    if (category === 'developers') return MoveItemDevelopers;
    if (category === 'company') return MoveItemCompany;
  }

  if (animation === '') {
    return '';
  }

  return animation === 'show' ? ShowItem : HideItem;
}};
  animation-fill-mode: forwards;
`;

const Item = styled.div`
  background: ${props => {
  switch(props.parent) {
    case 'developers':
      return 'red';
    case 'company':
      return 'blue';
    default:
      return '#73AD21';
  }
}};
  position: absolute;
  top: 0;
  left: ${props => {
    switch(props.parent) {
      case 'developers':
        return '280px';
      case 'company':
        return '380px';
      default:
        return '180px';
    }
}};
  width: 250px;
  height: 350px;
  opacity: 1;
  border-radius: 5px;
  opacity: 0;
  animation-duration: 0.8s;
  animation-name: ${props => {
    
}}
`;

class App extends Component {
  state = {animation: ''};

  onMouseEnter = () => {
    this.setState((prevState) => {
      if (!prevState.animation || prevState.animation === 'hide') { // initial state
        return {animation: 'show'};
      }
    });
  };

  onMouseLeave = () => {
    this.setState({animation: 'hide'});
  };

  onMouseEnterTitle = (category) => {
    console.log('enterTitle');
    // this.setState({animation: 'move', category});
  };

  onMouseLeaveTitle = () => {
    console.log('leaveTitle');
    // this.setState({animation: 'hide'});
  };

  render() {
    return (
      <div>
        <header>
          <nav>
            <GridContainer>
              <GridItem onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <MenuTitle onMouseEnter={() => this.onMouseEnterTitle('products')}
                           onMouseLeave={this.onMouseLeaveTitle}>
                  Products
                </MenuTitle>
                <MenuTitle onMouseEnter={() => this.onMouseEnterTitle('developers')}
                           onMouseLeave={this.onMouseLeaveTitle}>Developers</MenuTitle>
                <MenuTitle onMouseEnter={() => this.onMouseEnterTitle('company')} onMouseLeave={this.onMouseLeaveTitle}>Company</MenuTitle>
              </GridItem>
              <GridItem2>
                <Item parent="products">
                  <div>Payments</div>
                  <div>Billing</div>
                  <div>Connect</div>
                </Item>
                <Item parent="developers">
                  <div>Documentation</div>
                  <div>Api</div>
                </Item>
                <Item parent="company">
                  <div>About us</div>
                  <div>Customers</div>
                  <div>Jobs</div>
                </Item>
              </GridItem2>
            </GridContainer>
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
  }
}


// Set clientSideId to your own Client-side ID. You can find this in
// the dashboard under Account settings / Projects
export default withFlagProvider(App, {clientSideId: '57df4354dd79c70721bcb507'});