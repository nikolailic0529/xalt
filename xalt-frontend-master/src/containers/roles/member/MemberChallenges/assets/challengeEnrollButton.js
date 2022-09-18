import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import confirm from 'antd/lib/modal/confirm';

import ChallengesActions from 'lib/redux/reducers/challenges';
import ButtonAux from 'components/shared/ButtonAux';

import materialStyles from '../materialStyles';

const ChallengeEnrollButton = ({
  enrolled,
  setEnrolled,
  currentChallenge,
  profile,
  enrollInChallenge,
  unenrollInChallenge,
}) => {
  const classes = materialStyles();
  if (!currentChallenge) {
    return null;
  }

  if (enrolled) {
    return (
      <Box className={classes.challengeEnroll}>
        <Box className={classes.challengeEnrollPadding}></Box>
        <Box className={classes.challengeEnrollPadding}>
          <ButtonAux
            className={classes.challengeUnenrollButton}
            onClick={() => {
              confirm({
                title: 'Are you sure you want to leave?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                onOk() {
                  unenrollInChallenge({
                    user_member_challenge: {
                      member_challenge_id: currentChallenge.id,
                      user_id: profile.id,
                      status: 'unenrolled',
                    },
                  });
                  setEnrolled(false);
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            }}
          >
            Leave Challenge
          </ButtonAux>
        </Box>
        <Box className={classes.challengeEnrollPaddingRight}>
          <ButtonAux
            className={classes.challengeShareButton}
            onClick={() => {
              navigator.clipboard.writeText(
                `${location.protocol}//${location.host}/member_challenges/${currentChallenge.id}`,
              );
              notification.success({
                message: 'Challenge copied to clipboard',
                placement: 'bottomLeft',
                duration: 2,
              });
            }}
          >
            Share
          </ButtonAux>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.challengeEnroll}>
      <ButtonAux
        className={classes.challengeEnrollButton}
        onClick={() => {
          confirm({
            title: 'Do you Want to enroll in this challenge?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
              enrollInChallenge({
                user_member_challenge: {
                  member_challenge_id: currentChallenge.id,
                  user_id: profile.id,
                  status: 'enrolled',
                },
              });
              setEnrolled(true);
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }}
      >
        Join Challenge
      </ButtonAux>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    profile: state.profile,
    enrolled: ownProps.enrolled,
    setEnrolled: ownProps.setEnrolled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    enrollInChallenge: (data) => dispatch(ChallengesActions.enrollInChallengeRequest(data)),
    unenrollInChallenge: (data) => dispatch(ChallengesActions.unenrollInChallengeRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeEnrollButton);
