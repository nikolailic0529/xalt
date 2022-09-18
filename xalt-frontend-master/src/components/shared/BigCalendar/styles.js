import styled, {css} from 'styled-components';
import colors from 'lib/theme/colors';

export const CalendarContainer = styled.div`
  width: calc(100% + 24px);
  margin: 0 -12px;
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  padding: 12px;
  .rbc-time-view {
    border: none;
  }
  .rbc-events-container {
    margin-right: 0;
  }
  .rbc-event-content {
    display: flex;
    align-items: center;
  }
  .rbc-event {
    width: 100% !important;
    left: 0 !important;
    ${(props) =>
      props.currentView !== 'month'
        ? css`
            height: 39px !important;
            margin-top: 4px;
          `
        : css`
            height: 24px !important;
          `};
    .rbc-event-label {
      display: none;
    }
  }
  .rbc-timeslot-group {
    ${(props) =>
      props.currentView === 'week'
        ? css`
            min-height: 100px;
          `
        : css`
            min-height: 180px;
          `};
    
  }
  .rbc-today {
    background-color: ${colors.white};
  }
  .rbc-time-content {
    padding-top: 0;
    border-top: none;
    ::-webkit-scrollbar {
      display: none;
    }
    .rbc-time-gutter {
      .rbc-timeslot-group {
        width: 60px;
        border: none;
      }
    }
  }
  .rbc-time-content > * + * > * {
    border-left: none;
  }
  .rbc-time-slot {
    position: relative;
    border-top: none;
  }
`;

export const CalendarRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 53px;
`;

export const CalendarAccessor = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1100px) {
    width: 45%;
  }
`;

export const CalendarController = styled.button`
  background-color: ${colors.white};
  border: none;
  height: 16px;
`;

export const CalendarDate = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.2px;
`;

export const CalendarToolbarWrapper = styled.div`
  padding: 8px 0 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const DateHeader = styled.div`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-align: left;
  padding: 8px;
`;

export const MonthHeader = styled.div`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: ${colors.gray1000};
  ${(props) =>
    css`
      opacity: ${props.isWeekend ? 1 : 0.6};
    `};
`;

export const EventElement = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 20px;
`;

export const EventStatus = styled.div`
  min-width: 12px;
  height: 12px;
  border-radius: 4px;
  border: 1px solid ${colors.darkPink};
  ${(props) =>
    css`
      background: ${props.confirmed ? colors.darkPink : colors.white};
    `};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(54.3656px);
`;

export const EventTime = styled.div`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${colors.gray1000};
  padding: 4px;
  @media (max-width: 1357px) {
    ${(props) =>
      props.currentView === 'week' &&
      css`
        display: none;
      `};
  }
`;

export const EventTitle = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.2px;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 4px;
`;

export const ShowMore = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${colors.darkPink};
`;

export const TimeSlotElement = styled.div`
  :hover {
    background: ${colors.darkPink};
  }
`;


export const WeekHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;