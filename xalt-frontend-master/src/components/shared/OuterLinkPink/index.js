import styled from 'styled-components';
import { theme } from 'components';

const OuterLinkPink = styled.a`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  transition: color 0.2s ease-in-out 0s;
  color: ${theme.colors.darkPink};

  &:active,
  &:hover {
    color: ${theme.colors.darkPinkHover};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
  @media (min-width: 769px) {
    font-size: 16px;
    line-height: 1.5;
  }
`;

export default OuterLinkPink;
