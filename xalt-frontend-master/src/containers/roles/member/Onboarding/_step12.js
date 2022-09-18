/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import colors from 'lib/theme/colors';
import Container from 'components/shared/Container';
import Heading from 'components/shared/Heading';
import Text from 'components/shared/Text';
import SubscriptionsActions from 'lib/redux/reducers/subscriptions';
import ProfileActions from 'lib/redux/reducers/profile';
import { Switch } from 'antd';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingProgress,
  OnboardingStepWrapper,
  OnboardingStep,
  OnboardingPrevBtn,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
} from 'components/shared/Onboarding';
import { CheckoutWrapper, CheckoutItem, CheckoutBlock } from 'components/shared/Checkout';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import CheckoutForm from 'components/shared/Checkout/form';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';
import { Paper, Tabs, Tab, Box, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Subscription } from '@rails/actioncable';

const useStyles = makeStyles(() => ({
  tabs: {
    width: 'fit-content',
    margin: 'auto',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
}));

const OnboardingStep12 = (props) => {
  const {
    coaches,
    onboardingProfile,
    subscriptions,
    getSubscriptionsRequest,
    updateMemberProfileRequest,
    currentSubscriptionId,
    checkoutRequest,
    changeOnboardingProfile,
    createMemberProfileRequest,
    bookCoachRequest,
    profileId,
    role,
  } = props;

  const [selected, setSelected] = useState(currentSubscriptionId);
  const [lessonCount, setLessonCount] = useState(1);
  const [bookCoachFlag, setBookCoachFlag] = useState(false);
  const [coachFromCache, setCoachFromCache] = useState(null);
  const [payType, setPayType] = useState(
    // onboardingProfile.selected_coach ? 'custom' : 'subscription',
    'subscription',
  );
  const classes = useStyles();

  useEffect(() => {
    /*
    const selectedCoachStr = localStorage.getItem('selected_coach');
    if (selectedCoachStr && !onboardingProfile.selected_coach) {
      const selectedCoach = JSON.parse(selectedCoachStr);
      const now = Math.floor(Date.now() / 1000);

      // if coach is selcted under 5 minutes, then proceed with selected coach
      if (selectedCoach.value && selectedCoach.expiry && now - selectedCoach.expiry <= 300) {
        const newOnboardingProfile = { ...onboardingProfile, selected_coach: selectedCoach.value };
        if (profileId) {
          bookCoachRequest(profileId, selectedCoach.value);
        } else {
          createMemberProfileRequest(newOnboardingProfile, role);
        }
        changeOnboardingProfile('selected_coach', selectedCoach.value);
        setBookCoachFlag(true);
        setCoachFromCache(selectedCoach.value);
        setPayType('custom');
      }
    }
    */

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
        setPayType('measurement');
      }
    }

    const rehabilitationStr = localStorage.getItem('rehabilitation');
    if (rehabilitationStr) {
      const rehabilitation = JSON.parse(rehabilitationStr);
      const now = Math.floor(Date.now() / 1000);

      // if measure assessment is selected
      if (
        rehabilitation.value &&
        rehabilitation.expiry &&
        now - rehabilitation.expiry <= 300 &&
        (onboardingProfile.selected_coach || coachFromCache)
      ) {
        setPayType('rehabilitation');
      }
    }

    if (!profileId) {
      createMemberProfileRequest(onboardingProfile, role);
    } else {
      updateMemberProfileRequest(onboardingProfile, role, profileId);
    }

    localStorage.removeItem('selected_coach');
    localStorage.removeItem('measure_assessment');
    localStorage.removeItem('rehabilitation');
    getSubscriptionsRequest();
  }, []);

  useEffect(() => {
    if (bookCoachFlag && profileId && coachFromCache) {
      bookCoachRequest(profileId, coachFromCache);
    }
  }, [profileId, bookCoachFlag, coachFromCache]);

  useEffect(() => {
    if (subscriptions && subscriptions.length && !currentSubscriptionId) {
      setSelected(subscriptions.filter((sub) => sub.type === 'annual')[0].id);
    }
  }, [subscriptions]);

  useEffect(() => {
    if (selected) {
      changeOnboardingProfile('subscription_id', selected);
    }
  }, [selected]);

  const currentSubscription =
    subscriptions &&
    subscriptions.filter((subscription) => subscription.id === currentSubscriptionId)[0];

  const selectedCoach =
    onboardingProfile.selected_coach &&
    coaches.filter((coach) => coach.coach_profile?.id === onboardingProfile.selected_coach)[0];

  const handleSubscriptionChange = (checked) => {
    if (checked) {
      setSelected(subscriptions.filter((sub) => sub.type === 'monthly')[0].id);
    } else {
      setSelected(subscriptions.filter((sub) => sub.type === 'annual')[0].id);
    }
  };

  const handleCheckout = (cardData, coupon) => {
    if (payType === 'measurement') {
      checkoutRequest(cardData, coupon, 'measurement', 150);
    } else if (payType === 'rehabilitation') {
      checkoutRequest(cardData, coupon, 'rehabilitation', 1100, 30, 'cad');
    } else if (onboardingProfile.selected_coach && selectedCoach && payType === 'custom') {
      checkoutRequest(
        cardData,
        coupon,
        'custom',
        lessonCount * selectedCoach.coach_profile.rate,
        lessonCount,
      );
    } else {
      checkoutRequest(cardData, coupon, 'subscription');
    }
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 12 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="100">
            100%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>Payments</Heading>
              <Paper square className={classes.tabs}>
                <Tabs
                  value={payType}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(e, newValue) => setPayType(newValue)}
                  aria-label="Payment methods"
                  centered
                >
                  <Tab label="Subscription" value="subscription" />
                  {/* <Tab
                    label={
                      !onboardingProfile.selected_coach && !coachFromCache ? (
                        <Tooltip title="You need to select a coach to be on custom program">
                          <span>Custom Program</span>
                        </Tooltip>
                      ) : (
                        <span>Custom Program</span>
                      )
                    }
                    style={{ pointerEvents: 'auto' }}
                    value="custom"
                    disabled={!onboardingProfile.selected_coach && !coachFromCache}
                  /> */}
                  <Tab
                    label={
                      !onboardingProfile.selected_coach && !coachFromCache ? (
                        <Tooltip title="You need to select a coach to be on rehabilitation">
                          <span>Conditioning Product</span>
                        </Tooltip>
                      ) : (
                        <span>Conditioning Product</span>
                      )
                    }
                    style={{ pointerEvents: 'auto' }}
                    value="rehabilitation"
                    disabled={!onboardingProfile.selected_coach && !coachFromCache}
                  />
                  <Tab label="Measurement Assessment" value="measurement" />
                </Tabs>
              </Paper>
              <CheckoutWrapper>
                <CheckoutBlock>
                  {payType === 'subscription' ? (
                    <>
                      <Box className={classes.title}>Subscription</Box>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                          color: colors.darkPink,
                        }}
                      >
                        <Switch
                          defaultChecked={
                            subscriptions &&
                            subscriptions.length &&
                            selected === subscriptions.filter((sub) => sub.type === 'monthly')[0].id
                          }
                          onChange={handleSubscriptionChange}
                        />
                        <div style={{ marginLeft: 10 }}>Pay Monthly</div>
                      </div>
                      {subscriptions &&
                        subscriptions.length &&
                        selected ===
                          subscriptions.filter((sub) => sub.type === 'monthly')[0].id && (
                          <>
                            <div style={{ marginTop: 15, color: '#7E7E7E' }}>
                              No interest, no fees, no surprises.
                            </div>
                            <div style={{ marginTop: 15 }}>
                              Make the first of 12 payments now. Pay the rest over 12 months.
                            </div>
                          </>
                        )}
                    </>
                  ) : payType === 'measurement' ? (
                    <>
                      <Box className={classes.title}>Measurement Assessment</Box>
                    </>
                  ) : payType === 'rehabilitation' ? (
                    <>
                      <Box className={classes.title}>Conditioning Product</Box>
                    </>
                  ) : (
                    <>
                      <Box className={classes.title}>Custom Program</Box>
                      <Text>{`Train with ${selectedCoach?.name}`}</Text>
                    </>
                  )}
                  <CheckoutItem
                    subscription={currentSubscription}
                    rate={selectedCoach?.coach_profile?.rate}
                    lessonCount={lessonCount}
                    setLessonCount={setLessonCount}
                    payType={payType}
                  />
                </CheckoutBlock>
                <CheckoutForm
                  checkoutRequest={handleCheckout}
                  path="/member-onboarding-13"
                  buttonText="Pay now"
                  buttonWidth="126px"
                  margin="24px 0"
                  alignItems="center"
                />
              </CheckoutWrapper>
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="flex-start">
            <Link to="/member-onboarding-11">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <Link to="/member-onboarding-13" style={{ marginLeft: 15 }}>
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Skip
              </OnboardingPrevBtn>
            </Link>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  coaches: state.coaches.coaches,
  onboardingProfile: state.profile.onboardingProfile || {},
  subscriptions: state.subscriptions.subscriptions,
  currentSubscriptionId: state.profile.onboardingProfile.subscription_id,
  profileId: state.profile?.member_profile?.id ? state.profile.member_profile.id : null,
  role: state.profile.role,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getSubscriptionsRequest: () => dispatch(SubscriptionsActions.getSubscriptionsRequest()),
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  checkoutRequest: (
    values,
    coupon,
    type = 'subscription',
    amount = 0,
    lessonCount = 0,
    currency = 'usd',
  ) =>
    dispatch(
      ProfileActions.checkoutRequest(
        values,
        'stripe_init',
        coupon,
        type,
        amount,
        lessonCount,
        currency,
      ),
    ),
  createMemberProfileRequest: (onboardingProfile, role) =>
    dispatch(ProfileActions.createMemberProfileRequest(onboardingProfile, role)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
  bookCoachRequest: (member_profile_id, coach_profile_id) =>
    dispatch(ProfileActions.bookCoachRequest(member_profile_id, coach_profile_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep12);
