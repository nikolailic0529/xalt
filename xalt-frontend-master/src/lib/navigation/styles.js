import { Layout } from 'antd';
import styled from 'styled-components';
import devices from 'lib/theme/devices';

import colors from 'lib/theme/colors';

export default styled(Layout)`
  overflow-y: auto;
  padding: 0 2rem 1rem 2rem;
  background-color: ${colors.white};

  @media screen and (max-width: ${devices.mobileM}) {
    padding: 0 0.25rem 0.25rem 0.25rem;
  }
`;
