import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { message, Upload } from 'antd';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import { CardInputError } from 'components/shared/Checkout';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingStep,
  OnboardingStepWrapper,
  OnboardingProgress,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
  OnboardingPrevBtn,
  OnboardingNextBtn,
} from 'components/shared/Onboarding';
import DocumentsActions from 'lib/redux/reducers/documents';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spacer from 'components/shared/Spacer';
import { Input } from 'components/shared/Form';
import { StyledDragger } from 'containers/roles/coach/Exercises/styles';
import { StyledIcon } from 'containers/roles/coach/Profile/styles';
import Text from 'components/shared/Text';

import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const schema = Yup.object().shape({
  name: Yup.string().required('Please, enter name!'),
  file: Yup.mixed().required('Please, upload file of training cerification!'),
  identityFile: Yup.mixed().required('Please, upload photo of identification!'),
  insuranceFile: Yup.mixed().required('Please, upload proof of insurance!'),
});

const OnboardingStep9 = ({ addDocument, profile }) => {
  const history = useHistory();
  const [file, setFile] = useState();
  const [identityFile, setIdentityFile] = useState();
  const [insuranceFile, setInsuranceFile] = useState();

  const formik = useFormik({
    initialValues: { name: '', file: null, identityFile: null, insuranceFile: null },
    validationSchema: schema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('coach_profile_id', profile.coach_profile.id);
      formData.append('file', file);
      addDocument(formData);

      const identityFormData = new FormData();
      identityFormData.append('name', 'identity');
      identityFormData.append('coach_profile_id', profile.coach_profile.id);
      identityFormData.append('file', identityFile);
      addDocument(identityFormData);

      const insuranceFormData = new FormData();
      insuranceFormData.append('name', 'insurance');
      insuranceFormData.append('coach_profile_id', profile.coach_profile.id);
      insuranceFormData.append('file', insuranceFile);
      addDocument(insuranceFormData);

      history.push('/coach-onboarding-10');
    },
  });

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <form
          id="add-certificate"
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <OnboardingHeader>
            <XaltLogoLink />
            <OnboardingStep>Step 9 of 10</OnboardingStep>
            <LogoutDropdown />
          </OnboardingHeader>
          <OnboardingMain>
            <OnboardingProgress max="100" value="90">
              90%
            </OnboardingProgress>
            <OnboardingStepWrapper>
              <Container min centered mt="40px" mb="40px">
                <Heading center>Making sure its you!</Heading>
                <Paragraph maxWidth="580px" big center>
                  Please upload a valid please of ID, proof of insurance, and any relevant training
                  certificates/qualifications.
                </Paragraph>
                <Spacer direction="vertical" size={36} fullWidth>
                  <div style={{ marginTop: 30 }}>
                    <div style={{ textAlign: 'left', marginBottom: 10 }}>
                      <Text bold>Photo Identification</Text>
                    </div>
                    <StyledDragger
                      id="identityFile"
                      name="identityFile"
                      maxCount={1}
                      onChange={({ fileList }) => {
                        setIdentityFile(fileList[0].originFileObj);
                        formik.setFieldValue('identityFile', fileList[0].originFileObj);
                      }}
                      beforeUpload={(uploadingFile) => {
                        const allowedTypes = ['image/jpg', 'image/jpeg', 'application/pdf'];

                        if (!allowedTypes.includes(uploadingFile.type)) {
                          message.error('Only .JPEG and .PDf formats allowed');
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
                    {formik.touched.identityFile && formik.errors.identityFile ? (
                      <CardInputError>{formik.errors.identityFile}</CardInputError>
                    ) : null}
                  </div>

                  <div style={{ marginTop: 30 }}>
                    <div style={{ textAlign: 'left', marginBottom: 10 }}>
                      <Text bold>Proof of Insurance</Text>
                    </div>
                    <StyledDragger
                      id="insuranceFile"
                      name="insuranceFile"
                      maxCount={1}
                      onChange={({ fileList }) => {
                        setInsuranceFile(fileList[0].originFileObj);
                        formik.setFieldValue('insuranceFile', fileList[0].originFileObj);
                      }}
                      beforeUpload={(uploadingFile) => {
                        const allowedTypes = ['image/jpg', 'image/jpeg', 'application/pdf'];

                        if (!allowedTypes.includes(uploadingFile.type)) {
                          message.error('Only .JPEG and .PDf formats allowed');
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
                    {formik.touched.insuranceFile && formik.errors.insuranceFile ? (
                      <CardInputError>{formik.errors.insuranceFile}</CardInputError>
                    ) : null}
                  </div>

                  <div style={{ marginTop: 30 }}>
                    <div style={{ textAlign: 'left', marginBottom: 10 }}>
                      <Text>
                        <Text bold>Training Certificate/Qualification</Text>
                        <Text> (upload the most recent, you can add more on your profile)</Text>
                      </Text>
                    </div>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Name of certificate/qualification"
                      theme="classic-pink"
                      value=""
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
                        const allowedTypes = ['image/jpg', 'image/jpeg', 'application/pdf'];

                        if (!allowedTypes.includes(uploadingFile.type)) {
                          message.error('Only .JPEG and .PDf formats allowed');
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
              </Container>
            </OnboardingStepWrapper>
          </OnboardingMain>
          <OnboadringActionsContainer>
            <OnboadringActionsWrapper justifyContent="space-between">
              <Link to="/coach-onboarding-8">
                <OnboardingPrevBtn pinkBrdrBtn width="132px">
                  Previous
                </OnboardingPrevBtn>
              </Link>
              <div>
                <OnboardingNextBtn pinkBtn type="submit" form="add-certificate" width="100px">
                  Next
                </OnboardingNextBtn>
                <Link to="/coach-onboarding-10" style={{ marginLeft: 15 }}>
                  <OnboardingPrevBtn pinkBrdrBtn width="100px">
                    Skip
                  </OnboardingPrevBtn>
                </Link>
              </div>
            </OnboadringActionsWrapper>
          </OnboadringActionsContainer>
        </form>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addDocument: (data) => dispatch(DocumentsActions.addDocumentRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep9);
