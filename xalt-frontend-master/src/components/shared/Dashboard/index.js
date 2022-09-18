import React from 'react';
import styled, { css } from 'styled-components';
import {
  width,
  space,
  color,
  border,
  layout,
  flexbox,
  typography,
  background,
  shadow,
} from 'styled-system';

import { formatDate, formatTime } from 'lib/datetime';
import SvgIcon from 'components/shared/SvgIcon';
import Flex from 'components/shared/Flex';
import { theme } from 'components';
import defImage from './icon-def.png';

const DashboardWrapper = styled(Flex)`
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
DashboardWrapper.defaultProps = {
  width: 'calc(100% + 24px)',
  justifyContent: 'start',
  ml: '-12px',
  mr: '-12px',
};

const DashboardWrapperLayoutItem = styled(Flex)`
  ${layout};
  ${space};
  ${width};
  ${color};
  ${flexbox};
`;
DashboardWrapperLayoutItem.defaultProps = {
  justifyContent: 'start',
  alignItems: 'stretch',
};

const DashboardLayoutItem = styled(Flex)`
  ${flexbox};
  ${layout};
  ${space};
  ${width};
  ${color};
`;
DashboardLayoutItem.defaultProps = {
  height: '100%',
  justifyContent: 'start',
  alignItems: 'start',
  p: '12px',
};

const DashboardCard = styled(Flex)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);

  ${flexbox};
  ${layout};
  ${space};
  ${width};
  ${color};
  ${border};
`;
DashboardCard.defaultProps = {
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
  bg: theme.colors.white,
  borderRadius: '20px',
  p: [2, null, null, 4],
};

export { DashboardWrapper, DashboardWrapperLayoutItem, DashboardLayoutItem, DashboardCard };

export const HeadSession = styled(Flex)`
  padding: 0 0 32px;
  ${border};
  ${shadow};
  ${space};
`;
HeadSession.defaultProps = {
  width: '100%',
  justifyContent: 'start',
  alignItems: 'start',
  flexDirection: 'column',
  borderBottom: `1px solid ${theme.colors.gray150}`,
};

export const ViewDetailsWrapper = styled(Flex)``;
ViewDetailsWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  flexDirection: 'column',
  m: '0 0 16px',
};

export const HeadWrapper = styled(Flex)`
  width: calc(100% + 24px);
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }
  @media (min-width: 641px) {
    flex-direction: row;
  }
`;
HeadWrapper.defaultProps = {
  m: '0 -12px',
};

export const HeadFirstDateWrapper = styled(Flex)`
  ${typography};
  ${layout};
  ${space};

  @media (max-width: 640px) {
    width: 100%;
  }
  @media (min-width: 641px) {
    ${(props) =>
      props.isMemberScreen
        ? css`
            width: 100%;
          `
        : css`
            width: 50%;
          `};
  }
`;
HeadFirstDateWrapper.defaultProps = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.25',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  p: '12px',
};

export const HeadFirstDateMonth = styled.div`
  text-transform: uppercase;
  ${color};
  ${space};
  ${typography};
`;
HeadFirstDateMonth.defaultProps = {
  width: '100%',
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '1.43',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  m: '0 0 2px',
};

export const HeadFirstDateDay = styled.div`
  position: relative;
  &::before {
    content: '';
    width: 36px;
    height: 1px;
    background: ${theme.colors.gray1000};
    position: absolute;
    bottom: 0;
    left: 0;
  }
  ${color};
  ${space};
  ${typography};
`;
HeadFirstDateDay.defaultProps = {
  width: '100%',
  fontSize: '35px',
  fontWeight: '700',
  lineHeight: '42px',
  letterSpacing: '0.1px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.kingfisherDaisy,
  m: '0 0 20px',
  p: '0 0 8px',
};

export const HeadDescription = styled.div`
  ${typography};
  ${space};
  font-family: Roboto, sans-serif;
  letter-spacing: 0.2px;
  color: ${theme.colors.gray1000};
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

HeadDescription.defaultProps = {
  fontSize: '14px',
  lineHeight: '20px',
  pt: 1,
  pl: 1,
  pr: 1,
};

export const HeadInfoWrapper = styled.div`
  ${layout};
  ${space};
  ${flexbox};
`;

HeadInfoWrapper.defaultProps = {
  p: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

export const HeadInfo = styled.span`
  ${layout};
  ${space};
  ${typography};
  font-family: Roboto, sans-serif;
  letter-spacing: 0.2px;
  color: ${theme.colors.gray1000};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

HeadInfo.defaultProps = {
  fontSize: 16,
  lineHeight: '20px',
  pt: 1,
  pl: 1,
  pr: 1,
  width: '100%',
};

