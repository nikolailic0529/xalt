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

const OnboardingStep9 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const [ratePreference, setRatePreference] = useState(
    !onboardingProfile.rate_preference
      ? []
      : Array.isArray(onboardingProfile.rate_preference)
      ? onboardingProfile.rate_preference
      : Object.keys(onboardingProfile.rate_preference),
  );
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (ratePreference.length === 0) {
      setIsError(true);
    } else {
      changeOnboardingProfile('rate_preference', ratePreference);
      const newOnboardingProfile = {
        ...onboardingProfile,
        rate_preference: ratePreference,
      };
      updateMemberProfileRequest(newOnboardingProfile, role, profileId);
      history.push('/member-onboarding-10');
    }
  };

  const handleChange = (e) => {
    const newRatePreference = ratePreference.includes(e.target.name)
      ? ratePreference.filter((style) => style !== e.target.name)
      : [...ratePreference, e.target.name];
    setRatePreference(newRatePreference);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 9 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="72">
            72%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px" mb="40px">
              <Heading center>
                What is your average price point per month to spend on training?
              </Heading>
              <Paragraph maxWidth="580px" big center>
                We ask this question because our coaches set their own rates per session. We want to
                ensure training on xAlt is accessible and fits your lifestyle! Don’t worry, you can
                always change your mind later.
              </Paragraph>
              <Paragraph maxWidth="200px" big center>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ratePreference.includes('85-100')}
                              onChange={handleChange}
                              name="85-100"
                            />
                          }
                          label="$85 - $100"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ratePreference.includes('100-200')}
                              onChange={handleChange}
                              name="100-200"
                            />
                          }
                          label="$100 - $200"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ratePreference.includes('200-300')}
                              onChange={handleChange}
                              name="200-300"
                            />
                          }
                          label="$200 - $300"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ratePreference.includes('400')}
                              onChange={handleChange}
                              name="400"
                            />
                          }
                          label="$400 +"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ratePreference.includes('no-preference')}
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
            <Link to="/member-onboarding-8">
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep9);
