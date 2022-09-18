import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SaveIcon from '@material-ui/icons/Save';
import Question from 'components/shared/Question';
import { Spin } from 'antd';
import MemberProfileQuestionAnswersActions from 'lib/redux/reducers/member_question_answers';
import { connect } from 'react-redux';
import * as Questions from './questions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginBottom: 40,
  },
  saveButton: {
    position: 'fixed',
    right: 40,
    bottom: 30,
    minWidth: 140,
  },
  title: {
    fontSize: 24,
  },
}));

export const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box pt={3} pb={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const QuestionTabs = {
  GenralHealthHistoryQuestions: 'General Health History',
  FitnessQuestions: 'Fitness',
  NutritionQuestions: 'Diet/Nutrition',
  SleepQuestions: 'Sleep',
  StressQuestions: 'Stress',
  CommunityQuestions: 'Community & Happiness',
  GoalQuestions: 'Goals',
  PillarsQuestions: 'Pillars',
  // 'Wearables',
};

const Questionaires = (props) => {
  const {
    answers,
    fetching,
    getMemberQuestionAnswersRequest,
    addMemberQuestionAnswersRequest,
    updateMemberQuestionAnswersRequest,
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [questionValues, setQuestionValues] = useState(null);
  const isBigScreen = useMediaQuery('(min-width:1660px)');

  const fillDefaultValues = () => {
    const questions = {};

    Object.keys(Questions).forEach((key) => {
      questions[key] = {};
      Questions[key].forEach((question) => {
        questions[key][question.id] = {
          current: '',
          goal: '',
          action: '',
        };
      });
    });

    setQuestionValues(questions);
  };

  useEffect(() => {
    getMemberQuestionAnswersRequest();
  }, []);

  useEffect(() => {
    if (answers && answers.id) {
      setQuestionValues(answers.answer);
    } else {
      fillDefaultValues();
    }
  }, [answers]);

  const handleValueChange = (questionGroupId, questionIndex, newValue, targetType) => {
    const data = { ...questionValues };
    data[questionGroupId][questionIndex][targetType] = newValue;
    setQuestionValues(data);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const saveAnswers = () => {
    if (answers && answers.id) {
      updateMemberQuestionAnswersRequest(questionValues, answers.id);
    } else {
      if (!fetching) {
        addMemberQuestionAnswersRequest(questionValues);
      }
    }
  };

  return (
    <div className={classes.root}>
      {fetching ? (
        <Box display="flex" justifyContent="center">
          <Spin size="large" />
        </Box>
      ) : (
        <>
          <h4 className={classes.title}>My Health Profile</h4>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant={isBigScreen ? 'fullWidth' : 'scrollable'}
            >
              {Object.keys(QuestionTabs).map((tabKey) => (
                <Tab label={QuestionTabs[tabKey]} />
              ))}
            </Tabs>
          </AppBar>
          {Object.keys(QuestionTabs).map((tabKey, index) => (
            <TabPanel value={tabValue} index={index} dir={theme.direction}>
              {questionValues &&
                Questions[tabKey].map((question) => (
                  <Question
                    question={question}
                    group={tabKey}
                    key={question.id}
                    index={question.id}
                    onChange={handleValueChange}
                    currentValue={questionValues[tabKey][question.id]}
                  />
                ))}
            </TabPanel>
          ))}
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.saveButton}
            startIcon={<SaveIcon />}
            onClick={saveAnswers}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  answers: state.member_question_answers.member_answers,
  fetching: state.member_question_answers.fetching,
  memberProfileId: state.profile.member_profile?.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMemberQuestionAnswersRequest: () =>
    dispatch(MemberProfileQuestionAnswersActions.getMemberQuestionAnswersRequest()),
  addMemberQuestionAnswersRequest: (body) =>
    dispatch(MemberProfileQuestionAnswersActions.addMemberQuestionAnswersRequest(body)),
  updateMemberQuestionAnswersRequest: (body, id) =>
    dispatch(MemberProfileQuestionAnswersActions.updateMemberQuestionAnswersRequest(body, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionaires);
