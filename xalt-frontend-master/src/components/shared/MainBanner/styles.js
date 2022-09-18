import styled from 'styled-components';
import { typography, space, color, flexbox, layout } from 'styled-system';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import { theme } from 'components';
import image1 from './homepage-page-main-banner-bg.png';
import image2 from './member-page-main-banner-bg.png';
import image3 from './corp-page-main-banner-bg.png';
import image4 from './trainer-page-main-banner-bg.png';
import image5 from './pillar-page-main-banner-bg.png';
import image6 from './corp-challenges-main-banner.png'

export const MainBannerWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;
MainBannerWrapper.defaultProps = {
  width: '100%',
  height: ['auto', null, null, '732px', null],
  position: 'relative',
  flexDirection: 'column',
  bg: theme.colors.white,
  pt: [6, null, 10, 16, null],
};

export const MainBannerBg = styled(Flex)`
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #e9ecf2 7.99%, #ffffff 99.06%);
    transform: rotate(180deg);
  }
`;
MainBannerBg.defaultProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
};

export const MainBannerContainer = styled(Container)`
  ${flexbox};
  ${layout};

  max-width: 1048px;
  position: relative;
  z-index: 2;
  display: flex;
`;
MainBannerContainer.defaultProps = {
  height: '100%',
  alignItems: ['center', null, null, 'flex-start', null],
  justifyContent: 'flex-start',
  flexDirection: 'column',
};

export const MainBannerImg = styled(Flex)`
  width: 367px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 0 -105px 0 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 682px;
    left: 0;
    bottom: 0;
    background: url(${image1}) top center no-repeat;
    background-size: cover;
  }

  @media (max-width: 1023px) {
    height: 396px;
    width: 213px;
    padding: 0;
    position: relative;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }
`;

export const MemberBannerImg = styled(Flex)`
  width: 691px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 0 -270px 0 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 562px;
    left: 0;
    bottom: 0;
    background: url(${image2}) top center no-repeat;
    background-size: cover;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(
      273.88deg,
      #e9ecf2 4.17%,
      rgba(196, 196, 196, 0) 39.44%
    );
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 280px;
    width: 344px;
    padding: 0;
    position: relative;
    left: 50%;
    margin: 0 0 0 -172px;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    height: 360px;
    width: 442px;
    padding: 0;
    position: relative;
    left: 50%;
    margin: 0 0 0 -221px;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }
`;

export const TrainerBannerImg = styled(Flex)`
  width: 542px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 0 -200px 0 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 693px;
    left: 0;
    bottom: 0;
    background: url(${image4}) top center no-repeat;
    background-size: cover;
  }

  @media (max-width: 768px) {
    height: 384px;
    width: 300px;
    padding: 0;
    position: relative;
    left: 0;
    margin: 0;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    height: 440px;
    width: 344px;
    padding: 0;
    position: relative;
    left: 0;
    margin: 0;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }
`;

export const CorpBannerImg = styled(Flex)`
  width: 400px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 0 -70px 0 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 649px;
    left: 0;
    bottom: 0;
    background: url(${image3}) top center no-repeat;
    background-size: cover;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 364px;
    width: 250px;
    padding: 0;
    position: relative;
    left: 0;
    bottom: 0;
    margin: 0;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    height: 360px;
    width: 442px;
    padding: 0;
    position: relative;
    left: 50%;
    margin: 0 0 0 -221px;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }
`;

// TODO: fix styling
export const CorpChallengeBannerImg = styled(Flex)`
  width: 400px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 0 -70px 0 0;
  

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 150%;
    height: 649px;
    left: 0;
    bottom: 0;
    background: url(${image6}) top center no-repeat;
    background-size: cover;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 364px;
    width: 250px;
    padding: 0;
    position: relative;
    left: 0;
    bottom: 0;
    margin: 0;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    height: 360px;
    width: 442px;
    padding: 0;
    position: relative;
    left: 50%;
    margin: 0 0 0 -221px;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }
`;

export const PillarPageBannerImg = styled(Flex)`
  width: 400px;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: 0 -70px 0 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 649px;
    left: 0;
    bottom: 0;
    background: url(${image5}) top center no-repeat;
    background-size: cover;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 364px;
    width: 250px;
    padding: 0;
    position: relative;
    left: 0;
    bottom: 0;
    margin: 0;

    &::before {
      height: 100%;
      bottom: auto;
      top: 0;
    }
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    height: 500px;
    width: 442px;
    padding: 0;
    position: relative;
    left: 50%;
    margin: 0 0 0 -221px;
    top: -150px;

    &::before {
      bottom: auto;
      top: 0;
    }
  }
`;

export const MainBannerContent = styled(Flex)``;
MainBannerContent.defaultProps = {
  width: '100%',
  flexDirection: 'column',
  alignItems: ['center', null, null, 'flex-start'],
  zIndex: 2,
};

export const MainBannerTitle = styled.span`
  display: block;

  ${typography};
  ${color};
  ${space};
`;
MainBannerTitle.defaultProps = {
  fontSize: ['30px', null, '64px', null, null],
  fontWeight: ['700', null, null, '500'],
  lineHeight: ['32px', null, '76px', null, null],
  letterSpacing: '0.5px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: ['center', null, null, 'left', null],
  color: theme.colors.gray1000,
  m: ['0 0 20px', null, null, '0 0 38px', null],
};

export const MainBannerDescription = styled.span`
  display: block;

  ${typography};
  ${color};
  ${space};
`;

MainBannerDescription.defaultProps = {
  fontSize: ['16px', null, '24px', null, null],
  fontWeight: '400',
  lineHeight: ['24px', null, '36px', null, null],
  fontFamily: "'Roboto', sans-serif",
  textAlign: ['center', null, null, 'left', null],
  color: theme.colors.gray1000,
  m: ['0 0 20px', null, null, '0 0 24px', null],
};

export const MainBannerContrls = styled(Flex)``;
MainBannerContrls.defaultProps = {
  display: ['inline-flex', null, 'none', null],
  width: '100%',
  flexDirection: ['column', null, 'row', null, null],
  justifyContent: 'center',
  alignItems: 'center',
  mb: 3,
};
