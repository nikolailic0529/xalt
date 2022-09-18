import React from 'react';
import styled from 'styled-components';
import { typography, space, color, position } from 'styled-system';

import Flex from 'components/shared/Flex';
import { theme } from 'components';

export const PillarsHealthWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;
PillarsHealthWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'white',
  pt: [6, null, 8, null, null],
  pb: [6, null, 9, null, null],
};

export const PillarsHealthTitle = styled.span`
  display: block;

  ${typography};
  ${color};
  ${space};
`;
PillarsHealthTitle.defaultProps = {
  fontSize: ['20px', null, '48px', null, null],
  fontWeight: '500',
  lineHeight: ['32px', null, '60px', null, null],
  letterSpacing: '0.25',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: 'gray1000',
  m: ['0 0 24px', null, null, '0 0 32px', null],
};

export const PillarsHealthDescription = styled.span`
  display: block;

  ${typography};
  ${color};
  ${space};
`;

PillarsHealthDescription.defaultProps = {
  fontSize: ['16px', null, '24px', null, null],
  fontWeight: '400',
  lineHeight: ['24px', null, '28px', null, null],
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  color: theme.colors.gray1000,
  m: ['0 0 24px', null, null, '0 0 40px', null],
};

export const PillarsHealthText = styled.span`
  display: block;

  ${typography};
  ${color};
  ${space};
`;
PillarsHealthText.defaultProps = {
  fontSize: ['16px', null, '18px', null, null],
  fontWeight: '400',
  lineHeight: ['24px', null, '28px', null, null],
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  color: theme.colors.gray1000,
  m: ['24px 0 40px', null, null, '32px 0 80px', null],
};

export const PillarsHealthList = styled(Flex)``;
PillarsHealthList.defaultProps = {
  width: 'calc(100% + 24px)',
  flexWrap: 'wrap',
  flexDirection: ['column', 'row', null, null, null],
  ml: '-12px',
  mr: '-12px',
};

const PillarsHealthItemWrapper = styled(Flex)``;
PillarsHealthItemWrapper.defaultProps = {
  width: ['100%', '50%', null, null, null],
  flexDirection: 'column',
  p: '28px 12px',
};

const PillarsHealthItemBox = styled(Flex)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
`;
PillarsHealthItemBox.defaultProps = {
  width: '100%',
  height: '100%',
  minHeight: ['auto', '273px', null, null],
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  borderRadius: '5px',
  p: '72px 16px 40px',
  position: 'relative',
};

const PillarsHealthItemTitle = styled.span`
  display: block;
  ${typography};
  ${color};
  ${space};
`;
PillarsHealthItemTitle.defaultProps = {
  fontSize: ['20px', null, '25px', null],
  fontWeight: '700',
  lineHeight: ['24px', null, '28px', null],
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  color: theme.colors.gray1000,
};
const PillarsHealthItemDescription = styled.span`
  display: block;
  ${typography};
  ${color};
  ${space};
`;
PillarsHealthItemDescription.defaultProps = {
  fontSize: ['14px', null, '18px', null],
  fontWeight: '400',
  lineHeight: ['24px', null, '28px', null],
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  color: theme.colors.gray1000,
};

const PillarsHealthItemNumber = styled.span`
  display: inline-block;
  background: linear-gradient(113.19deg, #652f79 3.41%, #e6447d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${typography};
  ${color};
  ${space};
  ${position};
`;
PillarsHealthItemNumber.defaultProps = {
  fontSize: '80px',
  fontWeight: '900',
  lineHeight: '80px',
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.5',
  textAlign: 'left',
  position: 'absolute',
  top: '-34px',
  left: '14px',
};

export const PillarsHealthItem = (props) => {
  const { id, title, description } = props.item;

  return (
    <PillarsHealthItemWrapper>
      <PillarsHealthItemBox>
        <PillarsHealthItemNumber>{id}</PillarsHealthItemNumber>
        <PillarsHealthItemTitle>{title}</PillarsHealthItemTitle>
        <PillarsHealthItemDescription>
          {description}
        </PillarsHealthItemDescription>
      </PillarsHealthItemBox>
    </PillarsHealthItemWrapper>
  );
};
