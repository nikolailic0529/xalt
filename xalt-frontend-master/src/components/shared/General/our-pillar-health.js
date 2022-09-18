import React from 'react';

import styled from 'styled-components';
import { typography } from 'styled-system';

import { BaseText } from 'components/shared/General';
import Flex from 'components/shared/Flex';
import ButtonAux from 'components/shared/ButtonAux';
import InnerLink from 'components/shared/InnerLink';
import image from './pillars-health-bg.png';

const OurPillarsHealthWrapper = styled(Flex)``;
OurPillarsHealthWrapper.defaultProps = {
  width: '100%',
  height: '297px',
  flexDirection: 'column',
  alignItems: ['center', null, 'flex-end', null, null],
  position: 'relative',
};

const OurPillarsHealthImg = styled(Flex)`
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    background: url(${image}) center center no-repeat;
    background-size: cover;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, #e6447d 0%, #ffab3d 100%);
    mix-blend-mode: overlay;
    opacity: 0.5;
  }
`;
OurPillarsHealthImg.defaultProps = {
  width: '100%',
  maxWidth: ['100%', null, '648px', null, null],
  height: '100%',
  flexDirection: 'column',
  borderRadius: '5px',
  position: 'relative',
};

const OurPillarsHealthBox = styled(Flex)`
  ${typography};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
`;
OurPillarsHealthBox.defaultProps = {
  width: 'calc(100% - 48px)',
  maxWidth: '412px',
  height: 'calc(100% - 48px)',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  bg: 'white',
  fontSize: '24px',
  fontWeight: '500',
  lineHeight: '34px',
  fontFamily: "'Roboto', sans-serif",
  color: 'gray1000',
  textAlign: 'center',
  position: 'absolute',
  top: 3,
  left: ['inherit', null, 0, null, null],
  zIndex: 1,
  p: 2,
};
export const OurPillarsHealth = ({ withText }) => (
  <OurPillarsHealthWrapper>
    <OurPillarsHealthBox>
      Our Pillars of Health
      {withText && (
        <BaseText textAlign="center" mt={[1, null, 2, null]}>
          xAlt focuses on maximizing the Pillars to achieve optimum health,
          fitness & longevity
        </BaseText>
      )}
      <InnerLink to="/pillar-page" m="24px 0 0">
        <ButtonAux pinkBrdrBtn width="144px">
          Read more
        </ButtonAux>
      </InnerLink>
    </OurPillarsHealthBox>
    <OurPillarsHealthImg />
  </OurPillarsHealthWrapper>
);
