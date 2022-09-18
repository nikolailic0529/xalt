import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import ChallengesActions from 'lib/redux/reducers/challenges';
import materialStyles from '../materialStyles';

const ChallengeTitle = ({ currentChallenge }) => {
  const classes = materialStyles();
  if (currentChallenge) {
    return <Box className={classes.ChallengeTitle}>{currentChallenge.name}</Box>;
  }

  return <Box className={classes.ChallengesIntro}>Welcome To Challenges</Box>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeTitle);
