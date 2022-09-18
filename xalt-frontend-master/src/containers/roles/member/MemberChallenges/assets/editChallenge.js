import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Box } from '@material-ui/core';

import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';
import EditChallengeForm from './editChallengeForm';
import materialStyles from '../materialStyles';
import colors from 'lib/theme/colors';

const EditChallenge = ({ currentChallenge, profile }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const classes = materialStyles();

  return (
    <Box>
      <Modal
        style={{
          height: '80%',
        }}
        bodyStyle={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 15,
          paddingBottom: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        centered={true}
        destroyOnClose={true}
        title={null}
        closable={false}
        footer={null}
        visible={modalVisible}
        width={'50%'}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Box>
          <EditChallengeForm
            closeModal={() => {
              setModalVisible(false);
            }}
          />
        </Box>
      </Modal>
      {currentChallenge?.user?.id == profile.id && (
        <ButtonAux
          className={classes.addChallengeButton}
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <EditOutlined style={{ color: colors.darkPink, marginRight: '10px', fontSize: '24px' }} />
          <Text darkPink>Edit Challenge</Text>
        </ButtonAux>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditChallenge);
