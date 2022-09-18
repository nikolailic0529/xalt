import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import HomeworkExercises from 'components/shared/HomeworkExercises';
import { MemberTabWrapper } from 'components/shared/MemberProfile';
import HomeworkNew from '../MemberProfile/new';
import Calendar from 'components/shared/Calendar';
import Availability from 'components/shared/Availability';
import MeetingStatus from 'components/shared/MeetingStatus';
import MemberProfileActions from 'lib/redux/reducers/member_profile';

const Program = (props) => {
  const { sessions, meetings, memberId, getSessionsRequest, isAuthorized } =
    props;

  const [currentDate, setCurrentDate] = useState(moment());
  const [isFormView, setIsFormView] = useState(false);

  const meetsForToday = meetings.filter(
    (item) =>
      item.member_profile_id === memberId &&
      moment(item.time_from).local().isSame(currentDate.local(), 'day') &&
      moment(item.time_from).local().isAfter(moment()),
  );

  const nextMeet = meetsForToday.reduce((prev, current) => {
    return moment(prev.time_from).isBefore(current.time_from) ? prev : current;
  }, meetsForToday[0]);

  return (
    <MemberTabWrapper>
      {!isFormView ? (
        <>
          <Availability currentDate={currentDate} />
          <MeetingStatus nextMeet={nextMeet || {}} currentDate={currentDate} />
          <Calendar
            fullscreen={false}
            homeworks={sessions || []}
            setCurrentDate={setCurrentDate}
            getItemsRequest={getSessionsRequest}
            memberId={memberId}
            isAuthorized={isAuthorized}
          />
          <HomeworkExercises
            setIsFormView={setIsFormView}
            homeworks={sessions || []}
            currentDate={currentDate}
            programTab={true}
          />
        </>
      ) : (
        <HomeworkNew
          currentProgram={isFormView}
          setIsFormView={setIsFormView}
          currentDate={currentDate}
          memberId={memberId}
          programTab={true}
        />
      )}
    </MemberTabWrapper>
  );
};

const mapStateToProps = (state) => ({
  sessions: state.member_profile.member_profile.sessions,
  meetings: state.meetings.meetings,
  isAuthorized: state.profile.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getSessionsRequest: (id, time_from, time_to) =>
    dispatch(MemberProfileActions.getSessionsRequest(id, time_from, time_to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Program);
