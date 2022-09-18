import { LinkOutlined } from '@ant-design/icons';
import { message, Row, Space, Spin, Switch, Checkbox } from 'antd';
import ButtonAux from 'components/shared/ButtonAux';
import { CardInputError } from 'components/shared/Checkout';
import Flex from 'components/shared/Flex';
import { Input, Select, TextArea } from 'components/shared/Form';
import Spacer from 'components/shared/Spacer';
import Text from 'components/shared/Text';
import { useFormik } from 'formik';
import { EXERCISE_OPTIONS } from 'lib/constants';
import ExercisesActions from 'lib/redux/reducers/exercises';
import ProfileActions from 'lib/redux/reducers/profile';
import VimeoUploader from 'lib/vimeo-uploader';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { MarginedCol, NewExerciseFormWrapper, ResultBox } from './styles';

const fields = {
  name: '',
  description: '',
  categorie: '',
  equipment: '',
  difficulty: '',
  movement: '',
  video_url: '',
  s3_video_file: '',
  agonist: '',
  relevant: '',
  start_pos: '',
  end_pos: '',
  instruction: '',
  is_private: false,
  is_competition: false,
  is_confirmed: false,
};

const fieldNames = {
  name: 'Name of Exercise...',
  description: 'Description of How to Perform Exercise...',
  categorie: 'Target Joint/Body Segment',
  equipment: 'Set-Up/Equipment',
  difficulty: 'Level',
  movement: 'Range of Movement...',
  video_url: 'Copy/paste link to the exercise being demonstrated',
  s3_video_file: '',
  agonist: 'Identify agonist, antagonist, and synergist muscle(s)...',
  relevant: 'Identify any relevant movement phases and contraction modes...',
  start_pos: 'Exercise Starting Position...',
  end_pos: 'Exercise Finishing Position...',
  instruction: 'Instructional Coaching Cues...',
  is_confirmed: 'confirmation of the acknowledgement...',
};

const notRequiredFields = ['movement', 'agonist', 'relevant', 'is_private', 'is_competition'];

const validate = (values) => {
  const errors = {};

  Object.keys(fields).forEach((key) => {
    if (values[key] === '' || values[key] === false) {
      if (['video_url', 's3_video_file'].includes(key)) {
        if (key === 'video_url' && !values.s3_video_file) {
          errors[key] = 'File or Link Must be provided!';
        } else if (key === 's3_video_file' && !values.video_url) {
          errors[key] = 'File or Link Must be provided!';
        }
      } else if (!notRequiredFields.includes(key)) {
        errors[key] = `Please, enter ${fieldNames[key].toLowerCase()}`;
      }
    }
  });

  return errors;
};

