import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import Exercises from './exercises';

import materialStyles from '../materialStyles';

const MeasurementTitle = ({ currentSelection }) => {
  const classes = materialStyles();
  return (
    <Box className={classes.exerciseTitle}>
      <Box className={classes.exerciseTitleText}>
        {Exercises[currentSelection].exercise}
        {Exercises[currentSelection].exerciseDescription && (
          <Tooltip title={Exercises[currentSelection].exerciseDescription}>
            <InfoIcon />
          </Tooltip>
        )}
      </Box>
      <Box className={classes.exerciseTitleText}>
        Target Muscle: {Exercises[currentSelection].muscle}
        {Exercises[currentSelection].muscleDescription && (
          <Tooltip title={Exercises[currentSelection].muscleDescription}>
            <InfoIcon />
          </Tooltip>
        )}
      </Box>
      <Box className={classes.exerciseTitleText}>Type: {Exercises[currentSelection].type}</Box>
    </Box>
  );
};

export default MeasurementTitle;
