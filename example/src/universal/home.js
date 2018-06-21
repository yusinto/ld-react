import React, {Component} from 'react';
import styled from 'styled-components';
import {withFlags} from 'ld-react';

const Title = styled.h1`
  color: red;
`;

const Row1 = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: papayawhip;
`;

class Home extends Component {
  state = {randomNumber: 0};

  onClickGenerateRandom = () => {
    const min = 1;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    this.setState({randomNumber});
  };

  render() {
    return (
      <Row1>This is the first row</Row1>
    );
  }
}

export default withFlags(Home);