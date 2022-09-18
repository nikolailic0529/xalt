import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: ${({ width }) => width};
  min-width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0;
  border-radius: 50%;
`;

const assetsIcons = ['logo', 'empty-user-profile'];

export default ({ src, width = '40px', height = '40px' }) => (
  <Img
    width={width}
    height={height}
    src={
      assetsIcons.find((item) => item === src) ? `assets/icons/${src}.svg` : src
    }
  />
);
