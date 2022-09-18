/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { theme } from 'components';
import { connect } from 'react-redux';
import { CheckoutItem } from 'components/shared/Checkout';
import ButtonAux from 'components/shared/ButtonAux';
import ProfileActions from 'lib/redux/reducers/profile';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChangePlan from './ChangePlan';

import {
  SettingsSectionContainer,
  SettingsSectionWrapper,
  SettingsDescription,
  SettingsSessionsBlock,
  SettingsSessionsInfo,
} from './styles';

const { colors } = theme;

const useStyles = makeStyles(() => ({
  changePlanBtn: {
    color: '#E6447D',
    fontSize: 18,
    textDecoration: 'underline',
    marginLeft: 'auto',
    marginBottom: 10,
    cursor: 'pointer',
  },
}));

const Membership = (props) => {
  const {
    selectedCoach,
    subscription,
    currentPeriodEnd,
    lessonCount,
    subscriptionType,
    oneTimeCheckoutRequest,
  } = props;
  const [editSession, setEditSession] = useState(false);
  const [changePlan, setChangePlan] = useState(false);
  const [newSessionCount, setNewSessionCount] = useState(1);

  const classes = useStyles();

  const handleAddNewSessions = () => {
    oneTimeCheckoutRequest(newSessionCount * selectedCoach.rate, newSessionCount, 'custom');
    setEditSession(false);
  };

  const cancelEditSession = () => {
    setEditSession(false);
  };

  const showEditSession = () => {
    setEditSession(true);
  };

  const handleChangePlan = () => {
    setChangePlan(true);
  };

  return (
    <SettingsSectionContainer>
      {changePlan ? (
        <SettingsSectionWrapper width="100%">
          <ChangePlan subscriptionType={subscriptionType} setChangePlanMode={setChangePlan} />
        </SettingsSectionWrapper>
      ) : subscription ? (
        <>
          <SettingsSectionWrapper p="32px 32px 0 32px">
            <SettingsSessionsBlock width="100%">
              <Box className={classes.changePlanBtn} onClick={handleChangePlan}>
                Change Plan
              </Box>
            </SettingsSessionsBlock>
          </SettingsSectionWrapper>
          <SettingsSectionWrapper
            borderBottom={`1px solid ${colors.gray200}`}
            p="10px 32px 32px 32px"
          >
            <SettingsSessionsBlock minWidth={200} flexGrow={2}>
              <SettingsSessionsInfo
                color="kingfisherDaisy"
                fontSize={18}
                lineHeight="28px"
                fontWeight="bold"
              >
                {subscription?.description || ''}
              </SettingsSessionsInfo>
              <SettingsSessionsInfo fontSize={18} lineHeight="28px">
                {`$${Number(subscription?.amount) || ''}/${subscription?.type || ''}`}
              </SettingsSessionsInfo>
            </SettingsSessionsBlock>
            <SettingsSessionsBlock minWidth={132}>
              <SettingsSessionsInfo>
                {`${subscription?.description.split(' ')[0] || ''} days a week`}
              </SettingsSessionsInfo>
              <SettingsSessionsInfo>
                {`${subscription?.sessions_count || ''} times month`}
              </SettingsSessionsInfo>
            </SettingsSessionsBlock>
          </SettingsSectionWrapper>
          <SettingsSectionWrapper>
            <SettingsSessionsBlock>
              <SettingsSessionsInfo fontSize={18} lineHeight="28px">
                {`Your next bill is $${Number(subscription?.amount) || ''}
            on ${currentPeriodEnd}`}
              </SettingsSessionsInfo>
            </SettingsSessionsBlock>
          </SettingsSectionWrapper>
        </>
      ) : subscriptionType === 'measurement' ? (
        <>
          <SettingsSectionWrapper>
            <SettingsSessionsBlock>
              <SettingsSessionsInfo fontSize={18} lineHeight="28px">
                You are currently on measurement mode.
              </SettingsSessionsInfo>
            </SettingsSessionsBlock>
          </SettingsSectionWrapper>
        </>
      ) : (
        lessonCount &&
        (editSession ? (
          <>
            <CheckoutItem
              subscription={null}
              rate={selectedCoach?.rate}
              lessonCount={newSessionCount}
              setLessonCount={setNewSessionCount}
            />
            <div style={{ padding: '0 40px 20px' }}>
              <ButtonAux pinkBtn onClick={handleAddNewSessions} m="0 10px 0 0">
                Add sessions
              </ButtonAux>
              <ButtonAux pinkBrdrBtn onClick={cancelEditSession}>
                Cancel
              </ButtonAux>
            </div>
          </>
        ) : (
          <SettingsSectionWrapper>
            <SettingsSessionsBlock width="100%">
              <Box className={classes.changePlanBtn} onClick={handleChangePlan}>
                Change Plan
              </Box>
              <SettingsSessionsInfo fontSize={18} lineHeight="28px">
                {`You have ${lessonCount || ''} available sessions.`}
                {subscriptionType !== 'rehabilitation' && (
                  <div
                    onClick={showEditSession}
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  >
                    Add more sessions here
                  </div>
                )}
              </SettingsSessionsInfo>
            </SettingsSessionsBlock>
          </SettingsSectionWrapper>
        ))
      )}
    </SettingsSectionContainer>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  oneTimeCheckoutRequest: (amount = 0, lessonCount = 0, payType = 'custom') =>
    dispatch(ProfileActions.oneTimeCheckoutRequest(amount, lessonCount, payType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Membership);
