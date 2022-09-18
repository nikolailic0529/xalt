import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { space, width, typography, layout } from 'styled-system';

import { theme } from 'components';

const InnerLink = styled(Link)`
  ${layout};
  ${space};
  ${width};
  ${typography};

  display: inline-block;
  font-family: 'Roboto', sans-serif;
  transition: color 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
  @media (min-width: 769px) {
    font-size: 16px;
    line-height: 1.5;
  }

  ${(props) =>
    props.footerLink
      ? css`
          font-size: 12px;
          line-height: 16px;
          color: ${theme.colors.gray1000};
          text-transform: uppercase;
          opacity: 1;

          @media (max-width: 768px), (min-width: 769px) {
            font-size: 12px;
            line-height: 16px;
          }
        `
      : props.pinkLink &&
        css`
          color: ${theme.colors.darkPink};
        `};

  &:active,
  &:hover {
    ${(props) =>
      props.footerLink
        ? css`
            color: ${theme.colors.gray1000};
            opacity: 0.8;
          `
        : props.pinkLink &&
          css`
            color: ${theme.colors.darkPinkHover};
          `};
  }
`;

InnerLink.defaultProps = {
  m: 0,
};

export default InnerLink;
