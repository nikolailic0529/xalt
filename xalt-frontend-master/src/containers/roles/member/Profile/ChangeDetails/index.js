import React from 'react';
import { useDispatch } from 'react-redux';
import CheckoutForm from 'components/shared/Checkout/form';
import Heading from 'components/shared/Heading';
import ProfileTypes from 'lib/redux/types/profile';
import { CheckoutWrapper } from 'components/shared/Checkout';

const { CHECKOUT_REQUEST } = ProfileTypes;

const ChangeDetails = () => {
  const dispatch = useDispatch();

  const changeDetails = (values, coupon) => {
    dispatch({ type: CHECKOUT_REQUEST, cardData: values, coupon, url: 'change_card' });
  };

  return (
    <CheckoutWrapper alignItems="flex-start" m="unset">
      <Heading>Change payment details</Heading>
      <CheckoutForm
        checkoutRequest={changeDetails}
        path="/account"
        buttonText="Change payment details"
        buttonWidth="250px"
        margin="24px 12px"
        alignItems="flex-end"
      />
    </CheckoutWrapper>
  );
};

export default ChangeDetails;
