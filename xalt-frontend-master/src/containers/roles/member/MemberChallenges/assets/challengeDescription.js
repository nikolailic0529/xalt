import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import ChallengesActions from 'lib/redux/reducers/challenges';
import materialStyles from '../materialStyles';

const ChallengeDescription = ({ currentChallenge, profile }) => {
  const classes = materialStyles();

  if (!currentChallenge) {
    return null;
  }
  const scheduleList = () => {
    const dayList = [];
    if (currentChallenge.schedule.indexOf('M') >= 0) {
      dayList.push('Monday');
    }
    if (currentChallenge.schedule.indexOf('T') >= 0) {
      dayList.push('Tuesday');
    }
    if (currentChallenge.schedule.indexOf('W') >= 0) {
      dayList.push('Wednesday');
    }
    if (currentChallenge.schedule.indexOf('R') >= 0) {
      dayList.push('Thursday');
    }
    if (currentChallenge.schedule.indexOf('F') >= 0) {
      dayList.push('Friday');
    }

    if (dayList.length == 1) {
      return dayList[0];
    }

    return dayList.join(', ');
  };

  return (
    <Box className={classes.challengeDescriptionWrapper}>
      <Box className={classes.columnFlexStart}>
        <Box className={classes.challengeContentHeader}>Description</Box>
        <Box className={classes.challengeContentBody}>{currentChallenge.description}</Box>
      </Box>
      <Box className={classes.columnFlexStart}>
        <Box className={classes.challengeContentExtras}>
          Participants:{` ${currentChallenge.user_member_challenges.length}`}
        </Box>
        <Box className={classes.challengeContentExtras}>Schedule: {scheduleList()}</Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDescription);
