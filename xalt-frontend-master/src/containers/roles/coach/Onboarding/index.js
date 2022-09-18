import React from 'react';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingProgress,
  OnboardingStepWrapper,
  OnboardingList,
  OnboardingListItem,
  OnboardingStep,
  OnboardingPrevBtn,
  OnboardingNextBtn,
  OnboardingRadioRow,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import OnboardingCard from 'components/shared/OnboardingCard';
import ButtonAux from 'components/shared/ButtonAux';
import SvgIcon from 'components/shared/SvgIcon';
import OnboardingRadio from 'components/shared/OnboardingRadio';
import OnboardingSlider from 'components/shared/OnboardingSlider';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

import colors from 'lib/theme/colors';

export default () => (
  <OnboardingBlock>
    <OnboardingWrapper>
      <OnboardingHeader>
        <XaltLogoLink />
        <OnboardingStep>Step 1 of 3</OnboardingStep>
        <LogoutDropdown />
      </OnboardingHeader>
      <OnboardingMain>
        <OnboardingProgress max="100" value="33.33">
          33.33%
        </OnboardingProgress>
        <OnboardingStepWrapper>
          <Container min centered mt="40px">
            <OnboardingSlider min="0" max="100" />
            <OnboardingRadioRow>
              <OnboardingRadio id="41" name="period">
                monthly
              </OnboardingRadio>
              <OnboardingRadio id="42" name="period">
                ANNUAL
              </OnboardingRadio>
            </OnboardingRadioRow>

            <SvgIcon
              name="onboardingSuccess"
              width="50px"
              height="50px"
              fill={colors.white}
              mt="0"
              mb="16px"
            />
            <Heading center mb="16px">
              Thank you, your card has been registred!
            </Heading>
            <Paragraph maxWidth="580px" big center mb="16px">
              Click next to head to your dashboard!
            </Paragraph>
            <ButtonAux pinkBtn width="100px">
              Next
            </ButtonAux>
          </Container>
        </OnboardingStepWrapper>
        <OnboardingStepWrapper>
          <Container min centered mt="40px">
            <Heading center>What is your health and fitness domain?</Heading>
            <Paragraph maxWidth="580px" big center>
              Letting us know what you specialize in or are comfortable with helps us pair you to
              clients within your domain!
            </Paragraph>
            <OnboardingList>
              <OnboardingListItem key="1">
                <OnboardingCard id="1" tooltipText="prompt text" cost="$1100/Annual">
                  Athletic Performance and Functional Training
                </OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="2">
                <OnboardingCard id="2">Strength and Conditioning</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="3">
                <OnboardingCard id="3">Fat Loss and Body Transformation</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="4">
                <OnboardingCard id="4">Fitness and Lifestyle Coaching</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="5">
                <OnboardingCard id="5">Mobility & Corrective Exercise</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="6">
                <OnboardingCard id="6">Muscle Building</OnboardingCard>
              </OnboardingListItem>
            </OnboardingList>
          </Container>
        </OnboardingStepWrapper>
        <OnboardingStepWrapper>
          <Container min centered mt="40px">
            <Heading center>What clientelle are you most comfortable working with?</Heading>
            <OnboardingList>
              <OnboardingListItem key="21">
                <OnboardingCard id="21">Youth</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="22">
                <OnboardingCard id="22">Adults</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="23">
                <OnboardingCard id="23">Senior(60+)</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="24">
                <OnboardingCard id="24">Member with health issues</OnboardingCard>
              </OnboardingListItem>
              <OnboardingListItem key="25">
                <OnboardingCard id="25">No prefrence</OnboardingCard>
              </OnboardingListItem>
            </OnboardingList>
          </Container>
        </OnboardingStepWrapper>
      </OnboardingMain>

      <OnboardingPrevBtn pinkBrdrBtn width="132px">
        Previous
      </OnboardingPrevBtn>
      <OnboardingNextBtn pinkBtn width="100px">
        Next
      </OnboardingNextBtn>
    </OnboardingWrapper>
  </OnboardingBlock>
);
