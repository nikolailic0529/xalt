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
    width: 150,
    margin: 'auto',
  },
}));

const OnboardingStep2 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(onboardingProfile.move_per_week_plan || 1);

  const handleNext = () => {
    changeOnboardingProfile('move_per_week_plan', value);
    const newOnboardingProfile = { ...onboardingProfile, move_per_week_plan: value };
    updateMemberProfileRequest(newOnboardingProfile, role, profileId);
    history.push('/member-onboarding-3');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 2 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="16">
            16%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>
                How many days would you <i>like</i> to exercise/move each week?
              </Heading>
              <Paragraph maxWidth="580px" big center>
                Movement is any form of exercise and/or activity that is at least of a moderate
                intesnity and that raises your heart rate.
              </Paragraph>
              <Paragraph maxWidth="580px" big center>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>1 day</Grid>
                  <Grid item xs className={classes.slider}>
                    <Slider
                      value={value}
                      min={1}
                      max={7}
                      onChange={handleChange}
                      color="secondary"
                      aria-labelledby="continuous-slider"
                    />
                  </Grid>
                  <Grid item>7 days</Grid>
                </Grid>
                <Box className={classes.hourlyValue}>{`${value} ${
                  value === 1 ? 'day' : 'days'
                }`}</Box>
              </Paragraph>
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
  onboardingProfile: state.profile.onboardingProfile || {},
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
