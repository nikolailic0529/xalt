import React from 'react';
import styled from 'styled-components';
import {space, width, color, typography, flexbox} from 'styled-system';

import Flex from 'components/shared/Flex';
import SocialButton from 'components/shared/SocialButton';

const CoachAboutWrapper = styled(Flex)`
  ${flexbox};
  ${space};
  ${width};
  ${color};
  ${typography};
`;
CoachAboutWrapper.defaultProps = {
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  m: 0,
};

const CoachAboutTitle = styled.div`
  ${width};
  ${color};
  ${space};
  ${typography};
`;
CoachAboutTitle.defaultProps = {
  width: '100%',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1.44',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  m: '0 0 8px',
};

const CoachAboutText = styled.div`
  ${width};
  ${color};
  ${space};
  ${typography};
  white-space: pre-wrap;
`;
CoachAboutText.defaultProps = {
  width: '100%',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.43',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  m: '0 0 8px',
};

const CoachAboutSocialsWrapper = styled(Flex)`
  ${flexbox};
  ${space};
  ${width};
`;
CoachAboutSocialsWrapper.defaultProps = {
  width: 'calc(100% + 16px)',
  justifyContent: 'start',
  flexDirection: 'row',
  alignItems: 'start',
  flexWrap: 'wrap',
  m: '0 -8px',
};

const CoachAbout = ({profile}) => {
  const social = profile?.social_network_links
    ? JSON.parse(JSON.stringify(profile.social_network_links))
    : null;
  return (
    <CoachAboutWrapper>
      <CoachAboutTitle>About Me</CoachAboutTitle>
      <CoachAboutText>{profile.about}</CoachAboutText>
      <CoachAboutSocialsWrapper>
        {social?.linkedin && (
          <SocialButton href={social.linkedin} type="Linkedin" m="8px" />
        )}
        {social?.instagram && (
          <SocialButton href={social.instagram} type="Instagram" m="8px" />
        )}
        {social?.youtube && (
          <SocialButton href={social.youtube} type="Youtube" m="8px" />
        )}
      </CoachAboutSocialsWrapper>
    </CoachAboutWrapper>
  );
};

export default CoachAbout;
