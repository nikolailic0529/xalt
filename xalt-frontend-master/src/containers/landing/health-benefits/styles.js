import styled from 'styled-components';
import { color, typography, shadow } from 'styled-system';

import Flex from 'components/shared/Flex';
import bgImage from './img/bg.png';

export const HealthBenefitsContent = styled(Flex)``;
HealthBenefitsContent.defaultProps = {
  width: 1,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: ['center', null, null, 'flex-start'],
  flexWrap: 'wrap',
  position: 'relative',
  pb: [2, null, null, '228px'],
};

export const HealthBenefitsImg = styled(Flex)`
  width: 520px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  margin: -96px 0 0 -128px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 912px;
    left: 0;
    bottom: 0;
    background: url(${bgImage}) top center no-repeat;
    background-size: cover;
  }

  @media (max-width: 1023px) {
    height: 296px;
    width: 169px;
    padding: 0;
    margin: 0 0 16px;
    position: relative;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }
`;

export const HealthBenefitsList = styled(Flex)``;
HealthBenefitsList.defaultProps = {
  width: [1, '568px', null, null],
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
};

export const HealthBenefitsIconWrapper = styled(Flex)``;
HealthBenefitsIconWrapper.defaultProps = {
  width: 1,
  minHeight: '80px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
};

export const HealthBenefitsCard = styled(Flex)`
  ${color};
  ${shadow};
  ${typography};
`;
HealthBenefitsCard.defaultProps = {
  width: ['calc(100% - 16px)', 'calc(50% - 16px)', null, null],
  minHeight: '246px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: ['10px', null, '18px', null],
  fontWeight: '400',
  lineHeight: ['16px', null, '24px', null],
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: 'gray1000',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
  borderRadius: '5px',
  p: [2, null, 3, null],
  m: 1,
};
