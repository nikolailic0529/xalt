import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileActions from 'lib/redux/reducers/profile';

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
  OnboardingPrevBtn,
  OnboardingNextBtn,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import OnboardingSlider from 'components/shared/OnboardingSlider';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep2 = (props) => {
  const {
    changeOnboardingProfile,
    updateMemberProfileRequest,
    currentTime,
    onboardingProfile,
    role,
    profileId,
  } = props;

  const [time, setTime] = useState(currentTime || 1);

  const setSpentTime = () => {
    changeOnboardingProfile('hours_spend_last_week', time);
    updateMemberProfileRequest(onboardingProfile, role, profileId);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 2 of 5</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="40">
            40%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>
                How many hours did you spend exercising/moving in the past week?
              </Heading>
              <Paragraph maxWidth="580px" big center>
                Movement is any form of exercise and/or activity that is at least of a
                moderate-intesnity and that raises your heart rate.
              </Paragraph>
              <OnboardingSlider startValue={time} setTime={setTime} min={0.5} max={10} step={0.5} />
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/member-onboarding">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <Link to="/member-onboarding-3">
              <OnboardingNextBtn onClick={setSpentTime} pinkBtn width="100px">
                Next
              </OnboardingNextBtn>
            </Link>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  currentTime: state.profile.onboardingProfile.hours_spend_last_week,
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
  profileId: state.profile?.member_profile?.id ? state.profile.member_profile.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep2);
