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

  if (!values.password) {
    errors.password = 'Required';
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/i.test(
      values.password,
    )
  ) {
    errors.password =
      'Minimum eight characters, at least one letter and one number';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Required';
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/i.test(
      values.passwordConfirmation,
    )
  ) {
    errors.passwordConfirmation =
      'Minimum eight characters, at least one letter and one number';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Password should be same with Submit New Password field';
  }

  if (values.passwordConfirmation !== values.password) {
    errors.password = 'Submit New Password should be same with Password field';
  }

  return errors;
};

const RestorePasswordStep2 = (props) => {
  const { resetPassword } = props;
  const url = new URLSearchParams(window.location.search);
  const token = url.get('token') || null;

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validate,
    onSubmit: (values) => {
      resetPassword(values, token);
      history.push('/restore-password/restore-password-success');
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
                  id="restorePassword"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <LoginFormItem>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="New Password"
                      value={formik.values.password}
                      theme="bordered"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <CardInputError>{formik.errors.password}</CardInputError>
                    ) : null}
                  </LoginFormItem>
                  <LoginFormItem>
                    <Input
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Submit New Password"
                      value={formik.values.password}
                      theme="bordered"
                    />
                    {formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation ? (
                      <CardInputError>
                        {formik.errors.passwordConfirmation}
                      </CardInputError>
                    ) : null}
                  </LoginFormItem>
                  <LoginFormItem m="24px 0">
                    <ButtonAux
                      pinkBtn
                      width="116px"
                      maxWidth="116px"
                      type="submit"
                      form="restorePassword"
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
  resetPassword: (values, token) =>
    dispatch(AuthActions.confirmResetPasswordRequest(values, token)),
});

export default connect(null, mapDispatchToProps)(RestorePasswordStep2);
