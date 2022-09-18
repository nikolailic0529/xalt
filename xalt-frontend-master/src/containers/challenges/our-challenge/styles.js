import styled from 'styled-components';

import Flex from 'components/shared/Flex';
import { BaseCardSlider,  BaseCardSliderViewWrapper } from '../../../components/shared/General';

export const OurChallengeWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;
OurChallengeWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'white',
  pt: [6, null, 10, null, null],
  pb: [6, null, 11, null, null],
};

export const SliderScroll = styled(BaseCardSlider)`
  ${BaseCardSliderViewWrapper}{
    margin: auto;
    /* flex-basis: auto; */
  }
  
`;

