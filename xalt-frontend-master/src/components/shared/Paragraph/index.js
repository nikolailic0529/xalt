import styled, {css} from 'styled-components';
import {maxWidth, lineHeight, space, size, color} from 'styled-system';

import colors from 'lib/theme/colors';

const Paragraph = styled.p`
  &,
  p {
    ${({center, big, small, fontWeight}) => css`
      color: ${colors.gray1000};
      text-align: ${center ? 'center' : 'left'};
      line-height: ${big ? 1.25 : small ? 1.5 : 1.4};
      font-weight: ${fontWeight ? fontWeight : 300};
      font-family: 'Roboto', sans-serif;

      @media (max-width: 768px) {
        font-size: ${big ? 14 : small ? 11 : 11}px;
      }
      @media (min-width: 769px) {
        font-size: ${big ? 16 : small ? 12 : 14}px;
      }
    `};

    :last-child {
      margin-bottom: 0;
    }

    ${lineHeight};
    ${maxWidth};
    ${color};
    ${space};
    ${size};
  }
`;

Paragraph.defaultProps = {
  ml: 'auto',
  mr: 'auto',
};

export default Paragraph;
