import styled from 'styled-components';

import Flex from 'components/shared/Flex';

export const StepWithWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;
StepWithWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'white',
  pt: [6, null, 11, null, null],
  pb: [6, null, 11, null, null],
};

export const StepWithList = styled(Flex)``;
StepWithList.defaultProps = {
  width: ['calc(100% + 24px)', null, 'calc(100% + 40px)', null],
  justifyContent: 'start',
  flexDirection: 'column',
  alignItems: 'start',
  flexWrap: 'wrap',
  m: '0 -20px',
};
export const StepWithListRow = styled(Flex)``;
StepWithListRow.defaultProps = {
  width: 1,
  justifyContent: 'start',
  flexDirection: 'row',
  alignItems: 'start',
  flexWrap: 'wrap',
};
