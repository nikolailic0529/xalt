import React, { useState, useEffect } from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContent, ContentBlock } from 'components/shared/General';
import FooterBanner from 'components/shared/FooterBanner';
import MainBanner from 'components/shared/MainBanner';
import PillarPageBlock from 'components/shared/PillarPageBlock';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';

const mainBannerContent = {
  title: 'The Pillars of Health',
  description: 'The cornerstones of longevity.',
  bg: 'pillar',
};

const PillarPage = () => {
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
          <MainBanner
            content={mainBannerContent}
            bannerProps={{
              height: ['auto', null, null, '582px', null],
            }}
            titleProps={{ fontWeight: ['700', null, null, '900'] }}
            descProps={{
              fontSize: ['16px', null, '32px', null, null],
              lineHeight: ['24px', null, '46px', null, null],
            }}
          />
          <PillarPageBlock />
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

export default PillarPage;
