import React, { useEffect } from 'react';
import Text from 'components/shared/Text';
import Spacer from 'components/shared/Spacer';
import Flex from 'components/shared/Flex';
import { space } from 'styled-system';
import { Card, StyledIcon } from 'containers/roles/coach/Account/styles';
import { Row, Col, Divider, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { theme } from 'components';

const StyledDivider = styled(Divider)`
  background-color: ${theme.colors.darkPink};
  margin: 0;
`;

const StyledCard = styled(Card)`
  padding: 0;
`;

const ContentWrapper = styled.div`
  ${space};
`;

const Earnings = ({ earnings }) => {
  const getWithdrawalDate = () => {
    const nowDate = moment().date();
    let startDate = moment().date(1);
    const mondays = [];

    for (let i = 1; i < startDate.daysInMonth(); i++) {
      startDate = startDate.date(i);

      if (startDate.day() === 1) {
        mondays.push(startDate.date());
      }
    }

    const closestMonday = mondays.filter(
      (element, index) => index % 2 === 0 && element >= nowDate,
    )[0];

    return moment(closestMonday).format('MMM DD');
  };

  return (
    <StyledCard>
      <ContentWrapper p={4}>
        <Flex justifyContent="flex-end">
          <Text smallSize darkPink bold>
            The funds will be withdrawn on {getWithdrawalDate()}
          </Text>
        </Flex>

        <Spacer direction="horizontal" size={36}>
          <Text uppercase>Earnings:</Text>
          <Text bold>${earnings}</Text>
        </Spacer>
      </ContentWrapper>

      <StyledDivider />

      <ContentWrapper p={4}>
        <Flex justifyContent="space-between">
          <Spacer direction="horizontal" size={100}>
            <Spacer direction="horizontal" size={36}>
              <Text darkPink uppercase>
                Gross Profit:
              </Text>
              <Text darkPink bold>
                ${(earnings * 0.7).toFixed(1)}
              </Text>
            </Spacer>
            <Spacer direction="horizontal" size={36}>
              <Text uppercase>xalt fees:</Text>
              <Text bold>${(earnings * 0.3).toFixed(1)}</Text>
            </Spacer>
          </Spacer>

          <Tooltip
            id="earnings-tooltip"
            placement="bottomRight"
            onVisibleChange={() =>
              document.querySelector('#earnings-tooltip')?.previousSibling?.remove()
            }
            title={
              <Spacer direction="vertical" size={18}>
                <Text gray bold>
                  Withdraw will happen every odd monday
                </Text>
                <Text>xalt fees are 30% of your total earnings</Text>
                <Text>your revenue is 70% of your total earnings</Text>
              </Spacer>
            }
          >
            <StyledIcon name="info" clickable />
          </Tooltip>
        </Flex>
      </ContentWrapper>
    </StyledCard>
  );
};

const mapStateToProps = (state) => ({
  earnings: !state.profile.coach_profile?.earnings ? 0 : state.profile.coach_profile.earnings,
});

export default connect(mapStateToProps, null)(Earnings);
