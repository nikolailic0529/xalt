import React from 'react';

import UnregisterMenu from 'components/shared/UnregisterMenu';
import When from 'components/shared/When';
import {
  MainBannerWrapper,
  MainBannerContainer,
  MainBannerBg,
  MainBannerImg,
  MemberBannerImg,
  CorpBannerImg,
  PillarPageBannerImg,
  MainBannerContent,
  MainBannerTitle,
  MainBannerDescription,
  MainBannerContrls,
  TrainerBannerImg,
  CorpChallengeBannerImg
} from './styles';

const MainBanner = (props) => {
  const { content, titleProps, descProps, bannerProps } = props;
  const { title, description, bg } = content;

  return (
    <MainBannerWrapper {...bannerProps}>
      <MainBannerBg />
      <MainBannerContainer>
        <MainBannerContent>
          <MainBannerTitle
            {...titleProps}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <MainBannerDescription
            {...descProps}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <MainBannerContrls>
            <UnregisterMenu />
          </MainBannerContrls>
        </MainBannerContent>
        <When condition={bg === 'member'}>
          <MemberBannerImg />
        </When>
        <When condition={bg === 'homepage'}>
          <MainBannerImg />
        </When>
        <When condition={bg === 'corp'}>
          <CorpBannerImg />
        </When>
        <When condition={bg === 'pillar'}>
          <PillarPageBannerImg />
        </When>
        <When condition={bg === 'trainer'}>
          <TrainerBannerImg />
        </When>
        <When condition={bg === 'challenge'}>
          <CorpChallengeBannerImg />
        </When>
      </MainBannerContainer>
    </MainBannerWrapper>
  );
};
export default MainBanner;
