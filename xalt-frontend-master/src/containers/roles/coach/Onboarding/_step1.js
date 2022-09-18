import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingStep,
  OnboardingStepWrapper,
  OnboardingProgress,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
  OnboardingPrevBtn,
  OnboardingNextBtn,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import ProfileActions from 'lib/redux/reducers/profile';

import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep1 = (props) => {
  const {
    onboardingProfile,
    role,
    profileId,
    createMemberProfileRequest,
    updateMemberProfileRequest,
    changeOnboardingProfile,
  } = props;
  const history = useHistory();
  const [gender, setGender] = useState(onboardingProfile.gender || 'male');

  const handleClick = () => {
    changeOnboardingProfile('gender', gender);
    if (profileId) {
      updateMemberProfileRequest(onboardingProfile, role, profileId);
    } else {
      createMemberProfileRequest(onboardingProfile, role);
    }
    history.push('/coach-onboarding-2');
  };

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 1 of 10</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="10">
            10%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>What is your gender?</Heading>
              <Paragraph maxWidth="580px" big center>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Paragraph>
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/coach-onboarding-2">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <div>
              <OnboardingNextBtn onClick={handleClick} pinkBtn width="100px">
                Next
              </OnboardingNextBtn>
            </div>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
  profileId: state.profile?.coach_profile?.id ? state.profile.coach_profile.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  createMemberProfileRequest: (onboardingProfile, role) =>
    dispatch(ProfileActions.createMemberProfileRequest(onboardingProfile, role)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep1);
