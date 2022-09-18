/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Container from 'components/shared/Container';
import { Switch } from 'antd';
import Heading from 'components/shared/Heading';
import colors from 'lib/theme/colors';

import SubscriptionsActions from 'lib/redux/reducers/subscriptions';
import ProfileActions from 'lib/redux/reducers/profile';

import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingProgress,
  OnboardingStepWrapper,
  OnboardingList,
  OnboardingStep,
  OnboardingPrevBtn,
  OnboardingNextBtn,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import OnboardingMembershipCard from 'components/shared/OnboardingMembershipCard';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep3 = (props) => {
  const {
    subscriptions,
    getSubscriptionsRequest,
    changeOnboardingProfile,
    currentSubscriptionId,
    updateMemberProfileRequest,
    onboardingProfile,
    role,
    profileId,
  } = props;

  const history = useHistory();

  const [selected, setSelected] = useState(currentSubscriptionId);

  useEffect(() => {
    getSubscriptionsRequest();
  }, []);

  useEffect(() => {
    if (subscriptions && subscriptions.length && !currentSubscriptionId) {
      setSelected(subscriptions.filter((sub) => sub.type === 'annual')[0].id);
    }
  }, [subscriptions]);

  useEffect(() => {
    changeOnboardingProfile('subscription_id', selected);
  }, [selected]);

  const setSubscriptions = () => {
    updateMemberProfileRequest(onboardingProfile, role, profileId);
    history.push('/member-onboarding-4');
  };

  const handleSubscriptionChange = (checked) => {
    if (checked) {
      setSelected(subscriptions.filter((sub) => sub.type === 'monthly')[0].id);
    } else {
      setSelected(subscriptions.filter((sub) => sub.type === 'annual')[0].id);
    }
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 3 of 5</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="60">
            60%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>Select Your Membership</Heading>
              <OnboardingList>
                {subscriptions
                  .filter((item) => item.id === selected)
                  .map((subscription, index) => (
                    <OnboardingMembershipCard key={index} subscription={subscription} />
                  ))}
              </OnboardingList>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
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
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/member-onboarding-2">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <div>
              <OnboardingNextBtn
                disabled={!selected}
                onClick={setSubscriptions}
                pinkBtn
                width="100px"
              >
                Next
              </OnboardingNextBtn>
              <Link to="/member-onboarding-5" style={{ marginLeft: 15 }}>
                <OnboardingPrevBtn pinkBrdrBtn width="132px">
                  Skip
                </OnboardingPrevBtn>
              </Link>
            </div>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  subscriptions: state.subscriptions.subscriptions,
  currentSubscriptionId: state.profile.onboardingProfile.subscription_id,
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
  profileId: state.profile?.member_profile?.id ? state.profile.member_profile.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getSubscriptionsRequest: () => dispatch(SubscriptionsActions.getSubscriptionsRequest()),
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep3);
