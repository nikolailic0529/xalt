import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Slider, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const useStyles = makeStyles(() => ({
  sliderWrapper: {
    alignItems: 'center',
  },
  slider: {
    display: 'flex',
    alignItems: 'center',

    '& .MuiSlider-root': {
      height: 10,
    },
    '& .MuiSlider-thumb': {
      width: 18,
      height: 18,
      background: 'linear-gradient(113.19deg, #652F79 3.41%, #E6447D 100%)',
    },
    '& .MuiSlider-track': {
      height: 10,
      borderRadius: 20,
    },

    '& .MuiSlider-rail': {
      height: 10,
      borderRadius: 20,
    },
  },
  hourlyValue: {
    background: '#FEF9FB',
    border: '1px solid #E6447D',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 2px rgba(51, 51, 51, 0.06)',
    borderRadius: 10,
    padding: '14px 32px',
    fontSize: 18,
    color: '#E6447D',
    marginTop: 20,
    width: 160,
    textAlign: 'center',
    margin: 'auto',
  },
  additionalDesc: {
    marginTop: 20,
  },
}));

const OnboardingStep5 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(onboardingProfile.rate || 85);

  const handleNext = () => {
    changeOnboardingProfile('rate', value);
    const newOnboardingProfile = { ...onboardingProfile, rate: value };
    updateMemberProfileRequest(newOnboardingProfile, role, profileId);
    history.push('/coach-onboarding-6');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 5 of 10</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="50">
            50%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>What is your coaching rate per hour?</Heading>
              <Paragraph maxWidth="580px" big center>
                We ask this question to ensure training is accessible to all of our members! Don’t
                worry, you can always change your mind later and/or customize the rate per client on
                your dashboard!
                <p className={classes.additionalDesc}>
                  <sup>*</sup>xAlt gets $10 or 20% of the billing per session. Which ever is higher.
                </p>
              </Paragraph>
              <Paragraph maxWidth="580px" big center>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>$50/hour</Grid>
                  <Grid item xs className={classes.slider}>
                    <Slider
                      value={value}
                      min={50}
                      max={400}
                      onChange={handleChange}
                      color="secondary"
                      aria-labelledby="continuous-slider"
                    />
                  </Grid>
                  <Grid item>$400/hour</Grid>
                </Grid>
                <Box className={classes.hourlyValue}>{`$${value}/hour`}</Box>
              </Paragraph>
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/coach-onboarding-4">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <OnboardingNextBtn onClick={handleNext} pinkBtn width="100px">
              Next
            </OnboardingNextBtn>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep5);
