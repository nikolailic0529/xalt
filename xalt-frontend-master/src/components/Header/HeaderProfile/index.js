import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Flex from 'components/shared/Flex';
import ProfileDropdown from 'components/Header/components/ProfileDropdown';
import NotificationIcon from 'components/Header/components/NotificationIcon';
import Earnings from 'components/Header/components/Earnings';
import AuthActions from 'lib/redux/reducers/auth';
import NotificationsActions from 'lib/redux/reducers/notifications';
import MessagesActions from 'lib/redux/reducers/messages';
import ButtonAux from 'components/shared/ButtonAux';

const HeaderProfile = (props) => {
  const { role, earnings, isFeatured, getNotifications, getConversations } = props;
  const location = useLocation();

  useEffect(() => {
    getNotifications();
    getConversations();
  }, []);

  return (
    <Flex justifyContent="space-between" alignItems="center" width="100%">
      {role === 'coach' && !location.pathname.includes('profile') && !isFeatured ? (
        <ButtonAux pinkBtn>
          <Link to="/profile">Feature My Profile</Link>
        </ButtonAux>
      ) : (
        <div />
      )}
      <Flex justifyContent="flex-end" alignItems="center">
        {role === 'coach' && <Earnings earnings={earnings} />}

        <NotificationIcon />

        <ProfileDropdown />
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  role: state.profile.role,
  earnings: !state.profile.coach_profile?.earnings ? 0 : state.profile.coach_profile.earnings,
  isFeatured: state.profile.coach_profile?.featured || false,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  finishOnboardingRequest: (role, earnings) =>
    dispatch(AuthActions.finishOnboardingRequest(role, earnings)),
  getNotifications: () => dispatch(NotificationsActions.getNotificationsRequest()),
  getConversations: () => dispatch(MessagesActions.getConversationsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile);
