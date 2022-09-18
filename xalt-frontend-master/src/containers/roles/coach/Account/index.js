import React from 'react';
import Spacer from 'components/shared/Spacer';
import Text from 'components/shared/Text';
import { Block } from './styles';

import Earnings from './components/Earnings';
import PaymentInfo from './components/PaymentInfo';
import CoachRateInfo from './components/CoachRateInfo';
import WithdrawalHistory from './components/WithdrawalHistory';

export default () => (
  <Spacer direction="vertical" size={18}>
    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          Your Earnings
        </Text>
        <Earnings />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth size={18}>
        <Text bigSize bold>
          Payment Information
        </Text>
        <PaymentInfo />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth size={18}>
        <Text bigSize bold>
          Coaching Rate
        </Text>
        <CoachRateInfo />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth size={18}>
        <Text bigSize bold>
          Withdrawal History
        </Text>
        <WithdrawalHistory />
      </Spacer>
    </Block>
  </Spacer>
);
