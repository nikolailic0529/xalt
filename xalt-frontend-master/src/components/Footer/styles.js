import styled from 'styled-components';
import { typography, space, color, flexbox } from 'styled-system';

import Flex from 'components/shared/Flex';
import InnerLink from 'components/shared/InnerLink';
import OuterLink from 'components/shared/OuterLink';
import { theme } from 'components';

export const FooterWrapper = styled(Flex)`
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`;
FooterWrapper.defaultProps = {
  width: '100%',
  flexDirection: 'column',
  bg: theme.colors.white,
};

export const FooterTop = styled(Flex)``;
FooterTop.defaultProps = {
  width: '100%',
  padding: '25px 0 16px',
  borderBottom: `1px solid ${theme.colors.kingfisherDaisy}`,
};

export const FooterPartWrapper = styled(Flex)``;
FooterPartWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'space-between',
  flexDirection: ['column', null, null, 'row', null],
  alignItems: 'center',
};

export const FooterBottom = styled(Flex)``;
FooterBottom.defaultProps = {
  pt: [2, null, null, 1, null],
  pb: [2, null, null, 1, null],
  pr: 0,
  pl: 0,
};

export const FooterLogoWrapper = styled(Flex)`
  display: inline-flex;
`;
FooterLogoWrapper.defaultProps = {
  mb: [1, null, null, 0, null],
};

export const FooterTopMenu = styled(Flex)`
  display: inline-flex;
  flex-wrap: wrap;
`;
FooterTopMenu.defaultProps = {
  position: 'relative',
  right: ['-12px', null, null, '-20px', null],
  justifyContent: 'center',
  mb: ['4px', null, null, 0, null],
};

export const FooterLink = styled(InnerLink)``;
FooterLink.defaultProps = {
  m: ['6px 12px', null, null, '10px 20px', null],
};

export const FooterSocialsMenu = styled(Flex)`
  display: inline-flex;
  flex-wrap: wrap;
`;
FooterSocialsMenu.defaultProps = {
  mb: [1, null, null, 0, null],
  ml: [0, null, null, '-4px', null],
};

export const FooterBottomCont = styled(Flex)`
  display: inline-flex;
  flex-wrap: wrap;
`;
FooterBottomCont.defaultProps = {
  justifyContent: 'space-between',
  flexDirection: ['column', null, null, 'row', null],
  alignItems: 'center',
};

export const FooterBottomMenu = styled(Flex)``;
FooterBottomMenu.defaultProps = {
  justifyContent: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center',
  mb: [1, null, null, 0, null],
};

export const FooterCopyright = styled.span`
  ${typography};
  ${color};
  ${space};
`;
FooterCopyright.defaultProps = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.44',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  m: [0, null, null, '0 0 0 40px', null],
};

export const FooterSocialsLinks = styled(OuterLink)`
  ${flexbox};
  ${space};

  svg {
    color: white;
  }
`;
FooterSocialsLinks.defaultProps = {
  width: '24px',
  height: '24px',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  ml: '4px',
  mr: '4px',
};
