import React from 'react';
import styled from 'styled-components';
import { layout, space, typography } from 'styled-system';

import Flex from 'components/shared/Flex';
import SvgIcon from 'components/shared/SvgIcon';
import { theme } from 'components';

const CoachProfileDomainWrapper = styled(Flex)`
  flex-direction: column;
  ${space};
  ${layout};
  ${typography};
`;
CoachProfileDomainWrapper.defaultProps = {
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '33.33%',
  maxWidth: '230px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '1.25',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  p: '0 8px',
  m: '16px 0',
};

const CoachProfileDomainImgWrapper = styled(Flex)`
  flex-direction: column;
  ${space};
  ${layout};
`;
CoachProfileDomainImgWrapper.defaultProps = {
  width: '100%',
  height: '56px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  m: '0 0 12px',
};

const CoachProfileDomain = (props) => {
  const { children, name } = props;

  return (
    <CoachProfileDomainWrapper>
      <CoachProfileDomainImgWrapper>
        <SvgIcon
          name={name}
          width="42px"
          height="42px"
          fill={theme.colors.darkPink}
          stroke={theme.colors.darkPink}
          m={0}
        />
      </CoachProfileDomainImgWrapper>
      {children}
    </CoachProfileDomainWrapper>
  );
};

export default CoachProfileDomain;
