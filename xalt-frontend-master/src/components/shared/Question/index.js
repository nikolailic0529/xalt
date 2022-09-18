import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import QuestionContent from './QuestionContent';

const useStyles = makeStyles(() => ({
  root: {
    background: '#F7F7F7',
    borderRadius: 20,
    padding: '30px 40px',
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  question: {
    fontSize: 18,
    width: '100%',

    '& b': {
      marginRight: 10,
    },
  },
}));

const Question = (props) => {
  const {
    question: { type, options, question, isGoalRequired },
    index,
    group,
    onChange,
    currentValue,
  } = props;
  const classes = useStyles();
  const [curValue, setCurValue] = useState(currentValue ? currentValue.current : '');
  const [curCheckboxValues, setCurCheckboxValues] = useState(
    currentValue ? currentValue.current : '',
  );
  const [curOtherValue, setCurOtherValue] = useState('');
  const [goalValue, setGoalValue] = useState(currentValue ? currentValue.goal : '');
  const [goalCheckboxValues, setGoalCheckboxValues] = useState(
    currentValue ? currentValue.goal : '',
  );
  const [goalOtherValue, setGoalOtherValue] = useState('');

  useEffect(() => {
    if (currentValue) {
      if (type === 'input') {
        if (currentValue.current) {
          setCurValue(currentValue.current);
        }
        if (currentValue.goal) {
          setGoalValue(currentValue.goal);
        }
      } else if (type === 'multiple') {
        if (currentValue.current) {
          const data = {};
          options.forEach((option) => {
            data[option.value] = currentValue.current[option.value] ?? false;
          });
          if (currentValue.current.other) {
            data.otherValue = currentValue.current.otherValue;
          }
          setCurCheckboxValues(data);
        }
        if (currentValue.goal) {
          const data = {};
          options.forEach((option) => {
            data[option.value] = currentValue.goal[option.value] ?? false;
          });
          if (currentValue.goal.other) {
            data.otherValue = currentValue.goal.otherValue;
          }
          setGoalCheckboxValues(data);
        }
      } else {
        if (currentValue.current) {
          const isExistingValue = options.find((option) => option.value === currentValue.current);
          if (!isExistingValue) {
            setCurOtherValue(currentValue.current);
            setCurValue('other');
          } else {
            setCurValue(currentValue.current);
          }
        }
        if (currentValue.goal) {
          const isExistingValue = options.find((option) => option.value === currentValue.goal);
          if (!isExistingValue) {
            setGoalOtherValue(currentValue.goal);
            setCurValue('other');
          } else {
            setGoalValue(currentValue.goal);
          }
        }
      }
    }
  }, [currentValue]);

  useEffect(() => {
    if (type === 'multiple' && !curCheckboxValues) {
      const data = {};
      options.forEach((option) => {
        data[option.value] = false;
      });
      data.otherValue = '';
      setCurCheckboxValues(data);
      setGoalCheckboxValues(data);
    }
  }, [type]);

  const handleChange = (event, targetType = 'current') => {
    if (targetType === 'current') {
      setCurValue(event.target.value);
    } else {
      setGoalValue(event.target.value);
    }
    onChange(group, index, event.target.value, targetType);
  };

  const handleCheckboxChange = (event, targetType = 'current') => {
    let data = {};
    if (targetType === 'current') {
      data = { ...curCheckboxValues };
      data[event.target.name] = event.target.checked;
      setCurCheckboxValues(data);
    } else {
      data = { ...goalCheckboxValues };
      data[event.target.name] = event.target.checked;
      setGoalCheckboxValues(data);
    }
    onChange(group, index, data, targetType);
  };

  const handleOtherValueChange = (event, targetType = 'current') => {
    if (type === 'multiple') {
      let data = {};
      if (targetType === 'current') {
        data = {
          ...curCheckboxValues,
          otherValue: event.target.value,
        };
        setCurCheckboxValues(data);
        if (curCheckboxValues.other) {
          onChange(group, index, data, targetType);
        }
      } else {
        data = {
          ...goalCheckboxValues,
          otherValue: event.target.value,
        };
        setGoalCheckboxValues(data);
        if (goalCheckboxValues.other) {
          onChange(group, index, data, targetType);
        }
      }
    } else {
      if (targetType === 'current') {
        setCurOtherValue(event.target.value);
        if (curValue === 'other') {
          onChange(group, index, event.target.value, targetType);
        }
      } else {
        setGoalOtherValue(event.target.value);
        if (goalValue === 'other') {
          onChange(group, index, event.target.value, targetType);
        }
      }
    }
  };

  const handleCurrentChange = (event) => {
    handleChange(event, 'current');
  };

  const handleCurrentCheckboxChange = (event) => {
    handleCheckboxChange(event, 'current');
  };

  const handleCurrentOtherValueChange = (event) => {
    handleOtherValueChange(event, 'current');
  };

  const handleGoalChange = (event) => {
    handleChange(event, 'goal');
  };

  const handleGoalCheckboxChange = (event) => {
    handleCheckboxChange(event, 'goal');
  };

  const handleGoalOtherValueChange = (event) => {
    handleOtherValueChange(event, 'goal');
  };

  return (
    <Box className={classes.root} key={index}>
      <span className={classes.question}>
        <b>{`Question ${index + 1}:`}</b>
        {question}
      </span>
      <QuestionContent
        parentProps={props}
        isGoal={false}
        isGoalRequired={isGoalRequired}
        currentValues={{
          value: curValue,
          otherValue: curOtherValue,
          checkboxValues: curCheckboxValues,
        }}
        handleChange={handleCurrentChange}
        handleCheckboxChange={handleCurrentCheckboxChange}
        handleOtherValueChange={handleCurrentOtherValueChange}
      />
      {isGoalRequired && (
        <QuestionContent
          parentProps={props}
          isGoal
          currentValues={{
            value: goalValue,
            otherValue: goalOtherValue,
            checkboxValues: goalCheckboxValues,
          }}
          handleChange={handleGoalChange}
          handleCheckboxChange={handleGoalCheckboxChange}
          handleOtherValueChange={handleGoalOtherValueChange}
        />
      )}
    </Box>
  );
};

export default Question;
