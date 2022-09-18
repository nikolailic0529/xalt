import { createReducer, createActions } from 'reduxsauce';

import modalsTypes from 'lib/redux/types/modals';

const {
  TOGGLE_CHANGE_PASSWORD_MODAL,
} = modalsTypes;

const { Types, Creators } = createActions({
  openChangePasswordModal: null,
  closeChangePasswordModal: null,
});

export default Creators;

export const INITIAL_STATE = {
  changePasswordVisible: null,
};

const toggleChangePasswordModal = (state) => ({
  ...state,
  changePasswordVisible: !state.changePasswordVisible,
});

export const reducer = createReducer(INITIAL_STATE, {
  [TOGGLE_CHANGE_PASSWORD_MODAL]: toggleChangePasswordModal,
});
