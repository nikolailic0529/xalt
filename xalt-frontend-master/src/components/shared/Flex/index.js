import React from 'react';
import styled from 'styled-components';
import {
  space,
  width,
  color,
  flexbox,
  layout,
  border,
  position,
} from 'styled-system';

const Flex = styled.div`
  ${flexbox};
  ${space};
  ${width};
  ${color};
  ${layout};
  ${border};
  ${position};

  display: flex;
`;

export default ({ children, ...rest }) => <Flex {...rest}>{children}</Flex>;
