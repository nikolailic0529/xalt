import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';

import InnerLink from 'components/shared/InnerLink';
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
  LoginFormFooter,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import { Input } from 'components/shared/Form';
import AuthActions from 'lib/redux/reducers/auth';

const Login = (props) => {
  const { loginRequest, error } = props;

  const onSubmit = (data) => loginRequest(data.email, data.password);

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
        </OnboardingHeader>
        <OnboardingMain>
          <LoginWrapper>
            <Container min centered mt="40px">
              <Heading center>Login</Heading>
              <Paragraph maxWidth="580px" big center>
                Stay updated on your health and fitness.
              </Paragraph>
              <LoginFormWrapper>
                <Form name="login" onFinish={onSubmit} initialValues={{}}>
                  <LoginFormItem>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Login"
                      theme="bordered"
                      mb="24px"
                    />
                  </LoginFormItem>
                  <LoginFormItem alignItems="flex-end">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      theme="bordered"
                    />
                    <InnerLink
                      to="/restore-password/step-1"
                      pinkLink
                      m="8px 0 0"
                    >
                      Forgot password?
                    </InnerLink>
                  </LoginFormItem>
                  <LoginFormItem m="24px 0">
                    <ButtonAux pinkBtn width="116px" maxWidth="116px">
                      Sign In
                    </ButtonAux>
                  </LoginFormItem>
                  <LoginFormFooter>
                    If you don't have an account,&nbsp;
                    <InnerLink to="/registration?role=member" pinkLink>
                      Sign Up as Member
                    </InnerLink>
                    &nbsp;or&nbsp;
                    <InnerLink to="/registration?role=coach" pinkLink>
                      Sign Up as Coach
                    </InnerLink>
                  </LoginFormFooter>
                </Form>
              </LoginFormWrapper>
            </Container>
          </LoginWrapper>
        </OnboardingMain>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loginRequest: (email, password) =>
    dispatch(AuthActions.loginRequest(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
