import styled from 'styled-components';
import {
  space,
  width,
  color,
  border,
  flexbox,
  layout,
  typography,
  background,
} from 'styled-system';

import { theme } from 'components';
import Flex from 'components/shared/Flex';

const MemberProfileWrapper = styled(Flex)`
  ${space};
  ${width};
  ${color};
`;
MemberProfileWrapper.defaultProps = {
  width: 'calc(100% + 24px)',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  m: '0 -12px',
};

const MemberProfileLayoutItem = styled(Flex)`
  ${space};
  ${width};
  ${color};
  ${flexbox};
`;
MemberProfileLayoutItem.defaultProps = {
  justifyContent: 'start',
  alignItems: 'stretch',
  width: '100%',
  p: '12px',
};

const MemberProfileInfo = styled(Flex)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  ${flexbox};
  ${layout};
  ${space};
  ${width};
  ${color};
  ${border};
`;
MemberProfileInfo.defaultProps = {
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  bg: theme.colors.white,
  p: 4,
  borderRadius: '20px',
  fontFamily: 'Roboto, sans-serif',
  fontStyle: 'normal',
  fontSize: 16,
  lineHeight: 20,
  letterSpacing: 0.2,
  color: theme.colors.gray1000,
};

const MemberProfileInfoWrapper = styled.div`
  ${width};
  ${space};
`;
MemberProfileInfoWrapper.defaultProps = {
  p: '0 8px',
};

const MemberProfileTabs = styled(Flex)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  ${flexbox};
  ${layout};
  ${space};
  ${width};
  ${color};
  ${border};
`;
MemberProfileTabs.defaultProps = {
  flexWrap: 'wrap',
  width: '100%',
  bg: theme.colors.white,
  p: 4,
  borderRadius: '20px',
};

const MemberInfo = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${typography};
  ${space};
  ${width};
  ${layout};
`;
MemberInfo.defaultProps = {
  fontWeight: 'normal',
};

const MemberSubscriptions = styled(Flex)`
  ${flexbox};
`;
MemberSubscriptions.defaultProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const UserPic = styled.div`
  display: block;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

  ${layout};
  ${space};
  ${width};
  ${color};
  ${border};
  ${background};

  img {
    width: 100%;
    max-width: 100%;
  }
`;

UserPic.defaultProps = {
  bg: theme.colors.gray300,
  borderRadius: '50%',
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
};

const MemberInfoWrapper = styled(Flex)`
  ${flexbox};
  ${width};
`;

MemberInfoWrapper.defaultProps = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const MemberTabWrapper = styled.div`
  ${flexbox};
  width: calc(100% + 24px);
  margin: 24px -12px 0;
  display: flex;
  flex-wrap: wrap;
`;

MemberTabWrapper.defaultProps = {
  justifyContent: 'space-between',
};

const DashboardInfoWrapper = styled.div`
  width: 33%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1336px) {
    width: 100%;
  }
`;

const DashboardSessions = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  max-width: 33%;
  @media (max-width: 1336px) {
    max-width: unset;
  }
`;

const DashboardHeader = styled.span`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.2px;
  color: ${theme.colors.gray1000};
  padding-right: 8px;
`;

export {
  MemberProfileWrapper,
  MemberProfileLayoutItem,
  MemberProfileInfo,
  MemberProfileTabs,
  MemberInfo,
  MemberSubscriptions,
  UserPic,
  MemberInfoWrapper,
  MemberProfileInfoWrapper,
  MemberTabWrapper,
  DashboardInfoWrapper,
  DashboardSessions,
  DashboardHeader,
};
