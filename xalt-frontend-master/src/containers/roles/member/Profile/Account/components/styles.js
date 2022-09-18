import styled, { css } from 'styled-components';
import { theme } from 'components';
import SvgIcon from 'components/shared/SvgIcon';
import {
  background,
  shadow,
  border,
  space,
  layout,
  flexbox,
  typography,
  color,
} from 'styled-system';

const { fonts, radii } = theme;

export const SettingsSectionContainer = styled.div`
  ${background};
  ${shadow};
  ${border};
  ${space};
  ${layout};
  ${flexbox};
`;

SettingsSectionContainer.defaultProps = {
  backgroundColor: 'white',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
  borderRadius: radii.big,
  display: 'flex',
  flexDirection: 'column',
  mt: 2,
};

export const SettingsSectionWrapper = styled.div`
  ${layout};
  ${flexbox};
  ${space};
  ${border};
`;

SettingsSectionWrapper.defaultProps = {
  width: '100%',
  display: 'flex',
  flexDirection: ['column', null, null, 'row'],
  alignItems: ['flex-start', null, null, 'center'],
  p: [2, null, 4],
};

export const SettingsSessionsBlock = styled.div`
  ${layout};
  ${flexbox};
  ${space};
`;

SettingsSessionsBlock.defaultProps = {
  display: 'flex',
  flexDirection: 'column',
  p: 1,
};

export const SettingsSessionsInfo = styled.span`
  ${typography};
  ${color};
  ${space};
  ${({ textTransform }) =>
    css`
      text-transform: ${textTransform};
    `}
`;

SettingsSessionsInfo.defaultProps = {
  fontFamily: fonts.primary,
  fontSize: 16,
  lineHeight: '20px',
  letterSpacing: 0.2,
  color: 'gray1000',
};

export const SettingsDescription = styled.span`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${typography};
  ${color};
  ${layout};
`;

SettingsDescription.defaultProps = {
  fontFamily: fonts.primary,
  fontSize: 14,
  lineHeight: '20px',
  letterSpacing: 0.2,
  color: 'gray1000',
  maxWidth: 395,
};

export const StyledIcon = styled(SvgIcon)`
  cursor: pointer;
`;
