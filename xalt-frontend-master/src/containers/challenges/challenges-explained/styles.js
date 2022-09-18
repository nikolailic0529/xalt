import styled from 'styled-components';

import Flex from 'components/shared/Flex';
import { BaseText } from '../../../components/shared/General';
import { paddingBottom } from 'styled-system';

export const OrderedList = styled.ol``;
export const ListItem = styled(BaseText)`
    display: list-item;
    margin-left: 10%;
`;
export const SmallText = styled(BaseText)`
    text-align: center;
    align-items: center;
    /* font-style: italic; */
    font-size: 10pt;
`;

export const ChallengesExplainedWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
  text-align: center;
  
`;
ChallengesExplainedWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'gray25',
  pt: [6, null, 8, null, null],
  pb: [6, null, 9, null, null],
  
};

export const ChallengeAlert = styled(Flex)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  text-align: center;
  align-self: center;
  align-items: center;
`;
ChallengeAlert.defaultProps = {
  width: '100%',
  height: '15%',
  position: 'relative',
  flexDirection: 'row',
  bg: '#0A7ABF',
  pt: [6, null, 8, null, null],
  pb: [6, null, 9, null, null],
  
};

export const ChallengeAlertWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
  justify-content: center;
  
`;
ChallengeAlertWrapper.defaultProps = {
  width: '100%',
  // height: 'auto',
  position: 'relative',
  flexDirection: 'row',
  bg: 'gray25',
  pt: [6, null, 8, null, null],
  paddingBottom: '1px',
  
};