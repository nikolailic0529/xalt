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

const RestorePasswordSuccess = () => {
  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>A password has been success updated</Heading>
              <InnerLink to="/login" m="24px 0 0">
                <ButtonAux pinkBtn>Go to the login</ButtonAux>
              </InnerLink>
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

export default RestorePasswordSuccess;
