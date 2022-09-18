import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
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
  answers: {
    marginTop: 20,
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  answer: {
    maxWidth: '45%',
    marginRight: 30,

    '& b': {
      marginRight: 10,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  input: {
    width: '100%',
    marginTop: 10,
  },
}));

const QuestionAnswer = (props) => {
  const {
    question: { question, options, type, isGoalRequired, isActionRequired, unit, goalHelperText },
    index,
    group,
    onChange,
    currentValue,
  } = props;
  const classes = useStyles();
  const [actionValue, setActionValue] = useState(currentValue ? currentValue.action : '');

  useEffect(() => {
    if (currentValue) {
      setActionValue(currentValue.action);
    }
  }, [currentValue]);

  const handleChange = (event) => {
    setActionValue(event.target.value);
    onChange(group, index, event.target.value);
  };

  const formatValue = (value) => {
    let formattedValue = '';

    if (typeof value === 'object') {
      formattedValue = Object.keys(value).reduce((prev, cur) => {
        if (value[cur]) {
          const answerOption = options.filter((option) => option.value === cur);
          if (prev === '') {
            return `${answerOption && answerOption.length ? answerOption[0].name : cur}`;
          }
          return `${prev}, ${answerOption && answerOption.length ? answerOption[0].name : cur}`;
        }
        return prev;
      }, '');
    } else if (type === 'input') {
      formattedValue = value === 'NotSure' ? "I don't know" : value || '';
    } else if (value) {
      const answerOption = options.filter((option) => option.value === value);
      formattedValue = answerOption && answerOption.length ? answerOption[0].name : '';
    }

    return formattedValue;
  };

  return (
    <Box className={classes.root} key={index}>
      <span className={classes.question}>
        <b>{`Question ${index + 1}:`}</b>
        {question}
      </span>
      <Box className={classes.answers}>
        <span className={classes.answer}>
          {isGoalRequired ? <b>Current: </b> : <b>Answer: </b>}
          {currentValue && currentValue.current
            ? `${formatValue(currentValue.current)} ${unit || ''}`
            : ''}
        </span>
        <span className={classes.answer}>
          {isGoalRequired && <b>Goal: </b>}
          {currentValue && currentValue.goal
            ? `${formatValue(currentValue.goal)} ${unit || ''}`
            : ''}
        </span>
      </Box>
      {isActionRequired !== false && (
        <TextField
          className={classes.input}
          type="text"
          label="Action:"
          value={actionValue}
          onChange={handleChange}
          variant="outlined"
        />
      )}
    </Box>
  );
};

export default QuestionAnswer;
