import React from 'react';

import styled from 'styled-components';
import colors from 'lib/theme/colors';

const Button = styled.button`
  background-color: ${({ bg = colors.gray900 }) => bg};
  height: ${({ height }) => height}px;
  padding: 0px 2rem;
  border: ${({ borderThickness = 0 }) => borderThickness}px solid ${({ borderColor = 'transparent' }) => borderColor};
  border-radius: 10px;
  outline: 0;

  &:hover {
    cursor: pointer;
    background-color: ${({ bg = colors.gray900 }) => bg};
  }
`;

const mapSize = ({ size = 'regular' }) => {
  switch (size) {
    case 'regular': return 50;
    case 'big': return 90;
    default: return 50;
  }
};

export default (props) => {
  const {
    children, bg, borderThickness, borderColor, onClick,
  } = props;

  return (
    <Button
      height={mapSize(props)}
      bg={bg}
      borderThickness={borderThickness}
      borderColor={borderColor}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
