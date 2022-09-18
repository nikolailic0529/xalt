import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Calendar from 'components/shared/Calendar';
import HomeworkExercises from 'components/shared/HomeworkExercises';
import { MemberTabWrapper } from 'components/shared/MemberProfile';
import HomeworksActions from 'lib/redux/reducers/homeworks';
import HomeworkNew from './new';

const Homework = (props) => {
  const { programs, memberId, getHomeworksRequest, isAuthorized } = props;

  const [currentDate, setCurrentDate] = useState(moment());
  const [isFormView, setIsFormView] = useState(false);

  return (
    <MemberTabWrapper>
      {!isFormView ? (
        <>
          <Calendar
            fullscreen={false}
            homeworks={programs}
            setCurrentDate={setCurrentDate}
            getItemsRequest={getHomeworksRequest}
            memberId={memberId}
            isAuthorized={isAuthorized}
          />
          <HomeworkExercises
            setIsFormView={setIsFormView}
            homeworks={programs}
            currentDate={currentDate}
            programTab={false}
          />
        </>
      ) : (
        <HomeworkNew
          currentProgram={isFormView}
          setIsFormView={setIsFormView}
          currentDate={currentDate}
          memberId={memberId}
        />
      )}
    </MemberTabWrapper>
  );
};

const mapStateToProps = (state) => ({
  programs: state.member_profile.member_profile.programs,
  isAuthorized: state.profile.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getHomeworksRequest: (id, time_from, time_to) =>
    dispatch(HomeworksActions.getHomeworksRequest(id, time_from, time_to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homework);
