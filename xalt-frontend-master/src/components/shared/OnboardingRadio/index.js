import React from 'react';
import styled from 'styled-components';

import Flex from 'components/shared/Flex';
import SvgIcon from 'components/shared/SvgIcon';
import colors from 'lib/theme/colors';

const OnboardingRadioWrapper = styled(Flex)`
  input {
    position: absolute;
    left: -9999px;
  }

  input[type='radio'] + label {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    min-width: 240px;
    height: 48px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
    font-family: 'Roboto', sans-serif;
    padding: 0 24px;

    transition: all 0.2s ease-in-out 0s;
    border-radius: 10px;
    text-align: center;
    text-transform: uppercase;

    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
    -webkit-touch-callout: none;
    border-width: 2px;
    border-style: solid;
    color: #b1b1b1;
    border-color: #e1e1e1;
    background: #f7f7f7;
    margin: 12px;

    &:hover {
      border-color: ${colors.darkPink};
    }
  }
  input[type='radio']:checked + label {
    font-size: 18px;
    letter-spacing: 0.2px;
    color: ${colors.darkPink};
    border-color: ${colors.darkPink};
    background: ${colors.white};
  }
`;

const OnboardingRadio = (props) => {
  const {children, id, name, onClick, checked} = props;

  return (
    <OnboardingRadioWrapper>
      <input id={id} type="radio" checked={checked} onChange={onClick} name={name} />
      <label htmlFor={id}>{children}</label>
    </OnboardingRadioWrapper>
  );
};

export default OnboardingRadio;
