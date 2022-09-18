/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/charts';

const LiquidChart = ({ value = 0, title = '' }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(value);
  }, [value]);

  const config = {
    percent: parseFloat(parseFloat(percent / 100).toFixed(2)),
    radius: 0.8,
    statistic: {
      title: {
        formatter: function formatter() {
          return title;
        },
        style: function style(_ref) {
          const { percentValue } = _ref;
          return { fill: percentValue > 0.65 ? 'white' : 'rgba(44,53,66,0.85)', fontSize: 14 };
        },
      },
      content: {
        style: function style(_ref2) {
          const percentValue = _ref2.percent;
          return {
            fontSize: 60,
            lineHeight: 1,
            fill: percentValue > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
          };
        },
        customHtml: function customHtml(container, view, _ref3) {
          const percentValue = _ref3.percent;
          // const scale = Math.min(d / textWidth, 1);
          return '<div style="width:100%;display:flex;align-items:center;justify-content:center;font-size:25px;margin-top:10px">'.concat(
            parseFloat(percentValue * 100).toFixed(2),
            '</div>',
          );
        },
      },
    },
    liquidStyle: function liquidStyle(_ref4) {
      const percentValue = _ref4.percent;
      return {
        fill:
          percentValue > 0.75
            ? 'rgb(91, 225, 44, 0.6)'
            : percentValue > 0.5
            ? '#5B8FF9'
            : percentValue > 0.25
            ? '#FAAD14'
            : 'rgb(234, 66, 40)',
        stroke:
          percentValue > 0.75
            ? 'rgb(91, 225, 44, 0.6)'
            : percentValue > 0.5
            ? '#5B8FF9'
            : percentValue > 0.25
            ? '#FAAD14'
            : 'rgb(234, 66, 40)',
      };
    },
    color: function color() {
      return '#5B8FF9';
    },
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Liquid {...config} />;
};

export default LiquidChart;
