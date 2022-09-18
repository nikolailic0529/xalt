import React from 'react';
import { useSelector } from 'react-redux';

import Heading from 'components/shared/Heading';
import Spacer from 'components/shared/Spacer';
import { formatDate } from 'lib/datetime';
import styled from 'styled-components';

import Membership from './components/membership';
import Methods from './components/methods';
import History from './components/history';

const Block = styled.div`
  padding: 1rem;
`;

const LinkBtn = styled.a`
  margin-left: 15px;
  color: #1890ff;
`;

export default () => {
  const {
    subscription,
    selectedCoach,
    currentPeriodEnd,
    invoices,
    last4,
    lessonCount,
    isSubscribed,
    subscriptionType,
  } = useSelector((state) => ({
    subscription: state.profile.member_profile?.subscription,
    selectedCoach: state.profile.member_profile?.coach_profile,
    currentPeriodEnd: state.profile.stripe?.current_period_end,
    invoices: state.profile.stripe?.invoices || [],
    last4: state.profile.stripe?.stripe_card_last4,
    lessonCount: state.profile.lesson_count || 0,
    subscriptionType: state.profile.subscription_type || 'subscription',
    isSubscribed:
      (state.profile.role === 'member' &&
        ((state.auth.stripe && state.auth.stripe.stripe_subscription_status === 'active') ||
          (state.profile.stripe &&
            state.profile.stripe.stripe_subscription_status === 'active'))) ||
      (state.profile.role === 'coach' &&
        (state.auth.stripe || state.profile.stripe) &&
        ((state.auth.stripe && state.auth.stripe.stripe_id) ||
          (state.profile.stripe && state.profile.stripe.stripe_id) ||
          (state.auth.stripe && state.auth.stripe.stripe_bank_account_id) ||
          (state.profile.stripe && state.profile.stripe.stripe_bank_account_id))),
  }));

  return (
    <Spacer direction="vertical" size={18}>
      <Block>
        <Spacer direction="vertical" fullWidth>
          <Heading>Your Membership</Heading>
          {lessonCount ||
          (subscriptionType === 'subscription' && isSubscribed) ||
          subscriptionType === 'measurement' ? (
            <Membership
              subscription={
                isSubscribed && subscriptionType === 'subscription' ? subscription : null
              }
              currentPeriodEnd={
                currentPeriodEnd ? formatDate(new Date(currentPeriodEnd * 1000)) : ''
              }
              lessonCount={lessonCount}
              selectedCoach={selectedCoach}
              subscriptionType={subscriptionType}
            />
          ) : (
            <>
              <h2>
                You are currently on Free Plan.
                <LinkBtn href="/upgrade-plan">Upgrade your plan now</LinkBtn>
              </h2>
            </>
          )}
        </Spacer>
      </Block>

      {isSubscribed && (
        <Block>
          <Spacer direction="vertical" fullWidth>
            <Heading>Payment methods</Heading>
            <Methods last4={last4} />
          </Spacer>
        </Block>
      )}

      <Block>
        <Spacer direction="vertical" fullWidth>
          <Heading>Payment history</Heading>
          <History invoices={invoices} />
        </Spacer>
      </Block>
    </Spacer>
  );
};
