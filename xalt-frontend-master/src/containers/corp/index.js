import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MainContent, ContentBlock } from 'components/shared/General';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MainBanner from 'components/shared/MainBanner';
import CorpAboutDashboard from 'components/shared/CorpAboutDashboard';
import CorpBenefits from 'components/shared/CorpBenefits';
import FooterBanner from 'components/shared/FooterBanner';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';

const mainBannerContent = {
  title: 'Welcome to Your <br>Corporate Dasboard!',
  description:
    'Revolutionizing employee wellness journeys<br/> around the globe. Kickstart yours today!',
  bg: 'corp',
};

const Corp = () => {
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
          <CorpAboutDashboard />
          <CorpBenefits />
          <FooterBanner
            bgImage="5"
            title={(
              <>
                xAlt ignites and fuels employees. Take care of
                <br />
                them, and they’ll take care of your business.
              </>
            )}
          >
            <a href="mailto:mark.slipp@xalt.fit?cc=laura.magas@xalt.fit" target="_blank" rel="noreferrer">
              <ButtonAux whitePinkBtn width="234px">
                i’m a company - sign up
              </ButtonAux>
            </a>
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

export default connect(null, null)(Corp);
