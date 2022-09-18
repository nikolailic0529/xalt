import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';
import { MainContent, ContentBlock } from 'components/shared/General';
import FooterBanner from 'components/shared/FooterBanner';
import TermsBlock from 'components/shared/TermsBlock';

const TermsAndConditions = () => {
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
          <TermsBlock />
          <FooterBanner
            bgImage="3"
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
          </FooterBanner>
        </ContentBlock>
      </MainContent>
      <Footer />
    </>
  );
};

export default withRouter(connect(null, null)(TermsAndConditions));
