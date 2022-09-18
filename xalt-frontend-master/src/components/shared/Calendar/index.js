import React, { useEffect } from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import { Calendar, Badge } from 'antd';

import colors from 'lib/theme/colors';
import SvgIcon from 'components/shared/SvgIcon';
import { DashboardHeader } from 'components/shared/MemberProfile';

const CalendarContainer = styled.div`
  ${(props) =>
    css`
      max-width: ${props.isDashboard ? '100%' : '25%'};
    `};
  @media (max-width: 1336px) {
    max-width: unset;
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 360px;
  box-shadow: 0px 2px 8px rgba(51, 51, 51, 0.12);
  border-radius: 20px;
  padding: 16px;
`;

const CalendarRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 53px;
`;

const CalendarDate = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-align: center;
`;

const CalendarController = styled.button`
  width: 16px;
  height: 16px;
  background-color: ${colors.white};
  border: none;
`;

const CalendarComponent = (props) => {
  const {
    fullscreen,
    homeworks,
    setCurrentDate,
    isDashboard,
    getItemsRequest,
    memberId,
    isAuthorized,
  } = props;

  const getMonthRange = (date) => {
    const timeFrom = moment(date).toDate();
    timeFrom.setHours(0);
    timeFrom.setMinutes(0);
    timeFrom.setSeconds(0);
    timeFrom.setMilliseconds(0);
    timeFrom.setDate(moment(date).startOf('week').get('date'));
    timeFrom.setDate(moment(date).startOf('month').get('date'));
    timeFrom.setMonth(moment(date).get('month'));

    const timeTo = moment(date).toDate();
    timeTo.setHours(23);
    timeTo.setMinutes(59);
    timeTo.setSeconds(0);
    timeTo.setMilliseconds(0);
    timeTo.setDate(moment(date).endOf('week').get('date'));
    timeTo.setDate(moment(date).endOf('month').get('date'));
    timeTo.setMonth(moment(date).get('month'));
    return {
      timeFrom,
      timeTo,
    };
  };

  useEffect(() => {
    const { timeFrom, timeTo } = getMonthRange(new Date());
    if (isAuthorized && memberId) {
      getItemsRequest(memberId, timeFrom, timeTo);
    }
  }, []);

  function onChange(value) {
    setCurrentDate(value);
  }

  function getListData(value) {
    let listData;
    homeworks?.forEach((item) => {
      if (moment(value).local().isSame(moment(item.program_date).local(), 'day')) {
        listData = [{ type: 'error' }];
      }
    });
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <CalendarContainer isDashboard={isDashboard}>
      <CalendarWrapper>
        {isDashboard && <DashboardHeader>Actions</DashboardHeader>}
        <Calendar
          locale={{
            lang: {
              locale: 'en',
              dayFormat: moment.updateLocale('en', {
                weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              }),
            },
          }}
          dateCellRender={dateCellRender}
          fullscreen={fullscreen}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            const month = value.month();
            return (
              <div style={{ padding: 8 }}>
                <CalendarRow>
                  <CalendarController
                    value={String(month)}
                    onClick={(selectedMonth) => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth.currentTarget.value, 10) - 1);
                      onChange(newValue);
                      const { timeFrom, timeTo } = getMonthRange(newValue);
                      getItemsRequest(memberId, timeFrom, timeTo);
                    }}
                  >
                    <SvgIcon name="left" width="16px" height="16px" fill={colors.darkPink} />
                  </CalendarController>
                  <CalendarDate>{value.format('DD MMMM YYYY')}</CalendarDate>
                  <CalendarController
                    value={String(month)}
                    onClick={(selectedMonth) => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth.currentTarget.value, 10) + 1);
                      onChange(newValue);
                      const { timeFrom, timeTo } = getMonthRange(newValue);
                      getItemsRequest(memberId, timeFrom, timeTo);
                    }}
                  >
                    <SvgIcon name="right" width="16px" height="16px" fill={colors.darkPink} />
                  </CalendarController>
                </CalendarRow>
              </div>
            );
          }}
          onChange={onChange}
        />
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default CalendarComponent;
