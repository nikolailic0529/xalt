import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SaveIcon from '@material-ui/icons/Save';
import QuestionAnswer from 'components/shared/QuestionAnswer';
import { Spin } from 'antd';
import MemberProfileQuestionAnswersActions from 'lib/redux/reducers/member_question_answers';
import MemberRecommendationActions from 'lib/redux/reducers/member_recommendations';
import { connect } from 'react-redux';
import * as Questions from '../questions';
import { TabPanel, QuestionTabs } from '../index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginBottom: 40,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    borderRadius: 20,
  },
  saveButton: {
    position: 'fixed',
    right: 40,
    bottom: 30,
    minWidth: 140,
  },
}));

const QuestionaireAnswers = (props) => {
  const {
    answers,
    fetching,
    getMemberQuestionAnswersRequest,
    addMemberQuestionAnswersRequest,
    updateMemberQuestionAnswersRequest,
    getMemberRecommendationRequest,
    memberId,
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
    getMemberQuestionAnswersRequest(memberId);
  }, []);

  useEffect(() => {
    if (answers && answers.id) {
      setQuestionValues(answers.answer);
    } else {
      fillDefaultValues();
    }
  }, [answers]);

  const handleValueChange = (questionGroupId, questionIndex, newValue) => {
    const data = { ...questionValues };
    data[questionGroupId][questionIndex].action = newValue;
    setQuestionValues(data);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const saveAnswers = () => {
    if (answers && answers.id) {
      updateMemberQuestionAnswersRequest(questionValues, answers.id);
      getMemberRecommendationRequest();
    } else {
      if (!fetching) {
        addMemberQuestionAnswersRequest(questionValues, memberId);
        getMemberRecommendationRequest();
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
                  <QuestionAnswer
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
  getMemberQuestionAnswersRequest: (memberId) =>
    dispatch(MemberProfileQuestionAnswersActions.getMemberQuestionAnswersRequest(memberId)),
  addMemberQuestionAnswersRequest: (body, memberId) =>
    dispatch(MemberProfileQuestionAnswersActions.addMemberQuestionAnswersRequest(body, memberId)),
  updateMemberQuestionAnswersRequest: (body, id) =>
    dispatch(MemberProfileQuestionAnswersActions.updateMemberQuestionAnswersRequest(body, id)),
  getMemberRecommendationRequest: () =>
    dispatch(MemberRecommendationActions.getMemberRecommendationRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionaireAnswers);
