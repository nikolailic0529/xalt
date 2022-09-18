import React from 'react';
import { connect } from 'react-redux';
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
  OnboardingStep,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import ButtonAux from 'components/shared/ButtonAux';
import SvgIcon from 'components/shared/SvgIcon';

import AuthActions from 'lib/redux/reducers/auth';

import colors from 'lib/theme/colors';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep6 = (props) => {
  const {
    finishOnboardingRequest,
    onboardingProfile: { fitnes_domain_ids },
    role,
  } = props;

  const redirect = () => {
    finishOnboardingRequest({ fitnes_domain_ids }, role);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 4 of 4</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="100">
            100%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
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
              <ButtonAux onClick={() => redirect()} pinkBtn width="100px">
                Next
              </ButtonAux>
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  finishOnboardingRequest: (onboardingProfile, role) =>
    dispatch(AuthActions.finishOnboardingRequest(onboardingProfile, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);
