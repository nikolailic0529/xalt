import { createReducer, createActions } from 'reduxsauce';

import notificationsTypes from 'lib/redux/types/notifications';

const {
  TOGGLE_NOTIFICATIONS_PANEL,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  CLEANUP_NOTIFICATIONS,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_ERROR,
  DELETE_ALL_NOTIFICATIONS_REQUEST,
  DELETE_ALL_NOTIFICATIONS_SUCCESS,
  DELETE_ALL_NOTIFICATIONS_ERROR,
} = notificationsTypes;

const { Types, Creators } = createActions({
  getNotificationsRequest: null,
  getNotificationsSuccess: null,
  getNotificationsError: null,
  updateNotificationRequest: ['id', 'data'],
  updateNotificationSuccess: null,
  updateNotificationError: null,
  deleteAllNotificationsRequest: null,
  deleteAllNotificationsSuccess: null,
  deleteAllNotificationsError: null,
});

export default Creators;

export const INITIAL_STATE = {
  notifications: [],
  isOpen: null,
  fetching: false,
  error: null,
};

const request = (state) => ({
  ...state,
  fetching: true,
});

const getNotificationsSuccess = (
  state,
  {
    data,
  },
) => ({
  ...state,
  fetching: false,
  error: null,
  notifications: data,
});

const updateNotificationSuccess = (
  state,
) => ({
  ...state,
  fetching: false,
  error: null,
});

const deleteAllNotificationsSuccess = (
  state,
) => ({
  ...state,
  fetching: false,
  error: null,
});

const toggleNotificationsPanel = (
  state,
) => ({
  ...state,
  isOpen: !state.isOpen,
});

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

const cleanup = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [TOGGLE_NOTIFICATIONS_PANEL]: toggleNotificationsPanel,
  [GET_NOTIFICATIONS_REQUEST]: request,
  [GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [GET_NOTIFICATIONS_ERROR]: failure,
  [CLEANUP_NOTIFICATIONS]: cleanup,
  [UPDATE_NOTIFICATION_REQUEST]: request,
  [UPDATE_NOTIFICATION_SUCCESS]: updateNotificationSuccess,
  [UPDATE_NOTIFICATION_ERROR]: failure,
  [DELETE_ALL_NOTIFICATIONS_REQUEST]: request,
  [DELETE_ALL_NOTIFICATIONS_SUCCESS]: deleteAllNotificationsSuccess,
  [DELETE_ALL_NOTIFICATIONS_ERROR]: failure,
});
