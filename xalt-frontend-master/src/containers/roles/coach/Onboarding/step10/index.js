import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import AuthActions from 'lib/redux/reducers/auth';
import profileTypes from 'lib/redux/types/profile';
import countriesTypes from 'lib/redux/types/countries';
import Container from 'components/shared/Container';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  LoginWrapper,
  LoginFormWrapper,
  OnboardingStep,
  OnboardingProgress,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
  OnboardingPrevBtn,
  OnboardingNextBtn,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import PaymentForm from './components/form';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const { CREATE_BANK_ACCOUNT_ON_ONBOARDING_REQUEST } = profileTypes;
const { GET_COUNTRIES_REQUEST } = countriesTypes;

const validate = (values) => {
  const errors = {};

  if (!values.country) {
    errors.country = 'Required';
  }

  if (!values.account_holder_name) {
    errors.account_holder_name = 'Required';
  }

  if (!values.routing_number) {
    errors.routing_number = 'Required';
  }

  if (!values.account_number) {
    errors.account_number = 'Required';
  }

  if (!values.institution_number) {
    errors.institution_number = 'Required';
  }

  return errors;
};

const OnboardingStep10 = (props) => {
  const { finishOnboardingRequest, onboardingProfile, role } = props;

  const { countries, bankAccountId } = useSelector((state) => ({
    countries: state.countries.countries,
    bankAccountId: state.profile.stripe?.stripe_bank_account_id,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_COUNTRIES_REQUEST });
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (bankAccountId) {
      finishOnboardingRequest(onboardingProfile, role);
    }
  }, [bankAccountId]);

  const formik = useFormik({
    initialValues: {
      country: 'CA',
      account_holder_name: null,
      routing_number: null,
      account_number: null,
      institution_number: null,
    },
    validate,
    onSubmit: (values) => {
      dispatch({ type: CREATE_BANK_ACCOUNT_ON_ONBOARDING_REQUEST, values });
    },
  });
  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 10 of 10</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="100">
            100%
          </OnboardingProgress>
          <LoginWrapper>
            <Container min centered mt="56px">
              <Heading center>Account information</Heading>
              <LoginFormWrapper>
                <form
                  id="createBankAccount"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <PaymentForm formik={formik} countries={countries} />
                </form>
              </LoginFormWrapper>
            </Container>
          </LoginWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/coach-onboarding-9">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <div>
              <OnboardingNextBtn type="submit" form="createBankAccount" pinkBtn width="100px">
                Finish
              </OnboardingNextBtn>
            </div>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  finishOnboardingRequest: (onboardingProfile, role) =>
    dispatch(AuthActions.finishOnboardingRequest(onboardingProfile, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep10);
