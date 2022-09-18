import React from 'react';

import Container from 'components/shared/Container';
import {
  FooterBannerWrapper,
  FooterBannerBg,
  FooterBannerContent,
  FooterBannerTitle,
  FooterBannerContrls,
} from './styles';

const FooterBanner = (props) => {
  const { bgImage, title, children } = props;
  return (
    <FooterBannerWrapper>
      <FooterBannerBg variant={bgImage ? `bgImage${bgImage}` : 'bgImage1'} />
      <FooterBannerContent>
        <Container>
          <FooterBannerTitle>{title}</FooterBannerTitle>
          <FooterBannerContrls>{children}</FooterBannerContrls>
        </Container>
      </FooterBannerContent>
    </FooterBannerWrapper>
  );
};

export default FooterBanner;
