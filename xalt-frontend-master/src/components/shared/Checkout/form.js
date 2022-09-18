import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import valid from 'card-validator';

import Heading from 'components/shared/Heading';
import ButtonAux from 'components/shared/ButtonAux';
import { LoginFormItem } from 'components/shared/Onboarding';
import {
  CheckoutFormCol,
  CheckoutFormRow,
  CheckoutFormWrapper,
  CardInput,
  CardInputError,
} from 'components/shared/Checkout';
import { formatExpirationDate } from 'components/shared/CreditCard/utils';

const CheckoutForm = (props) => {
  const {
    checkoutRequest,
    path,
    buttonText,
    buttonWidth,
    margin,
    alignItems,
    additionalButtonText,
    handleAdditionalBtnClick,
  } = props;

  const history = useHistory();

  const initialValues = {
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCVC: '',
    coupon: '',
  };

  const validationSchema = yup.object().shape({
    cardNumber: yup
      .string()
      .test('test-number', 'Credit Card number is invalid', (value) => valid.number(value).isValid)
      .required(),
    cardHolder: yup.string().label('Name on card').required(),
    cardExpiry: yup
      .string()
      .test('test-credit-card-expiration-date', 'Invalid Expiration Date', (expirationDate) => {
        if (!expirationDate) {
          return false;
        }

        const today = new Date();
        const monthToday = today.getMonth() + 1;
        const yearToday = today.getFullYear().toString().substr(-2);

        const [expMonth, expYear] = expirationDate.split('/');

        if (Number(expYear) < Number(yearToday)) {
          return false;
        } else if (Number(expMonth) < monthToday && Number(expYear) <= Number(yearToday)) {
          return false;
        }

        return true;
      })
      .test('test-credit-card-expiration-date', 'Invalid Expiration Month', (expirationDate) => {
        if (!expirationDate) {
          return false;
        }

        const [expMonth] = expirationDate.split('/');

        if (Number(expMonth) > 12) {
          return false;
        }

        return true;
      }),
    cardCVC: yup.string().label('CVC').min(3).max(4).required(),
  });

  return (
    <CheckoutFormWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikBag) => {
          const splitExpireDate = values.cardExpiry.split('/');
          const expireMonth = splitExpireDate[0];
          const expireYear = '20' + splitExpireDate[1];
          const cardData = {
            number: values.cardNumber,
            exp_month: expireMonth,
            exp_year: expireYear,
            cvc: values.cardCVC,
          };

          checkoutRequest(cardData, values.coupon);
          formikBag.resetForm();
          history.push(path);
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form>
            <CheckoutFormRow>
              <CheckoutFormCol fullWidth>
                <Heading left fieldTitle m={0}>
                  Name on Card
                </Heading>
                <CardInput
                  type="text"
                  placeholder="Name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardHolder}
                  name="cardHolder"
                />
                {props.errors.cardHolder && props.touched.cardHolder ? (
                  <CardInputError>{props.errors.cardHolder}</CardInputError>
                ) : null}
              </CheckoutFormCol>
            </CheckoutFormRow>
            <CheckoutFormRow>
              <CheckoutFormCol fullWidth>
                <Heading left fieldTitle m={0}>
                  Card Information
                </Heading>
                <CardInput
                  fontWide
                  type="tel"
                  pattern="[\d| ]{16,22}"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardNumber
                    .replace(/\s/g, '')
                    .replace(/(\d{4})/g, '$1 ')
                    .trim()}
                  name="cardNumber"
                  maxLength="19"
                  placeholder="0000 0000 0000 0000"
                />
                {props.errors.cardNumber && props.touched.cardNumber ? (
                  <CardInputError>{props.errors.cardNumber}</CardInputError>
                ) : null}
              </CheckoutFormCol>
            </CheckoutFormRow>
            <CheckoutFormRow twoTwo>
              <CheckoutFormCol oneTwo>
                <CardInput
                  type="text"
                  name="cardExpiry"
                  placeholder="10/24"
                  pattern="\d\d/\d\d"
                  maxLength="5"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={formatExpirationDate(props.values.cardExpiry)}
                />
                {props.errors.cardExpiry && props.touched.cardExpiry ? (
                  <CardInputError>{props.errors.cardExpiry}</CardInputError>
                ) : null}
              </CheckoutFormCol>
              <CheckoutFormCol oneTwo>
                <CardInput
                  type="text"
                  name="cardCVC"
                  placeholder="CVV"
                  pattern="\d{3,4}"
                  maxLength="4"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardCVC}
                />
                {props.errors.cardCVC && props.touched.cardCVC ? (
                  <CardInputError>{props.errors.cardCVC}</CardInputError>
                ) : null}
              </CheckoutFormCol>
            </CheckoutFormRow>
            <CheckoutFormRow>
              <CheckoutFormCol fullWidth>
                <Heading left fieldTitle m={0}>
                  Coupon Code (Optional)
                </Heading>
                <CardInput
                  type="text"
                  placeholder="Coupon Code"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.coupon}
                  name="coupon"
                />
              </CheckoutFormCol>
            </CheckoutFormRow>
            <LoginFormItem
              m={margin}
              alignItems={alignItems}
              flexDirection={additionalButtonText ? 'row' : 'column'}
              justifyContent={alignItems}
            >
              <ButtonAux
                pinkBtn
                width={buttonWidth}
                maxWidth={buttonWidth}
                type="submit"
                disabled={!props.isValid}
              >
                {buttonText}
              </ButtonAux>
              {additionalButtonText && (
                <ButtonAux
                  width={buttonWidth}
                  maxWidth={buttonWidth}
                  onClick={handleAdditionalBtnClick}
                  m="0 0 0 20px"
                  greyBtn
                >
                  {additionalButtonText}
                </ButtonAux>
              )}
            </LoginFormItem>
          </Form>
        )}
      </Formik>
    </CheckoutFormWrapper>
  );
};

export default CheckoutForm;
