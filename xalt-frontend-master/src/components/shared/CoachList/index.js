import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { flexbox, layout, space } from 'styled-system';

import { theme } from 'components';
import Flex from 'components/shared/Flex';
import SvgIcon from 'components/shared/SvgIcon';
import ButtonAux from 'components/shared/ButtonAux';

export const CoachesList = styled(Flex)`
  ${flexbox};
  ${layout};
  width: 100%;
  margin: 0;
  min-height: 642px;
`;

CoachesList.defaultProps = {
  as: 'ul',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flexDirection: 'column',
};

export const CoachesListCard = styled.li`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  min-height: 190px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

export const CoachesListCardL = styled.div`
  @media (max-width: 480px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }
`;
export const CoachesListCardR = styled.div`
  @media (max-width: 480px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-end;
  }
`;

export const CoachListCertWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CoachSection = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 100px;
  width: 100%;
  max-width: 223px;
  align-items: center;
`;

export const CoachDescription = styled.div`
  max-width: 362px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-align: left;
  word-wrap: break-word;
  color: #39393c;
  opacity: 0.7;
  margin: 0;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 190px;
  white-space: pre-wrap;
`;

export const CoachName = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.2px;
  margin-top: 10px;
  text-align: center;
  margin: 0;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Divider = styled.div`
  border: 1px solid #39393c;
  width: 36px;
  height: 1px;
  background: ${theme.colors.gray1000};
  margin: 16px 0;
`;

const CoachCertificateWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: center;
`;

const CoachCertificateStatus = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-align: left;
`;

export const CoachBookingButton = styled(ButtonAux)`
  background: ${theme.colors.darkPink};
  box-shadow: 0px 1px 2px rgba(51, 51, 51, 0.12);
  border: none;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: ${theme.colors.white};
`;

export const CoachDetailsWrapper = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  color: ${theme.colors.darkPink};
  transition: color 0.2s ease-in-out 0s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) =>
    props.bigFont
      ? css`
          font-size: 16px;
          line-height: 20px;
          letter-spacing: 0.2px;
          margin-top: 0;
        `
      : props.largeFont
      ? css`
          font-size: 18px;
          line-height: 24px;
          letter-spacing: 0.2px;
        `
      : css`
          font-size: 11px;
          line-height: 18px;
          letter-spacing: 0.25px;
          margin-top: 14px;
        `};

  &:hover {
    color: ${theme.colors.darkPinkHover};

    svg {
      stroke: ${theme.colors.darkPinkHover};
    }
  }

  svg {
    transition: stroke 0.2s ease-in-out 0s;
    stroke: ${theme.colors.darkPink};
  }
  ${space};
`;

export const CoachListItemWrapper = styled.div`
  padding: 0 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${(props) => css`
    max-width: ${props.maxWidth}px;
    min-width: ${props.minWidth}px;
  `};
`;

export const UserPicName = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
  color: ${theme.colors.gray1000};
  text-align: center;
  margin: 0;
`;

export const CoachDetails = ({ to, children, bigFont, ...rest }) => (
  <CoachDetailsWrapper bigFont={bigFont} to={to} {...rest}>
    {children}
    <SvgIcon name="arrow-right" width="16px" height="16px" />
  </CoachDetailsWrapper>
);

export const CoachCertificate = ({ children, id, status, ...rest }) => {
  return (
    <CoachCertificateWrapper {...rest}>
      <SvgIcon
        name={id}
        width="24px"
        height="24px"
        stroke={status ? theme.colors.darkPink : theme.colors.gray500}
      />
      <Divider />
      <CoachCertificateStatus>{children}</CoachCertificateStatus>
    </CoachCertificateWrapper>
  );
};
