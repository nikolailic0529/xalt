const RESET_STATE_REQUEST = 'RESET_STATE_REQUEST';
const RESET_STATE_SUCCESS = 'RESET_STATE_SUCCESS';
const RESET_STATE_ERROR = 'RESET_STATE_ERROR';

const GET_TOP_CHALLENGES_REQUEST = 'GET_TOP_CHALLENGES_REQUEST';
const GET_TOP_CHALLENGES_SUCCESS = 'GET_TOP_CHALLENGES_SUCCESS';
const GET_TOP_CHALLENGES_ERROR = 'GET_TOP_CHALLENGES_ERROR';

const GET_MY_CHALLENGES_REQUEST = 'GET_MY_CHALLENGES_REQUEST';
const GET_MY_CHALLENGES_SUCCESS = 'GET_MY_CHALLENGES_SUCCESS';
const GET_MY_CHALLENGES_ERROR = 'GET_MY_CHALLENGES_ERROR';
const CLEANUP_CHALLENGES = 'CLEANUP_CHALLENGES';

const ADD_CHALLENGE_REQUEST = 'ADD_CHALLENGE_REQUEST';
const ADD_CHALLENGE_SUCCESS = 'ADD_CHALLENGE_SUCCESS';
const ADD_CHALLENGE_ERROR = 'ADD_CHALLENGE_ERROR';

const UPDATE_CHALLENGE_REQUEST = 'UPDATE_CHALLENGE_REQUEST';
const UPDATE_CHALLENGE_SUCCESS = 'UPDATE_CHALLENGE_SUCCESS';
const UPDATE_CHALLENGE_ERROR = 'UPDATE_CHALLENGE_ERROR';

const REMOVE_CHALLENGE_REQUEST = 'REMOVE_CHALLENGE_REQUEST';
const REMOVE_CHALLENGE_SUCCESS = 'REMOVE_CHALLENGE_SUCCESS';
const REMOVE_CHALLENGE_ERROR = 'REMOVE_CHALLENGE_ERROR';

const GET_CHALLENGE_REQUEST = 'GET_CHALLENGE_REQUEST';
const GET_CHALLENGE_SUCCESS = 'GET_CHALLENGE_SUCCESS';
const GET_CHALLENGE_ERROR = 'GET_CHALLENGE_ERROR';

const VOTE_CHALLENGE_REQUEST = 'VOTE_CHALLENGE_REQUEST';
const VOTE_CHALLENGE_SUCCESS = 'VOTE_CHALLENGE_SUCCESS';
const VOTE_CHALLENGE_ERROR = 'VOTE_CHALLENGE_ERROR';

const UNVOTE_CHALLENGE_REQUEST = 'UNVOTE_CHALLENGE_REQUEST';
const UNVOTE_CHALLENGE_SUCCESS = 'UNVOTE_CHALLENGE_SUCCESS';
const UNVOTE_CHALLENGE_ERROR = 'UNVOTE_CHALLENGE_ERROR';

const ENROLL_IN_CHALLENGE_REQUEST = 'ENROLL_IN_CHALLENGE_REQUEST'
const ENROLL_IN_CHALLENGE_SUCCESS = 'ENROLL_IN_CHALLENGE_SUCCESS'
const ENROLL_IN_CHALLENGE_ERROR = 'ENROLL_IN_CHALLENGE_ERROR'

const UNENROLL_IN_CHALLENGE_REQUEST = 'UNENROLL_IN_CHALLENGE_REQUEST'
const UNENROLL_IN_CHALLENGE_SUCCESS = 'UNENROLL_IN_CHALLENGE_SUCCESS'
const UNENROLL_IN_CHALLENGE_ERROR = 'UNENROLL_IN_CHALLENGE_ERROR'

const CANCEL_CHALLENGE_REQUEST = 'CANCEL_CHALLENGE_REQUEST'
const CANCEL_CHALLENGE_SUCCESS = 'CANCEL_CHALLENGE_SUCCESS'
const CANCEL_CHALLENGE_ERROR = 'CANCEL_CHALLENGE_ERROR'

const GET_ENROLLED_CHALLENGES_REQUEST = 'GET_ENROLLED_CHALLENGES_REQUEST'
const GET_ENROLLED_CHALLENGES_SUCCESS = 'GET_ENROLLED_CHALLENGES_SUCCESS'
const GET_ENROLLED_CHALLENGES_ERROR = 'GET_ENROLLED_CHALLENGES_ERROR'


const CREATE_CHECK_IN_FOR_CHALLENGE_REQUEST = 'CREATE_CHECK_IN_FOR_CHALLENGE_REQUEST'
const CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS = 'CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS'
const CREATE_CHECK_IN_FOR_CHALLENGE_ERROR = 'CREATE_CHECK_IN_FOR_CHALLENGE_ERROR'

const UPDATE_CHECK_IN_FOR_CHALLENGE_REQUEST = 'UPDATE_CHECK_IN_FOR_CHALLENGE_REQUEST'
const UPDATE_CHECK_IN_FOR_CHALLENGE_SUCCESS = 'UPDATE_CHECK_IN_FOR_CHALLENGE_SUCCESS'
const UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR = 'UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR'

