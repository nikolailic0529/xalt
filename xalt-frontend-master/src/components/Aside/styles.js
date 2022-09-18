import styled from 'styled-components';
import {layout, space, flexbox} from 'styled-system';

export const SidebarMenu = styled.nav`
  ${layout};
  ${flexbox};
  ${space};
`;
SidebarMenu.defaultProps = {
  width: '100%',
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column',
  flexWrap: 'wrap',
  p: '32px 12px 0 16px',
};
