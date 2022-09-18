import styled from 'styled-components';
import { space, width, position, layout, flexbox } from 'styled-system';

import { theme } from 'components';
import Flex from 'components/shared/Flex';
import ButtonAux from 'components/shared/ButtonAux';

export const OnboardingBlock = styled(Flex)`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.white};
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const StaticOnboardingBlock = styled(Flex)`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.white};
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  top: 0;
  left: 0;
`;

export const OnboardingWrapper = styled(Flex)`
  width: 100%;
  flex: 1 0 auto;
  padding: 0;
`;

export const OnboardingHeader = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 19px 0 17px;
  }
  @media (min-width: 769px) {
    min-height: 95px;
    padding: 25px 0 23px;
  }
`;

export const OnboardingMain = styled(Flex)`
  width: 100%;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 60px 0 0;
  }
  @media (min-width: 769px) {
    padding: 95px 0 0;
  }
`;

export const OnboardingFooter = styled(Flex)`
  flex-shrink: 0;
`;

export const OnboardingProgress = styled.progress`
  width: 100%;
  height: 9px;
  position: fixed;
  left: 0;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  z-index: 15;

  @media (max-width: 768px) {
    top: 74px;
  }
  @media (min-width: 769px) and (max-width: 1023px) {
    top: 96px;
  }
  @media (min-width: 1024px) {
    top: 104px;
  }

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

export const OnboardingStepWrapper = styled(Flex)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

export const OnboardingList = styled(Flex)`
  ${space};
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 24px);
`;

OnboardingList.defaultProps = {
  as: 'ul',
  m: '32px -12px 0',
};

export const OnboardingListItem = styled.li`
  padding: 12px;

  @media (max-width: 556px) {
    width: 100%;
  }
  @media (min-width: 557px) and (max-width: 768px) {
    width: 50%;
  }
  @media (min-width: 769px) {
    width: 33.33%;
  }
`;

export const OnboardingStep = styled.div`
  display: inline-flex;
  font-weight: 400;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
  color: ${theme.colors.gray};

  @media (max-width: 768px) {
    font-size: 11px;
    line-height: 18px;
    margin: 0;
  }
  @media (min-width: 769px) {
    font-size: 18px;
    line-height: 20px;
    margin: 3px 0 0;
  }
`;

export const OnboardingText = styled.div`
  display: inline-flex;
  height: 48px;
  border: 1px solid ${theme.colors.gray1000};
  border-radius: 10px;
  padding: 14px 32px;
  text-transform: uppercase;
  font-family: Work Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.005em;
  text-align: center;
`;

export const OnboardingPrevBtn = styled(ButtonAux)`
  @media (max-width: 768px) {
    z-index: 12;
  }
`;

export const OnboardingNextBtn = styled(ButtonAux)`
  @media (max-width: 768px) {
    z-index: 12;
  }
`;

export const OnboardingRadioRow = styled(Flex)`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 24px);
  margin: 12px -12px;
`;

export const LoginWrapper = styled(Flex)`
  display: flex;
  width: 100%;
  max-width: 612px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  ${space};
`;

LoginWrapper.defaultProps = {
  m: '0 auto',
};

export const LoginFormWrapper = styled(Flex)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  ${space};
  ${width};

  form {
    width: 100%;
  }
`;

LoginFormWrapper.defaultProps = {
  w: '100%',
  m: '40px 0 0',
};

export const LoginFormItem = styled(Flex)`
  display: flex;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;

  ${space};
  ${width};
  ${layout};
`;

LoginFormItem.defaultProps = {
  w: '100%',
  alignItems: 'center',
  m: '0 0 24px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

export const LoginFormFooter = styled.div`
  display: inline-block;
  line-height: 1.25;
  font-weight: 400;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
  color: ${theme.colors.gray};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 769px) {
    font-size: 16px;
  }

  ${space};
  ${width};
`;

LoginFormFooter.defaultProps = {
  w: '100%',
  m: '8px 0 0',
};

export const OnboadringActionsContainer = styled.div`
  ${position};
  ${layout};
  ${space};
  ${flexbox};
  z-index: 12;
`;

OnboadringActionsContainer.defaultProps = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  p: [0, null, '0 32px'],
  position: 'fixed',
  bottom: ['unset', null, '112px'],
  top: ['15px', null, 'unset'],
  height: 0,
};

export const OnboadringActionsWrapper = styled.div`
  ${layout};
  ${flexbox};
`;

OnboadringActionsWrapper.defaultProps = {
  display: 'flex',
  width: ['calc(100% - 48px)', null, 'calc(100% - 96px)'],
};
