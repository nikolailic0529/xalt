import styled, { css } from 'styled-components';
import { maxWidth, space, size } from 'styled-system';

import { theme } from 'components';

const Heading = styled.h3`
  ${maxWidth};
  ${space};
  ${size};

  ${({ center, normal }) => css`
    width: 100%;
    line-height: 1.44;
    font-weight: ${normal ? theme.fontWeights.normal : theme.fontWeights.bold};
    color: ${theme.colors.gray1000};
    text-align: ${center ? 'center' : 'left'};
    font-family: 'Roboto', sans-serif;

    @media (max-width: 768px) {
      ${(props) =>
        props.fieldTitle
          ? css`
              font-size: 16px;
              line-height: 1.5;
            `
          : css`
              font-size: 18px;
            `};
    }
    @media (min-width: 769px) {
      ${(props) =>
        props.fieldTitle
          ? css`
              font-size: 18px;
              line-height: 28px;
            `
          : css`
              font-size: 32px;
            `};
    }
  `};
`;

Heading.defaultProps = {
  ml: 'auto',
  mr: 'auto',
  p: 0,
};

export default Heading;
