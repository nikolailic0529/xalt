import { createReducer, createActions } from 'reduxsauce';

import memberProfileTypes from 'lib/redux/types/member_profile';
import programTypes from 'lib/redux/types/programs';
import homeworksTypes from 'lib/redux/types/homeworks';

const {
  GET_MEMBER_PROFILE_REQUEST,
  GET_MEMBER_PROFILE_SUCCESS,
  GET_MEMBER_PROFILE_ERROR,
  GET_SESSIONS_REQUEST,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
  CLEANUP_MEMBER_PROFILE,
} = memberProfileTypes;

const { GET_HOMEWORKS_REQUEST, GET_HOMEWORKS_SUCCESS, GET_HOMEWORKS_ERROR } = homeworksTypes;

const {
  ADD_PROGRAM_REQUEST,
  ADD_PROGRAM_SUCCESS,
  ADD_PROGRAM_ERROR,
  UPDATE_PROGRAM_REQUEST,
  UPDATE_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_ERROR,
  DELETE_PROGRAM_EXERCISE_REQUEST,
  DELETE_PROGRAM_EXERCISE_SUCCESS,
  DELETE_PROGRAM_EXERCISE_ERROR,
} = programTypes;

const { Types, Creators } = createActions({
  getMemberProfileRequest: ['id'],
  getMemberProfileSuccess: null,
  getMemberPerofileError: null,
  getSessionsRequest: ['id', 'time_from', 'time_to'],
  getSessionsSuccess: null,
  getSessionsError: null,
  addProgramRequest: ['body'],
  addProgramSuccess: null,
  addProgramError: null,
  updateProgramRequest: ['body', 'id', 'member_id'],
  updateProgramSuccess: null,
  updateProgramError: null,
  deleteProgramExerciseRequest: ['program_type', 'program_id', 'exercise_id'],
  deleteProgramExerciseSuccess: null,
  deleteProgramExerciseError: null,
  cleanupMemberProfile: null,
});

export default Creators;

export const INITIAL_STATE = {
  member_profile: {},
  fetching: false,
  error: null,
};

const request = (state) => {
  return {
    ...state,
    fetching: true,
  };
};

const success = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    member_profile: {
      ...data,
      sessions: data.programs?.filter((item) => item.type === 'Program::SessionProgram'),
      programs: data.programs?.filter((item) => item.type === 'Program::HomeworkProgram'),
    },
  };
};

const addProgramSuccess = (state, { data }) => {
  if (data.type === 'Program::SessionProgram') {
    return {
      ...state,
      fetching: false,
      member_profile: {
        ...state.member_profile,
        sessions: [...state.member_profile.sessions, data],
      },
    };
  } else {
    return {
      ...state,
      fetching: false,
      member_profile: {
        ...state.member_profile,
        programs: [...state.member_profile.programs, data],
      },
    };
  }
};

const updateProgramSuccess = (state, { data }) => {
  if (data.type === 'Program::SessionProgram') {
    return {
      ...state,
      fetching: false,
      member_profile: {
        ...state.member_profile,
        sessions: state.member_profile.sessions.map((item) => {
          if (item.id === data.id) {
            return data;
          } else {
            return item;
          }
        }),
      },
    };
  } else {
    return {
      ...state,
      fetching: false,
      member_profile: {
        ...state.member_profile,
        programs: state.member_profile.programs.map((item) => {
          if (item.id === data.id) {
            return data;
          } else {
            return item;
          }
        }),
      },
    };
  }
};

const deleteProgramExerciseSuccess = (state, { data }) => {
  if (data.program_type === 'session') {
    return {
      ...state,
      fetching: false,
      member_profile: {
        ...state.member_profile,
        sessions: state.member_profile.sessions.map((session) => {
          if (session.id !== data.program_id) {
            return session;
          } else {
            return {
              ...session,
              program_exercises: session.program_exercises.filter(
                (exercise) => exercise.id !== data.exercise_id,
              ),
            };
          }
        }),
      },
    };
  } else {
    return {
      ...state,
      fetching: false,
      member_profile: {
        ...state.member_profile,
        programs: state.member_profile.programs.map((program) => {
          if (program.id !== data.program_id) {
            return program;
          } else {
            return {
              ...program,
              program_exercises: program.program_exercises.filter(
                (exercise) => exercise.id !== data.exercise_id,
              ),
            };
          }
        }),
      },
    };
  }
};

const getHomeworksSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    member_profile: {
      ...state.member_profile,
      programs: data,
    },
  };
};

const getSessionsSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    member_profile: {
      ...state.member_profile,
      sessions: data,
    },
  };
};

const failure = (state, { error }) => {
  return {
    ...state,
    fetching: false,
    error,
  };
};

const cleanup = () => {
  return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
  [GET_MEMBER_PROFILE_REQUEST]: request,
  [GET_MEMBER_PROFILE_SUCCESS]: success,
  [GET_MEMBER_PROFILE_ERROR]: failure,
  [ADD_PROGRAM_REQUEST]: request,
  [ADD_PROGRAM_SUCCESS]: addProgramSuccess,
  [ADD_PROGRAM_ERROR]: failure,
  [UPDATE_PROGRAM_REQUEST]: request,
  [UPDATE_PROGRAM_SUCCESS]: updateProgramSuccess,
  [UPDATE_PROGRAM_ERROR]: failure,
  [DELETE_PROGRAM_EXERCISE_REQUEST]: request,
  [DELETE_PROGRAM_EXERCISE_SUCCESS]: deleteProgramExerciseSuccess,
  [DELETE_PROGRAM_EXERCISE_ERROR]: failure,
  [GET_HOMEWORKS_REQUEST]: request,
  [GET_HOMEWORKS_SUCCESS]: getHomeworksSuccess,
  [GET_HOMEWORKS_ERROR]: failure,
  [GET_SESSIONS_REQUEST]: request,
  [GET_SESSIONS_SUCCESS]: getSessionsSuccess,
  [GET_SESSIONS_ERROR]: failure,
  [CLEANUP_MEMBER_PROFILE]: cleanup,
});
