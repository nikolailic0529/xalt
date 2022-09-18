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
import PersonalizeExpirience from './personalize-expirience';
import StepWith from './step-with';
import HealthBenefits from './health-benefits';
import CoachList from './coach-list';
import TopCoachList from './top-coach-list';

const mainBannerContent = {
  title: 'Welcome to Your <br>Health Dashboard!',
  description:
    'xAlt puts a world of health & fitness into your hands. <br>Get life-long results using proven principles.',
  bg: 'homepage',
};

const Landing = () => {
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
          <TopCoachList />
          <StepWith />
          <PersonalizeExpirience />
          <HealthBenefits />
          <CoachList />
          <FooterBanner
            bgImage="1"
            title={
              <>
                xAlt is ready to meet you wherever you are so
                <br />
                you can start making the progress you need!
              </>
            }
          >
            <InnerLink to="/member" m={['12px 16px', null, null, null]}>
              <ButtonAux whitePinkBtn width="164px">
                i’m a member
              </ButtonAux>
            </InnerLink>
            <InnerLink to="/trainer" m={['12px 16px', null, null, null]}>
              <ButtonAux whitePinkBtn width="150px">
                i’m a coach
              </ButtonAux>
            </InnerLink>
            <InnerLink to="/corp" m={['12px 16px', null, null, null]}>
              <ButtonAux whitePinkBtn width="172px">
                i’m a company
              </ButtonAux>
            </InnerLink>
            <InnerLink to="/challenges" m={['12px 16px', null, null, null]}>
              <ButtonAux whitePinkBtn width="172px">
                challenges
              </ButtonAux>
            </InnerLink>
          </FooterBanner>
        </ContentBlock>
      </MainContent>
      <Footer />
    </>
  );
};

export default withRouter(connect(null, null)(Landing));
