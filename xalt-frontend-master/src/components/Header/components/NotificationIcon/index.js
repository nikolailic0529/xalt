import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

import SvgIcon from 'components/shared/SvgIcon';
import notificationsTypes from 'lib/redux/types/notifications';
import {
  NotificationButtonWrapper,
  NotificationButton,
  NotificationDot,
} from './styles';

const { TOGGLE_NOTIFICATIONS_PANEL } = notificationsTypes;

const BellIcon = ({ newNotification }) => {
  const dispatch = useDispatch();

  const openNotifications = () => {
    dispatch({ type: TOGGLE_NOTIFICATIONS_PANEL });
  };

  return (
    <NotificationButtonWrapper>
      <NotificationButton onClick={openNotifications}>
        <SvgIcon name="headerBell" />
      </NotificationButton>
      {newNotification && <NotificationDot />}
    </NotificationButtonWrapper>
  );
};

export default connect((state) => ({
  newNotification: !!state.notifications.notifications.length,
}))(BellIcon);
