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

const OnboardingStep7 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const [idealCoach, setIdealCoach] = useState(
    !onboardingProfile.ideal_coach
      ? []
      : Array.isArray(onboardingProfile.ideal_coach)
      ? onboardingProfile.ideal_coach
      : Object.keys(onboardingProfile.ideal_coach),
  );
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (idealCoach.length === 0) {
      setIsError(true);
    } else {
      changeOnboardingProfile('ideal_coach', idealCoach);
      const newOnboardingProfile = {
        ...onboardingProfile,
        ideal_coach: idealCoach,
      };
      updateMemberProfileRequest(newOnboardingProfile, role, profileId);
      history.push('/member-onboarding-8');
    }
  };

  const handleChange = (e) => {
    const newIdealCoach = idealCoach.includes(e.target.name)
      ? idealCoach.filter((style) => style !== e.target.name)
      : [...idealCoach, e.target.name];
    setIdealCoach(newIdealCoach);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 7 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="58">
            58%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px" mb="40px">
              <Heading center>
                How would you describe your ideal coach? Select all that apply.
              </Heading>
              <Paragraph maxWidth="620px" big center>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={idealCoach.includes('high-energy')}
                              onChange={handleChange}
                              name="high-energy"
                            />
                          }
                          label="High Energy"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={idealCoach.includes('has-sense-of-humor')}
                              onChange={handleChange}
                              name="has-sense-of-humor"
                            />
                          }
                          label="Has a sense of humour"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={idealCoach.includes('calm-cool')}
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
                              checked={idealCoach.includes('analyitical-results-driven')}
                              onChange={handleChange}
                              name="analyitical-results-driven"
                            />
                          }
                          label="Analyitical & results driven"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={idealCoach.includes('always-positive')}
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
                              checked={idealCoach.includes('goes-extra-mile')}
                              onChange={handleChange}
                              name="goes-extra-mile"
                            />
                          }
                          label="Goes the extra mile every time"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={idealCoach.includes('drill-sergeant')}
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
                              checked={idealCoach.includes('no-preference')}
                              onChange={handleChange}
                              name="no-preference"
                            />
                          }
                          label="No preference"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={idealCoach.includes('stricly-business')}
                              onChange={handleChange}
                              name="stricly-business"
                            />
                          }
                          label="Stricly business"
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
            <Link to="/member-onboarding-6">
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep7);
