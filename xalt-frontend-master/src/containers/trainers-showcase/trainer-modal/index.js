import React from 'react';
import { Box, Modal, makeStyles } from '@material-ui/core';
import ButtonAux from 'components/shared/ButtonAux';
import VimeoEmbed from 'components/shared/VimeoEmbed';
import { useHistory } from 'react-router-dom';

const useTrainerModalStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 1200,
    height: 1000,
    maxHeight: '80%',
    backgroundColor: '#fff',

    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  modalContent: {
    height: '100%',
    overflow: 'auto',
    padding: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 30,
  },
  headerDesc: {
    fontSize: 16,
    color: '#979797',
  },
  info: {
    display: 'flex',
    marginTop: 30,
  },
  photo: {
    width: 375,
    background: 'rgba(57, 57, 60, 0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      width: '100%',
    },
  },
  about: {
    padding: '0 0 0 30px',
    fontSize: 20,
    display: 'flex',
    flex: 1,
  },
  rate: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 16,
    color: '#979797',
    margin: '20px 0',
  },
  specWrapper: {
    borderTop: '1px solid #E6447D',
    borderBottom: '1px solid #E6447D',
    padding: '50px 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailTitle: {
    fontSize: 20,
    color: '#979797',
    marginBottom: 20,
  },
  detailList: {
    fontSize: 20,

    '& p': {
      margin: 0,
    },
  },
  footer: {
    marginTop: 30,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'column',

    '& button': {
      width: 'fit-content',
      margin: 'auto',
    },
  },
  footerTitle: {
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center',
  },
  videoPlayer: {
    width: '80%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 30,
  },
}));

const TrainerModal = (props) => {
  const { isOpen, handleClose, coach } = props;
  const classes = useTrainerModalStyles();
  const history = useHistory();

  const loves = !coach.coach_profile?.loves
    ? []
    : Array.isArray(coach.coach_profile?.loves)
    ? coach.coach_profile?.loves
    : Object.keys(coach.coach_profile?.loves);

  const handleRegister = () => {
    if (coach.coach_profile?.id) {
      localStorage.setItem(
        'selected_coach',
        JSON.stringify({
          value: coach.coach_profile?.id,
          expiry: Math.floor(Date.now() / 1000),
        }),
      );
    }
    history.push('/registration?role=member');
  };

  return (
    <Modal className={classes.modal} open={isOpen} onClose={handleClose}>
      <Box className={classes.modalContainer}>
        <Box className={classes.modalContent}>
          <Box className={classes.header}>
            <Box className={classes.title}>{coach.name}</Box>
            <Box className={classes.headerDesc}>
              {`Training since ${coach.coach_profile?.training_since || 2021}`}
            </Box>
          </Box>
          <Box className={classes.info}>
            <Box className={classes.photo}>
              <img src={coach.avatar?.url || '../../../assets/images/user-avatar.png'} alt="" />
            </Box>
            <Box className={classes.about}>{coach.coach_profile?.about}</Box>
          </Box>
          <Box className={classes.rate}>{`Rate: $${coach.coach_profile?.rate || 85}/hour`}</Box>
          <Box className={classes.specWrapper}>
            <Box className={classes.detail}>
              <Box className={classes.detailTitle}>SPECIALTIES</Box>
              <Box className={classes.detailList}>
                {coach.coach_profile?.fitnes_domains?.map((domain) => (
                  <p>{domain.coach_domain_name}</p>
                ))}
              </Box>
            </Box>
            <Box className={classes.detail}>
              <Box className={classes.detailTitle}>CERTIFICATIONS</Box>
              <Box className={classes.detailList}>
                {coach.coach_profile?.coach_documents?.map((document) => (
                  <p>{document.name}</p>
                ))}
              </Box>
            </Box>
            <Box className={classes.detail}>
              <Box className={classes.detailTitle}>LOVES</Box>
              <Box className={classes.detailList}>
                {loves?.map((love) => (
                  <p>{love}</p>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className={classes.footer}>
            {coach.coach_profile?.why_with_me_video && (
              <>
                <Box className={classes.footerTitle}>Why train with me?</Box>
                <Box className={classes.videoPlayer}>
                  <VimeoEmbed url={coach.coach_profile?.why_with_me_video} type="player" />
                </Box>
              </>
            )}
            <ButtonAux pinkBtn onClick={handleRegister}>
              {`Train with ${coach.name}`}
            </ButtonAux>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TrainerModal;
