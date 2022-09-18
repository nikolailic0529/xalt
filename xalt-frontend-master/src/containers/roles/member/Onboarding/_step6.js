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

const OnboardingStep6 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const [genderPreference, setGenderPreference] = useState(
    !onboardingProfile.coach_gender_preference
      ? []
      : Array.isArray(onboardingProfile.coach_gender_preference)
      ? onboardingProfile.coach_gender_preference
      : Object.keys(onboardingProfile.coach_gender_preference),
  );
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (genderPreference.length === 0) {
      setIsError(true);
    } else {
      changeOnboardingProfile('coach_gender_preference', genderPreference);
      const newOnboardingProfile = {
        ...onboardingProfile,
        coach_gender_preference: genderPreference,
      };
      updateMemberProfileRequest(newOnboardingProfile, role, profileId);
      history.push('/member-onboarding-7');
    }
  };

  const handleChange = (e) => {
    const newGenderPreference = genderPreference.includes(e.target.name)
      ? genderPreference.filter((style) => style !== e.target.name)
      : [...genderPreference, e.target.name];
    setGenderPreference(newGenderPreference);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 6 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="50">
            50%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px" mb="40px">
              <Heading center>For your ideal coach, what gender do you prefer?</Heading>
              <Paragraph maxWidth="620px" big center>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={genderPreference.includes('male')}
                              onChange={handleChange}
                              name="male"
                            />
                          }
                          label="Male"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={genderPreference.includes('female')}
                              onChange={handleChange}
                              name="female"
                            />
                          }
                          label="Female"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={genderPreference.includes('other')}
                              onChange={handleChange}
                              name="other"
                            />
                          }
                          label="Other"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={genderPreference.includes('no-preference')}
                              onChange={handleChange}
                              name="no-preference"
                            />
                          }
                          label="No preference"
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
            <Link to="/member-onboarding-5">
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);
