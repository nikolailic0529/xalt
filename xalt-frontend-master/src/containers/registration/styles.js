import React from 'react';
import {Input, Layout, Space} from 'antd';
import styled from 'styled-components';
import colors from 'lib/theme/colors';
import {Bordered} from 'components/shared/Form/styles/input';

const {Header, Footer} = Layout;

export const StyledInput = styled(Input)`
  ${Bordered}
`;

export const RowWrapper = styled.div`
  width: 100%;
`;

export const MainLayoutBox = styled(Layout)`
  background: #fff;
`;

export const PageHeader = styled(Header)`
  height: 20vh;
  background: #fff;
`;

export const PageFooter = styled(Footer)`
  height: 20vh;
  background: #fff;
`;
