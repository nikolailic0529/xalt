import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Calendar from 'components/shared/Calendar';
import HomeworkExercises from 'components/shared/HomeworkExercises';
import { HomeworkWrapper } from 'components/shared/Homework';
import HomeworksActions from 'lib/redux/reducers/homeworks';

const Homework = (props) => {
  const { getHomeworksRequest, homeworks, memberId, isAuthorized } = props;

  const [currentDate, setCurrentDate] = useState(moment());

  return (
    <HomeworkWrapper>
      <Calendar
        fullscreen={false}
        homeworks={homeworks}
        setCurrentDate={setCurrentDate}
        getItemsRequest={getHomeworksRequest}
        memberId={memberId}
        isAuthorized={isAuthorized}
      />
      <HomeworkExercises homeworks={homeworks} currentDate={currentDate} />
    </HomeworkWrapper>
  );
};

const mapStateToProps = (state) => ({
  homeworks: state.homeworks.homeworks,
  memberId: state.profile.member_profile.id,
  isAuthorized: state.profile.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getHomeworksRequest: (id, time_from, time_to) =>
    dispatch(HomeworksActions.getHomeworksRequest(id, time_from, time_to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homework);
