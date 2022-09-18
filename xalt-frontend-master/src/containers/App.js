import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, notification, Alert, Button } from 'antd';
import UserContent from 'lib/navigation/router';
import ProfileActions from 'lib/redux/reducers/profile';
import { ThemeProvider } from 'styled-components';

import { theme } from 'components';

import Aside from 'components/Aside';
import Header from 'components/Header';
import { Main, MainWrapper } from 'components/shared/Layout';
import NotificationsPanel from 'components/NotificationsPanel';
import When from 'components/shared/When';
import { connect } from 'react-redux';

const App = (props) => {
  const {
    accessToken,
    accessClient,
    accessUID,
    is_onboarding_finished,
    getUserProfile,
    error,
    success,
    isSubscribed,
    hasCoaches,
    role,
  } = props;
  const condition = accessToken && accessClient && accessUID && is_onboarding_finished;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isRestore = document.location.pathname.includes('restore-password');

  useEffect(() => {
    const body = document.querySelector('body');
    if (isMobileNavOpen) {
      body.style.position = 'static';
      body.style.overflow = 'hidden';
    } else {
      body.removeAttribute('style');
    }

    if (condition) {
      getUserProfile();
    }
  }, [isMobileNavOpen]);

  const openErrorNotification = () => {
    notification.error({
      message: 'An Error Occured',
      description: error,
      placement: 'bottomLeft',
      duration: 3,
    });
  };

  const openSuccessNotification = () => {
    notification.success({
      message: 'Success!',
      description: success,
      placement: 'bottomLeft',
      duration: 3,
    });
  };

  useEffect(() => {
    if (error) {
      openErrorNotification();
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      openSuccessNotification();
    }
  }, [success]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout className={isRestore ? 'layout restore' : 'layout'}>
          <When condition={condition}>
            <NotificationsPanel />
            <Layout>
              <Aside />
              <Layout className="page-content">
                <Header isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
                <Main layerActive={!isMobileNavOpen} className="main">
                  <MainWrapper>
                    {!isSubscribed && (
                      <Alert
                        message="Once you upgrade your plan, you can explore more exciting features."
                        type="warning"
                        showIcon
                        className="main-alert"
                        action={
                          <Button size="medium" type="link" href="/account">
                            Upgrade plan here
                          </Button>
                        }
                      />
                    )}
                    {isSubscribed && !hasCoaches && role === 'member' && (
                      <Alert
                        message="You’re now a member of xAlt, please select your coach and be on your way to improved health and fitness outcomes!."
                        type="warning"
                        showIcon
                        className="main-alert"
                        action={
                          <Button size="medium" type="link" href="/coach-list">
                            Select your coach here
                          </Button>
                        }
                      />
                    )}
                    <UserContent />
                  </MainWrapper>
                </Main>
              </Layout>
            </Layout>
          </When>

          <When condition={!condition}>
            <UserContent />
          </When>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  accessClient: state.auth.accessClient,
  accessUID: state.auth.accessUID,
  is_onboarding_finished: state.auth.is_onboarding_finished,
  error: state.notification.error,
  success: state.notification.success,
  role: state.profile.role,
  hasCoaches:
    state.profile && state.profile.member_profile && state.profile.member_profile.coach_profile_id,
  isSubscribed:
    true ||
    (state.profile.role === 'member' &&
      ((state.auth.stripe && state.auth.stripe.stripe_subscription_status === 'active') ||
        (state.profile.stripe && state.profile.stripe.stripe_subscription_status === 'active'))) ||
    (state.profile.role === 'coach' &&
      (state.auth.stripe || state.profile.stripe) &&
      ((state.auth.stripe && state.auth.stripe.stripe_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_id) ||
        (state.auth.stripe && state.auth.stripe.stripe_bank_account_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_bank_account_id))),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getUserProfile: () => dispatch(ProfileActions.getUserProfileRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
