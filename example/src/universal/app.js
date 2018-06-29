import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import {withFlagProvider} from 'ld-react';
import styled, {keyframes} from 'styled-components';

const gridRowHeight = 30;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: ${gridRowHeight}px;
`;

const arrowHeight = 5;
const ArrowUp = styled.div`
  margin-left: 40px;
  width: 0; 
  height: 0; 
  border-left: ${arrowHeight}px solid transparent;
  border-right: ${arrowHeight}px solid transparent;
  border-bottom: ${arrowHeight}px solid #73AD21;
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
    left: ${moveFrom}px;
  }
  
  to {
    left: ${moveTo}px;
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: perspective(200px) rotateX(-60deg);
    transform-origin: top center;
  }
  
  to {
    opacity: 1;
    transform: perspective(200px) rotateX(0deg);
    transform-origin: top center;
  }
`;

const FadeOut = keyframes`
  from {
    opacity: 1;
    transform: perspective(200px) rotateX(0deg);
    transform-origin: top right;
  }
  
  to {
    opacity: 0;
    transform: perspective(200px) rotateX(-60deg);
    transform-origin: top right;
    z-index: -1; // HACK: do this so hidden div does not block other elements on the page! We should have set display: none here, but its too hard
  }
`;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.2;
const MovingDiv = styled.div`
  position: absolute;
  top: ${gridRowHeight}px;
  left: ${props => props.moveFrom}px;
  width: ${({data}) => data ? data.width : 100}px;
  height: ${({data}) => data ? data.height : 100}px;
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
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (moveFrom === moveTo) return `${fadeInSeconds}s`; // fade in
    return `${moveSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;

const MovingDivContent = styled.div`
  background: #73AD21;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  & > ul {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const List = props => {
  const {data: {items}} = props;
  return (
    <ul style={{listStyleType: 'none', padding: '5px'}}>
      {items.map(i => <li>{i}</li>)}
    </ul>
  );
};

const MenuData = {
  products: {left: -10, width: 200, height: 200, items: ['Payments', 'Billing', 'Connect']},
  developers: {left: 90, width: 300, height: 400, items: ['Documentation', 'Api Reference']},
  company: {left: 190, width: 450, height: 200, items: ['About', 'Customers', 'Jobs']},
};

class App extends Component {
  state = {display: 'none', moveFrom: null, moveTo: null, fadeOut: false, category: ''};

  onMouseEnter = (category) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const moveTo = MenuData[category].left;

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
        category,
      };
    });
  };

  onMouseLeave = () => {
    this.setState((prevState) => ({fadeOut: true, moveFrom: prevState.moveTo, category: ''}));
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
                           fadeOut={this.state.fadeOut}
                           data={MenuData[this.state.category]}
                >
                  <ArrowUp/>
                  <MovingDivContent>
                    {
                      this.state.category && <List data={MenuData[this.state.category]}/>
                    }
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