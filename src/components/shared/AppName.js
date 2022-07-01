import React from 'react';
import styled from 'styled-components';

function AppName() {
  return <Title>MyWallet</Title>;
}

const Title = styled.h1`
  font-family: 'Saira Stencil One', cursive;
  color: #ffffff;
  font-size: 32px;
  line-height: 50px;
`;

export default AppName;
