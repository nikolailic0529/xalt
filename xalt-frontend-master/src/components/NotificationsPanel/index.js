import React from 'react';
import { connect, useDispatch } from 'react-redux';
import When from 'components/shared/When';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import notificationsTypes from 'lib/redux/types/notifications';
import NotificationsActions from 'lib/redux/reducers/notifications';

import { Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  Panel, Header,
} from './styles';
import CompleteHomeworkNotification from './components/CompleteHomeworkNotification';
import NewMemberNotification from './components/NewMemberNotification';
import NewHomeworkNotification from './components/NewHomeworkNotification';
import ExpiredReportNotification from './components/ExpiredReportNotification';
import NewMeetingNotification from './components/NewMeetingNotification';
import TodayHomeworkNotification from './components/TodayHomeworkNotification';

const { TOGGLE_NOTIFICATIONS_PANEL } = notificationsTypes;

const NotificationsPanel = ({
  isOpen, clearAllNotifications, notifications,
}) => {
  const dispatch = useDispatch();

  const togglePanel = () => {
    dispatch({ type: TOGGLE_NOTIFICATIONS_PANEL });
  };

  const switchType = (notification) => {
    switch (notification.type) {
      case 'Notification::CompleteHomeworkNotification':
        return <CompleteHomeworkNotification notification={notification} />;
      case 'Notification::NewMemberNotification':
        return (<NewMemberNotification notification={notification} />);
      case 'Notification::NewHomeworkNotification':
        return (<NewHomeworkNotification notification={notification} />);
      case 'Notification::ExpiredReportNotification':
        return (<ExpiredReportNotification notification={notification} />);
      case 'Notification::NewMeetingNotification':
        return (<NewMeetingNotification notification={notification} />);
      case 'Notification::TodayHomeworkNotification':
        return (<TodayHomeworkNotification notification={notification} />);
      default:
        return null;
    }
  };

  return (
    <Panel
      title={(
        <Header>
          <Text darkPink clickable onClick={clearAllNotifications}>
            Clear All
          </Text>

          <Text bold>Notifications</Text>

          <Text darkPink clickable onClick={togglePanel}>
            <CloseOutlined />
          </Text>
        </Header>
      )}
      placement="right"
      closable={false}
      onClose={togglePanel}
      visible={isOpen}
    >
      <>
        <When condition={!notifications.length}>
          <Flex alignItems="center" justifyContent="center" className="h-100">
            <Empty />
          </Flex>
        </When>
        <When condition={notifications.length}>
          <Spacer direction="vertical" fullWidth>
            {
              notifications.map((notification) => (switchType(notification)))
            }
          </Spacer>
        </When>
      </>
    </Panel>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.notifications.isOpen,
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateNotification: (id, data) => dispatch(NotificationsActions.updateNotificationRequest(id, data)),
  clearAllNotifications: () => dispatch(NotificationsActions.deleteAllNotificationsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPanel);
