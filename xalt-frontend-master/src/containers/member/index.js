import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContent, ContentBlock } from 'components/shared/General';
import FooterBanner from 'components/shared/FooterBanner';
import MainBanner from 'components/shared/MainBanner';
import PillarsHealth from 'components/shared/PillarsHealth';
import MemberTraining from 'components/shared/MemberTraining';
import MemberAboutDashboard from 'components/shared/MemberAboutDashboard';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';
import BrowseCoaches from './browse-coaches';

const mainBannerContent = {
  title: 'Welcome to Your <br>Member Dasboard!',
  description: 'The possibilities at xAlt are endless. <br>Come discover yours!',
  bg: 'member',
};

const Member = () => {
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
          <MemberAboutDashboard />
          <MemberTraining />
          <PillarsHealth />
          <BrowseCoaches />
          <FooterBanner
            bgImage="2"
            title={
              <>
                Healthy experiences made for everyone.
                <br />
                Start yours today!
              </>
            }
          >
            <InnerLink to="/registration?role=member" m={['12px 16px', null, null, null]}>
              <ButtonAux whitePinkBtn width="234px">
                i’m a member - sign up
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

export default withRouter(connect(null, null)(Member));
