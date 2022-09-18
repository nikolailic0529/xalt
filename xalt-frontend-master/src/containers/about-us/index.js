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
import AboutUsDashboard from 'components/shared/AboutUsDashboard';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';

const Member = () => {
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
          <AboutUsDashboard />
          <FooterBanner
            bgImage="6"
            title={(
              <>
                xAlt is ready to meet you wherever you are so
                <br />
                you can start making the progress you need!
              </>
            )}
          >
            <InnerLink
              to="/registration?role=member"
              m={['12px 16px', null, null, null]}
            >
              <ButtonAux whitePinkBtn width="234px">
                i’m a member
              </ButtonAux>
            </InnerLink>
            <InnerLink
              to="/registration?role=coach"
              m={['12px 16px', null, null, null]}
            >
              <ButtonAux whitePinkBtn width="234px">
                i’m a coach
              </ButtonAux>
            </InnerLink>
            <InnerLink
              to="/registration?role=company"
              m={['12px 16px', null, null, null]}
            >
              <ButtonAux whitePinkBtn width="234px">
                i’m a company
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
