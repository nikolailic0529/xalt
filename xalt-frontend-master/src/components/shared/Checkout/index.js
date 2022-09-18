/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { css } from 'styled-components';
import { space, width, color, typography, flexbox } from 'styled-system';

import Flex from 'components/shared/Flex';
import { theme } from 'components';

export const CheckoutWrapper = styled(Flex)`
  max-width: 620px;
`;
CheckoutWrapper.defaultProps = {
  width: '100%',
  flexDirection: 'column',
  m: '0 auto',
};

export const CheckoutBlock = styled(Flex)`
  background: ${theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 20px;

  @media screen and (max-width: 640px) {
    margin: 24px auto 24px;
  }
  @media screen and (min-width: 641px) {
    margin: 40px auto 24px;
  }
`;
CheckoutBlock.defaultProps = {
  width: '100%',
  flexDirection: 'column',
};

const CheckoutItemWrapper = styled(Flex)`
  ${flexbox};
  ${space};
  ${width};
  ${color};
  ${typography};

  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 16px;
  }
  @media screen and (min-width: 641px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px 40px;
  }
`;
CheckoutItemWrapper.defaultProps = {
  width: '100%',
  m: 0,
};

const CheckoutItemDescr = styled.div`
  display: inline-flex;
  flex-direction: column;

  font-size: 50px;
  line-height: 46px;
  font-weight: 900;
  letter-spacing: 0.5px;
  font-family: 'Roboto', sans-serif;
  min-width: 160px;
  margin-left: 30px;
  color: ${theme.colors.gray1000};
  span {
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  @media screen and (max-width: 640px) {
    align-items: center;
  }
  @media screen and (min-width: 641px) {
    align-items: flex-start;
  }
`;

const CheckoutItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  p {
    color: #39393c;
    font-size: 14px;
    line-height: 138.19%;
    margin: 0;
    margin-bottom: 10px;
  }

  input {
    border-radius: 8px;
    border: 1px solid #39393c;
    padding: 5px;
    max-width: 70px;
  }

  .total {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-weight: bold;

    span {
      color: ${theme.colors.darkPink};
      margin-left: 10px;
    }
  }
`;

export const CheckoutItem = (subscription) => {
  const handleChange = (e) => {
    subscription.setLessonCount(e.target.value);
  };

  return (
    <CheckoutItemWrapper>
      {subscription.subscription && subscription.payType === 'subscription' ? (
        <>
          <CheckoutItemDetail>
            <p>
              In-depth, 90-minute assessment with your trainer to obtain measures of muscular
              strength, endurance, and mobility for more than 20 muscle groups and joint segements.
              Purchase includes lifetime access to a personalized report to track and compare score
              over time!
            </p>
            <div className="total">
              Total:
              <span>
                ${subscription.subscription?.amount}/{subscription.subscription?.type}
              </span>
            </div>
          </CheckoutItemDetail>
          <CheckoutItemDescr>
            <span>{subscription.subscription?.description}</span>
          </CheckoutItemDescr>
        </>
      ) : subscription.payType === 'rehabilitation' ? (
        <>
          <CheckoutItemDetail>
            <p>A comprehensive recovery program with you from start to finish.</p>
            <div className="total">
              Total:
              <span>$1100 CAD</span>
            </div>
          </CheckoutItemDetail>
          <CheckoutItemDescr style={{ minWidth: 160, marginLeft: 30 }}>
            <span>$1100 / rehabilitation</span>
          </CheckoutItemDescr>
        </>
      ) : (
        // ) : subscription.payType === 'measurement' ? (
        <>
          <CheckoutItemDetail>
            <p>
              In-depth, 90-minute assessment with your trainer to obtain measures of muscular
              strength, endurance, and mobility for more than 20 muscle groups and joint segements.
              Purchase includes lifetime access to a personalized report to track and compare score
              over time!
            </p>
            <div className="total">
              Total:
              <span>$150</span>
            </div>
          </CheckoutItemDetail>
          <CheckoutItemDescr style={{ minWidth: 160, marginLeft: 30 }}>
            <span>$150 / assessment</span>
          </CheckoutItemDescr>
        </>
      )}
      {/* : (
        <>
          <CheckoutItemDetail>
            <p>Personalized, 1-hour training sessions with an expert trainer on xAlt.</p>
            <p>
              Number of sessions purchasing:{' '}
              <input
                type="number"
                value={subscription.lessonCount}
                onChange={handleChange}
                min={1}
              />
            </p>
            <div className="total">
              Total:
              <span>${subscription.lessonCount * subscription.rate}</span>
            </div>
          </CheckoutItemDetail>
          <CheckoutItemDescr>
            <span>{`$${subscription.rate} / hour`}</span>
          </CheckoutItemDescr>
        </>
      )} */}
    </CheckoutItemWrapper>
  );
};

export const CheckoutFormWrapper = styled(Flex)`
  width: calc(100% + 24px);
  margin: 0 -12px;

  @media screen and (max-width: 640px) {
  }
  @media screen and (min-width: 641px) {
  }
`;
CheckoutFormWrapper.defaultProps = {
  width: '100%',
  flexDirection: 'column',
};

export const CheckoutFormRow = styled(Flex)`
  @media screen and (max-width: 640px) {
    ${(props) =>
      props.twoTwo &&
      css`
        flex-direction: column;
      `};
  }
  @media screen and (min-width: 641px) {
    ${(props) =>
      props.twoTwo &&
      css`
        flex-direction: row;
      `};
  }
`;
export const CheckoutFormCol = styled(Flex)`
  @media screen and (max-width: 640px) {
    ${(props) =>
      props.oneTwo
        ? css`
            width: 100%;
          `
        : props.fullWidth &&
          css`
            width: 100%;
          `};
  }
  @media screen and (min-width: 641px) {
    ${(props) =>
      props.oneTwo
        ? css`
            width: 50%;
          `
        : props.fullWidth &&
          css`
            width: 100%;
          `};
  }
`;
CheckoutFormCol.defaultProps = {
  flexDirection: 'column',
  p: '12px',
};
export const CheckoutFormRowItem = styled(Flex)``;

export const CardInput = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
  color: ${theme.colors.gray1000};
  border: 1px solid ${theme.colors.gray1000};
  border-radius: 5px;

  @media screen and (max-width: 640px) {
    padding: 12px 16px;
  }
  @media screen and (min-width: 641px) {
    padding: 18px 32px 20px 32px;
  }

  ${(props) =>
    props.fontWide
      ? css`
          letter-spacing: 4px;
        `
      : css`
          letter-spacing: 0;
        `};
`;

export const CardInputError = styled.div`
  ${space};
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
  color: ${theme.colors.red};
  text-align: center;
`;

CardInputError.defaultProps = {
  mt: 1,
};
