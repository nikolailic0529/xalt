/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { CardInputError } from 'components/shared/Checkout';
import AuthActions from 'lib/redux/reducers/auth';
import InnerLink from 'components/shared/InnerLink';
import ButtonAux from 'components/shared/ButtonAux';
import Container from 'components/shared/Container';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  LoginWrapper,
  LoginFormWrapper,
  LoginFormItem,
  LoginFormFooter,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import OuterLinkPink from 'components/shared/OuterLinkPink';
import { Input, Checkbox } from 'components/shared/Form';

const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'Please, enter your name!';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/i.test(values.password)
  ) {
    errors.password = 'Minimum eight characters, at least one letter and one number';
  }

  if (values.readAll === false) {
    errors.readAll = 'Please, accept Terms and Conditions and Privacy statement';
  }

  return errors;
};

const Registration = (props) => {
  const { signupRequest, setIsSignupSucceeded, isSignupSucceeded } = props;

  function getUrlParameter(parameterName) {
    const query = new URLSearchParams(document.location.search);
    return !query.get(parameterName) ? null : query.get(parameterName);
  }

  const [redirect, setRedirect] = useState(false);
  const [isConditioning, setIsConditioning] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setIsSignupSucceeded(false);
    setRedirect(false);
  }, []);

  useEffect(() => {
    if (isSignupSucceeded && redirect) {
      history.push('/email-verification-sent');
    }
  }, [isSignupSucceeded]);

  const role = getUrlParameter('role');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      readAll: false,
    },
    validate,
    onSubmit: (values) => {
      setRedirect(true);
      signupRequest(values, role);
    },
  });

  useEffect(() => {
    const rehabilitationStr = localStorage.getItem('rehabilitation');
    if (rehabilitationStr) {
      const rehabilitation = JSON.parse(rehabilitationStr);
      const now = Math.floor(Date.now() / 1000);

      // if measure assessment is selected
      if (rehabilitation.value && rehabilitation.expiry && now - rehabilitation.expiry <= 300) {
        setIsConditioning(true);
      }
    }
  }, {});

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
        </OnboardingHeader>
        <OnboardingMain>
          <LoginWrapper>
            <Container min centered mt="56px">
              <Heading center>
                {role === 'member'
                  ? 'Make the most of your health'
                  : 'Make the most of your professional life'}
              </Heading>
              <Heading center normal>
                {isConditioning
                  ? 'for conditioning'
                  : role === 'member'
                  ? 'as a member'
                  : 'as a coach'}
              </Heading>
              <LoginFormWrapper>
                <form
                  id="onboarding"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <LoginFormItem>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Full Name"
                      value={formik.values.fullName}
                      theme="bordered"
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                      <CardInputError>{formik.errors.fullName}</CardInputError>
                    ) : null}
                  </LoginFormItem>
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
                  <LoginFormItem>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Password"
                      value={formik.values.password}
                      theme="bordered"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <CardInputError>{formik.errors.password}</CardInputError>
                    ) : null}
                  </LoginFormItem>
                  <LoginFormItem>
                    <Checkbox
                      id="signupPPandTU"
                      name="readAll"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.readAll}
                      onPress={() => setFieldValue('readAll', !formik.values.readAll)}
                    >
                      I confirm that I have read and agree to the&nbsp;
                      <Link to="/terms-and-conditions">
                        <OuterLinkPink
                          href="https://prod-xalt-uploads.s3.us-east-2.amazonaws.com/public_folder/xAlt+Terms+and+Conditions.pdf"
                          pinkLink
                          fontWeight="400"
                        >
                          Terms and Conditions
                        </OuterLinkPink>
                      </Link>
                      &nbsp;and&nbsp;
                      <Link to="/privacy-policy">
                        <OuterLinkPink
                          href="https://prod-xalt-uploads.s3.us-east-2.amazonaws.com/public_folder/xAlt+Privacy+Policy.pdf"
                          pinkLink
                          fontWeight="400"
                          target="_blank"
                        >
                          Privacy Statement
                        </OuterLinkPink>
                      </Link>
                      .
                    </Checkbox>
                    {formik.touched.readAll && formik.errors.readAll ? (
                      <CardInputError>{formik.errors.readAll}</CardInputError>
                    ) : null}
                  </LoginFormItem>
                  <LoginFormItem m="24px 0">
                    <ButtonAux
                      pinkBtn
                      width="116px"
                      maxWidth="116px"
                      type="submit"
                      form="onboarding"
                    >
                      Sign Up
                    </ButtonAux>
                  </LoginFormItem>
                  <LoginFormFooter>
                    If you have an account,&nbsp;
                    <InnerLink to="/" pinkLink>
                      Sign In
                    </InnerLink>
                  </LoginFormFooter>
                </form>
              </LoginFormWrapper>
            </Container>
          </LoginWrapper>
        </OnboardingMain>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  isSignupSucceeded: state.auth.isSignupSucceeded,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  signupRequest: (values, role) => dispatch(AuthActions.signupRequest(values, role)),
  setIsSignupSucceeded: (status) => dispatch(AuthActions.setIsSignupSucceeded(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
