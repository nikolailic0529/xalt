import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SubscriptionsActions from 'lib/redux/reducers/subscriptions';
import Flex from 'components/shared/Flex';
import {
  DashboardWrapper,
  DashboardWrapperLayoutItem,
  DashboardLayoutItem,
  DashboardCard,
  ViewDetailsWrapper,
  DashboardProgress,
  NothingBlock,
} from 'components/shared/Dashboard';
import { CoachDetails } from 'components/shared/CoachList';
import { MainWrapper } from 'components/shared/Layout';
import SessionsWidget from 'components/shared/DashboardSessions';
import LastSessions from 'components/shared/LastSessions';
import MeetingsActions from 'lib/redux/reducers/meetings';
import WidgetActions from 'lib/redux/reducers/widget';

const Dashboard = (props) => {
  const { getMeetingsRequest, meetings, widget, getWidgetRequest, getSubscriptionsRequest } = props;

  const timeFrom = '';
  const timeTo = '';
  const pagination = false;
  const perPage = '100';
  const sort = '-time_from';

  useEffect(() => {
    getMeetingsRequest(timeFrom, timeTo, pagination, perPage, sort);
    const widgetNames = 'members_count_by_coach,income_in_last_month';
    getWidgetRequest(widgetNames);
    getSubscriptionsRequest();
  }, []);

  return (
    <MainWrapper>
      <DashboardWrapper alignItems="flex-start" mt={0}>
        <DashboardWrapperLayoutItem flexDirection="column" width={['100%', null, null, '50%']}>
          <DashboardLayoutItem width="100%">
            <DashboardCard flexDirection="column">
              <SessionsWidget
                meetings={meetings
                  .filter(({ is_finished }) => is_finished === false)
                  .reverse()
                  .slice(0, 9)}
              />
            </DashboardCard>
          </DashboardLayoutItem>
        </DashboardWrapperLayoutItem>

        <DashboardWrapperLayoutItem flexDirection="column" width={['100%', null, null, '50%']}>
          <DashboardLayoutItem flexDirection="row" p={0}>
            <DashboardLayoutItem width="50%">
              <DashboardCard>
                {widget?.members_count_by_coach?.length > 0 ? (
                  <>
                    <ViewDetailsWrapper>
                      <CoachDetails bigFont to="/members">
                        See Members
                      </CoachDetails>
                    </ViewDetailsWrapper>

                    <DashboardProgress
                      itemsName="Unique members"
                      totalName="Active"
                      differenceName="Inactive"
                      total={widget?.members_count_by_coach[0]?.value}
                      value="0"
                    />
                  </>
                ) : (
                  <Flex alignItems="center" justifyContent="center" width="100%">
                    <NothingBlock iconName="dashboardStat" iconWidth="68px" iconHeight="68px">
                      There is no any data yet
                    </NothingBlock>
                  </Flex>
                )}
              </DashboardCard>
            </DashboardLayoutItem>
            <DashboardLayoutItem width="50%">
              <DashboardCard>
                {widget?.income_in_last_month?.length > 0 ? (
                  <>
                    <ViewDetailsWrapper>
                      <CoachDetails bigFont to="/reports">
                        See Reports
                      </CoachDetails>
                    </ViewDetailsWrapper>

                    <DashboardProgress
                      itemsName="Income at"
                      totalName="Finished"
                      differenceName="Not Finished"
                      total={widget?.income_in_last_month[0]?.value}
                      value="0"
                    />
                  </>
                ) : (
                  <Flex alignItems="center" justifyContent="center" width="100%">
                    <NothingBlock iconName="dashboardStat" iconWidth="68px" iconHeight="68px">
                      There is no any data yet
                    </NothingBlock>
                  </Flex>
                )}
              </DashboardCard>
            </DashboardLayoutItem>
          </DashboardLayoutItem>
          <DashboardLayoutItem width="100%">
            <DashboardCard>
              <LastSessions
                meetings={meetings.filter(({ is_finished }) => is_finished === true).slice(0, 8)}
              />
            </DashboardCard>
          </DashboardLayoutItem>
        </DashboardWrapperLayoutItem>
      </DashboardWrapper>
    </MainWrapper>
  );
};

const mapStateToProps = (state) => ({
  meetings: state.meetings.meetings,
  widget: state.widget.widget,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMeetingsRequest: (time_from, time_to, pagination, per_page, sort) =>
    dispatch(MeetingsActions.getMeetingsRequest(time_from, time_to, pagination, per_page, sort)),
  getWidgetRequest: (widgetNames) => dispatch(WidgetActions.getWidgetRequest(widgetNames)),
  getSubscriptionsRequest: () => dispatch(SubscriptionsActions.getSubscriptionsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
