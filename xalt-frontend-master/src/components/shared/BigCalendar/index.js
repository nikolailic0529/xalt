import React, { useState, useEffect, cloneElement, Children } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SvgIcon from 'components/shared/SvgIcon';
import TabsPanel from 'components/shared/TabsPanel';
import { EventModal, CreateModalComponent } from 'components/shared/EventModals';
import { theme } from 'components';
import MeetingsActions from 'lib/redux/reducers/meetings';
import {
  CalendarToolbarWrapper,
  CalendarContainer,
  CalendarWrapper,
  CalendarRow,
  CalendarController,
  CalendarAccessor,
  CalendarDate,
  DateHeader,
  MonthHeader,
  EventElement,
  EventStatus,
  EventTitle,
  EventTime,
  ShowMore,
  TimeSlotElement,
  WeekHeader,
} from './styles';

moment.locale('en', {
  week: {
    dow: 1,
    doy: 1,
  },
});
const localizer = momentLocalizer(moment);

const formatTimeToDate = (time) => moment(time).local().toDate();
const formatTimeToHHmm = (time) => moment(time).local().format('HH:mm');

const formats = {
  monthHeaderFormat: 'MMMM YYYY',
  weekdayFormat: 'dddd',
  dayHeaderFormat: 'DD MMMM YYYY',
};

const ColoredDateCellWrapper = ({ children, value, onClick, currentDate }) => {
  const isWeekend = value.getDay() === 0 || value.getDay() === 6;
  return cloneElement(Children.only(children), {
    onClick,
    style: {
      ...children.style,
      backgroundColor: moment().local().isSame(moment(value).local(), 'day')
        ? `${theme.colors.darkPink}19`
        : isWeekend
        ? theme.colors.gray50
        : theme.colors.white,
    },
  });
};

const TimeSlotComponent = (props) => {
  const { openModal } = props;
  const [isHovering, setIsHovering] = useState(false);

  const handleIsHovering = () => {
    setIsHovering(!isHovering);
  };

  return (
    <TimeSlotElement
      onClick={() => openModal()}
      onMouseEnter={handleIsHovering}
      onMouseLeave={handleIsHovering}
      style={{
        width: '100%',
        height: 28,
        marginTop: 14,
        borderRadius: 4,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isHovering && <SvgIcon name="plus" width="16px" height="16px" stroke={theme.colors.white} />}
    </TimeSlotElement>
  );
};

const CalendarToolbar = (props) => {
  const { currentView, setCurrentView, label, date, onNavigate } = props;

  const goToBack = () => {
    let newDate;
    if (currentView === 'month') {
      newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    } else if (currentView === 'week') {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 1);
    } else {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 1);
    }
    onNavigate('prev', newDate);
  };

  const goToNext = () => {
    let newDate;
    if (currentView === 'month') {
      newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    } else if (currentView === 'week') {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 1);
    } else {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1);
    }
    onNavigate('next', newDate);
  };

  return (
    <CalendarToolbarWrapper>
      <CalendarRow>
        <CalendarAccessor>
          <CalendarController onClick={() => goToBack()}>
            <SvgIcon name="left" width="16px" height="16px" fill={theme.colors.darkPink} />
          </CalendarController>
          <CalendarDate>{label.toUpperCase()}</CalendarDate>
          <CalendarController onClick={() => goToNext()}>
            <SvgIcon name="right" width="16px" height="16px" fill={theme.colors.darkPink} />
          </CalendarController>
        </CalendarAccessor>
        <CalendarAccessor>
          <TabsPanel
            activeTab={currentView}
            setActiveTab={setCurrentView}
            tabs={['day', 'week', 'month']}
          />
        </CalendarAccessor>
      </CalendarRow>
    </CalendarToolbarWrapper>
  );
};