const NewExercise = ({ addExerciseRequest, getUserProfile }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isPrivateValue, setIsPrivateValue] = useState(false);
  const [isCompetition, setIsCompetition] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [fileToUpload, setFileToUpload] = useState();

  const history = useHistory();

  const filterValues = (values) => ({
    ...Object.assign(
      ...Object.keys(values)
        .filter((key) => values[key])
        .map((key) => ({ [key]: values[key] })),
    ),
    is_private: values.is_private ? 'true' : 'false',
    is_competition: values.is_competition ? 'true' : 'false',
    s3_video_file: undefined,
  });

  const formik = useFormik({
    initialValues: fields,
    validate,
    onSubmit: (values) => {
      setIsFetching(true);

      if (fileToUpload) {
        const file = fileToUpload;

        VimeoUploader({
          file,
          onSuccess: (url) => {
            setIsFetching(false);

            addExerciseRequest({
              ...filterValues(values),
              vimeo_video_url: url,
            });

            history.push('/exercises?scope=my');
          },
          onProgress: () => {
            setIsFetching(false);
          },
          onError: () => {
            setIsFetching(false);
            message.error('Something went wrong while uploading your video.');
          },
        });
      } else {
        setIsFetching(false);
        addExerciseRequest(filterValues(values));
        history.push('/exercises?scope=my');
      }
    },
  });

  useEffect(() => {
    getUserProfile();
    formik.setFieldValue('is_private', false);
  }, []);

  const handleConfirmChange = (e) => {
    setIsConfirmed(e.target.checked);
    formik.setFieldValue('is_confirmed', e.target.checked);
  };

  return (
    <NewExerciseFormWrapper>
      <ResultBox display={isFetching}>
        <Spin size="large" />
      </ResultBox>

      <Row>
        <MarginedCol xl={4} xs={0}>
          <Text regularBiggerSize bold kingfisherDaisy>
            New
            <br />
            Exercise
          </Text>
        </MarginedCol>
        <MarginedCol xl={16} xs={24}>
          <form
            id="new-exercise"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Spacer fullWidth direction="vertical" size={10}>
              <Input
                id="name"
                name="name"
                placeholder={fieldNames.name}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                suffix="*"
              />
              {formik.touched.name && formik.errors.name ? (
                <CardInputError>{formik.errors.name}</CardInputError>
              ) : null}

              <TextArea
                id="description"
                name="description"
                placeholder={fieldNames.description}
                theme="classic"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.description && formik.errors.description ? (
                <CardInputError>{formik.errors.description}</CardInputError>
              ) : null}

              <Input
                id="start_pos"
                name="start_pos"
                placeholder={fieldNames.start_pos}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '80%', marginLeft: 'auto', display: 'flex' }}
                suffix="*"
              />
              {formik.touched.start_pos && formik.errors.start_pos ? (
                <CardInputError>{formik.errors.start_pos}</CardInputError>
              ) : null}

              <Input
                id="end_pos"
                name="end_pos"
                placeholder={fieldNames.end_pos}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: '80%', marginLeft: 'auto', display: 'flex' }}
                suffix="*"
              />
              {formik.touched.end_pos && formik.errors.end_pos ? (
                <CardInputError>{formik.errors.end_pos}</CardInputError>
              ) : null}

              <TextArea
                id="instruction"
                name="instruction"
                placeholder={fieldNames.instruction}
                theme="classic"
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.instruction && formik.errors.instruction ? (
                <CardInputError>{formik.errors.instruction}</CardInputError>
              ) : null}

              <Select
                id="categorie"
                name="categorie"
                placeholder={fieldNames.categorie}
                theme="classic"
                options={EXERCISE_OPTIONS.CATEGORIES}
                onChange={(value) => formik.setFieldValue('categorie', value)}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.categorie && formik.errors.categorie ? (
                <CardInputError>{formik.errors.categorie}</CardInputError>
              ) : null}

              <Input
                id="movement"
                name="movement"
                placeholder={fieldNames.movement}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.movement && formik.errors.movement ? (
                <CardInputError>{formik.errors.movement}</CardInputError>
              ) : null}

              <TextArea
                id="relevant"
                name="relevant"
                placeholder={fieldNames.relevant}
                theme="classic"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <TextArea
                id="agonist"
                name="agonist"
                placeholder={fieldNames.agonist}
                theme="classic"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Select
                id="equipment"
                name="equipment"
                placeholder={fieldNames.equipment}
                theme="classic"
                options={EXERCISE_OPTIONS.EQUIPMENTS}
                onChange={(value) => formik.setFieldValue('equipment', value)}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.equipment && formik.errors.equipment ? (
                <CardInputError>{formik.errors.equipment}</CardInputError>
              ) : null}

              <Select
                id="difficulty"
                name="difficulty"
                placeholder={fieldNames.difficulty}
                theme="classic"
                options={EXERCISE_OPTIONS.DIFFICULTIES}
                onChange={(value) => formik.setFieldValue('difficulty', value)}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.difficulty && formik.errors.difficulty ? (
                <CardInputError>{formik.errors.difficulty}</CardInputError>
              ) : null}

              {/* <Text bold>Upload .mp4 or .AVI file</Text>

              <StyledDragger
                id="s3_video_file"
                name="s3_video_file"
                maxCount={1}
                onChange={({ fileList }) => {
                  formik.setFieldValue('s3_video_file', fileList[0].originFileObj);

                  setFileToUpload(fileList[0].originFileObj);
                }}
                beforeUpload={(file) => {
                  const allowedTypes = ['video/avi', 'video/x-msvideo', 'video/mp4'];

                  if (!allowedTypes.includes(file.type)) {
                    message.error('Only .mp4 and .AVI formats allowed');
                  }

                  if (allowedTypes.includes(file.type)) {
                    return true;
                  }

                  return Upload.LIST_IGNORE;
                }}
              >
                <Spacer direction="vertical" size={32}>
                  <DownloadOutlined style={{ fontSize: '24px', color: colors.darkPink }} />

                  <Text darkPink>Drag and drop a file here or click to upload a file</Text>
                </Spacer>
              </StyledDragger>
              {formik.touched.s3_video_file && formik.errors.s3_video_file ? (
                <CardInputError>{formik.errors.s3_video_file}</CardInputError>
              ) : null}

              <br /> */}

              <Input
                id="video_url"
                name="video_url"
                placeholder={fieldNames.video_url}
                theme="classic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                prefix={<LinkOutlined style={{ fontSize: '24px' }} />}
                suffix="*"
              />

              <input type="hidden" id="is_private" name="is_private" value={isPrivateValue} />

              <Space direction="vertical" className="confirmText">
                {formik.touched.is_confirmed && formik.errors.is_confirmed ? (
                  <CardInputError>{formik.errors.is_confirmed}</CardInputError>
                ) : null}
                <Checkbox
                  id="is_confirmed"
                  name="is_confirmed"
                  value={isConfirmed}
                  onChange={handleConfirmChange}
                >
                  I confirm that the video being submitted:
                </Checkbox>
                <p>- Uses appropriate anatomical language and has no profanity</p>
                <p>- Has no persons wearing revealing/inappropriate clothing</p>
                <p>- Has good lighting and camera set-up, and clear quality</p>
                <p>- Is between 30-90 seconds</p>
              </Space>

              <Space>
                <Flex alignItems="center">
                  <Switch
                    defaultChecked
                    onChange={() => {
                      const newValue = !isPrivateValue;
                      setIsPrivateValue(newValue);
                      formik.setFieldValue('is_private', newValue);
                    }}
                  />
                </Flex>
                <Flex alignItems="center">
                  <Text darkPink bold>
                    Share with coaches
                  </Text>
                </Flex>
              </Space>

              <Space>
                <Flex alignItems="center">
                  <Switch
                    onChange={() => {
                      const newValue = !isCompetition;
                      setIsCompetition(newValue);
                      formik.setFieldValue('is_competition', newValue);
                    }}
                  />
                </Flex>
                <Flex alignItems="center">
                  <Text darkPink bold>
                    Submit to xAlt Exercise Demonstration Competition
                  </Text>
                </Flex>
              </Space>

              <Flex justifyContent="center">
                <ButtonAux pinkBtn width="116px" maxWidth="116px" type="submit" form="new-exercise">
                  Submit
                </ButtonAux>
              </Flex>
            </Spacer>
          </form>
        </MarginedCol>
      </Row>
    </NewExerciseFormWrapper>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  fetching: state.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addExerciseRequest: (data) => dispatch(ExercisesActions.addExerciseRequest(data)),
  getUserProfile: () => dispatch(ProfileActions.getUserProfileRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExercise);
