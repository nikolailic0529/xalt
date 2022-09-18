import React from 'react';
import styled from 'styled-components';
import {space} from 'styled-system';

import {Layout} from 'antd';

const PageWrapper = styled(Layout)`
  ${space}
`;
PageWrapper.defaultProps = {
  p: 0,
};

export default () => <PageWrapper>Content</PageWrapper>;
