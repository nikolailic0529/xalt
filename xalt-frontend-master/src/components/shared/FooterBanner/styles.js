import styled from 'styled-components';
import { typography, space, color, variant, compose } from 'styled-system';

import Flex from 'components/shared/Flex';
import { theme } from 'components';
import image1 from './bg-1.png';
import image2 from './bg-2.png';
import image3 from './bg-3.png';
import image4 from './bg-4.png';
import image5 from './bg-5.png';
import image6 from './bg-6.png';
import image7 from './bg-7.png';
import image8 from './bg-8.png';
import image9 from './bg-9.png';

export const FooterBannerWrapper = styled(Flex)`
  position: relative;
`;
FooterBannerWrapper.defaultProps = {
  width: '100%',
  position: 'relative',
  flexDirection: 'column',
  bg: theme.colors.white,
  pt: [10, null, '132px', null, null],
  pb: [6, null, '132px', null, null],
};

const composeFooterBannerBgHelper = compose(
  variant({
    variants: {
      bgImage1: {
        '&::before': {
          backgroundImage: `url(${image1})`,
        },
      },
      bgImage2: {
        '&::before': {
          backgroundImage: `url(${image2})`,
        },
      },
      bgImage3: {
        '&::before': {
          backgroundImage: `url(${image3})`,
        },
      },
      bgImage4: {
        '&::before': {
          backgroundImage: `url(${image4})`,
        },
      },
      bgImage5: {
        '&::before': {
          backgroundImage: `url(${image5})`,
        },
      },
      bgImage6: {
        '&::before': {
          backgroundImage: `url(${image6})`,
        },
      },
      bgImage7: {
        '&::before': {
          backgroundImage: `url(${image7})`,
        },
      },
      bgImage8: {
        '&::before': {
          backgroundImage: `url(${image8})`,
        },
      },
      bgImage9: {
        '&::before': {
          backgroundImage: `url(${image9})`,
        },
      },
    },
  }),
);

export const FooterBannerBg = styled(Flex)`
  ${composeFooterBannerBgHelper};

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #e6447d 0%, #ffab3d 100%);
    mix-blend-mode: normal;
    opacity: 0.3;
  }
`;
FooterBannerBg.defaultProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
};

export const FooterBannerContent = styled(Flex)``;
FooterBannerContent.defaultProps = {
  width: '100%',
  flexDirection: 'column',
  color: theme.colors.white,
  zIndex: 2,
};

export const FooterBannerTitle = styled.span`
  display: block;

  ${typography};
  ${color};
  ${space};
`;
FooterBannerTitle.defaultProps = {
  fontSize: ['20px', null, '40px', null, null],
  fontWeight: '700',
  lineHeight: ['24px', null, '48px', null, null],
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: theme.colors.white,
  m: ['12px 0 20px', null, null, '12px 0 24px', null],
};

export const FooterBannerContrls = styled(Flex)``;
FooterBannerContrls.defaultProps = {
  width: '100%',
  flexDirection: ['column', null, 'row', null, null],
  justifyContent: 'center',
  alignItems: 'center',
};
