import styled from 'styled-components';

import Flex from 'components/shared/Flex';

export const MemberTrainingWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;
MemberTrainingWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'gray25',
  pt: [6, null, 8, null, null],
  pb: [6, null, 9, null, null],
};

