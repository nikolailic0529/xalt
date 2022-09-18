import React, { useState } from 'react';
import { connect } from 'react-redux';
import { LinkOutlined } from '@ant-design/icons';
import { DatePicker, Space, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { Box } from '@material-ui/core';
import moment from 'moment';

import { Input, TextArea, Select } from 'components/shared/Form';
import { CHALLENGE_OPTIONS } from 'lib/constants';
import Flex from 'components/shared/Flex';
import ButtonAux from 'components/shared/ButtonAux';
import { CardInputError } from 'components/shared/Checkout';
import { NewChallengeFormWrapper } from './../styles';
import materialStyles from '../materialStyles';
import ToggleButton from './toggleButton';
import ChallengesActions from 'lib/redux/reducers/challenges';
import { validYoutubeLink, validVimeoLink } from '../utilities/videoType';

const { RangePicker } = DatePicker;

const fields = {
  challenge_name: '',
  description: '',
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  category: '',
  incentives: '',
  video_url: '',
  start_date: '',
  end_date: '',
  is_confirmed: false,
};

const fieldNames = {
  challenge_name: 'Name of Challenge...',
  description: 'Description of How to Perform Challenge...',
  category: 'Theme of Challenge',
  video_url: 'Copy/paste link of Challenge',
  is_confirmed: 'confirmation of the acknowledgement...',
  incentives: 'Reward to consistent participants (if any)',
};

const toDataModelValues = (values) => {
  return {
    name: values.challenge_name,
    description: values.description,
    schedule: `${values.monday ? 'M' : '-'}${values.tuesday ? 'T' : '-'}${
      values.wednesday ? 'W' : '-'
    }${values.thursday ? 'R' : '-'}${values.friday ? 'F' : '-'}`,
    category: values.category,
    video_url: values.video_url,
    incentives: values.incentives,
    start: values.start_date.format(),
    end: values.end_date.format(),
  };
};

const validate = (values) => {
  const errors = {};
  if (values.challenge_name == '') {
    errors.challenge_name = 'Must specify a name';
  }

  if (values.challenge_name.length >= 50) {
    errors.challenge_name = 'Name too long, name name cannot be longer than 50 characters';
  }
  if (values.description == '') {
    errors.description = 'Must provide a description';
  }
  if (
    !['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].some((value) => {
      return values[value];
    })
  ) {
    errors.schedule = 'Must select at least one day';
  }
  if (values.category == '') {
    errors.category = 'Please select a theme for your challenge';
  }
  if (values.start_date == '' || values.end_date == '') {
    errors.date_range = 'Must specify both a start and end time for the challenge';
  }

  if (!values.is_confirmed) {
    errors.is_confirmed = 'Please confirm that your video meets the criteria';
  }
  if (!validVimeoLink(values.video_url) && !validYoutubeLink(values.video_url)) {
    errors.video_url = 'Please provide a valid youtube or vimeo link';
  }
  return errors;
};
const AddChallengeForm = ({ profile, addChallenge, closeModal }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const classes = materialStyles();

  const formik = useFormik({
    initialValues: {
      challenge_name: '',
      description: '',
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      category: '',
      incentives: '',
      video_url: '',
      start_date: '',
      end_date: '',
      is_confirmed: false,
    },
    validate,
    onSubmit: (values) => {
      addChallenge(toDataModelValues(values));
      closeModal();
    },
  });

  const handleConfirmChange = (e) => {
    setIsConfirmed(e.target.checked);
    formik.setFieldValue('is_confirmed', e.target.checked);
  };

  return (
    <NewChallengeFormWrapper>
      <Box className={classes.addChallengeTitle}>New Challenge</Box>
      <Box className={classes.mainForm}>
        <form
          id="new-challenge"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <Box className={classes.addChallengeFormWrapper}>
            <Box className={classes.addChallengeFieldWrapper}>
              <Input
                name="challenge_name"
                id="challenge_name"
                placeholder={fieldNames.challenge_name}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                suffix="*"
              />
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              {formik.touched.challenge_name && formik.errors.challenge_name ? (
                <CardInputError>{formik.errors.challenge_name}</CardInputError>
              ) : null}
            </Box>

            <Box className={classes.addChallengeFieldWrapper}>
              <TextArea
                name="description"
                id="description"
                placeholder={fieldNames.description}
                theme="classic"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              {formik.touched.description && formik.errors.description ? (
                <CardInputError>{formik.errors.description}</CardInputError>
              ) : null}
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              <Select
                name="category"
                id="category"
                placeholder={fieldNames.category}
                theme="classic"
                options={CHALLENGE_OPTIONS.CATEGORIES}
                onChange={(value) => formik.setFieldValue('category', value)}
                onBlur={formik.handleBlur}
                required
              />
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              {formik.touched.category && formik.errors.category ? (
                <CardInputError>{formik.errors.category}</CardInputError>
              ) : null}
            </Box>

            <Box className={classes.addChallengeFieldWrapper}>
              <Input
                name="incentives"
                id="incentives"
                placeholder={fieldNames.incentives}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                suffix="*"
              />
            </Box>

            <Box className={classes.addChallengeRangePickWrapper}>
              <RangePicker
                className={classes.addChallengeRangePicker}
                size="large"
                disabledDate={(date) => {
                  return date.isBefore(moment());
                }}
                onChange={(dates) => {
                  formik.setFieldValue('start_date', dates[0]);
                  formik.setFieldValue('end_date', dates[1]);
                }}
              />
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              {formik.errors.date_range ? (
                <CardInputError>{formik.errors.date_range}</CardInputError>
              ) : null}
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              <Box className={classes.addChallengeDateTitleText}>Schedule</Box>
              <Box className={classes.scheduleSelectorWrapper}>
                <ToggleButton
                  toggleCallback={(value) => {
                    formik.setFieldValue('monday', value);
                  }}
                >
                  Mon
                </ToggleButton>
                <ToggleButton
                  toggleCallback={(value) => {
                    formik.setFieldValue('tuesday', value);
                  }}
                >
                  Tues
                </ToggleButton>
                <ToggleButton
                  toggleCallback={(value) => {
                    formik.setFieldValue('wednesday', value);
                  }}
                >
                  Wed
                </ToggleButton>
                <ToggleButton
                  toggleCallback={(value) => {
                    formik.setFieldValue('thursday', value);
                  }}
                >
                  Thur
                </ToggleButton>
                <ToggleButton
                  toggleCallback={(value) => {
                    formik.setFieldValue('friday', value);
                  }}
                >
                  Fri
                </ToggleButton>
                <Box className={classes.addChallengeFieldWrapper}>
                  {formik.errors.schedule ? (
                    <CardInputError>{formik.errors.schedule}</CardInputError>
                  ) : null}
                </Box>
              </Box>
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              <Input
                name="video_url"
                id="video_url"
                placeholder={fieldNames.video_url}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                prefix={<LinkOutlined style={{ fontSize: '24px' }} />}
                suffix="*"
              />
            </Box>
            <Box className={classes.addChallengeFieldWrapper}>
              {formik.errors.video_url ? (
                <CardInputError>{formik.errors.video_url}</CardInputError>
              ) : null}
            </Box>

            <Space direction="vertical" className="confirmText">
              {formik.touched.is_confirmed && formik.errors.is_confirmed ? (
                <CardInputError>{formik.errors.is_confirmed}</CardInputError>
              ) : null}
              <Checkbox id="is_confirmed" onChange={handleConfirmChange}>
                I confirm that the video being submitted:
              </Checkbox>
              <p>- Uses appropriate anatomical language and has no profanity</p>
              <p>- Has no persons wearing revealing/inappropriate clothing</p>
              <p>- Has good lighting and camera set-up, and clear quality</p>
              <p>- Is between 30-90 seconds</p>
            </Space>
            <Flex justifyContent="space-between">
              <Box className={classes.addChallengeFooterLeft}></Box>
              <Box className={classes.addChallengeFooterCenter}>
                <ButtonAux
                  pinkBtn
                  width="116px"
                  maxWidth="116px"
                  type="submit"
                  form="new-challenge"
                  m="20px 0 0 0"
                >
                  Submit
                </ButtonAux>
              </Box>
              <Box className={classes.addChallengeFooterRight}>
                <ButtonAux
                  className={classes.addChallengeCloseButton}
                  onClick={closeModal}
                  type="button"
                  pinkBtn
                  m="20px 20px 0 0"
                >
                  Close
                </ButtonAux>
              </Box>
            </Flex>
          </Box>
        </form>
      </Box>
    </NewChallengeFormWrapper>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    closeModal: ownProps.closeModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addChallenge: (data) => dispatch(ChallengesActions.addChallengeRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChallengeForm);
