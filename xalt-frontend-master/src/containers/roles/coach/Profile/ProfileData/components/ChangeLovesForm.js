/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ButtonAux from 'components/shared/ButtonAux';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  newLoveForm: {
    display: 'flex',
    alignItems: 'center',

    '& > div': {
      width: 300,
      marginRight: 20,
    },
  },
  loves: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
  },
  oneLove: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
  },
  delete: {
    display: 'flex',
    marginRight: 5,
    cursor: 'pointer',
  },
  input: {
    height: 42,
    border: '1px solid #39393C !important',
    borderRadius: 5,
    fontSize: 16,
    padding: '0 12px',
    marginRight: 15,
  },
}));

const ChangeLovesForm = (props) => {
  const { loves, setLoves } = props;
  const classes = useStyles();
  const [newLove, setNewLove] = useState('');

  const handleClick = () => {
    const newLoves = [...loves, newLove];
    setLoves(newLoves);
    setNewLove('');
  };

  const removeLove = (love) => {
    const newLoves = loves?.filter((item) => item !== love);
    setLoves(newLoves);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.loves}>
        {loves?.map((love, index) => (
          <Box className={classes.oneLove} key={`love-${index}`}>
            <Box className={classes.delete} onClick={() => removeLove(love)}>
              <HighlightOffIcon />
            </Box>
            {love}
          </Box>
        ))}
      </Box>
      <Box className={classes.newLoveForm}>
        <input
          className={classes.input}
          value={newLove}
          onChange={(e) => setNewLove(e.target.value)}
        />
        <ButtonAux pinkBtn onClick={handleClick}>
          Add
        </ButtonAux>
      </Box>
    </Box>
  );
};

export default ChangeLovesForm;
