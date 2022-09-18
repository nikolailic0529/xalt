import React, { useEffect, useState } from 'react';
import Text from 'components/shared/Text';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Spacer from 'components/shared/Spacer';
import SvgIcon from 'components/shared/SvgIcon';
import VideoPreview from 'components/VideoPreview';
import { Input } from 'components/shared/Form';
import { LinkOutlined } from '@ant-design/icons';
import ExercisesList from '../Exercises/ExercisesList';
import {
  PinkDivider,
  ExerciseOption,
  DeleteIcon,
  SelectExerciseModal,
} from './styles';

const NewExercise = (props) => {
  const {
    values, errors, touched, setFieldValue, index, handleRemove, handleChange, handleBlur,
  } = props;

  const [visible, setVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({});

  const chooseExercise = (data) => setCurrentExercise(data);

  useEffect(() => {
    setFieldValue(`exercises.${index}.exercise`, currentExercise);
  }, [currentExercise]);

  useEffect(() => {
    setCurrentExercise(values.exercises[index].exercise);
  }, [values.exercises.length]);

  return (
    <Spacer fullWidth direction="vertical" size={10}>
      <DeleteIcon>
        <SvgIcon
          onClick={() => handleRemove(index)}
          style={{ cursor: 'pointer', alignSelf: 'flex-end' }}
          name="trash"
          width="24px"
          height="24px"
        />
      </DeleteIcon>
      {currentExercise?.id && (
        <VideoPreview
          isChooseMode={chooseExercise}
          data={currentExercise}
          my
        />
      )}
      <ExerciseOption onClick={() => setVisible(true)}>
        {values.exercises[index].exercise?.id ? 'Change exercise' : 'Choose exercise'}
      </ExerciseOption>
      <Input
        id={`link_url-${index}`}
        name={`exercises.${index}.link_url`}
        value={values.exercises[index].link_url}
        link
        placeholder="Add a link"
        onChange={handleChange}
        onBlur={handleBlur}
        prefix={<LinkOutlined style={{ fontSize: '24px' }} />}
      />
      {touched?.exercises
        && errors?.exercises
        && touched?.exercises[index]
        && errors?.exercises[index]
        && touched.exercises[index].link_url
        && errors.exercises[index].link_url
        && !values.exercises[index].exercise?.id ? (
          <Text darkPink smallSize>{errors?.exercises[index]?.link_url}</Text>
        ) : null}
      <Input
        id={`repetitions-${index}`}
        name={`exercises.${index}.repetitions`}
        value={values.exercises[index].repetitions}
        placeholder="Repetition"
        type="number"
        min={0}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched?.exercises
        && errors?.exercises
        && touched?.exercises[index]
        && errors?.exercises[index]
        && touched.exercises[index].repetitions
        && errors.exercises[index].repetitions ? (
          <Text darkPink smallSize>{errors?.exercises[index]?.repetitions}</Text>
        ) : null}
      <Input
        id={`repetitions_duration-${index}`}
        name={`exercises.${index}.repetitions_duration`}
        value={values.exercises[index].repetitions_duration}
        placeholder="Repetition Duration"
        type="number"
        min={0}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched?.exercises
        && errors?.exercises
        && touched?.exercises[index]
        && errors?.exercises[index]
        && touched?.exercises[index]?.repetitions_duration
        && errors?.exercises[index]?.repetitions_duration ? (
          <Text darkPink smallSize>{errors?.exercises[index]?.repetitions_duration}</Text>
        ) : null}
      <Input
        id={`sets-${index}`}
        name={`exercises.${index}.sets`}
        value={values.exercises[index].sets}
        placeholder="Sets"
        type="number"
        min={0}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched?.exercises
        && errors?.exercises
        && touched?.exercises[index]
        && errors?.exercises[index]
        && touched?.exercises[index].sets
        && errors?.exercises[index].sets ? (
          <Text darkPink smallSize>{errors?.exercises[index]?.sets}</Text>
        ) : null}

      <br />
      <PinkDivider />
      <SelectExerciseModal
        className="modal-without-close-btn"
        visible={!!visible}
        title="Choose exercise"
        width="100%"
        setVisible={setVisible}
        footer={null}
      >
        <ExercisesList setVisible={setVisible} chooseExercise={chooseExercise} />
      </SelectExerciseModal>
    </Spacer>
  );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExercise);
