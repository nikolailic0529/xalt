import React from 'react';
import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';
import MemberProfileActions from 'lib/redux/reducers/member_profile';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { Input, TextArea } from 'components/shared/Form';
import Spacer from 'components/shared/Spacer';
import SvgIcon from 'components/shared/SvgIcon';
import { Formik, FieldArray } from 'formik';
import moment from 'moment';
import {
  NewProgramWrapper,
  NewProgramFormWrapper,
  ActionButtons,
  NewExerciseDate,
  PinkDivider,
  AddProgram,
  ProgramForm,
  ExercisesList,
} from './styles';
import Exercise from './exercise';

const fields = {
  name: '',
  description: '',
  exercises: [
    {
      repetitions: '',
      repetitions_duration: '',
      sets: '',
      link_url: '',
      exercise: {
        id: '',
      },
    },
  ],
};

const schema = Yup.object().shape({
  name: Yup.string().required('Please, enter name!'),
  description: Yup.string().required('Please, enter description!'),
  exercises: Yup.array().of(
    Yup.object().shape(
      {
        repetitions: Yup.number().required('Please, enter repetitions!'),
        repetitions_duration: Yup.number().required('Please, enter repetitions duration!'),
        sets: Yup.number().required('Please, enter sets!'),
        link_url: Yup.string().when('exercise', {
          is: (exercise) => !exercise.id,
          then: Yup.string().required('Please, add link or exercise!'),
          otherwise: Yup.string().nullable(),
        }),
        exercise: Yup.object().when('link_url', {
          is: (link_url) => !link_url,
          then: Yup.object().shape({
            id: Yup.string().required('Please, add exercise!'),
          }),
          otherwise: Yup.object().shape({
            id: Yup.string().nullable(),
          }),
        }),
      },
      [['exercise', 'link_url']],
    ),
  ),
});

const NewProgram = (props) => {
  const {
    addProgramRequest,
    updateProgramRequest,
    currentProgram,
    setIsFormView,
    currentDate,
    memberId,
    coach_profile_id,
    programTab,
  } = props;

  const getData = () =>
    currentProgram?.id
      ? {
          name: currentProgram.name,
          description: currentProgram.description,
          exercises: currentProgram.program_exercises.map((item) => ({
            repetitions: item.repetitions,
            repetitions_duration: item.repetitions_duration,
            sets: item.sets,
            link_url: item.link_url,
            exercise: item.exercise,
            id: item.id,
          })),
        }
      : fields;

  return (
    <NewProgramWrapper>
      {currentDate && <NewExerciseDate>{moment(currentDate).format('dddd L')}</NewExerciseDate>}
      <ExercisesList>
        <NewProgramFormWrapper>
          <Formik
            enableReinitialize
            initialValues={getData()}
            onSubmit={(values) => {
              const exercises = values.exercises.map((item) => ({
                repetitions: item.repetitions,
                repetitions_duration: item.repetitions_duration,
                sets: item.sets,
                link_url: item.link_url,
                id: item.id,
                exercise_id: item.exercise.id,
              }));
              const body = {
                name: values.name,
                description: values.description,
                program_exercises: JSON.stringify(exercises),
                member_profile_id: currentProgram.id ? undefined : memberId,
                coach_profile_id: currentProgram.id ? undefined : coach_profile_id,
                program_type: programTab ? 'session' : 'action',
                program_date: currentDate,
              };
              currentProgram.id
                ? updateProgramRequest(body, currentProgram.id, memberId)
                : addProgramRequest(body);
              setIsFormView(false);
            }}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              setFieldValue,
            }) => (
              <ProgramForm
                id="new-program"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Spacer fullWidth direction="vertical" size={10}>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    placeholder="Program Name..."
                    theme="classic"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name ? (
                    <Text darkPink smallSize>
                      {errors.name}
                    </Text>
                  ) : null}
                  <TextArea
                    id="description"
                    name="description"
                    value={values.description}
                    placeholder="Description..."
                    rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.description ? (
                    <Text darkPink smallSize>
                      {errors.description}
                    </Text>
                  ) : null}
                  <FieldArray name="exercises">
                    {({ insert, remove, push }) => (
                      <>
                        <PinkDivider />
                        {values.exercises.length > 0 &&
                          values.exercises.map((item, index) => (
                            <Exercise
                              values={values}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              touched={touched}
                              index={index}
                              key={index}
                              handleRemove={remove}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              item={item}
                            />
                          ))}
                        <AddProgram
                          onClick={() =>
                            push({
                              repetitions: '',
                              repetitions_duration: '',
                              sets: '',
                              link_url: '',
                              exercise: {
                                id: '',
                              },
                            })
                          }
                        >
                          <SvgIcon name="plus" width="16px" height="16px" stroke="#e6447d" />
                          <Text darkPink>Add new step</Text>
                        </AddProgram>
                      </>
                    )}
                  </FieldArray>
                </Spacer>
              </ProgramForm>
            )}
          </Formik>
        </NewProgramFormWrapper>
      </ExercisesList>
      <ActionButtons>
        <ButtonAux pinkBtn maxWidth="116px" type="submit" form="new-program">
          Save
        </ButtonAux>
        <ButtonAux pinkBrdrBtn maxWidth="116px" onClick={() => setIsFormView(false)}>
          Cancel
        </ButtonAux>
      </ActionButtons>
    </NewProgramWrapper>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  coach_profile_id: state.profile.coach_profile?.id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addProgramRequest: (body) => dispatch(MemberProfileActions.addProgramRequest(body)),
  updateProgramRequest: (body, id, member_id) =>
    dispatch(MemberProfileActions.updateProgramRequest(body, id, member_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProgram);
