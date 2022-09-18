import React from 'react';
import styled, { css } from 'styled-components';
import { Tooltip } from 'antd';

import Flex from 'components/shared/Flex';
import SvgIcon from 'components/shared/SvgIcon';
import colors from 'lib/theme/colors';

const OnboardingCardWrapper = styled(Flex)`
  width: 100%;
  padding: 0 0 82.7%;
  flex-direction: column;
  position: relative;

  input {
    position: absolute;
    left: -9999px;
  }

  input[type='checkbox'] + label {
    align-items: center;
    ${(props) =>
      css`
        justify-content: ${props.index ? 'center' : 'flex-start'};
      `};
    flex-direction: column;
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid ${colors.white};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
    transition: all 0.2s ease-in-out 0s;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: 0.2px;
    font-family: 'Roboto', sans-serif;
    color: ${colors.gray1000};
    cursor: pointer;
    padding: 0 16px 16px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
    @media (min-width: 769px) {
      font-size: 16px;
    }

    &:hover {
      border-color: ${colors.darkPink};
    }
  }

  input[type='checkbox'] + label::before {
    content: '';
    display: block;
    width: 24px;
    height: 23px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAYAAABu3ppsAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFDSURBVHgB7ZhBTsMwEEXHOQFbJBacBQ5COQIHABW4ADcgHATOwqJStzlBpv5WpVZtJnGceOzFvE2bypbfW1gdhcgwDMMwjHI4qpT949sTO/7yhp3r3fb29+NnaF1DFXKUb/3XG2K6DyEC1QWcyZ9g6qT1VQUMynt6pndpTzV3QJTv6fnu77OV9lURkCoPigcskQdFA5bKg2IBa8iDIgFryQP1gDXlgWrA2vLATRw2OYvEkkMeiP/E3PCWTrNICwFKJJc8kEcJ9vLnj4kROeWBGOAPeLn8bW5Ebnkweol3D6+bpqHvq03sNlN3QkM+uEwtSInQkg8eMYvmRGjKB4fYhTER2vLh/DmLxyLwqS0fzqaZSBFD5JYHSaNETISGPEiehcYitOTBomFuKEJTHix6KwFRCPux498/dtryhmEYhmGU5gAfQBfuo0Nf1AAAAABJRU5ErkJggg==')
      0 0 no-repeat;
    background-size: 24px 23px;
    transition: opacity 0.2s ease-in-out 0s;
    opacity: 0;
    position: absolute;
    right: 13px;
    top: 14px;
  }

  input[type='checkbox']:checked + label {
    color: ${colors.darkPink};
    border-color: ${colors.darkPink};

    &::before {
      opacity: 1;
    }
  }

  .number {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 900;
    letter-spacing: 0.5px;
    color: #e6447d;
    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 32px;
    }
    @media (min-width: 769px) {
      font-size: 30px;
      line-height: 76px;
    }
  }
`;

const TooltipIcon = styled(SvgIcon)`
  stroke: #d7d7d8;
  position: absolute;
  top: 16px;
  left: 14px;
`;

const OnboardingCost = styled(Flex)`
  font-weight: 300;
  color: ${colors.gray1000};
`;

const OnboardingCard = (props) => {
  const { children, id, tooltipText, onClick, cost, checked, index, iconName } = props;

  return (
    <OnboardingCardWrapper index={index}>
      <input id={id} type="checkbox" checked={checked} onChange={onClick} />
      <label htmlFor={id}>
        {tooltipText && (
          <Tooltip placement="bottom" title={tooltipText}>
            <TooltipIcon name="onboardingTooltip" fill={colors.white} width="24px" height="24px" />
          </Tooltip>
        )}
        {cost ? (
          <div className="number">{cost}</div>
        ) : (
          <SvgIcon
            name={iconName}
            width="52px"
            height="62px"
            fill={checked ? colors.darkPink : '#000'}
            stroke={checked ? colors.darkPink : '#000'}
            mt="23%"
            mb="24px"
          />
        )}
        {children}
        {/* {cost && <OnboardingCost>{cost}</OnboardingCost>} */}
      </label>
    </OnboardingCardWrapper>
  );
};

export default OnboardingCard;
