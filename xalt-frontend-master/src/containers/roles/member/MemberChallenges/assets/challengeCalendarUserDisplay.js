import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import ChallengesActions from 'lib/redux/reducers/challenges';
import materialStyles from '../materialStyles';
import Icon from 'components/shared/Icon';

const ChallengeCalendarUserDisplay = ({ currentChallenge, userId, enrolled }) => {
  const classes = materialStyles();

  if (!currentChallenge) {
    return null;
  }


  if (!enrolled) {
    return null;
  }

  const user = currentChallenge.user_member_challenges.find(
    (user_member_challenge) => {
      return user_member_challenge.user_id == userId;
    },
  )?.user  || null;

  if (!user) {
    return null;
  }
  
  return (
    <Box className={classes.challengeCalendarUserDisplay}>
      <Icon src={user.avatar.url || 'empty-user-profile'} />
      <Box className={classes.challengeCalendarParticipantBarName}>{user.name}</Box>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    userId: ownProps.userId,
    enrolled: ownProps.enrolled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCalendarUserDisplay);
