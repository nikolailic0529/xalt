import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import ChallengesActions from 'lib/redux/reducers/challenges';
import materialStyles from '../materialStyles';

import ChallengeCalendarUserDisplay from './challengeCalendarUserDisplay';
import ChallengeCalendarSelectUser from './challengeCalendarSelectUser';
import ChallengeCalendarDisplay from './challengeCalendarDisplay';

const ChallengeCalendar = ({ currentChallenge, profile, enrolled }) => {
  const classes = materialStyles();
  const [currentUserId, setCurrentUserId] = useState(profile.id);
  useEffect(() => {
    setCurrentUserId(profile.id);
  }, [currentChallenge]);

  return (
    <Box className={classes.challengeChalendarWrapper}>
      <Box className={classes.challengeCalendarHeader}>
        <ChallengeCalendarUserDisplay userId={currentUserId} enrolled={enrolled} />
        <ChallengeCalendarSelectUser setUser={setCurrentUserId} enrolled={enrolled} />
      </Box>
      <ChallengeCalendarDisplay userId={currentUserId} enrolled={enrolled}/>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    profile: state.profile,
    enrolled: ownProps.enrolled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCalendar);
