import { call, put, all, takeEvery } from 'redux-saga/effects';

import api from 'lib/api';
import widgetTypes from 'lib/redux/types/widget';
import notificationTypes from 'lib/redux/types/notification';

const { GET_WIDGET_REQUEST, GET_WIDGET_SUCCESS, GET_WIDGET_ERROR } =
  widgetTypes;
const { SHOW_ERROR } = notificationTypes;

function* getWidget(action) {
  let response = null;

  try {
    response = yield call(api.get, `/api/v1/analytics/widgets`, {
      query: {
        widget_names: action.widgetNames,
        filters: action.filters,
      },
    });
  } catch (error) {
    yield put({
      type: SHOW_ERROR,
      error: error?.response?.data?.errors[0] || "Can't receive the widget",
    });
    return yield put({
      type: GET_WIDGET_ERROR,
      error: error?.response?.data?.errors[0] || "Can't receive the widget",
    });
  }

  if (response.status === 200) {
    return yield put({
      type: GET_WIDGET_SUCCESS,
      data: response.data,
    });
  }

  yield put({ type: SHOW_ERROR, error: "Can't receive the widget" });
  return yield put({
    type: GET_WIDGET_ERROR,
    error: "Can't receive the widget",
  });
}

export default function* watch() {
  yield all([takeEvery(GET_WIDGET_REQUEST, getWidget)]);
}
