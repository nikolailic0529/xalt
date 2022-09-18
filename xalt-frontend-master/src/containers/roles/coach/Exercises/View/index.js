import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Progress } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import When from 'components/shared/When';
import Flex from 'components/shared/Flex';
import VimeoEmbed from 'components/shared/VimeoEmbed';
import ButtonAux from 'components/shared/ButtonAux';
import ExercisesActions from 'lib/redux/reducers/exercises';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { extractIdFromUrl } from 'lib/helpers';
import { isEmpty, truncate } from 'lodash';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EXERCISE_OPTIONS } from 'lib/constants';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import colors from 'lib/theme/colors';

const useStyles = makeStyles((theme) => ({
  exercise: {
    display: 'flex',
    flexDirection: 'column',
    padding: 48,
    border: '1px solid #E6447D',
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    border: '1px solid #E6447D',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  videoPlayer: {
    width: '40%',
  },
  headerDetails: {
    width: '60%',
    padding: '20px 40px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  headerTitle: {
    color: '#652F79',
    fontSize: 28,
    marginBottom: 30,
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
  },
  infoLabel: {
    color: '#E6447D',
    marginRight: 5,
  },
  infoValue: {
    color: '#39393C',
  },
  submitInfo: {
    display: 'flex',
    marginTop: 30,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    maxWidth: 700,
  },
  title: {
    color: '#39393C',
    fontSize: 18,
    marginTop: 40,
    marginBottom: 28,
    fontWeight: 700,
  },
  text: {
    color: '#39393C',
    fontSize: 14,
  },
  description: {
    marginBottom: 25,
    fontSize: 14,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: 500,
    margin: 'auto',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  data: {
    display: 'flex',
    width: '100%',
  },
  dataLabel: {
    width: '50%',
    color: '#39393C',
    paddingRight: '20px',
    fontSize: 16,
    fontWeight: 700,
  },
  dataValue: {
    width: '50%',
    color: '#39393C',
    fontSize: 14,
  },
  voteWrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    right: 0,
    top: -20,
    width: 100,

    '& svg': {
      fontSize: 50,
    },
  },
  vote: {
    position: 'absolute',
    fontSize: 10,
    width: 20,
    textAlign: 'center',
    color: colors.darkPink,
    top: 22,
    left: 45,
  },
}));

const ViewExercise = ({
  getExercise,
  exercise,
  myId,
  removeExerciseRequest,
  voteExercise,
  unvoteExercise,
}) => {
  useEffect(() => {
    getExercise(extractIdFromUrl());
  }, []);

  const {
    id,
    name,
    description,
    categorie,
    equipment,
    difficulty,
    start_pos: startPos,
    end_pos: endPos,
    instruction,
    movement,
    agonist,
    relevant,
    vimeo_video_url: vimeoVideoUrl,
    video_url: videoUrl,
    is_private: isPrivate,
    user,
    vote_record,
  } = exercise;

  const classes = useStyles();
  const [currentReportId] = useState(extractIdFromUrl());
  const history = useHistory();

  const handleDelete = () => {
    confirm({
      title: 'Do you Want to delete this exercise?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        removeExerciseRequest(currentReportId);
        setTimeout(() => {
          history.push('/exercises?scope=my');
        }, 100);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleVote = () => {
    const isVoted = vote_record.find((record) => record.user_id === myId);
    if (isVoted) {
      unvoteExercise(isVoted.id);
    } else {
      voteExercise({
        vote_record: {
          exercise_id: exercise.id,
          user_id: myId,
          is_yes: true,
        },
      });
    }
  };

  return (
    <>
      {exercise && !isEmpty(exercise) ? (
        <Box className={classes.exercise}>
          <Box className={classes.header}>
            <Box className={classes.videoPlayer}>
              <VimeoEmbed url={videoUrl} type="player" />
            </Box>
            <Box className={classes.headerDetails}>
              {exercise.is_competition && (
                <Box className={classes.voteWrapper}>
                  <ThumbUpOutlinedIcon />
                  <div className={classes.vote}>{vote_record.length || '0'}</div>
                  <ButtonAux
                    onClick={handleVote}
                    disabled={vote_record.find((record) => record.user_id === myId)}
                    pinkBtn
                    width="80px"
                    height="30px"
                    m="5px 0 0 0"
                  >
                    {vote_record.find((record) => record.user_id === myId) ? 'Voted' : 'Vote'}
                  </ButtonAux>
                </Box>
              )}
              <h1 className={classes.headerTitle}>{truncate(name, { length: 100 })}</h1>
              <Box className={classes.headerInfo}>
                <Box className={classes.info}>
                  <Box className={classes.infoLabel}>
                    <b>Target Joint/Body Segment</b>
                  </Box>
                  <Box className={classes.infoValue}>
                    {
                      EXERCISE_OPTIONS.CATEGORIES.filter(
                        (category) => category.value === categorie,
                      )[0].label
                    }
                  </Box>
                </Box>
                <Box className={classes.info}>
                  <Box className={classes.infoLabel}>
                    <b>Set-Up/Equipment:</b>
                  </Box>
                  <Box className={classes.infoValue}>
                    {EXERCISE_OPTIONS.EQUIPMENTS.filter((equ) => equ.value === equipment)[0].label}
                  </Box>
                </Box>
                <Box className={classes.info}>
                  <Box className={classes.infoLabel}>
                    <b>Level:</b>
                  </Box>
                  <Progress
                    percent={
                      // eslint-disable-next-line no-nested-ternary
                      difficulty === 'advanced' ? 100 : difficulty === 'intermediate' ? 60 : 30
                    }
                    status={difficulty === 'advanced' ? 'exception' : 'active'}
                    showInfo={false}
                  />
                  <Box className={classes.infoValue}>
                    {
                      EXERCISE_OPTIONS.DIFFICULTIES.filter((level) => level.value === difficulty)[0]
                        .label
                    }
                  </Box>
                </Box>
              </Box>
              <Box className={classes.submitInfo}>
                <Box className={classes.infoLabel}>Submitted by: </Box>
                <Box className={classes.infoValue}>{user.name}</Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.container}>
            <Box className={classes.title}>Description of How to Perform Exercise</Box>
            <Box className={classes.description}>{description}</Box>
            <Box className={classes.content}>
              <Box className={classes.data}>
                <Box className={classes.dataLabel}>Exercise Starting Position</Box>
                <Box className={classes.dataValue}>{startPos}</Box>
              </Box>
              <Box className={classes.data}>
                <Box className={classes.dataLabel}>Exercise Finishing Position</Box>
                <Box className={classes.dataValue}>{endPos}</Box>
              </Box>
              <Box className={classes.data}>
                <Box className={classes.dataLabel}>Instructional Coaching Cues</Box>
                <Box className={classes.dataValue}>{instruction}</Box>
              </Box>
              <Box className={classes.data}>
                <Box className={classes.dataLabel}>Range of Movement</Box>
                <Box className={classes.dataValue}>{movement}</Box>
              </Box>
              <Box className={classes.data}>
                <Box className={classes.dataLabel}>Movement Phases & Contraction Modes</Box>
                <Box className={classes.dataValue}>{relevant}</Box>
              </Box>
              <Box className={classes.data}>
                <Box className={classes.dataLabel}>Agonist, Antagonist, Synergist Muscle(s)</Box>
                <Box className={classes.dataValue}>{agonist}</Box>
              </Box>
            </Box>
          </Box>
          <Flex justifyContent="center">
            <When condition={user.id === myId}>
              <ButtonAux
                onClick={handleDelete}
                pinkBtn
                width="116px"
                maxWidth="116px"
                m="20px 20px 0 0"
              >
                Delete
              </ButtonAux>
              <Link to={`/exercises/edit/${id}`}>
                <ButtonAux pinkBtn m="20px 0 0">
                  Edit
                </ButtonAux>
              </Link>
            </When>
          </Flex>
        </Box>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  myId: state.profile.id,
  exercise: state.exercises.exercise || {},
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getExercise: (id) => dispatch(ExercisesActions.getExerciseRequest(id)),
  removeExerciseRequest: (id) => dispatch(ExercisesActions.removeExerciseRequest(id)),
  voteExercise: (data) => dispatch(ExercisesActions.voteExerciseRequest(data)),
  unvoteExercise: (id) => dispatch(ExercisesActions.unvoteExerciseRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewExercise);
