import React, { useState } from 'react';
import { Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Box } from '@material-ui/core';

import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';
import AddChallengeForm from './addChallengeForm';
import materialStyles from '../materialStyles';
import colors from 'lib/theme/colors';

const AddChallenge = (props) => {
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
          <AddChallengeForm
            closeModal={() => {
              setModalVisible(false);
            }}
          />
        </Box>
      </Modal>
      <ButtonAux
        className={classes.addChallengeButton}
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <PlusCircleOutlined
          style={{ color: colors.darkPink, marginRight: '10px', fontSize: '24px' }}
        />
        <Text darkPink>Add New Challenge</Text>
      </ButtonAux>
    </Box>
  );
};

export default AddChallenge;
