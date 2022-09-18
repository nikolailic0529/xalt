import React from 'react';

import { connect } from 'react-redux';
import { Checkbox, Select } from 'antd';
const { Option } = Select;
import { useFormik } from 'formik';
import { Box } from '@material-ui/core';
import moment from 'moment';

import { Input } from 'components/shared/Form';
import ButtonAux from 'components/shared/ButtonAux';
import materialStyles from '../materialStyles';
import MeasurementActions from 'lib/redux/reducers/measurements';

import Exercises from './exercises';

const fields = {
  amount: '',
  variation: '',
  is_goal: '',
};

const fieldNames = {
  amount: 'count',
  variation: 'variation',
};

const validate = (values) => {
  const errors = {};
  return errors;
};
const NewMeasurementForm = ({ currentMeasurement, createNewMeasurement, member_profile }) => {
  const toMeasurement = (values) => {
    return {
      measurement: {
        user_id: member_profile.user.id,
        coach_id: member_profile.coach_profile.user_id,
        amount: values.amount,
        variation: values.variation,
        goal: values.is_goal,
        exercise: currentMeasurement,
        measurement_date: values.is_goal ? moment(0).format() : moment().startOf('day').format(),
      },
    };
  };
  const classes = materialStyles();

  const formik = useFormik({
    initialValues: {
      amount: 0,
      variation: 'standard',
      is_goal: false,
    },
    validate,
    onSubmit: (values) => {
      createNewMeasurement(toMeasurement(values));
    },
  });

  const handleGoalChange = (e) => {
    formik.setFieldValue('is_goal', e.target.checked);
  };

  return (
    <form
      id="new-measurement"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <Box className={classes.mainForm}>
        <Box className={classes.formTextBox}>Record New Measurement: </Box>
        <Box className={classes.formComponent}>
          <Input
            name="amount"
            id="amount"
            placeholder={fieldNames.amount}
            theme="classic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box className={classes.formComponent}>
          <Select
            style={{ width: 200 }}
            onChange={(value) => {
              formik.setFieldValue('variation', value);
            }}
            placeholder="Variation"
          >
            <Option value={'standard'}>Standard</Option>
            {Exercises[currentMeasurement].variations.map((value) => {
              return <Option value={value}>{value}</Option>;
            })}
          </Select>
        </Box>
        <Box className={classes.formComponent}>
          <Checkbox id="is_goal" onChange={handleGoalChange}>
            <Box className={classes.formTextBox}>Goal</Box>
          </Checkbox>
        </Box>
        <ButtonAux
          pinkBtn
          width="116px"
          maxWidth="116px"
          type="submit"
          form="new-measurement"
          m="0 0 0 0"
        >
          Submit
        </ButtonAux>
      </Box>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    member_profile: state.member_profile.member_profile,
    currentMeasurement: ownProps.currentMeasurement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    createNewMeasurement: (data) => dispatch(MeasurementActions.createNewMeasurementRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMeasurementForm);
