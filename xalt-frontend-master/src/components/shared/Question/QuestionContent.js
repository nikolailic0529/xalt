import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  FormControl,
  FormGroup,
  Checkbox,
  Box,
  Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '.MuiTooltip-tooltip': {
      maxWidth: 415,
    },
  },
  root: {
    marginTop: 20,
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 0,
    minWidth: 100,

    '& svg': {
      fontSize: 16,
    },
  },
  inline: {
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  columns: {
    flexDirection: 'column',

    '& > span': {
      width: '100%',
    },
  },
  question: {
    fontSize: 18,
    width: '50%',

    '& b': {
      marginRight: 10,
    },
  },
  select: {
    flexDirection: 'row',
  },
  input: {
    width: '40%',

    '&.need-margin': {
      marginLeft: 50,
    },

    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%',
    },
  },
  multiple: {
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
    },
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '49%',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      '& .MuiInputBase-root': {
        maxWidth: 130,
      },
    },
  },
  radioboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '24%',

    [theme.breakpoints.down('md')]: {
      width: '49%',
    },
  },
}));

const QuestionContent = (props) => {
  const {
    parentProps: {
      question: { type, options, isShowingNotSure, inputType, goalHelperText },
      index,
    },
    isGoal,
    isGoalRequired,
    currentValues: { value, otherValue, checkboxValues },
    handleChange,
    handleCheckboxChange,
    handleOtherValueChange,
  } = props;
  const classes = useStyles();
  const inlineTypes = ['input'];

  const getCurrentText = () => {
    if (isGoal) {
      if (goalHelperText) {
        return (
          <>
            Goal
            <Tooltip title={goalHelperText}>
              <InfoIcon />
            </Tooltip>
            :
          </>
        );
      }
      return 'Goal:';
    }
    if (isGoalRequired) return 'Current:';
    return '';
  };

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        className={`${inlineTypes.includes(type) ? classes.inline : classes.columns}`}
        key={index}
      >
        {getCurrentText() && <p className={classes.title}>{getCurrentText()}</p>}
        {isShowingNotSure && (
          <RadioGroup
            aria-label="I don't know"
            name="NotSure"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="NotSure" control={<Radio />} label="I don't know" />
          </RadioGroup>
        )}
        {type === 'input' && (
          <TextField
            className={`${classes.input} ${isGoalRequired ? 'need-margin' : ''}`}
            type={inputType}
            InputLabelProps={{
              shrink: true,
            }}
            value={value !== 'NotSure' ? value : ''}
            onChange={handleChange}
            variant="outlined"
          />
        )}
        {type === 'select' && (
          <RadioGroup className={classes.select} value={value} onChange={handleChange}>
            {options.map((option) => (
              <Box display="flex" className={classes.radioboxWrapper}>
                <FormControlLabel value={option.value} control={<Radio />} label={option.name} />
                {option.value === 'other' && (
                  <TextField
                    ml={2}
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={otherValue}
                    onChange={handleOtherValueChange}
                  />
                )}
              </Box>
            ))}
          </RadioGroup>
        )}
        {type === 'multiple' && (
          <FormControl component="fieldset" className={classes.multiple}>
            <FormGroup>
              {options.map((option) => (
                <Box display="flex" className={classes.checkboxWrapper}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkboxValues[option.value]}
                        onChange={handleCheckboxChange}
                        name={option.value}
                      />
                    }
                    label={option.name}
                  />
                  {option.value === 'other' && (
                    <TextField
                      ml={2}
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={checkboxValues.otherValue}
                      onChange={handleOtherValueChange}
                    />
                  )}
                </Box>
              ))}
            </FormGroup>
          </FormControl>
        )}
      </Box>
    </Box>
  );
};

export default QuestionContent;
