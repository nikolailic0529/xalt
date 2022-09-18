import React from 'react';
import styled from 'styled-components';

import colors from 'lib/theme/colors';

const CustomCard = styled.div`
  padding: 3rem;
  background-color: ${colors.gray150};
  border-radius: 20px;
`;

export default ({className = '', children}) => (
  <CustomCard className={className}>{children}</CustomCard>
);
