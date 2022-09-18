/* eslint-disable no-nested-ternary */
import React from 'react';
import { RingProgress } from '@ant-design/charts';

const RingProgressChart = ({ value = 0, title = '' }) => {
  const config = {
    height: 160,
    width: 160,
    autoFit: false,
    percent: parseFloat(parseFloat(value / 100).toFixed(2)),
    color: [
      value >= 75
        ? 'rgb(91, 225, 44, 0.6)'
        : value >= 50
        ? '#5B8FF9'
        : value >= 25
        ? '#FAAD14'
        : 'rgb(234, 66, 40)',
      '#E8EDF3',
    ],
    innerRadius: 0.85,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
        },
        formatter: function formatter() {
          return title;
        },
      },
    },
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RingProgress {...config} />;
};

export default RingProgressChart;
