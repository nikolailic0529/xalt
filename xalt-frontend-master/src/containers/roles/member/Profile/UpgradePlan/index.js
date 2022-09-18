/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'components/shared/Container';
import Heading from 'components/shared/Heading';
import colors from 'lib/theme/colors';
import { Switch } from 'antd';

import SubscriptionsActions from 'lib/redux/reducers/subscriptions';

import {
  OnboardingWrapper,
  OnboardingMain,
  OnboardingStepWrapper,
  OnboardingNextBtn,
} from 'components/shared/Onboarding';
import { CheckoutWrapper, CheckoutItem, CheckoutBlock } from 'components/shared/Checkout';
import CheckoutForm from 'components/shared/Checkout/form';
import ProfileActions from 'lib/redux/reducers/profile';
import { Paper, Tabs, Tab, Box, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Text from 'components/shared/Text';

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

const UpgradePlan = (props) => {
  const {
    subscriptions,
    subscriptionType,
    getSubscriptionsRequest,
    currentSubscriptionId,
    checkoutRequest,
    selectedCoach,
    setStep,
  } = props;

  const [selected, setSelected] = useState(currentSubscriptionId);
  const [lessonCount, setLessonCount] = useState(1);
  const [payType, setPayType] = useState(subscriptionType || 'subscription');
  const classes = useStyles();

  useEffect(() => {
    getSubscriptionsRequest();
  }, []);

  useEffect(() => {
    if (subscriptions && subscriptions.length && !currentSubscriptionId) {
      setSelected(subscriptions.filter((sub) => sub.type === 'annual')[0].id);
    }
  }, [subscriptions]);

  const currentSubscription =
    subscriptions && subscriptions.filter((subscription) => subscription.id === selected)[0];

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
    } else if (selectedCoach && payType === 'custom') {
      checkoutRequest(cardData, coupon, 'custom', lessonCount * selectedCoach.rate, lessonCount);
    } else {
      checkoutRequest(cardData, coupon, 'subscription');
    }
  };

  return (
    <OnboardingWrapper>
      <OnboardingStepWrapper>
        <Container min centered>
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
                  !selectedCoach ? (
                    <Tooltip title="You need to select a coach to be on custom program">
                      <span>Custom Program</span>
                    </Tooltip>
                  ) : (
                    <span>Custom Program</span>
                  )
                }
                style={{ pointerEvents: 'auto' }}
                value="custom"
                disabled={!selectedCoach}
              /> */}
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
                    selected === subscriptions.filter((sub) => sub.type === 'monthly')[0].id && (
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
              ) : (
                <>
                  <Box className={classes.title}>Measurement Assessment</Box>
                </>
              )}
              {/* : (
                <>
                  <Box className={classes.title}>Custom Program</Box>
                </>
              )} */}
              <CheckoutItem
                subscription={currentSubscription}
                rate={selectedCoach?.rate}
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
              additionalButtonText="Go Back"
              handleAdditionalBtnClick={() => setStep(1)}
            />
          </CheckoutWrapper>
        </Container>
      </OnboardingStepWrapper>
    </OnboardingWrapper>
  );
};

const mapStateToProps = (state) => ({
  subscriptions: state.subscriptions.subscriptions,
  currentSubscriptionId: state.profile.member_profile?.subscription_id,
  selectedCoach: state.profile.member_profile?.coach_profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getSubscriptionsRequest: () => dispatch(SubscriptionsActions.getSubscriptionsRequest()),
  checkoutRequest: (values, coupon, type = 'subscription', amount = 0, lessonCount = 0) =>
    dispatch(
      ProfileActions.checkoutRequest(values, 'stripe_init', coupon, type, amount, lessonCount),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpgradePlan);