const CalendarComponent = (props) => {
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEventVisible, setIsEventVisible] = useState(false);
  const [currentSlot, setCurrentSlot] = useState('');
  const [currentEvent, setCurrentEvent] = useState({});
  const [timeFrom, setTimeFrom] = useState(moment(currentDate).startOf('month').toDate());
  const [timeTo, setTimeTo] = useState(moment(currentDate).endOf('month').toDate());

  const { meetings, getMeetingsRequest, role, updateMeetingRequest } = props;

  const setFrom = (time) => {
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    setTimeFrom(time);
  };

  const setTo = (time) => {
    time.setHours(23);
    time.setMinutes(59);
    time.setSeconds(0);
    time.setMilliseconds(0);
    setTimeTo(time);
  };

  useEffect(() => {
    if (currentView === 'week') {
      setFrom(moment(currentDate).startOf('week').toDate());
      setTo(moment(currentDate).endOf('week').toDate());
    } else if (currentView === 'month') {
      setFrom(moment(currentDate).startOf('month').toDate());
      setTo(moment(currentDate).endOf('month').toDate());
    } else {
      setFrom(moment(currentDate).toDate());
      setTo(moment(currentDate).toDate());
    }
  }, [currentDate, currentView]);

  useEffect(() => {
    getMeetingsRequest(timeFrom, timeTo, false);
  }, [timeTo]);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const showEventModal = () => {
    setIsEventVisible(!isEventVisible);
  };

  return (
    <CalendarContainer>
      <CalendarWrapper currentView={currentView}>
        <Calendar
          step={15}
          popup
          timeslots={currentView === 'week' ? 2 : 4}
          selectable={true}
          localizer={localizer}
          events={meetings}
          view={currentView}
          formats={formats}
          onView={() => {}}
          startAccessor={(event) => formatTimeToDate(event.time_from)}
          endAccessor={(event) => formatTimeToDate(event.time_to)}
          style={{ height: 800 }}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          onSelectEvent={(event) => {
            const from = formatTimeToHHmm(event.time_from);
            const to = formatTimeToHHmm(event.time_to);
            setCurrentEvent({
              ...event,
              from,
              to,
            });
            showEventModal();
          }}
          eventPropGetter={(event) => {
            if (currentView === 'month') {
              return {
                style: {
                  backgroundColor: 'transparent',
                  outline: 'none',
                  zIndex: 1001,
                },
              };
            } else {
              return {
                style: {
                  backgroundColor: event.is_member_confirmed
                    ? `${theme.colors.darkPink}19`
                    : theme.colors.white,
                  outline: 'none',
                  border: event.is_member_confirmed
                    ? '0.2px solid transparent'
                    : `0.2px solid ${theme.colors.darkPink}`,
                  zIndex: 1001,
                },
              };
            }
          }}
          messages={{
            showMore: (target) => (
              <ShowMore>
                <span role="presentation">{target} more</span>
                <SvgIcon
                  name="arrow-right"
                  stroke={theme.colors.darkPink}
                  width="16px"
                  height="16px"
                />
              </ShowMore>
            ),
          }}
          components={{
            toolbar: (props) => (
              <CalendarToolbar
                {...props}
                currentView={currentView}
                setCurrentView={setCurrentView}
              />
            ),
            week: {
              header: (props) => {
                return (
                  <WeekHeader>
                    <span>{moment(props.date).format('D')}</span>
                    <span>{moment(props.date).format('MMMM')}</span>
                  </WeekHeader>
                );
              },
            },
            month: {
              header: (props) => {
                const isWeekend = props.date.getDay() === 0 || props.date.getDay() === 6;
                return <MonthHeader isWeekend={isWeekend}>{props.label}</MonthHeader>;
              },
              dateHeader: (props) => (
                <DateHeader onClick={() => setCurrentDate(props.date)}>{props.label}</DateHeader>
              ),
            },
            event: (props) => {
              const { time_from, time_to, is_member_confirmed, coach_profile, member_profile } =
                props.event;
              const from = formatTimeToHHmm(time_from);
              const to = formatTimeToHHmm(time_to);
              return (
                <EventElement>
                  <EventStatus confirmed={is_member_confirmed} />
                  <EventTime currentView={currentView}>{`${from} - ${to}`}</EventTime>
                  <EventTitle>
                    {role === 'member' ? coach_profile?.user?.name : member_profile?.user?.name}
                  </EventTitle>
                </EventElement>
              );
            },
            dateCellWrapper: (props) => (
              <ColoredDateCellWrapper
                onClick={() => {
                  setCurrentDate(props.value);
                }}
                currentDate={currentDate}
                {...props}
              />
            ),
            timeSlotWrapper: (props) => {
              if (props.children.props.children === undefined && role === 'coach') {
                const openModal = () => {
                  setCurrentSlot(props.value);
                  showModal();
                };
                return <TimeSlotComponent openModal={openModal}></TimeSlotComponent>;
              } else return props.children;
            },
          }}
        />
      </CalendarWrapper>
      <CreateModalComponent
        currentSlot={currentSlot}
        setIsModalVisible={setIsModalVisible}
        visible={isModalVisible}
      />
      <EventModal
        events={[currentEvent]}
        currentView={currentView}
        setIsModalVisible={setIsEventVisible}
        visible={isEventVisible}
        role={role}
        updateMeetingRequest={updateMeetingRequest}
      />
    </CalendarContainer>
  );
};

const mapStateToProps = (state) => ({
  meetings: state.meetings.meetings,
  role: state.profile.role,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMeetingsRequest: (time_from, time_to, pagination) =>
    dispatch(MeetingsActions.getMeetingsRequest(time_from, time_to, pagination)),
  updateMeetingRequest: (id, is_member_confirmed) =>
    dispatch(MeetingsActions.updateMeetingRequest(id, is_member_confirmed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);
