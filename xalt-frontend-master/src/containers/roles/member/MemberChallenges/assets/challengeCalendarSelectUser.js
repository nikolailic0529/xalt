import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { Modal } from 'antd';

import ChallengesActions from 'lib/redux/reducers/challenges';
import ButtonAux from 'components/shared/ButtonAux';
import Text from 'components/shared/Text';

import materialStyles from '../materialStyles';
import ChallengeCalendarParticipantList from './challengeCalendarParticipantList';

const ChallengeCalendarSelectUser = ({ currentChallenge, profile, setUser, enrolled }) => {
  const classes = materialStyles();

  const [modalVisible, setModalVisible] = useState(false);
  if (!currentChallenge) {
    return null;
  }

  if (!enrolled) {
    return null;
  }

  return (
    <Box>
      <Modal
        style={{
          height: '80%',
        }}
        bodyStyle={{
          paddingTop: 0,
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        centered={true}
        destroyOnClose={true}
        title={<h1>Select User Calendar</h1>}
        closable={false}
        footer={null}
        visible={modalVisible}
        width={'400px'}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Box>
          <ChallengeCalendarParticipantList
            setUser={(id) => {
              setUser(id);
              setModalVisible(false);
            }}
          />
        </Box>
      </Modal>
      <ButtonAux
        className={classes.challengeCalendarSelectUserButton}
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <Text darkPink>Select Different User</Text>
      </ButtonAux>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    profile: state.profile,
    setUser: ownProps.setUser,
    enrolled: ownProps.enrolled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCalendarSelectUser);
