import styled from 'styled-components';
import {color, layout, space, typography} from 'styled-system';

const OuterLink = styled.a`
  display: inline-flex;
  ${color};
  ${layout};
  ${space};
  ${typography};
`;

export default OuterLink;
