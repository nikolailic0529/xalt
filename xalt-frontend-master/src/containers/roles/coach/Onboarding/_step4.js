/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import ProfileActions from 'lib/redux/reducers/profile';
import { CardInputError } from 'components/shared/Checkout';
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

import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep4 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const [coachIntensity, setCoachIntensity] = useState(onboardingProfile.coach_intensity || '');
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (coachIntensity.length === 0) {
      setIsError(true);
    } else {
      changeOnboardingProfile('coach_intensity', coachIntensity);
      const newOnboardingProfile = { ...onboardingProfile, coach_intensity: coachIntensity };
      updateMemberProfileRequest(newOnboardingProfile, role, profileId);
      history.push('/coach-onboarding-5');
    }
  };

  const handleChange = (e) => {
    setCoachIntensity(e.target.value);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 4 of 10</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="40">
            40%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px" mb="40px">
              <Heading center>What level of intensity do you most typically coach with?</Heading>
              <Paragraph maxWidth="580px" big center>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="intensity"
                    name="intensity"
                    value={coachIntensity}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="not-intense" control={<Radio />} label="Not intense" />
                    <FormControlLabel
                      value="little-intense"
                      control={<Radio />}
                      label="A little intense"
                    />
                    <FormControlLabel
                      value="somewhat-intense"
                      control={<Radio />}
                      label="Somewhat intense"
                    />
                    <FormControlLabel value="intense" control={<Radio />} label="Intense" />
                    <FormControlLabel
                      value="extremely-intense"
                      control={<Radio />}
                      label="Extremely intense"
                    />
                    <FormControlLabel
                      value="flexible"
                      control={<Radio />}
                      label="I’m flexible to match clients needs"
                    />
                  </RadioGroup>
                </FormControl>
              </Paragraph>
              {isError && (
                <CardInputError mt={3}>You must choose from 1 to 3 options!</CardInputError>
              )}
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/coach-onboarding-3">
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
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep4);