const GET_CHECK_INS_FOR_CHALLENGE_REQUEST = 'GET_CHECK_INS_FOR_CHALLENGE_REQUEST'
const GET_CHECK_INS_FOR_CHALLENGE_SUCCESS = 'GET_CHECK_INS_FOR_CHALLENGE_SUCCESS'
const GET_CHECK_INS_FOR_CHALLENGE_ERROR = 'GET_CHECK_INS_FOR_CHALLENGE_ERROR'

const GET_CHECK_INS_FOR_USER_REQUEST = 'GET_CHECK_INS_FOR_USER_REQUEST'
const GET_CHECK_INS_FOR_USER_SUCCESS = 'GET_CHECK_INS_FOR_USER_SUCCESS'
const GET_CHECK_INS_FOR_USER_ERROR = 'GET_CHECK_INS_FOR_USER_ERROR'

const SET_CURRENT_CHALLENGE_REQUEST = 'SET_CURRENT_CHALLENGE_REQUEST'
const SET_CURRENT_CHALLENGE_SUCCESS = 'SET_CURRENT_CHALLENGE_SUCCESS'
const SET_CURRENT_CHALLENGE_ERROR = 'SET_CURRENT_CHALLENGE_ERROR'

const GET_SEARCHED_CHALLENGES_REQUEST = 'GET_SEARCHED_CHALLENGES_REQUEST'
const GET_SEARCHED_CHALLENGES_SUCCESS = 'GET_SEARCHED_CHALLENGES_SUCCESS'
const GET_SEARCHED_CHALLENGES_ERROR = 'GET_SEARCHED_CHALLENGES_ERROR'

export default {
  RESET_STATE_REQUEST,
  RESET_STATE_SUCCESS,
  RESET_STATE_ERROR,
  GET_TOP_CHALLENGES_REQUEST,
  GET_TOP_CHALLENGES_SUCCESS,
  GET_TOP_CHALLENGES_ERROR,
  GET_MY_CHALLENGES_REQUEST,
  GET_MY_CHALLENGES_SUCCESS,
  GET_MY_CHALLENGES_ERROR,
  CLEANUP_CHALLENGES,
  ADD_CHALLENGE_REQUEST,
  ADD_CHALLENGE_SUCCESS,
  ADD_CHALLENGE_ERROR,
  REMOVE_CHALLENGE_REQUEST,
  REMOVE_CHALLENGE_SUCCESS,
  REMOVE_CHALLENGE_ERROR,
  GET_CHALLENGE_REQUEST,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_ERROR,
  UPDATE_CHALLENGE_REQUEST,
  UPDATE_CHALLENGE_SUCCESS,
  UPDATE_CHALLENGE_ERROR,
  VOTE_CHALLENGE_REQUEST,
  VOTE_CHALLENGE_SUCCESS,
  VOTE_CHALLENGE_ERROR,
  UNVOTE_CHALLENGE_REQUEST,
  UNVOTE_CHALLENGE_SUCCESS,
  UNVOTE_CHALLENGE_ERROR,
  ENROLL_IN_CHALLENGE_REQUEST,
  ENROLL_IN_CHALLENGE_SUCCESS,
  ENROLL_IN_CHALLENGE_ERROR,
  UNENROLL_IN_CHALLENGE_REQUEST,
  UNENROLL_IN_CHALLENGE_SUCCESS,
  UNENROLL_IN_CHALLENGE_ERROR,
  CANCEL_CHALLENGE_REQUEST,
  CANCEL_CHALLENGE_SUCCESS,
  CANCEL_CHALLENGE_ERROR,
  GET_ENROLLED_CHALLENGES_REQUEST,
  GET_ENROLLED_CHALLENGES_SUCCESS,
  GET_ENROLLED_CHALLENGES_ERROR,
  CREATE_CHECK_IN_FOR_CHALLENGE_REQUEST,
  CREATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
  CREATE_CHECK_IN_FOR_CHALLENGE_ERROR,
  UPDATE_CHECK_IN_FOR_CHALLENGE_REQUEST,
  UPDATE_CHECK_IN_FOR_CHALLENGE_SUCCESS,
  UPDATE_CHECK_IN_FOR_CHALLENGE_ERROR,
  GET_CHECK_INS_FOR_CHALLENGE_REQUEST,
  GET_CHECK_INS_FOR_CHALLENGE_SUCCESS,
  GET_CHECK_INS_FOR_CHALLENGE_ERROR,
  GET_CHECK_INS_FOR_USER_REQUEST,
  GET_CHECK_INS_FOR_USER_SUCCESS,
  GET_CHECK_INS_FOR_USER_ERROR,
  SET_CURRENT_CHALLENGE_REQUEST,
  SET_CURRENT_CHALLENGE_SUCCESS,
  SET_CURRENT_CHALLENGE_ERROR,
  GET_SEARCHED_CHALLENGES_REQUEST,
  GET_SEARCHED_CHALLENGES_SUCCESS,
  GET_SEARCHED_CHALLENGES_ERROR,
};