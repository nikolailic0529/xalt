import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'components/shared/Container';
import Heading from 'components/shared/Heading';
import SubscriptionsActions from 'lib/redux/reducers/subscriptions';
import ProfileActions from 'lib/redux/reducers/profile';
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

const OnboardingStep4 = (props) => {
  const { subscriptions, getSubscriptionsRequest, currentSubscriptionId, checkoutRequest } = props;

  const currentSubscription =
    subscriptions &&
    subscriptions.filter((subscription) => subscription.id === currentSubscriptionId)[0];

  useEffect(() => {
    getSubscriptionsRequest();
  }, []);

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 4 of 5</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="80">
            80%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>Choose Your Payment Method</Heading>
              <CheckoutWrapper>
                <CheckoutBlock>
                  <CheckoutItem subscription={currentSubscription} />
                </CheckoutBlock>
                <CheckoutForm
                  checkoutRequest={checkoutRequest}
                  path="/member-onboarding-5"
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
            <Link to="/member-onboarding-3">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <Link to="/member-onboarding-5" style={{ marginLeft: 15 }}>
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
  subscriptions: state.subscriptions.subscriptions,
  currentSubscriptionId: state.profile.onboardingProfile.subscription_id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getSubscriptionsRequest: () => dispatch(SubscriptionsActions.getSubscriptionsRequest()),
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  checkoutRequest: (values, coupon) =>
    dispatch(ProfileActions.checkoutRequest(values, 'stripe_init', coupon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep4);
