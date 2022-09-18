import React, { useState } from 'react';
import styled from 'styled-components';
import { Slider, InputNumber } from 'antd';

import Flex from 'components/shared/Flex';
import colors from 'lib/theme/colors';

const OnboardingSliderWrapper = styled(Flex)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 556px) {
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 557px) {
    flex-direction: row;
    align-items: flex-start;
  }

  .ant-slider {
    width: 100%;
    margin: 0;

    &:hover {
      .ant-slider-track {
        background: ${colors.darkPink};
      }

      .ant-slider-rail {
        background: ${colors.gray175};
      }
    }
  }

  .ant-slider-rail {
    height: 10px;
    border-radius: 5px;
    background: ${colors.gray175};
  }

  .ant-slider-track {
    background: ${colors.darkPink};
    height: 10px;
    border-radius: 5px;
  }

  .ant-slider-handle {
    width: 18px;
    height: 18px;
    background: linear-gradient(
      113.19deg,
      ${colors.kingfisherDaisy} 3.41%,
      ${colors.darkPink} 100%
    );
    box-shadow: 0px 1px 2px rgba(51, 51, 51, 0.12);
    border: none;
  }

  .ant-input-number {
    width: 124px;
    height: 56px;
    border-radius: 10px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0px 1px 2px rgb(51 51 51 / 6%);
    border: 1px solid ${colors.darkPink};
    background: ${colors.gray75};
    color: ${colors.darkPink};
    margin: 4px 0 0;

    &::before {
      content: 'hours';
      display: inline-block;
      position: absolute;
      top: 50%;
      right: 14px;
      margin-top: -12px;
    }
  }

  .ant-input-number-input {
    padding: 0 24px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
  }

  .ant-input-number-handler-wrap {
    display: none;
  }
`;

const OnboardingSliderLeft = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 556px) {
    width: 100%;
    margin: 0 0 24px;
  }
  @media (min-width: 557px) {
    width: calc(100% - 148px);
  }
`;

const OnboardingSliderMax = styled(Flex)`
  display: inline-block;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: 0.25px;
  font-weight: 400;
  color: ${colors.gray1000};
  letter-spacing: 0.25px;
  margin: 0 0 5px;
`;

const OnboardingSlider = (props) => {
  const min = parseInt(props.min);
  const max = parseInt(props.max);
  const [inputValue, setInputValue] = useState(props.startValue);

  const onChange = (value) => {
    props.setTime(value);
    setInputValue(value);
  };

  return (
    <OnboardingSliderWrapper>
      <OnboardingSliderLeft>
        <OnboardingSliderMax> {max} hours</OnboardingSliderMax>
        <Slider
          min={min}
          max={max}
          onChange={onChange}
          step={props.step || 1}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </OnboardingSliderLeft>
      <InputNumber min={min} max={max} value={inputValue} onChange={onChange} />
    </OnboardingSliderWrapper>
  );
};

export default OnboardingSlider;