export const HeadTimeWrapper = styled.div`
  ${layout};
  ${flexbox};
`;

HeadTimeWrapper.defaultProps = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: ['column', 'row'],
};

export const HeadFirstDate = ({ meeting: { time_from }, isMemberScreen }) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const firstDate = typeof time_from === 'string' ? new Date(time_from) : time_from;
  const date = firstDate.getDate();
  const month = firstDate.getMonth();
  const time = formatTime(firstDate);

  return (
    <HeadFirstDateWrapper isMemberScreen={isMemberScreen}>
      <HeadFirstDateMonth>Next Session</HeadFirstDateMonth>
      <HeadFirstDateDay>{time}</HeadFirstDateDay>
      {date}
      th&nbsp;
      {monthNames[month]}
    </HeadFirstDateWrapper>
  );
};

export const UserPicDescrWrapper = styled.div`
  display: inline-block;
  width: auto;
  margin: -20px 0 0;
  padding: 12px;

  @media (max-width: 640px) {
    max-width: 100%;
  }
  @media (min-width: 641px) {
    max-width: 50%;
  }
`;

const HeadCoachWrapper = styled(Flex)``;
HeadCoachWrapper.defaultProps = {
  width: 'auto',
  maxWidth: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row',
};

const CoachPicWrapper = styled(Flex)``;
CoachPicWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row',
};

const HeadCoachImg = styled.div`
  display: block;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  ${background};
  ${layout};
  ${border};
  ${space};
`;
HeadCoachImg.defaultProps = {
  bg: theme.colors.gray300,
  borderRadius: '50%',
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  m: '0 14px 0 0',
};
const HeadCoachContent = styled(Flex)`
  ${(props) =>
    props.indentProp === '40px'
      ? css`
          max-width: calc(100% - 54px);
        `
      : props.indentProp === '28px' &&
        css`
          max-width: calc(100% - 42px);
        `};
`;
HeadCoachContent.defaultProps = {
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
};
const HeadCoachName = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  ${space};
  ${typography};
`;
HeadCoachName.defaultProps = {
  width: '100%',
  fontSize: '18px',
  fontWeight: '400',
  lineHeight: '20px',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  m: '0',
  p: '0',
};

const HeadCoachNameText = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  ${space};
  ${typography}
`;
HeadCoachNameText.defaultProps = {
  width: '100%',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '20px',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  m: '0',
  p: '0',
};

const HeadCoachContinuos = styled(Flex)`
  ${color};
  ${space};
  ${typography};
`;
HeadCoachContinuos.defaultProps = {
  width: '100%',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '20px',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  m: '0',
  p: '0',
};

export const UserPicDescr = (props) => {
  const { avatar, imgSize, name, continuos } = props;
  return (
    <HeadCoachWrapper>
      {avatar?.url ? (
        <HeadCoachImg width={imgSize} height={imgSize} backgroundImage={`url(${avatar.url})`} />
      ) : (
        <HeadCoachImg width={imgSize} height={imgSize} backgroundImage={`url(${defImage})`} />
      )}
      <HeadCoachContent indentProp={imgSize}>
        <HeadCoachName>{name}</HeadCoachName>
        {continuos && <HeadCoachContinuos>{continuos}</HeadCoachContinuos>}
      </HeadCoachContent>
    </HeadCoachWrapper>
  );
};

export const CoachPicDescr = (props) => {
  const { avatar, imgSize, name } = props;
  return (
    <CoachPicWrapper>
      {avatar?.url ? (
        <HeadCoachImg
          width={imgSize}
          height={imgSize}
          minWidth={imgSize}
          backgroundImage={`url(${avatar.url})`}
        />
      ) : (
        <HeadCoachImg
          width={imgSize}
          height={imgSize}
          minWidth={imgSize}
          backgroundImage={`url(${defImage})`}
        />
      )}
      <HeadCoachContent indentProp={imgSize}>
        <HeadCoachNameText>{name}</HeadCoachNameText>
      </HeadCoachContent>
    </CoachPicWrapper>
  );
};

const NothingBlockWrapper = styled(Flex)`
  ${color};
  ${space};
  ${typography};
`;
NothingBlockWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '20px',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: theme.colors.gray1000,
  m: '0',
  p: '16px 0',
};

export const NothingBlock = (props) => {
  const { iconName, children, iconWidth, iconHeight } = props;
  return (
    <NothingBlockWrapper>
      <SvgIcon
        name={iconName}
        width={iconWidth}
        height={iconHeight}
        fill={theme.colors.gray175}
        m="0 0 20px"
      />
      {children}
    </NothingBlockWrapper>
  );
};

export const MainSession = styled(Flex)``;
MainSession.defaultProps = {
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  mt: 4,
};

