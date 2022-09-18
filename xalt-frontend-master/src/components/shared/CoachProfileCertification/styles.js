import styled from 'styled-components';
import {
  space, width, color, typography,
} from 'styled-system';

import colors from 'lib/theme/colors';
import Flex from 'components/shared/Flex';
import Paragraph from 'components/shared/Paragraph';

export const CoachProfileCertWrapper = styled(Flex)`
  flex-direction: column;

  ${space};
  ${width};
  ${color};
  ${typography};
`;
CoachProfileCertWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'start',
  alignItems: 'start',
  m: 0,
};

export const CoachProfileCertTitle = styled(Paragraph)``;
CoachProfileCertTitle.defaultProps = {
  fontWeight: 700,
  color: colors.kingfisherDaisy,
  m: '0 0 16px',
  as: 'h3',
};

export const CoachProfileCertBlock = styled(Flex)`
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (min-width: 769px) {
    flex-direction: row;
  }

  &::before {
    content: '';
    width: 36px;
    height: 2px;
    background: ${colors.gray1000};
    position: absolute;
    top: 0;
    left: 8px;
  }

  ${space};
  ${width};
  ${color};
  ${typography};
`;
CoachProfileCertBlock.defaultProps = {
  width: 'calc(100% + 16px)',
  justifyContent: 'start',
  alignItems: 'start',
  p: '16px 0 0',
  m: '0 -8px',
};
export const CoachProfileCertColumn = styled(Flex)`
  flex-direction: column;
  padding: 0 8px;

  @media (max-width: 768px) {
    width: 100%;
    &:first-of-type {
      padding: 0 8px 16px;
    }
  }
  @media (min-width: 769px) {
    width: 50%;
  }
  ${space};
  ${width};
  ${color};
  ${typography};
`;
CoachProfileCertColumn.defaultProps = {
  justifyContent: 'start',
  alignItems: 'start',
  m: 0,
};

export const CoachProfileCertItem = styled(Paragraph)``;
CoachProfileCertItem.defaultProps = {
  fontWeight: 400,
  color: colors.gray1000,
  m: '0 0 12px',
};
