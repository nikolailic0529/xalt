import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  align-self: ${({ alignSelf }) => alignSelf};
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0;
`;

export default ({ src, maxWidth ,width = '100%', height = 'auto', alignSelf }) => (
  <Img width={width} maxWidth={maxWidth} alignSelf={alignSelf} height={height} src={`assets/images/${src}`} />
);
