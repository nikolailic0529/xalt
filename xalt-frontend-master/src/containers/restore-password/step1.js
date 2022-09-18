import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthActions from 'lib/redux/reducers/auth';
import { CardInputError } from 'components/shared/Checkout';
import ButtonAux from 'components/shared/ButtonAux';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  LoginWrapper,
  LoginFormWrapper,
  LoginFormItem,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import { Input } from 'components/shared/Form';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const RestorePasswordStep1 = (props) => {
  const { resetPassword } = props;

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (email) => {
      resetPassword(email);
      history.push('/restore-password/reset-password-success');
    },
  });
  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
        </OnboardingHeader>
        <OnboardingMain>
          <LoginWrapper>
            <Container min centered mt="56px">
              <Heading center>Restore your password</Heading>
              <Paragraph maxWidth="580px" big center>
                Enter your email to get started
              </Paragraph>
              <LoginFormWrapper>
                <form
                  id="resetPassword"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <LoginFormItem>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Email"
                      value={formik.values.email}
                      theme="bordered"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <CardInputError>{formik.errors.email}</CardInputError>
                    ) : null}
                  </LoginFormItem>
                  <LoginFormItem m="24px 0">
                    <ButtonAux
                      pinkBtn
                      width="116px"
                      maxWidth="116px"
                      type="submit"
                      form="resetPassword"
                    >
                      Restore
                    </ButtonAux>
                  </LoginFormItem>
                </form>
              </LoginFormWrapper>
            </Container>
          </LoginWrapper>
        </OnboardingMain>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  resetPassword: (email) => dispatch(AuthActions.resetPasswordRequest(email)),
});

export default connect(null, mapDispatchToProps)(RestorePasswordStep1);
