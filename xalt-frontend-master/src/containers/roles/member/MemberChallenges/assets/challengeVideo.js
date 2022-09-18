import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import ChallengesActions from 'lib/redux/reducers/challenges';
import materialStyles from '../materialStyles';

import { validYoutubeLink, validVimeoLink, convertYoutubeToEmbedded } from '../utilities/videoType';

const ChallengeVideo = ({ currentChallenge }) => {
  const classes = materialStyles();
  if (!currentChallenge) {
    return null;
  }

  if (validVimeoLink(currentChallenge.video_url)) {
    return (
      <Box className={classes.challengeVideoWrapper}>
        <iframe
          className={classes.challengeVideo}
          src={currentChallenge.video_url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="video"
        />
      </Box>
    );
  }

  if (validYoutubeLink(currentChallenge.video_url)) {
    return (
      <Box className={classes.challengeVideoWrapper}>
        <iframe
          className={classes.challengeVideo}
          src={convertYoutubeToEmbedded(currentChallenge.video_url)}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="video"
        />
      </Box>
    );
  }
  return <Box></Box>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeVideo);
