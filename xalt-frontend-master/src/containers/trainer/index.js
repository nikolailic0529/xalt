import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContent, ContentBlock } from 'components/shared/General';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';
import FooterBanner from 'components/shared/FooterBanner';
import MainBanner from 'components/shared/MainBanner';
import TrainerAboutDashboard from './trainer-about-dashboard';
import OurCoach from './our-coach';
import OurPluses from './our-pluses';
import Showcase from './showcase';

const mainBannerContent = {
  title: 'Welcome to Your <br>Coach Dashboard!',
  description:
    'Where you can manage your business and come <br>together for the health of the community, in one place!',
  bg: 'trainer',
};

const Trainer = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
      <MainContent>
        <ContentBlock>
          <MainBanner content={mainBannerContent} />
          <TrainerAboutDashboard />
          <OurCoach />
          <OurPluses />
          <Showcase />
          <FooterBanner
            bgImage="7"
            title={
              <>
                Grow your business and join xAlt in improving
                <br />
                the lives of our members.
              </>
            }
          >
            <InnerLink to="/registration?role=coach" m={['12px 16px', null, null, null]}>
              <ButtonAux whitePinkBtn width="234px">
                i’m a coach - Sign up
              </ButtonAux>
            </InnerLink>
            <InnerLink to="/login" m={['12px 16px', null, null, null]}>
              <ButtonAux whitePinkBtn width="116px">
                sign in
              </ButtonAux>
            </InnerLink>
          </FooterBanner>
        </ContentBlock>
      </MainContent>
      <Footer />
    </>
  );
};

export default withRouter(connect(null, null)(Trainer));
