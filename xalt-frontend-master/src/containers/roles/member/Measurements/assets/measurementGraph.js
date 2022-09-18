import React from 'react';

import { Box } from '@material-ui/core';
import moment from 'moment';

import materialStyles from '../materialStyles';
import { Line } from '@ant-design/charts';
import Exercises from './exercises';

const MeasurementGraph = ({ selectedMeasurement, measurements }) => {
  const classes = materialStyles();

  const data = measurements
    .reduce((accumulator, measurement) => {
      if (measurement.goal || measurement.exercise != selectedMeasurement) {
        return accumulator;
      }

      return [
        ...accumulator,
        {
          variation: measurement.variation,
          date: moment(measurement.measurement_date).format('YYYY/MM/DD'),
          measurement: measurement.amount, //`${measurement.amount} ${Exercises[selectedMeasurement].units}`,
        },
      ];
    }, []).sort((v1, v2) => {
      return moment(v1.date, 'YYYY/MM/DD').isBefore(moment(v2.date, 'YYYY/MM/DD')) ? -1 : 1;
    });

  const goal = measurements.find((measurement) => {
    return measurement.exercise == selectedMeasurement && measurement.goal;
  });

  const config = {
    data,
    autoFit: true,
    padding: 'auto',
    xField: 'date',
    yField: 'measurement',
    seriesField: 'variation',
    legend: {
      position: 'top',
    },
    smooth: true,
    tooltip: {
      showMarkers: false,
    },
    annotations: goal
      ? [
          {
            type: 'line',
            start: ['start', goal.amount],
            end: ['end', goal.amount],
            style: {
              stroke: '#edb418',
              lineDash: [3, 4],
              lineWidth: 2,
            },
          },
          {
            type: 'text',
            position: ['start', goal.amount],
            content: `Goal ${goal.amount}`,
            offsetY: +6,
            style: {
              textBaseline: 'top',
            },
          },
        ]
      : [],
  };

  return (
    <Box className={classes.graphContainer}>
      <Line {...config} />
    </Box>
  );
};

export default MeasurementGraph;
