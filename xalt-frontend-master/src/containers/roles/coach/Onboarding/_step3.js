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
  const [coachStyles, setCoachStyles] = useState(
    !onboardingProfile.coach_styles
      ? []
      : Array.isArray(onboardingProfile.coach_styles)
      ? onboardingProfile.coach_styles
      : Object.keys(onboardingProfile.coach_styles),
  );
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (coachStyles.length >= 4 || coachStyles.length === 0) {
      setIsError(true);
    } else {
      changeOnboardingProfile('coach_styles', coachStyles);
      const newOnboardingProfile = { ...onboardingProfile, coach_styles: coachStyles };
      updateMemberProfileRequest(newOnboardingProfile, role, profileId);
      history.push('/coach-onboarding-4');
    }
  };

  const handleChange = (e) => {
    const newCoachStyles = coachStyles.includes(e.target.name)
      ? coachStyles.filter((style) => style !== e.target.name)
      : [...coachStyles, e.target.name];
    setCoachStyles(newCoachStyles);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 3 of 10</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="30">
            30%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px" mb="40px">
              <Heading center>
                How would you describe your coaching style? Select up to 3 options.
              </Heading>
              <Paragraph maxWidth="620px" big center>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('high-energy')}
                              onChange={handleChange}
                              name="high-energy"
                            />
                          }
                          label="High energy"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('calm-cool')}
                              onChange={handleChange}
                              name="calm-cool"
                            />
                          }
                          label="Calm and cool"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('always-positive')}
                              onChange={handleChange}
                              name="always-positive"
                            />
                          }
                          label="Always positive"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('drill-sergeant')}
                              onChange={handleChange}
                              name="drill-sergeant"
                            />
                          }
                          label="Drill sergeant"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('stricly-business')}
                              onChange={handleChange}
                              name="stricly-business"
                            />
                          }
                          label="Stricly business"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('sense-of-humour')}
                              onChange={handleChange}
                              name="sense-of-humour"
                            />
                          }
                          label="Has a sense of humour"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('analyitical')}
                              onChange={handleChange}
                              name="analyitical"
                            />
                          }
                          label="Analyitical & results driven"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('extra-mile')}
                              onChange={handleChange}
                              name="extra-mile"
                            />
                          }
                          label="Goes the extra mile every time"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coachStyles.includes('flexible')}
                              onChange={handleChange}
                              name="flexible"
                            />
                          }
                          label="I’m flexible to match clients needs"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
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
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep3);
