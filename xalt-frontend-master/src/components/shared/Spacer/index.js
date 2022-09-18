import React from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

const StyledSpace = styled(Space)`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'auto')};
`;

export default ({
  fullWidth, fullHeight, direction, children, size,
}) => (
  <StyledSpace
    direction={direction}
    fullWidth={fullWidth}
    fullHeight={fullHeight}
    size={size}
  >
    {children}
  </StyledSpace>
);
