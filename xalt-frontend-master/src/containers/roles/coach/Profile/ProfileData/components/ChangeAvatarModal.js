import React, { useState } from 'react';
import {
  Modal, Row, message, Upload,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonAux from 'components/shared/ButtonAux';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import { connect } from 'react-redux';
import ProfileActions from 'lib/redux/reducers/profile';
import { StyledCol, StyledIcon } from 'containers/roles/coach/Profile/styles';
import { StyledDragger } from 'containers/roles/coach/Exercises/styles';
import { CardInputError } from 'components/shared/Checkout';

const schema = Yup.object().shape({
  file: Yup.mixed().required('Please, upload file!'),
});

const ChangeNameModal = ({
  updateProfileData, visible, setVisible,
}) => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      file: '',
    },
    validationSchema: schema,
    onSubmit: () => {
      const payload = new FormData();
      payload.append('avatar', file);

      updateProfileData(payload);
      setVisible(false);
    },
  });

  return (
    <Modal
      centered
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <form
        id="update-name"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >

        <StyledDragger
          id="file"
          name="file"
          maxCount={1}
          onChange={({ fileList }) => {
            formik.setFieldValue('file', fileList[0].originFileObj);
            setFile(fileList[0].originFileObj);
          }}
          beforeUpload={(uploadingFile) => {
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];

            if (!allowedTypes.includes(uploadingFile.type)) {
              message.error('Only .JPEG, .PNG and .PDF formats allowed');
            }

            if (allowedTypes.includes(uploadingFile.type)) {
              return true;
            }

            return Upload.LIST_IGNORE;
          }}
        >
          <Spacer direction="vertical" size={32}>
            <StyledIcon name="upload" />

            <Text darkPink>Drag and drop a file here or click to upload a file</Text>
          </Spacer>
        </StyledDragger>
        {formik.touched.file && formik.errors.file ? (
          <CardInputError>{formik.errors.file}</CardInputError>
        ) : null}

        <Row>
          <StyledCol span={12} padding="1rem">
            <Flex justifyContent="flex-end">
              <ButtonAux pinkBrdrBtn onClick={() => setVisible(false)}>
                <Text darkPink>Cancel</Text>
              </ButtonAux>
            </Flex>
          </StyledCol>
          <StyledCol span={12} padding="1rem">
            <ButtonAux
              pinkBtn
              type="submit"
              form="update-name"
            >
              <Text white>Save</Text>
            </ButtonAux>
          </StyledCol>
        </Row>
      </form>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateProfileData: (data) => dispatch(ProfileActions.updateProfileDataRequest(data)),
});

export default connect(null, mapDispatchToProps)(ChangeNameModal);
