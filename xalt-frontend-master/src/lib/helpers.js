import moment from 'moment';
import * as R from 'ramda';

export const extractIdFromUrl = () => window.location.pathname.split('/').slice(-1)[0];

export const formatNotification = (date) => {
  const notificationDate = moment(date);
  const currentDate = moment();
  const diff = currentDate.diff(notificationDate, 'days');

  let formatedTime = notificationDate.format('H:mm A');

  if (diff) {
    formatedTime = `${notificationDate.format('MM.DD.YYYY')} at ${formatedTime}`;
  }

  return formatedTime;
};

export const cleanUpNulls = R.reject(R.anyPass([R.isEmpty, R.isNil]));
// www.localhost:3000/member_challenge -> ['www.localhost:3000', 'member_challenge'] -> 'member_challenge'