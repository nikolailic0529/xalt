import { createReducer, createActions } from 'reduxsauce';

import reportsTypes from 'lib/redux/types/reports';

const {
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_ERROR,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_ERROR,
  GET_REPORT_QUESTIONS_REQUEST,
  GET_REPORT_QUESTIONS_SUCCESS,
  GET_REPORT_QUESTIONS_ERROR,
  REPORT_NOT_FOUND,
  UPDATE_REPORT_REQUEST,
  UPDATE_REPORT_SUCCESS,
  UPDATE_REPORT_ERROR,
  CLEANUP_REPORTS,
} = reportsTypes;

const { Types, Creators } = createActions({
  getReportsRequest: ['filters'],
  getReportsSuccess: null,
  getReportsError: null,
  getReportRequest: ['id'],
  getReportSuccess: null,
  getReportError: null,
  getReportQuestionsRequest: null,
  getReportQuestionsSuccess: null,
  getReportQuestionsError: null,
  updateReportRequest: ['id', 'data'],
  updateReportSuccess: null,
  updateReportError: null,
});

export default Creators;

export const INITIAL_STATE = {
  reports: [],
  report: null,
  fetching: false,
  error: null,
  report_questions: [],
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const getReportsSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  reports: data,
});

const getReportSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  report: data,
});

const updateReportSuccess = (state) => ({
  ...state,
  report: {
    ...state.report,
    updated: true,
  },
  fetching: false,
  error: null,
});

const getReportQuestionsSuccess = (state, { data }) => ({
  ...state,
  report_questions: [...data.slice(0, 4), data[5], data[4]],
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const notFound = (state) => ({
  ...state,
  fetching: false,
  notFound: true,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [GET_REPORTS_REQUEST]: request,
  [GET_REPORTS_SUCCESS]: getReportsSuccess,
  [GET_REPORTS_ERROR]: failure,
  [GET_REPORT_REQUEST]: request,
  [GET_REPORT_SUCCESS]: getReportSuccess,
  [GET_REPORT_ERROR]: failure,
  [REPORT_NOT_FOUND]: notFound,
  [UPDATE_REPORT_REQUEST]: request,
  [UPDATE_REPORT_SUCCESS]: updateReportSuccess,
  [UPDATE_REPORT_ERROR]: failure,
  [GET_REPORT_QUESTIONS_REQUEST]: request,
  [GET_REPORT_QUESTIONS_SUCCESS]: getReportQuestionsSuccess,
  [GET_REPORT_QUESTIONS_ERROR]: failure,
  [CLEANUP_REPORTS]: cleanup,
});
