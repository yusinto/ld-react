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

const ArrowUp = styled.div`
  margin-left: 40px;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #73AD21;
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

const GridItem = styled.div`
  background: #6772e5;
  grid-column: 3 / span 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  position: relative;
`;
const MenuTitle = styled.div`
  &:hover {
    opacity: 0.5;
  }
  flex-grow: 1;
  text-align: center;
`;

const Move = (moveFrom, moveTo) => keyframes`
  from {
    opacity: ${moveFrom === moveTo ? 0 : 1}; // only fade in on cold start
    left: ${moveFrom};
  }
  
  to {
    opacity: 1;
    left: ${moveTo};
  }
`;

const MovingDiv = styled.div`
  position: absolute;
  top: 30px;
  left: -10px;
  width: 100px;
  height: 100px;
  display: ${props => props.display};
  animation: 
    ${({display, moveFrom, moveTo}) => display === 'none' ? '' : Move(moveFrom, moveTo)}
    ${({moveFrom, moveTo}) => moveFrom === moveTo ? '0.6s' : '0.3s'} // on cold start, fade in slower 
    forwards ease;
`;

const MovingDivContent = styled.div`
  background: #73AD21;
  border-radius: 5px;
  width: 100%;
`;

const getX = {products: '-10px', developers: '90px', company: '190px'};

class App extends Component {
  state = {display: 'none', moveFrom: null, moveTo: null};

  onMouseEnter = (category) => {
    this.setState((prevState) => {
      const display = 'block';
      const moveTo = getX[category];

      // on cold start, pop up right from the current item
      // on warm start, start animation from the previous item
      const moveFrom = prevState.moveTo ? prevState.moveTo : moveTo;

      return {
        display,
        moveFrom,
        moveTo,
      };
    });
  };

  onMouseLeave = () => {
    this.setState({display: 'none', moveFrom: null, moveTo: null});
  };

  render() {
    return (
      <div>
        <header>
          <nav>
            <GridContainer>
              <GridItem onMouseLeave={this.onMouseLeave}>
                <MenuTitle onMouseEnter={() => this.onMouseEnter('products')}>Products</MenuTitle>
                <MenuTitle onMouseEnter={() => this.onMouseEnter('developers')}>Developers</MenuTitle>
                <MenuTitle onMouseEnter={() => this.onMouseEnter('company')}>Company</MenuTitle>
                <MovingDiv display={this.state.display} moveFrom={this.state.moveFrom} moveTo={this.state.moveTo}>
                  <ArrowUp/>
                  <MovingDivContent>
                    <div>item 1</div>
                    <div>item 2</div>
                    <div>item 3</div>
                  </MovingDivContent>
                </MovingDiv>
              </GridItem>
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