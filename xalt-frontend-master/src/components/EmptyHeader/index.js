import React from 'react';
import Logo from 'components/shared/Logo';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background-color: #fff;
`;

export default () => (
  <StyledHeader>
    <Logo />
  </StyledHeader>
);
