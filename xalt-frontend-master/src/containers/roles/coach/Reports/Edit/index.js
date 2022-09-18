import React, { useEffect, useState } from 'react';
import ReportsActions from 'lib/redux/reducers/reports';
import When from 'components/shared/When';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';
import Icon from 'components/shared/Icon';
import { useHistory, Link } from 'react-router-dom';
import { Number, TextArea } from 'components/shared/Form';
import { connect, useDispatch } from 'react-redux';
import { extractIdFromUrl } from 'lib/helpers';
import { Result, Space, Row, Col, Radio, Spin } from 'antd';
import { useFormik } from 'formik';

import reportsTypes from 'lib/redux/types/reports';
import {
  HalfFlex,
  RoundedImage,
  QuestionsBox,
  QuestionBox,
  ContentWrapper,
  FullWidthSpace,
} from './styles';

const { CLEANUP_REPORTS } = reportsTypes;

const fields = {
  quality_of_sleep: '',
  stress_levels: '',
  quality_of_nutrition: '',
  physical_fitness_levels: '',
  level_of_community_engagement: '',
  overall_happiness: '',
  complete_the_homework: '',
};

const EditReport = ({ getReportRequest, updateReportRequest, report, reportNotFound, updated }) => {
  const validate = (values) => {
    const errors = {};

    Object.keys(fields).forEach((key) => {
      if (!values[key]) {
        errors[key] = `Please, enter ${key}!`;
      }
    });

    return errors;
  };

  const getQuestionByTitle = (questionTitle) =>
    report.questions.find(({ title }) => title === questionTitle);

  const mapAnswers = (values) => ({
    summary: values.summary,
    additional_comments: values.additional_comments,
    answers: JSON.stringify([
      {
        report_question_id: getQuestionByTitle('Quality of sleep').id,
        score: values.quality_of_sleep,
      },
      {
        report_question_id: getQuestionByTitle('Stress levels').id,
        score: values.stress_levels,
      },
      {
        report_question_id: getQuestionByTitle('Quality of nutrition/diet').id,
        score: values.quality_of_nutrition,
      },
      {
        report_question_id: getQuestionByTitle('Physical fitness levels').id,
        score: values.physical_fitness_levels,
      },
      {
        report_question_id: getQuestionByTitle('Level of community engagement and/or involvement')
          .id,
        score: values.level_of_community_engagement,
      },
      {
        report_question_id: getQuestionByTitle('Overall happiness').id,
        score: values.overall_happiness,
      },
      {
        report_question_id: getQuestionByTitle(
          'Were you able to complete the homework that was assigned to you in the last session?',
        ).id,
        answer: values.complete_the_homework,
      },
    ]),
  });

  const formik = useFormik({
    initialValues: fields,
    validate,
    onSubmit: (values) => {
      updateReportRequest(extractIdFromUrl(), mapAnswers(values));
    },
  });

  const getAnswerFor = (questionTitle) => {
    const questionId = getQuestionByTitle(questionTitle).id;

    const answer = report.report_answers.find(
      ({ report_question_id }) => report_question_id === questionId,
    );

    return answer;
  };

  let createHomework;

  const history = useHistory();
  const dispatch = useDispatch();

  const [isReportLoaded, setIsReportLoaded] = useState();

  useEffect(() => {
    dispatch({ type: CLEANUP_REPORTS });
    getReportRequest(extractIdFromUrl());
  }, []);

  useEffect(() => {
    if (report && !isReportLoaded) {
      formik.setFieldValue('quality_of_sleep', getAnswerFor('Quality of sleep').score);
      formik.setFieldValue('stress_levels', getAnswerFor('Stress levels').score);
      formik.setFieldValue('quality_of_nutrition', getAnswerFor('Quality of nutrition/diet').score);
      formik.setFieldValue(
        'physical_fitness_levels',
        getAnswerFor('Physical fitness levels').score,
      );
      formik.setFieldValue(
        'level_of_community_engagement',
        getAnswerFor('Level of community engagement and/or involvement').score,
      );
      formik.setFieldValue('overall_happiness', getAnswerFor('Overall happiness').score);
      formik.setFieldValue(
        'complete_the_homework',
        getAnswerFor(
          'Were you able to complete the homework that was assigned to you in the last session?',
        ).answer,
      );

      setIsReportLoaded(true);
    }

    if (updated) {
      if (createHomework) {
        history.push(`/member-profile/${report.member_profile.id}`);
      } else {
        history.push('/reports');
      }
    }
  });

  const [completeTheHomeworkValue, setCompleteTheHomeworkValue] = useState();

  return (
    <>
      <When condition={reportNotFound}>
        <HalfFlex alignItems="center" justifyContent="center">
          <Result
            status="error"
            title="Report Not Found"
            subTitle="Please check the report's ID and try again."
            extra={[<ButtonAux pinkBrdrBtn>Go to Reports list</ButtonAux>]}
          />
        </HalfFlex>
      </When>

      <When condition={!report}>
        <HalfFlex alignItems="center" justifyContent="center">
          <Spin size="large" />
        </HalfFlex>
      </When>

      {report ? (
        <ContentWrapper>
          <form
            id="new-exercise"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Space direction="vertical" size={36} style={{ width: '100%' }}>
              <Flex justifyContent="space-between" alignItems="center">
                <Space direction="horizontal">
                  <When condition={report.member_profile.user.avatar.url}>
                    <RoundedImage src={report.member_profile.user.avatar.url} preview={false} />
                  </When>

                  <When condition={!report.member_profile.user.avatar.url}>
                    <Icon src="empty-user-profile" width="55px" />
                  </When>
                  <div>
                    <Text bold>{report.member_profile.user.name}</Text>
                  </div>
                </Space>

                <ButtonAux pinkBtn>
                  <Text white uppercase bold>
                    submit
                  </Text>
                </ButtonAux>
              </Flex>

              <QuestionsBox>
                <QuestionBox bordered>
                  <Flex>
                    <FullWidthSpace direction="vertical" size={18}>
                      <Flex>
                        <Text bold>Question 1 :</Text>
                        <Text>On a scale of 1-10 rate the following:</Text>
                      </Flex>
                      <Row>
                        <Col xl={10} xs={24}>
                          <FullWidthSpace direction="vertical">
                            <div>
                              <Flex justifyContent="space-between" alignItems="center">
                                <Text>Quality of sleep</Text>

                                <Number
                                  id="quality_of_sleep"
                                  name="quality_of_sleep"
                                  min={0}
                                  value={getAnswerFor('Quality of sleep').score}
                                  onChange={(value) =>
                                    formik.setFieldValue('quality_of_sleep', value)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                              </Flex>
                              <Flex justifyContent="flex-end">
                                {formik.touched.quality_of_sleep &&
                                formik.errors.quality_of_sleep ? (
                                  <Text darkPink smallSize>
                                    {formik.errors.quality_of_sleep}
                                  </Text>
                                ) : null}
                              </Flex>
                            </div>

                            <div>
                              <Flex justifyContent="space-between" alignItems="center">
                                <Text>Stress levels</Text>

                                <Number
                                  id="stress_levels"
                                  name="stress_levels"
                                  min={0}
                                  value={getAnswerFor('Stress levels').score}
                                  onChange={(value) => formik.setFieldValue('stress_levels', value)}
                                  onBlur={formik.handleBlur}
                                />
                              </Flex>
                              <Flex justifyContent="flex-end">
                                {formik.touched.stress_levels && formik.errors.stress_levels ? (
                                  <Text darkPink smallSize>
                                    {formik.errors.stress_levels}
                                  </Text>
                                ) : null}
                              </Flex>
                            </div>

                            <div>
                              <Flex justifyContent="space-between" alignItems="center">
                                <Text>Quality of nutrition/diet</Text>

                                <Number
                                  id="quality_of_nutrition"
                                  name="quality_of_nutrition"
                                  min={0}
                                  value={getAnswerFor('Quality of nutrition/diet').score}
                                  onChange={(value) =>
                                    formik.setFieldValue('quality_of_nutrition', value)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                              </Flex>
                              <Flex justifyContent="flex-end">
                                {formik.touched.quality_of_nutrition &&
                                formik.errors.quality_of_nutrition ? (
                                  <Text darkPink smallSize>
                                    {formik.errors.quality_of_nutrition}
                                  </Text>
                                ) : null}
                              </Flex>
                            </div>
                          </FullWidthSpace>
                        </Col>
                        <Col xl={2} xs={0} />
                        <Col xl={10} xs={24}>
                          <FullWidthSpace direction="vertical">
                            <div>
                              <Flex justifyContent="space-between" alignItems="center">
                                <Text>Physical fitness levels</Text>

                                <Number
                                  id="physical_fitness_levels"
                                  name="physical_fitness_levels"
                                  min={0}
                                  value={getAnswerFor('Physical fitness levels').score}
                                  onChange={(value) =>
                                    formik.setFieldValue('physical_fitness_levels', value)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                              </Flex>
                              <Flex justifyContent="flex-end">
                                {formik.touched.physical_fitness_levels &&
                                formik.errors.physical_fitness_levels ? (
                                  <Text darkPink smallSize>
                                    {formik.errors.physical_fitness_levels}
                                  </Text>
                                ) : null}
                              </Flex>
                            </div>

                            <div>
                              <Flex justifyContent="space-between" alignItems="center">
                                <Text>
                                  Level of community engagement
                                  <br />
                                  and/or involvement
                                </Text>

                                <Number
                                  id="level_of_community_engagement"
                                  name="level_of_community_engagement"
                                  min={0}
                                  value={
                                    getAnswerFor('Level of community engagement and/or involvement')
                                      .score
                                  }
                                  onChange={(value) =>
                                    formik.setFieldValue('level_of_community_engagement', value)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                              </Flex>
                              <Flex justifyContent="flex-end">
                                {formik.touched.level_of_community_engagement &&
                                formik.errors.level_of_community_engagement ? (
                                  <Text darkPink smallSize>
                                    {formik.errors.level_of_community_engagement}
                                  </Text>
                                ) : null}
                              </Flex>
                            </div>

                            <div>
                              <Flex justifyContent="space-between" alignItems="center">
                                <Text>Overall happiness</Text>

                                <Number
                                  id="overall_happiness"
                                  name="overall_happiness"
                                  min={0}
                                  value={getAnswerFor('Overall happiness').score}
                                  onChange={(value) =>
                                    formik.setFieldValue('overall_happiness', value)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                              </Flex>
                              <Flex justifyContent="flex-end">
                                {formik.touched.overall_happiness &&
                                formik.errors.overall_happiness ? (
                                  <Text darkPink smallSize>
                                    {formik.errors.overall_happiness}
                                  </Text>
                                ) : null}
                              </Flex>
                            </div>
                          </FullWidthSpace>
                        </Col>
                      </Row>
                    </FullWidthSpace>
                  </Flex>
                </QuestionBox>

                <QuestionBox bordered>
                  <FullWidthSpace direction="vertical" size={18}>
                    <Flex>
                      <Text bold>Question 2 :</Text>
                      <Text>
                        Were you able to complete the action item that was assigned to you in the
                        last session?
                      </Text>
                    </Flex>

                    <div>
                      <div>
                        <Radio.Group
                          name="complete_the_homework"
                          value={
                            completeTheHomeworkValue ||
                            getAnswerFor(
                              'Were you able to complete the homework that was assigned to you in the last session?',
                            ).answer
                          }
                          onChange={(e) => {
                            setCompleteTheHomeworkValue(e.target.value);
                            formik.setFieldValue('complete_the_homework', e.target.value);
                          }}
                          onBlur={formik.handleBlur}
                        >
                          <Radio value="yes">
                            <Text>Yes</Text>
                          </Radio>
                          <Radio value="no">
                            <Text>No</Text>
                          </Radio>
                          <Radio value="some_of_it">
                            <Text>Some of it</Text>
                          </Radio>
                        </Radio.Group>
                      </div>
                      {formik.touched.complete_the_homework &&
                      formik.errors.complete_the_homework ? (
                        <Text darkPink smallSize>
                          {formik.errors.complete_the_homework}
                        </Text>
                      ) : null}
                    </div>
                  </FullWidthSpace>
                </QuestionBox>

                <QuestionBox bordered>
                  <FullWidthSpace direction="vertical" size={18}>
                    <Text bold>Summary</Text>

                    <TextArea
                      name="summary"
                      placeholder="Type here..."
                      rows={5}
                      onChange={(e) => formik.setFieldValue('summary', e.target.value)}
                      onBlur={formik.handleBlur}
                    />
                  </FullWidthSpace>
                </QuestionBox>

                <QuestionBox>
                  <FullWidthSpace direction="vertical" size={18}>
                    <Text bold>Additional Comments</Text>

                    <TextArea
                      name="additional_comments"
                      placeholder="Type here..."
                      rows={3}
                      onChange={(e) => formik.setFieldValue('additional_comments', e.target.value)}
                      onBlur={formik.handleBlur}
                    />
                  </FullWidthSpace>
                </QuestionBox>
              </QuestionsBox>
            </Space>
          </form>
        </ContentWrapper>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  report: state.reports.report,
  reportNotFound: state.reports.notFound,
  updated: state.reports.report?.updated,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getReportRequest: (id) => dispatch(ReportsActions.getReportRequest(id)),
  updateReportRequest: (id, data) => dispatch(ReportsActions.updateReportRequest(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditReport);
