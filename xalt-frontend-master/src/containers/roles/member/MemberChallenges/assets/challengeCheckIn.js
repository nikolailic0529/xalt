import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { DatePicker, Modal } from 'antd';
import { useFormik } from 'formik';
import { LinkOutlined, ProfileFilled } from '@ant-design/icons';
import moment from 'moment';

import { Input, TextArea } from 'components/shared/Form';
import ChallengesActions from 'lib/redux/reducers/challenges';
import ButtonAux from 'components/shared/ButtonAux';
import { CardInputError } from 'components/shared/Checkout';

import materialStyles from '../materialStyles';

const validate = (values) => {
  // TODO validations
  const errors = {};
  return errors;
};

const fieldNames = {
  comments: 'What did you do today?',
  proof: 'Link to proof (optional)',
};

const ChallengeCheckIn = ({ currentChallenge, profile, createCheckInForChallenge, enrolled }) => {
  const classes = materialStyles();
  const [isVisible, setIsVisible] = useState(false);
  const formik = useFormik({
    initialValues: {
      checkin_date: moment().format(),
      comments: '',
      proof: '',
    },
    validate,
    onSubmit: (values) => {
      createCheckInForChallenge({
        user_member_challenge_check_in: {
          member_challenge_id: currentChallenge.id,
          user_id: profile.id,
          checkin_date: values.checkin_date,
          comments: values.comments,
          proof: values.proof,
        },
      });
      setIsVisible(false);
    },
  });

  if (!currentChallenge) {
    return null;
  }

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
        title={<h1>Checkin</h1>}
        closable={false}
        footer={null}
        visible={isVisible}
        width={'300px'}
        onCancel={() => {
          setIsVisible(false);
        }}
      >
        <Box className={classes.checkInModalContent}>
          <form
            id="new-checkin"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Box className={classes.checkInItemContainer}>
              <Box className={classes.checkInDate}>
                <DatePicker
                  onChange={(datetime, str) => {
                    formik.setFieldValue('checkin_date', datetime.startOf('day').format());
                  }}
                  disabledDate={(date) => {
                    if (date.isBefore(moment(currentChallenge.start))) {
                      return true;
                    }
                    if (date.isAfter(moment(currentChallenge.end))) {
                      return true;
                    }
                    if (date.day() == 0 || date.day() == 6) {
                      return true;
                    }
                    return currentChallenge.schedule.charAt(date.day() - 1) == '-';
                  }}
                />
              </Box>
            </Box>
            <Box className={classes.challengeCheckinFieldWrapper}>
              <TextArea
                name="comments"
                id="comments"
                placeholder={fieldNames.comments}
                theme="classic"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </Box>
            <Box className={classes.challengeCheckinFieldWrapper}>
              {formik.touched.comments && formik.errors.comments ? (
                <CardInputError>{formik.errors.comments}</CardInputError>
              ) : null}
            </Box>
            <Box className={classes.challengeCheckinFieldWrapper}>
              <Input
                name="proof"
                id="proof"
                placeholder={fieldNames.proof}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                prefix={<LinkOutlined style={{ fontSize: '24px' }} />}
                suffix="*"
              />
            </Box>
            <Box className={classes.challengeCheckinFieldWrapper}>
              {formik.touched.proof && formik.errors.proof ? (
                <CardInputError>{formik.errors.proof}</CardInputError>
              ) : null}
            </Box>
            <Box className={classes.checkInItemContainer}>
              <ButtonAux
                className={classes.checkInSubmit}
                type="submit"
                form="new-checkin"
                pinkBtn
                m="20px 20px 0 0"
              >
                Submit
              </ButtonAux>
              <ButtonAux
                type="button"
                onClick={() => {
                  setIsVisible(false);
                }}
              >
                Close
              </ButtonAux>
            </Box>
          </form>
        </Box>
      </Modal>
      {enrolled && (
        <ButtonAux
          className={classes.challengeCheckInButton}
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Check in
        </ButtonAux>
      )}
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
    createCheckInForChallenge: (data) =>
      dispatch(ChallengesActions.createCheckInForChallengeRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCheckIn);
