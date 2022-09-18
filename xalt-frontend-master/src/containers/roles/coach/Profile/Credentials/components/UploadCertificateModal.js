import React, { useEffect, useState } from 'react';
import {
  Modal, Row, message, Upload,
} from 'antd';
import {
  Formik, Form, useFormik,
} from 'formik';
import * as Yup from 'yup';
import ButtonAux from 'components/shared/ButtonAux';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import { Input } from 'components/shared/Form';
import { connect } from 'react-redux';
import DocumentsActions from 'lib/redux/reducers/documents';
import { StyledCol, StyledIcon } from 'containers/roles/coach/Profile/styles';
import { StyledDragger } from 'containers/roles/coach/Exercises/styles';
import { CardInputError } from 'components/shared/Checkout';

const schema = Yup.object().shape({
  name: Yup.string().required('Please, enter name!'),
  file: Yup.mixed().required('Please, upload file!'),
});

const UploadCertificateModal = ({
  addDocument, updateDocument, profile, certificate, onClose,
}) => {
  const [file, setFile] = useState();
  const [visible, setVisible] = useState(true);

  const formik = useFormik({
    initialValues: { name: certificate?.name, file: null },
    validationSchema: schema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('coach_profile_id', profile.coach_profile.id);
      formData.append('file', file);

      if (certificate) {
        updateDocument({ id: certificate.id, data: formData });
      } else {
        addDocument(formData);
      }
      setVisible(false);
      formik.resetForm();
    },
  });

  return (
    <Modal
      centered
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      destroyOnClose
      afterClose={onClose}
    >
      <form
        id="add-certificate"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Spacer direction="vertical" size={36} fullWidth>
          <div>
            <Input
              id="name"
              name="name"
              placeholder="Certificate name"
              theme="classic-pink"
              value={certificate?.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <CardInputError>{formik.errors.name}</CardInputError>
            ) : null}
          </div>

          <div>
            <StyledDragger
              id="file"
              name="file"
              maxCount={1}
              onChange={({ fileList }) => {
                setFile(fileList[0].originFileObj);
                formik.setFieldValue('file', fileList[0].originFileObj);
              }}
              beforeUpload={(uploadingFile) => {
                const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];

                if (!allowedTypes.includes(uploadingFile.type)) {
                  message.error('Only .JPEG, .PNG and .PDf formats allowed');
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
          </div>
        </Spacer>

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
              form="add-certificate"
            >
              <Text white>Save</Text>
            </ButtonAux>
          </StyledCol>
        </Row>
      </form>
    </Modal>
  );
};

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addDocument: (data) => dispatch(DocumentsActions.addDocumentRequest(data)),
  updateDocument: (data) => dispatch(DocumentsActions.updateDocumentRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadCertificateModal);
