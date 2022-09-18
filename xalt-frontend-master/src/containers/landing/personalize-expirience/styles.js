import styled from 'styled-components';

import Flex from 'components/shared/Flex';

export const PersonalizeExpirienceWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;
PersonalizeExpirienceWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'gray25',
  pt: [6, null, 10, null, null],
  pb: [6, null, 11, null, null],
};
