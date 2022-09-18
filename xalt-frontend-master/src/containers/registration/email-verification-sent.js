import React from 'react';

import InnerLink from 'components/shared/InnerLink';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingStepWrapper,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import ButtonAux from 'components/shared/ButtonAux';

const SuccessRegistration = () => (
  <OnboardingBlock>
    <OnboardingWrapper>
      <OnboardingHeader>
        <XaltLogoLink />
      </OnboardingHeader>
      <OnboardingMain>
        <OnboardingStepWrapper>
          <Container min centered mt="40px">
            <Heading center>
              A verification link has been sent to your email account
            </Heading>
            <Paragraph maxWidth="580px" big center>
              Please, click on the link that has just been sent to your email
              account to verify your email and continue the registration
              process. Make sure to check your junk or spam folder if you did
              not receive an email in your inbox.
            </Paragraph>
            <InnerLink to="/login" m="24px 0 0">
              <ButtonAux pinkBtn>Go to the login</ButtonAux>
            </InnerLink>
          </Container>
        </OnboardingStepWrapper>
      </OnboardingMain>
    </OnboardingWrapper>
  </OnboardingBlock>
);

export default SuccessRegistration;
