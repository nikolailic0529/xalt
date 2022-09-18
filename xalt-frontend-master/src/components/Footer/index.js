import React from 'react';

import Container from 'components/shared/Container';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import SvgIcon from 'components/shared/SvgIcon';
import { theme } from 'components';
import {
  FooterWrapper,
  FooterTop,
  FooterPartWrapper,
  FooterLogoWrapper,
  FooterTopMenu,
  FooterLink,
  FooterBottom,
  FooterSocialsMenu,
  FooterBottomCont,
  FooterBottomMenu,
  FooterCopyright,
  FooterSocialsLinks,
} from './styles';

const Footer = () => (
  <FooterWrapper>
    <FooterTop>
      <Container big>
        <FooterPartWrapper>
          <FooterLogoWrapper>
            <XaltLogoLink />
          </FooterLogoWrapper>
          <FooterTopMenu>
            <FooterLink to="/" footerLink title="Home">
              Home
            </FooterLink>
            <FooterLink to="/about-us" footerLink title="About">
              About
            </FooterLink>
            <FooterLink to="/trainers-showcase" footerLink title="Coaches">
              Coaches
            </FooterLink>
            <FooterLink to="/pricing" footerLink title="Pricing">
              Pricing
            </FooterLink>
            <FooterLink to="/contact-us" footerLink title="Contact">
              Contact
            </FooterLink>
          </FooterTopMenu>
        </FooterPartWrapper>
      </Container>
    </FooterTop>
    <FooterBottom>
      <Container big>
        <FooterPartWrapper>
          <FooterSocialsMenu>
            <FooterSocialsLinks href="https://twitter.com/valuo_io" title="Twitter" target="_blank">
              <SvgIcon
                name="footerTwitter"
                width="14px"
                height="14px"
                fill={theme.colors.darkPink}
              />
            </FooterSocialsLinks>
            <FooterSocialsLinks
              href="https://www.facebook.com/Xaltfit-corporation-101712868275793/"
              title="Facebook"
              target="_blank"
            >
              <SvgIcon
                name="footerFacebook"
                width="14px"
                height="14px"
                fill={theme.colors.darkPink}
              />
            </FooterSocialsLinks>
            <FooterSocialsLinks
              href="https://www.instagram.com/xalt.fit/?hl=en"
              title="Instagram"
              target="_blank"
            >
              <SvgIcon name="footerInsta" width="14px" height="14px" fill={theme.colors.darkPink} />
            </FooterSocialsLinks>
            <FooterSocialsLinks
              href="https://www.linkedin.com/company/xalt-fit/mycompany/"
              title="Instagram"
              target="_blank"
            >
              <SvgIcon
                name="socialButtonLinkedin"
                width="22px"
                height="22px"
                fill={theme.colors.darkPink}
              />
            </FooterSocialsLinks>
            <FooterSocialsLinks
              href="https://www.youtube.com/channel/UC9lpTOr_lX5dGa9b5x46huA"
              title="Instagram"
              target="_blank"
            >
              <SvgIcon
                name="socialButtonYoutube"
                width="22px"
                height="22px"
                fill={theme.colors.darkPink}
              />
            </FooterSocialsLinks>
            <FooterSocialsLinks href="https://vimeo.com/xalt" title="Instagram" target="_blank">
              <SvgIcon
                name="socialButtonVimeo"
                width="16px"
                height="16px"
                fill={theme.colors.darkPink}
              />
            </FooterSocialsLinks>
          </FooterSocialsMenu>
          <FooterBottomCont>
            <FooterBottomMenu>
              <FooterLink to="terms-and-conditions" footerLink title="Terms & conditions">
                Terms & conditions
              </FooterLink>
              <FooterLink to="privacy-policy" footerLink title="Terms & conditions">
                Privacy policy
              </FooterLink>
            </FooterBottomMenu>
            <FooterCopyright>© 2021 - xAlt | All rights reserved.</FooterCopyright>
          </FooterBottomCont>
        </FooterPartWrapper>
      </Container>
    </FooterBottom>
  </FooterWrapper>
);

export default Footer;
