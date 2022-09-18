import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  space, color, typography, border,
} from 'styled-system';

import colors from 'lib/theme/colors';

const Wrapper = styled.div`
  ${color};
  ${space};
  ${border};
  ${typography};

  @media (max-width: 768px) {
    position: absolute;
    left: calc(0% + 37px);
  }
  @media (max-width: 1023px) {
    padding: 10px 12px 8px;
  }
  @media (min-width: 1024px) {
    padding: 10px 24px 8px;
  }
`;
Wrapper.defaultProps = {
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '1.25',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  bg: colors.white,
  color: colors.darkPink,
  border: `1px solid ${colors.darkPink}`,
  borderRadius: '10px',
};

const Label = styled.span`
  @media (max-width: 1023px) {
    display: none;
  }
  @media (min-width: 1024px) {
    display: inline-block;
  }
`;

const Value = styled.span`
  ${typography};
`;
Value.defaultProps = {
  fontWeight: '700',
};

const Earnings = ({ earnings }) => (
  <Wrapper>
    <Label>Earnings:</Label>
    <Value>
      &nbsp;
      $
      {earnings}
    </Value>
  </Wrapper>
);

export default Earnings;
