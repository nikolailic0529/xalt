import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { typography } from 'styled-system';

import { theme } from 'components';

const XaltLogo = styled.div`
  ${typography};
  display: inline-flex;

  span {
    color: ${theme.colors.darkPink};
  }
`;

XaltLogo.defaultProps = {
  fontSize: ['18px', '18px', '24px', '40px'],
  lineHeight: ['1.34', null, 1, 1],
  fontWeight: '900',
  letterSpacing: '0.2px',
  fontFamily: theme.fonts.primary,
  color: theme.colors.gray,
};

const XaltLogoLink = () => (
  <Link to="/">
    <XaltLogo>
      <span>X</span>
      ALT
    </XaltLogo>
  </Link>
);

export default XaltLogoLink;
