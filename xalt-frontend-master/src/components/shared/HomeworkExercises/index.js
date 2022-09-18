import React, { Fragment, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { space, flexbox, layout, shadow, border } from 'styled-system';

import { theme } from 'components';
import homeworksActions from 'lib/redux/reducers/homeworks';
import MemberProfileActions from 'lib/redux/reducers/member_profile';
import Exercise from 'components/shared/Exercise';
import SvgIcon from 'components/shared/SvgIcon';
import ButtonAux from 'components/shared/ButtonAux';
import { NothingBlock, HeadFirstDateWrapper, HeadFirstDateDay } from 'components/shared/Dashboard';
import { Collapse } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const HomeworkContainer = styled.div`
  ${space};
  ${layout};
  @media (max-width: 1336px) {
    width: 100%;
  }
`;

HomeworkContainer.defaultProps = {
  padding: 1,
  width: '75%',
  height: '100%',
};

const HomeworkExercisesWrapper = styled.div`
  ${layout};
  ${space};
  ${shadow};
  ${border};
  ${flexbox};
`;

HomeworkExercisesWrapper.defaultProps = {
  width: '100%',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
  borderRadius: '0 0 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  mb: 1,
};

const HomeworkHeader = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const HomeworkHead = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
`;

const HomeworkDivider = styled.div`
  height: 1px;
  width: 100%;
  ${(props) =>
    props.darkPink
      ? css`
          background: ${theme.colors.darkPink};
        `
      : css`
          background: ${theme.colors.gray1000};
          opacity: 0.1;
        `};
`;

const HomeworkName = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${theme.colors.gray1000};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: uppercase;
  padding: 4px 0;
  width: 100%;
  display: inline-block;
`;

const HomeworkCreatedAt = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: ${theme.colors.darkPink};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 4px 0;
  width: 100%;
  display: inline-block;
`;

const HomeworkDescription = styled.span`
  display: inline-block;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: ${theme.colors.gray700};
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-right: 8px;
  width: 100%;
  ${(props) =>
    props.isFull
      ? css`
          -webkit-line-clamp: unset;
        `
      : css`
          -webkit-line-clamp: 3;
        `};
`;

const HomeworkStatus = styled.div`
  width: 107px;
  height: 48px;
  border: 1px solid ${theme.colors.darkPink};
  filter: drop-shadow(0px 1px 2px rgba(51, 51, 51, 0.06));
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeworkMarkAsDone = styled.button`
  background: ${theme.colors.darkPink};
  color: ${theme.colors.white};
  width: 168px;
  height: 48px;
  box-shadow: 0px 1px 2px rgba(51, 51, 51, 0.12);
  border-radius: 10px;
  border: none;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

const AddHomeWorkButton = styled(ButtonAux)``;

const HomeworkInfoWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${flexbox};
  ${space};
  ${layout};
  min-height: 82px;
  @media (max-width: 640px) {
    padding: 8px;
    align-items: flex-start;
    width: 100%;
  }
`;

const HomeworkExercises = (props) => {
  const {
    homeworks,
    currentDate,
    updateHomeworkRequest,
    role,
    setIsFormView,
    programTab,
    deleteProgramExerciseRequest,
    isSubscribed,
  } = props;

  const [currentExercise, setCurrentExercise] = useState('');

  const homeworksForToday = useMemo(() => {
    return (
      homeworks?.filter((item) =>
        moment(currentDate).local().isSame(moment(item.program_date).local(), 'day'),
      ) || []
    );
  }, [currentDate, homeworks]);

  const completeHomework = (id) => {
    updateHomeworkRequest(id);
  };

  return (
    <HomeworkContainer>
      {role === 'coach' && (
        <HomeworkHeader>
          <HomeworkInfoWrapper alignItems="flex-start" paddingRight="8px">
            <HeadFirstDateWrapper isMemberScreen={true} width="100%" p="0">
              <HeadFirstDateDay>{moment(currentDate).format('DD')}</HeadFirstDateDay>
              <HomeworkHead>Plans for today</HomeworkHead>
            </HeadFirstDateWrapper>
          </HomeworkInfoWrapper>

          {role === 'coach' && isSubscribed && (
            <HomeworkInfoWrapper justifyContent="flex-end" alignItems="flex-end" paddingLeft="8px">
              <AddHomeWorkButton onClick={() => setIsFormView(true)} pinkBtn>
                {programTab ? 'Add Program' : 'Add Action'}
              </AddHomeWorkButton>
            </HomeworkInfoWrapper>
          )}
        </HomeworkHeader>
      )}
      {!!homeworksForToday.length ? (
        <Collapse
          ghost={true}
          onChange={(event) => setCurrentExercise(event[0])}
          expandIcon={({ isActive }) => (
            <RightOutlined
              style={{ color: theme.colors.darkPink, top: 15 }}
              rotate={isActive ? 90 : 0}
            />
          )}
        >
          {homeworksForToday.map((homework) => (
            <Panel
              showArrow={false}
              header={
                <HomeworkHeader>
                  <HomeworkInfoWrapper
                    alignItems="flex-start"
                    paddingRight="8px"
                    width="calc(100% - 200px)"
                  >
                    <HomeworkName>{homework.name}</HomeworkName>
                    <HomeworkDescription isFull={homework.id === currentExercise}>
                      {homework.description}
                    </HomeworkDescription>
                  </HomeworkInfoWrapper>
                  <HomeworkInfoWrapper alignItems="flex-end" paddingLeft="8px" width="200px">
                    <HomeworkCreatedAt>
                      {homework.completed
                        ? `Done at ${moment
                            .utc(homework.program_date)
                            .local()
                            .format('DD MMM YYYY [at] hh:mm A')}`
                        : `Created at ${moment
                            .utc(homework.created_at)
                            .local()
                            .format('DD MMM YYYY [at] hh:mm A')}`}
                    </HomeworkCreatedAt>
                    {role === 'member' && homework.completed && (
                      <HomeworkStatus>
                        <SvgIcon
                          name="verified"
                          width="24px"
                          height="24px"
                          stroke={theme.colors.darkPink}
                        />
                      </HomeworkStatus>
                    )}
                    {role === 'member' && !homework.completed && (
                      <HomeworkMarkAsDone
                        onClick={() => completeHomework(homework.id)}
                        darkPink
                        width="168px"
                      >
                        Mark as done
                      </HomeworkMarkAsDone>
                    )}
                    {role === 'coach' && (
                      <SvgIcon
                        name="edit"
                        width="24px"
                        height="24px"
                        onClick={() => setIsFormView(homework)}
                      />
                    )}
                  </HomeworkInfoWrapper>
                </HomeworkHeader>
              }
              key={homework.id}
            >
              <HomeworkExercisesWrapper key={homework.id}>
                <>
                  {!!homework.program_exercises.length && <HomeworkDivider darkPink />}
                  {homework.program_exercises.map((item, index) => (
                    <Fragment key={item.id}>
                      {!!index && <HomeworkDivider />}
                      <Exercise
                        exercise={item}
                        role={role}
                        program_id={homework.id}
                        type={homework.type === 'Program::SessionProgram' ? 'session' : 'action'}
                        deleteProgramExerciseRequest={deleteProgramExerciseRequest}
                      />
                    </Fragment>
                  ))}
                </>
              </HomeworkExercisesWrapper>
            </Panel>
          ))}
        </Collapse>
      ) : (
        <HomeworkExercisesWrapper>
          <NothingBlock
            iconName={programTab ? 'dashboardNoSession' : 'action'}
            iconWidth="49px"
            iconHeight="59px"
          >
            {programTab ? 'No plans for today' : 'No actions for today'}
          </NothingBlock>
        </HomeworkExercisesWrapper>
      )}
    </HomeworkContainer>
  );
};

const mapStateToProps = (state) => ({
  role: state.profile.role,
  isSubscribed:
    true ||
    (state.profile.role === 'member' &&
      ((state.auth.stripe && state.auth.stripe.stripe_subscription_status === 'active') ||
        (state.profile.stripe && state.profile.stripe.stripe_subscription_status === 'active'))) ||
    (state.profile.role === 'coach' &&
      (state.auth.stripe || state.profile.stripe) &&
      ((state.auth.stripe && state.auth.stripe.stripe_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_id) ||
        (state.auth.stripe && state.auth.stripe.stripe_bank_account_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_bank_account_id))),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateHomeworkRequest: (id) => dispatch(homeworksActions.updateHomeworkRequest(id)),
  deleteProgramExerciseRequest: (program_type, program_id, exercise_id) =>
    dispatch(
      MemberProfileActions.deleteProgramExerciseRequest(program_type, program_id, exercise_id),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkExercises);
