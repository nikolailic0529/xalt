import {createReducer, createActions} from 'reduxsauce';

import widgetTypes from 'lib/redux/types/widget';

const {
  GET_WIDGET_REQUEST,
  GET_WIDGET_SUCCESS,
  GET_WIDGET_ERROR,
  CLEANUP_WIDGET,
} = widgetTypes;

const { Types, Creators } = createActions({
  getWidgetRequest: ['widgetNames', 'filters'],
  getWidgetSuccess: null,
  getWidgetError: null,
  cleanupWidget: null,
});

export default Creators;

export const INITIAL_STATE = {
  widget: [],
  fetching: false,
  error: null,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const success = (state, { data }) => ({
  ...state,
  fetching: false,
  widget: data,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_WIDGET_REQUEST]: request,
  [GET_WIDGET_SUCCESS]: success,
  [GET_WIDGET_ERROR]: failure,
  [CLEANUP_WIDGET]: cleanup,
});
