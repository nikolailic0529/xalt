import React from 'react';
import styled from 'styled-components';
import { layout, space, color, shadow, border, flexbox, typography, position } from 'styled-system';
import ButtonAux from 'components/shared/ButtonAux';
import { BaseText } from 'components/shared/General';
import { useHistory } from 'react-router-dom';

import { theme } from 'components';

const PricingCardWrapper = styled.div`
  ${layout};
  ${space};
`;

PricingCardWrapper.defaultProps = {
  width: ['100%', null, null, '50%'],
  padding: '12px',
};

const PricingCard = styled.div`
  ${layout};
  ${space};
  ${flexbox};
  ${shadow};
  ${border};
  cursor: pointer;
  border: 2px solid ${theme.colors.white};
  &:hover {
    border-color: ${theme.colors.darkPink};
  }
`;

PricingCard.defaultProps = {
  width: '100%',
  padding: ['28px 42px', null, null, '56px 84px'],
  display: 'flex',
  flexDirection: ['column', null, 'row', 'column'],
  justifyContent: ['space-between', null, null, 'flex-start'],
  alignItems: ['center', null, 'center', 'center'],
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
  borderRadius: '5px',
};

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceDetailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PriceWrapper = styled.div`
  ${layout};
  ${flexbox};
  ${space};
`;

PriceWrapper.defaultProps = {
  display: 'flex',
  minWidth: 216,
};

const PriceTextWrapper = styled.div`
  ${layout};
  ${flexbox};
  ${space};
`;

PriceTextWrapper.defaultProps = {
  display: 'flex',
  minWidth: 200,
};

const PriceText = styled.span`
  ${typography};
  ${color};
  ${space};
`;

PriceText.defaultProps = {
  fontSize: ['12px', null, '18px', null],
  lineHeight: '25px',
  color: '#39393C',
  letterSpacing: '0.2px',
  flexGrow: 1,
};

const PricingCardDescription = styled.div`
  ${space};
  ${layout};
  ${flexbox};
  ${color};
  ${typography};
`;

PricingCardDescription.defaultProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  color: 'black',
  fontSize: '18px',
  lineHeight: '30px',
  letterSpacing: '0.2px',
  maxWidth: 380,
  minWidth: ['100%', null, 264, null],
  minHeight: ['unset', null, null, '136px'],
};

export const PricingInfoBlock = styled.div`
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${shadow};
  ${border};
  ${position}
`;

PricingInfoBlock.defaultProps = {
  position: 'absolute',
  right: -150,
  bg: '#39393C',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '850px',
  padding: '20px 60px',
};

const Card = (props) => {
  const {
    id,
    description,
    boldText,
    type,
    amount,
    width,
    flexDirection,
    justifyContent,
    alignSelf,
    header,
    title,
    btnLink,
    btnName,
    info,
    additionalInfo,
    children,
    requireCoach,
  } = props;

  const history = useHistory();

  const handleClick = () => {
    if (type === 'assessment' || type === 'rehabilitation') {
      localStorage.setItem(
        type === 'assessment' ? 'measure_assessment' : 'rehabilitation',
        JSON.stringify({
          value: true,
          expiry: Math.floor(Date.now() / 1000),
        }),
      );
    }
    history.push(btnLink || '/registration?role=member');
  };

  return (
    <PricingCardWrapper width={width}>
      <PricingCard flexDirection={flexDirection} justifyContent={justifyContent} key={id}>
        <PriceContainer>
          {header && (
            <PriceTextWrapper>
              <BaseText fontWeight={500} fontSize="24px" lineHeight="60px" color="darkPink">
                {header}
              </BaseText>
            </PriceTextWrapper>
          )}
          <PriceDetailWrapper>
            <PriceWrapper flexDirection="column" minWidth={type === 'assessment' ? 350 : 220}>
              {title && (
                <PriceTextWrapper>
                  <PriceText fontSize="48px" lineHeight="40px" fontWeight={500} color="darkPink">
                    {title}
                  </PriceText>
                </PriceTextWrapper>
              )}
              {amount && type && (
                <PriceTextWrapper m="10px 0 0 0">
                  <PriceText fontSize="36px" lineHeight="40px" fontWeight={400} color="darkPink">
                    {`$${Number(amount)}`}
                  </PriceText>
                  <PriceText fontSize="12px" p="12px 8px 8px" color="#7E7E7E">
                    {` / ${type}`}
                  </PriceText>
                </PriceTextWrapper>
              )}
              {info && (
                <PriceTextWrapper>
                  <PriceText fontSize="12px" color="#7E7E7E">
                    {info}
                  </PriceText>
                </PriceTextWrapper>
              )}
            </PriceWrapper>
            <PriceText m="0 0 0 30px">
              {boldText && (
                <b>
                  {`${boldText}`}
                  {requireCoach ? <sup>*</sup> : ''}{' '}
                </b>
              )}
              {description}
              {additionalInfo && (
                <PriceText fontSize="14px" color="#7E7E7E">
                  {` ${additionalInfo}`}
                </PriceText>
              )}
            </PriceText>
          </PriceDetailWrapper>
        </PriceContainer>
        <ButtonAux
          pinkBrdrBtn={false}
          pinkBtn
          minWidth="124px"
          m="20px 0 0 0"
          alignSelf={alignSelf}
          onClick={handleClick}
        >
          {btnName || 'SIGN UP'}
        </ButtonAux>
        {children}
      </PricingCard>
    </PricingCardWrapper>
  );
};

export default Card;
