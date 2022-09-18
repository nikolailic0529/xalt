import styled from 'styled-components';
import {layout, space, flexbox, border, color} from 'styled-system';

import Flex from 'components/shared/Flex';
import colors from 'lib/theme/colors';

export const NotificationButtonWrapper = styled(Flex)`
  ${layout};
  position: relative;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @media (min-width: 769px) {
    width: 40px;
    height: 40px;
  }
  @media (max-width: 1023px) {
    margin: 0 12px;
  }
  @media (min-width: 1024px) {
    margin: 0 50px;
  }
`;
NotificationButtonWrapper.defaultProps = {
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column',
};

export const NotificationButton = styled.button`
  ${layout};
  ${flexbox};
  ${space};
  ${border};
  ${color};

  display: flex;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.2s ease-in-out 0s;

  svg {
    fill: transparent;
    stroke: ${colors.darkPink};
    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
    @media (min-width: 769px) {
      width: 24px;
      height: 24px;
    }
  }

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.24);
  }
`;

NotificationButton.defaultProps = {
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexWrap: 'wrap',
  bg: colors.white,
};

export const NotificationDot = styled.span`
  ${layout};
  ${border};
  ${color};
  position: absolute;
  top: -2px;
  right: -2px;
`;
NotificationDot.defaultProps = {
  width: '10px',
  height: '10px',
  bg: colors.red,
  borderRadius: '50%',
};
