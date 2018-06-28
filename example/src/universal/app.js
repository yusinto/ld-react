import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import {withFlagProvider} from 'ld-react';
import styled, {keyframes} from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: 30px;
`;

const ArrowUp = styled.div`
  margin-left: 40px;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #73AD21;
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
    left: ${moveFrom};
  }
  
  to {
    left: ${moveTo};
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: perspective(50em) rotateX(-70deg);
    transform-origin: top center;
  }
  
  to {
    opacity: 1;
    transform: perspective(50em) rotateX(0deg);
    transform-origin: top center;
  }
`;

const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
    z-index: -1; // HACK: do this so hidden div does not block other elements on the page! We should have set display: none here, but its too hard
  }
`;

const MovingDiv = styled.div`
  position: absolute;
  top: 30px;
  left: ${props => props.moveFrom};
  width: 100px;
  height: 100px;
  display: ${props => props.display};
  animation: ${({fadeOut, display, moveFrom, moveTo}) => {
  if (fadeOut) return FadeOut;
  if (display === 'block') {
    if (moveFrom === moveTo) return FadeIn;
    return Move(moveFrom, moveTo);
  }
  return ''; // display: none; don't animate
}}
  
  // fade out and in slower than moving sideways
  ${({fadeOut, display, moveFrom, moveTo}) => {
  if (fadeOut) return '0.7s';
  if (display === 'block') {
    if (moveFrom === moveTo) return '0.25s'; // fade in
    return '0.2s'; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;

const MovingDivContent = styled.div`
  background: #73AD21;
  border-radius: 5px;
  width: 100%;
`;

const getX = {products: '-10px', developers: '90px', company: '190px'};

class App extends Component {
  state = {display: 'none', moveFrom: null, moveTo: null, fadeOut: false};

  onMouseEnter = (category) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const moveTo = getX[category];

      let moveFrom;
      if (prevState.fadeOut || !prevState.moveTo) {
        // on cold start, pop up right from the current item
        moveFrom = moveTo;
      } else {
        // on warm start, start animation from the previous item
        moveFrom = prevState.moveTo;
      }

      return {
        fadeOut,
        display,
        moveFrom,
        moveTo,
      };
    });
  };

  onMouseLeave = () => {
    this.setState((prevState) => ({fadeOut: true, moveFrom: prevState.moveTo}));
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
                <MovingDiv display={this.state.display}
                           moveFrom={this.state.moveFrom}
                           moveTo={this.state.moveTo}
                           fadeOut={this.state.fadeOut}>
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