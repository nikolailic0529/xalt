import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import ChallengesActions from 'lib/redux/reducers/challenges';
import Icon from 'components/shared/Icon';
import ButtonAux from 'components/shared/ButtonAux';

import materialStyles from '../materialStyles';

const ChallengeCalendarParticipantBar = ({ currentChallenge, profile, user, setUser }) => {
  const classes = materialStyles();
  if (!currentChallenge) {
    return null;
  }

  const checkIns = currentChallenge.user_member_challenge_check_ins.filter((check_in) => {
    return check_in.user_id == user.id;
  }).length;

  return (
    <ButtonAux
      className={classes.challengeCalendarParticipantBarWrapper}
      onClick={() => {
        setUser(user.id);
      }}
    >
      <Icon src={user.avatar.url || 'empty-user-profile'} />
      <Box className={classes.challengeCalendarParticipantBarName}>{user.name}</Box>
      <Box className={classes.challengeCalendarParticipantBarCheckInCount}>
        {checkIns}
        {checkIns != 1 ? ' Checkins' : ' Checkin'}
      </Box>
    </ButtonAux>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    profile: state.profile,
    user: ownProps.user,
    setUser: ownProps.setUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCalendarParticipantBar);
