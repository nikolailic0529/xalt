/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Grid } from '@material-ui/core';
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

const OnboardingStep3 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const [exercisePlace, setExercisePlace] = useState(
    !onboardingProfile.exercise_places
      ? []
      : Array.isArray(onboardingProfile.exercise_places)
      ? onboardingProfile.exercise_places
      : Object.keys(onboardingProfile.exercise_places),
  );
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (exercisePlace.length === 0) {
      setIsError(true);
    } else {
      changeOnboardingProfile('exercise_places', exercisePlace);
      const newOnboardingProfile = { ...onboardingProfile, exercise_places: exercisePlace };
      updateMemberProfileRequest(newOnboardingProfile, role, profileId);
      history.push('/member-onboarding-4');
    }
  };

  const handleChange = (e) => {
    const newExercisePlace = exercisePlace.includes(e.target.name)
      ? exercisePlace.filter((style) => style !== e.target.name)
      : [...exercisePlace, e.target.name];
    setExercisePlace(newExercisePlace);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 3 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="25">
            25%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px" mb="40px">
              <Heading center>Where do you typically exercise? Choose all that apply.</Heading>
              <Paragraph maxWidth="620px" big center>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exercisePlace.includes('gym')}
                              onChange={handleChange}
                              name="gym"
                            />
                          }
                          label="Gym"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exercisePlace.includes('fitness-studio')}
                              onChange={handleChange}
                              name="fitness-studio"
                            />
                          }
                          label="Fitness Studio"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exercisePlace.includes('home')}
                              onChange={handleChange}
                              name="home"
                            />
                          }
                          label="Home"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exercisePlace.includes('outdoors')}
                              onChange={handleChange}
                              name="outdoors"
                            />
                          }
                          label="Outdoors"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exercisePlace.includes('not-exercise')}
                              onChange={handleChange}
                              name="not-exercise"
                            />
                          }
                          label="I don't exercise at the moment"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </FormControl>
              </Paragraph>
              {isError && (
                <CardInputError mt={3}>You must choose at least 1 option!</CardInputError>
              )}
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/member-onboarding-2">
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
  profileId: state.profile?.member_profile?.id ? state.profile.member_profile.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep3);
