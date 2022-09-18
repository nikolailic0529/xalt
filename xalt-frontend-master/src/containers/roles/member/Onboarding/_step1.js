import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Slider, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileActions from 'lib/redux/reducers/profile';
import CoachesActions from 'lib/redux/reducers/coaches';
import SubscriptionsActions from 'lib/redux/reducers/subscriptions';
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

const MAX_COACHES_COUNT = 9;

const OnboardingStep1 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    getSubscriptionsRequest,
    role,
    profileId,
    updateMemberProfileRequest,
    createMemberProfileRequest,
    getCoaches,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(onboardingProfile.move_per_week_current || 1);

  const handleNext = () => {
    changeOnboardingProfile('move_per_week_current', value);
    if (profileId) {
      updateMemberProfileRequest(onboardingProfile, role, profileId);
    } else {
      createMemberProfileRequest(onboardingProfile, role);
    }
    history.push('/member-onboarding-2');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getSubscriptionsRequest();

    const rehabilitationStr = localStorage.getItem('rehabilitation');
    if (rehabilitationStr) {
      const rehabilitation = JSON.parse(rehabilitationStr);
      const now = Math.floor(Date.now() / 1000);

      // if measure assessment is selected
      if (rehabilitation.value && rehabilitation.expiry && now - rehabilitation.expiry <= 300) {
        history.push('/member-onboarding-11?type=rehabilitation');
      } else {
        localStorage.removeItem('rehabilitation');
      }
    }

    getCoaches(1, MAX_COACHES_COUNT);

    const selectedCoachStr = localStorage.getItem('selected_coach');
    if (selectedCoachStr) {
      const selectedCoach = JSON.parse(selectedCoachStr);
      const now = Math.floor(Date.now() / 1000);

      // if coach is selcted under 5 minutes, then proceed with selected coach
      if (selectedCoach.value && selectedCoach.expiry && now - selectedCoach.expiry <= 300) {
        history.push('/member-onboarding-12');
      } else {
        localStorage.removeItem('selected_coach');
      }
    }

    const measureAssessmentStr = localStorage.getItem('measure_assessment');
    if (measureAssessmentStr) {
      const measureAssessment = JSON.parse(measureAssessmentStr);
      const now = Math.floor(Date.now() / 1000);

      // if measure assessment is selected
      if (
        measureAssessment.value &&
        measureAssessment.expiry &&
        now - measureAssessment.expiry <= 300
      ) {
        history.push('/member-onboarding-12');
      } else {
        localStorage.removeItem('measure_assessment');
      }
    }
  }, []);

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 1 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="8">
            8%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>How many days did you exercise/move last week?</Heading>
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
          <OnboadringActionsWrapper justifyContent="flex-end">
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
  getSubscriptionsRequest: () => dispatch(SubscriptionsActions.getSubscriptionsRequest()),
  createMemberProfileRequest: (onboardingProfile, role) =>
    dispatch(ProfileActions.createMemberProfileRequest(onboardingProfile, role)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
  bookCoachRequest: (member_profile_id, coach_profile_id) =>
    dispatch(ProfileActions.bookCoachRequest(member_profile_id, coach_profile_id)),
  getCoaches: (page, per_page) => dispatch(CoachesActions.getCoachesRequest(page, per_page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep1);
