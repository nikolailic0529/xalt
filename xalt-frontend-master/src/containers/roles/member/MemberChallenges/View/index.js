import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChallengesActions from 'lib/redux/reducers/challenges';
import { connect } from 'react-redux';
import { extractIdFromUrl } from 'lib/helpers';
import { Box } from '@material-ui/core';

import materialStyles from '../materialStyles';
import ChallengeTile from '../assets/challengeTile';
import ButtonAux from 'components/shared/ButtonAux';

const ViewChallenge = ({ getChallenge, profile }) => {
  const history = useHistory();
  useEffect(() => {
    const id = extractIdFromUrl();
    getChallenge(id);
  }, []);

  const classes = materialStyles();

  if (!profile) {
    return <>Please Sign in to view this challenge</>;
  }

  return (
    <Box className={classes.viewChallengeWrapper}>
      <Box className={classes.viewChallengeLeftBox}>
        <ButtonAux
          onClick={() => {
            history.push('/member_challenges');
          }}
        >
          View All Challenges
        </ButtonAux>
      </Box>
      <Box className={classes.viewChallengeBackground}>
        <ChallengeTile />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  currentChallenge: state.challenges.currentChallenge,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getChallenge: (id) => dispatch(ChallengesActions.getChallengeRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewChallenge);
