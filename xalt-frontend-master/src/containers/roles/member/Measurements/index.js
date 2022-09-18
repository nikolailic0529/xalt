import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Box } from '@material-ui/core';

import MeasurementTitle from './assets/measurementTitle';
import MeasurementGraph from './assets/measurementGraph';
import MeasurementSelector from './assets/measurementSelector';

import { DashboardCard } from 'components/shared/Dashboard';
import materialStyles from './materialStyles';

import MeasurementActions from 'lib/redux/reducers/measurements';

const Measurements = ({ profile, measurements, getAllMeasurements }) => {
  const [currentExercise, setCurrentExercise] = useState('squat');
  const classes = materialStyles();

  useEffect(() => {
    getAllMeasurements(profile.id);
  }, []);

  return (
    <DashboardCard>
      <Box className={classes.mainContentWrapper}>
        <Box className={classes.titleBar}>
          <MeasurementTitle currentSelection={currentExercise} />
          <MeasurementSelector setSelection={setCurrentExercise} />
        </Box>
        <Box className={classes.graphInfoWrapper}>
          <MeasurementGraph selectedMeasurement={currentExercise} measurements={measurements} />
        </Box>
      </Box>
    </DashboardCard>
  );
};

const mapStateToProps = (state, ownProps) => ({
  member_profile: state.member_profile,
  profile: state.profile,
  measurements: state.measurements.measurements,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getAllMeasurements: (id) => dispatch(MeasurementActions.getAllMeasurementsRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Measurements);
