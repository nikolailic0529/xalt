import styled from 'styled-components';

import Flex from 'components/shared/Flex';
import { CardWithImageHor, CardWithImageHorWrapper, CardWithImageHorBox, CardWithImageHorImg } from '../../../components/shared/General/card-with-image-hor';
import { CardWithImage } from '../../../components/shared/General';

export const ChallengeCardWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;
ChallengeCardWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'white',
  pt: [6, null, 10, null, null],
  pb: [6, null, 11, null, null],
};

export const ImageRight = styled(CardWithImageHor)`
    
`;

export const ImageLeft = styled(CardWithImageHor)`

    background-color: blue;

    ${CardWithImageHorBox}{
        background-color: blue,
    }
`;
