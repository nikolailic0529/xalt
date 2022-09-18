import React, { useEffect } from 'react';
import Spacer from 'components/shared/Spacer';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import { useFormik } from 'formik';
import PaymentForm from 'containers/roles/coach/Onboarding/step10/components/form';
import { connect } from 'react-redux';
import CountriesActions from 'lib/redux/reducers/countries';
import ProfileActions from 'lib/redux/reducers/profile';
import ButtonAux from 'components/shared/ButtonAux';
import { useHistory } from 'react-router';
import { Block } from './styles';

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

  return errors;
};

const EditAccount = ({ getCountries, createBankAccount, countries, info }) => {
  useEffect(getCountries, []);

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      country: info.country,
      account_number: info.account_number,
      account_holder_name: info.account_holder_name,
      routing_number: info.routing_number,
      institution_number: info.institution_number,
    },
    validate,
    onSubmit: (values) => {
      if (Object.keys(values).length) {
        createBankAccount(values);
      }
    },
  });

  return (
    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          Payment Information
        </Text>
        <form
          id="edit-account"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <PaymentForm formik={formik} countries={countries} />

          <Flex justifyContent="flex-end">
            <Spacer direction="horizontal" size={24}>
              <ButtonAux pinkBrdrBtn onClick={() => history.push('/account')}>
                <Text darkPink uppercase>
                  cancel
                </Text>
              </ButtonAux>

              <ButtonAux pinkBtn type="submit" form="edit-account">
                <Text white uppercase>
                  save
                </Text>
              </ButtonAux>
            </Spacer>
          </Flex>
        </form>
      </Spacer>
    </Block>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
  info: state.profile.stripe?.external_account || {},
});

const mapDisptchToProps = (dispatch) => ({
  dispatch,
  getCountries: () => dispatch(CountriesActions.getCountriesRequest()),
  createBankAccount: (data) => dispatch(ProfileActions.createBankAccountRequest(data)),
});

export default connect(mapStateToProps, mapDisptchToProps)(EditAccount);
