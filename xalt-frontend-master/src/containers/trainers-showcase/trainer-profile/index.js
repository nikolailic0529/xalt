/* eslint-disable global-require */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import TrainerModal from '../trainer-modal';

const useStyles = makeStyles(() => ({
  trainerProfile: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    maxWidth: 300,
    cursor: 'pointer',
    height: '100%',

    '&.selected': {
      border: '2px solid #E6447D',
    },
  },
  image: {
    height: 280,
    width: '100%',
    backgroundSize: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 30,
  },
  about: {
    fontSize: 16,
  },
  body: {
    padding: '20px 30px',
  },
  rate: {
    marginTop: 30,
    color: '#979797',
    fontSize: 16,
  },
}));

const TrainerProfile = (props) => {
  const { coach, showRate, mode, selected, setSelected } = props;
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    if (mode === 'picture-only') return;
    if (mode === 'select') {
      setSelected(coach.coach_profile?.id);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Box
        className={`${classes.trainerProfile} trainerProfile ${selected ? 'selected' : ''}`}
        onClick={handleClick}
      >
        <Box
          className={classes.image}
          style={{
            background: `url('${coach.avatar?.url || '../../../assets/images/user-avatar.png'}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(57, 57, 60, 0.05)',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {mode !== 'picture-only' && (
          <Box className={classes.body}>
            <Box className={classes.title}>{coach.name}</Box>
            <Box className={classes.about}>
              {coach.coach_profile?.about && coach.coach_profile?.about.length > 100
                ? `${coach.coach_profile?.about.substring(0, 100)}...`
                : coach.coach_profile?.about || ''}
            </Box>
            {showRate && (
              <Box className={classes.rate}>{`Rate: $${coach.coach_profile?.rate || 85}/hour`}</Box>
            )}
          </Box>
        )}
      </Box>
      {showModal && <TrainerModal coach={coach} isOpen={showModal} handleClose={hideModal} />}
    </>
  );
};

export default TrainerProfile;
