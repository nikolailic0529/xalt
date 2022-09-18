import styled from 'styled-components';
import {space, width, color, border, flexbox, layout} from 'styled-system';

import colors from 'lib/theme/colors';
import Flex from 'components/shared/Flex';

const CoachProfileWrapper = styled(Flex)`
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  @media (min-width: 1025px) {
    flex-direction: row;
  }
  ${space};
  ${width};
  ${color};
`;
CoachProfileWrapper.defaultProps = {
  width: 'calc(100% + 24px)',
  justifyContent: 'start',
  m: '0 -12px',
};

const CoachProfileLayoutItem = styled(Flex)`
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (min-width: 1025px) {
    width: 50%;
  }

  ${space};
  ${width};
  ${color};
  ${flexbox};
`;
CoachProfileLayoutItem.defaultProps = {
  justifyContent: 'start',
  alignItems: 'stretch',
};

const CoachProfileItem = styled(Flex)`
  ${flexbox};
  ${layout};
  ${space};
  ${width};
  ${color};
`;
CoachProfileItem.defaultProps = {
  height: '100%',
  justifyContent: 'start',
  alignItems: 'start',
  p: '12px',
};

const CoachProfileCard = styled(Flex)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  ${flexbox};
  ${layout};
  ${space};
  ${width};
  ${color};
  ${border};
`;
CoachProfileCard.defaultProps = {
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
  bg: colors.white,
  p: '32px',
  borderRadius: '20px',
};

const CoachProfileCardsWrapper = styled(Flex)`
  ${flexbox};
  ${layout};
`;
CoachProfileCardsWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

export {
  CoachProfileWrapper,
  CoachProfileLayoutItem,
  CoachProfileItem,
  CoachProfileCard,
  CoachProfileCardsWrapper,
};
