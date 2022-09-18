import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MainContent, ContentBlock } from 'components/shared/General';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MainBanner from 'components/shared/MainBanner';
import ChallengeDashboard from 'components/shared/ChallengeAboutDashboard';
import ChallengeBenefits from 'components/shared/ChallengeBenefits';
import FooterBanner from 'components/shared/FooterBanner';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';
import OurChallenge from './our-challenge';
import ChallengesExplained from './challenges-explained'
import ChallengeCards from './challenge-cards';

const mainBannerContent = {
  title: 'xAlt Corporate Challenges',
  description:
      'Health and fitness challenges that benefit both employees and businesses',
  bg: 'challenge',
};

const Challenges = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    <>
      <Header
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
      <MainContent>
        <ContentBlock>
          <MainBanner content={mainBannerContent} />
          <ChallengeDashboard />
          <ChallengeBenefits />
          <ChallengeCards />
          <ChallengesExplained />
          <OurChallenge />
          <FooterBanner
            bgImage="9"
            title={(
              <>
                xAlt Corporate Challenges are the best way to a
                <br />
                healthier, more productive workforce!
              </>
            )}
          >
            <a href="mailto:mark.slipp@xalt.fit?cc=laura.magas@xalt.fit" target="_blank" rel="noreferrer">
              <ButtonAux whitePinkBtn width="234px">
                sign up your company
              </ButtonAux>
            </a>
            {/*<InnerLink to="/login" m={['12px 16px', null, null, null]}>*/}
            {/*  <ButtonAux whitePinkBtn width="116px">*/}
            {/*    sign in*/}
            {/*  </ButtonAux>*/}
            {/*</InnerLink>*/}
          </FooterBanner>
        </ContentBlock>
      </MainContent>
      <Footer />
    </>
  );
};

export default connect(null, null)(Challenges);