export const SessionItem = styled(Flex)`
  margin: 0 0 32px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
  @media (min-width: 641px) {
    flex-direction: row;
  }
  @media (min-width: 1024px) and (max-width: 1440px) {
    flex-direction: column;
  }
`;
SessionItem.defaultProps = {
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

export const SessionItemL = styled(Flex)`
  display: inline-flex;
`;
SessionItemL.defaultProps = {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'row',
};

export const SessionItemDate = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 12px 0 40px;
  ${color};
  ${space};
  ${typography};

  svg {
    position: absolute;
    left: 0;
    top: 2px;
  }
`;
SessionItemDate.defaultProps = {
  fontSize: '18px',
  fontWeight: '400',
  lineHeight: '28px',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  m: '0',
};
export const SessionItemTime = styled.div`
  padding: 0 12px;
  ${color};
  ${space};
  ${typography};
`;
SessionItemTime.defaultProps = {
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '28px',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
};
export const SessionItemMember = styled.div`
  ${space};
  ${layout};
  @media (min-width: 1024px) and (max-width: 1440px) {
    max-width: 100%;
    margin: 12px 0;
    padding: 0;
  }
`;

SessionItemMember.defaultProps = {
  p: ['12px 0 0', '0 0 0 12px'],
};

const DashboardProgressTotal = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0 5px;
  margin: 0 0 24px;
  position: relative;
  &::before {
    content: '';
    background: ${theme.colors.kingfisherDaisy};
    width: 100%;
    height: 5px;
    border-radius: 2.5px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
DashboardProgressTotal.defaultProps = {
  width: '100%',
};
const DashboardProgressTotalValue = styled.div`
  display: inline-block;
  ${color};
  ${space};
  ${typography};

  @media (max-width: 1440px) {
    font-size: 20px;
  }
  @media (min-width: 1440px) and (max-width: 1600px) {
    font-size: 24px;
  }
`;
DashboardProgressTotalValue.defaultProps = {
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1.44',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.kingfisherDaisy,
  m: '0 16px 0 0',
};
const DashboardProgressTotaTitle = styled.div`
  display: inline-block;
  ${color};
  ${space};
  ${typography};
`;
DashboardProgressTotaTitle.defaultProps = {
  fontSize: '10px',
  fontWeight: '400',
  lineHeight: '1.4',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
  m: '0 0 4px',
};

const DashboardProgressAbout = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0 5px;
  position: relative;
`;

DashboardProgressAbout.defaultProps = {
  width: '100%',
};
const DashboardProgressActiveTitle = styled.div`
  ${color};
  ${space};
  ${typography};
  span {
    font-weight: 700;
    color: ${theme.colors.kingfisherDaisy};
  }
`;

DashboardProgressActiveTitle.defaultProps = {
  fontSize: '10px',
  fontWeight: '400',
  lineHeight: '2',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
};

const DashboardProgressPassiveTitle = styled.div`
  ${color};
  ${space};
  ${typography};
  span {
    font-weight: 700;
    color: ${theme.colors.darkPink};
  }
`;
DashboardProgressPassiveTitle.defaultProps = {
  fontSize: '10px',
  fontWeight: '400',
  lineHeight: '2',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
};

const DashboardProgressBar = styled.progress`
  width: 100%;
  height: 5px;
  border-radius: 2.5px;
  overflow: hidden;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  &::-moz-progress-bar {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: linear-gradient(113.19deg, #652f79 3.41%, #e6447d 100%);
  }

  /* Chrome */
  &::-webkit-progress-value {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: linear-gradient(113.19deg, #652f79 3.41%, #e6447d 100%);
  }

  &[aria-valuenow]:before {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: linear-gradient(113.19deg, #652f79 3.41%, #e6447d 100%);
  }
`;

export const DashboardProgress = (props) => {
  const { itemsName, totalName, differenceName, total, value } = props;
  return (
    <>
      <DashboardProgressTotal>
        <DashboardProgressTotalValue>{total}</DashboardProgressTotalValue>
        <DashboardProgressTotaTitle>
          {itemsName}
          &nbsp;this month
        </DashboardProgressTotaTitle>
      </DashboardProgressTotal>
      {/* <DashboardProgressAbout>
        <DashboardProgressActiveTitle>
          <span>{value}</span>&nbsp;
          {totalName}
        </DashboardProgressActiveTitle>
        <DashboardProgressPassiveTitle>
          <span>{total - value}</span>&nbsp;
          {differenceName}
        </DashboardProgressPassiveTitle>
      </DashboardProgressAbout>
      <DashboardProgressBar max={total} value={value}>
        {value}%
      </DashboardProgressBar> */}
    </>
  );
};
