import React, { useEffect } from 'react';
import ReportsActions from 'lib/redux/reducers/reports';
import When from 'components/shared/When';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';
import Icon from 'components/shared/Icon';
import { Number } from 'components/shared/Form';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Result, Space, Row, Col, Radio, Spin } from 'antd';
import { extractIdFromUrl } from 'lib/helpers';
import reportsTypes from 'lib/redux/types/reports';
import {
  FullWidthSpace,
  ContentWrapper,
  QuestionBox,
  QuestionsBox,
  RoundedImage,
  HalfFlex,
} from './styles';

const { CLEANUP_REPORTS } = reportsTypes;

const ViewReport = ({ getReportRequest, report, reportNotFound }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEANUP_REPORTS });
    getReportRequest(extractIdFromUrl());
  }, []);

  const getAnswerFor = (questionTitle) => {
    const questionId = report.questions.find(({ title }) => title === questionTitle).id;

    const answer = report.report_answers.find(
      ({ report_question_id }) => report_question_id === questionId,
    );

    return answer || {};
  };

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
        <ContentWrapper direction="vertical" size={36}>
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

            <Link to={window.location.pathname.replace('view', 'edit')}>
              <ButtonAux pinkBtn>
                <Text white uppercase>
                  edit
                </Text>
              </ButtonAux>
            </Link>
          </Flex>

          <QuestionsBox>
            <QuestionBox bordered>
              <Flex>
                <FullWidthSpace direction="vertical" size={18}>
                  <Flex>
                    <Text bold>Question 1 : </Text>
                    <Text>On a scale of 1-10 rate the following:</Text>
                  </Flex>
                  <Row>
                    <Col xl={10} xs={24}>
                      <FullWidthSpace direction="vertical">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text>Quality of sleep</Text>

                          <Number disabled value={getAnswerFor('Quality of sleep').score} />
                        </Flex>

                        <Flex justifyContent="space-between" alignItems="center">
                          <Text>Stress levels</Text>

                          <Number disabled value={getAnswerFor('Stress levels').score} />
                        </Flex>

                        <Flex justifyContent="space-between" alignItems="center">
                          <Text>Quality of nutrition/diet</Text>

                          <Number
                            disabled
                            value={getAnswerFor('Quality of nutrition/diet').score}
                          />
                        </Flex>
                      </FullWidthSpace>
                    </Col>
                    <Col xl={2} xs={0} />
                    <Col xl={10} xs={24}>
                      <FullWidthSpace direction="vertical">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text>Physical fitness levels</Text>

                          <Number disabled value={getAnswerFor('Physical fitness levels').score} />
                        </Flex>

                        <Flex justifyContent="space-between" alignItems="center">
                          <Text>
                            Level of community engagement
                            <br />
                            and/or involvement
                          </Text>

                          <Number
                            disabled
                            value={
                              getAnswerFor('Level of community engagement and/or involvement').score
                            }
                          />
                        </Flex>

                        <Flex justifyContent="space-between" alignItems="center">
                          <Text>Overall happiness</Text>

                          <Number disabled value={getAnswerFor('Overall happiness').score} />
                        </Flex>
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
                    Were you able to complete the action item that was assigned to you in the last
                    session?
                  </Text>
                </Flex>

                <Radio.Group
                  disabled
                  value={
                    getAnswerFor(
                      'Were you able to complete the homework that was assigned to you in the last session?',
                    ).answer
                  }
                >
                  <Radio value="yes">
                    <Text>Yes</Text>
                  </Radio>
                  <Radio value="no">
                    <Text>No</Text>
                  </Radio>
                  <Radio value="Some of it">
                    <Text>Some of it</Text>
                  </Radio>
                </Radio.Group>
              </FullWidthSpace>
            </QuestionBox>

            <QuestionBox bordered>
              <FullWidthSpace direction="vertical" size={18}>
                <Text bold>Summary</Text>

                <Text>{report.summary}</Text>
              </FullWidthSpace>
            </QuestionBox>

            <QuestionBox>
              <FullWidthSpace direction="vertical" size={18}>
                <Text bold>Additional Comments</Text>

                <Text>{report.additional_comments}</Text>
              </FullWidthSpace>
            </QuestionBox>
          </QuestionsBox>
        </ContentWrapper>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  report: state.reports.report,
  reportNotFound: state.reports.notFound,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getReportRequest: (id) => dispatch(ReportsActions.getReportRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewReport);
