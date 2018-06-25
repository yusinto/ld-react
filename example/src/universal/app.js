import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import {withFlagProvider} from 'ld-react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: 50px;
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

const NavItemStyles = styled.div`
  color: white;
  border-radius: 15px;
  background: #73AD21;
  width: 200px;
`;

const ProductsTitle = styled.div`
  opacity: ${props => props.showHideProductsNav ? 0.5 : 1}
`;

const ProductsNav = styled.div`
  display: ${props => props.showHideProductsNav ? 'block' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 50px
`;


class NavItem extends Component {
  render() {
    return this.props.target ? ReactDom.createPortal(
      <NavItemStyles>
        <ul>
          <li>Payments</li>
          <li>Billing</li>
          <li>Connect</li>
        </ul>
      </NavItemStyles>, this.props.target)
      : 'no target';
  }
}

class App extends Component {
  state = {showHideProductsNav: false};

  constructor(props) {
    super(props);
    this.productsNav = React.createRef();
  }

  onMouseEnter = () => {
    console.log('enter');
    this.setState({showHideProductsNav: true});
  };

  onMouseLeave = () => {
    console.log('leave');
    this.setState({showHideProductsNav: false});
  };

  render() {
    return (
      <div>
        <header>
          <nav>
            <GridContainer>
              <GridItem>
                <ProductsTitle onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
                               showHideProductsNav={this.state.showHideProductsNav}>
                  Products
                </ProductsTitle>
                <ProductsNav innerRef={this.productsNav} showHideProductsNav={this.state.showHideProductsNav}/>
                <div>Developers</div>
                <div>Company</div>
              </GridItem>
            </GridContainer>
            <NavItem target={this.productsNav.current}/>
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