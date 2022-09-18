import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Spin } from 'antd';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import ButtonAux from 'components/shared/ButtonAux';
import { theme } from 'components';
import { BaseTitle, BaseText } from 'components/shared/General';
import { CardInputError } from 'components/shared/Checkout';
import { LoginFormWrapper, LoginFormItem } from 'components/shared/Onboarding';
import { Input, TextArea } from 'components/shared/Form';

import contactUsTypes from 'lib/redux/types/contact_us';

const { CONTACT_US_REQUEST } = contactUsTypes;

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.full_name) {
    errors.full_name = 'Required';
  }

  if (!values.message) {
    errors.message = 'Required';
  }

  return errors;
};

const ContactUsBlock = () => {
  const { fetching } = useSelector((state) => ({
    fetching: state.contactUs.fetching,
  }));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      message: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch({ type: CONTACT_US_REQUEST, values });
      resetForm();
    },
  });

  return (
    <Flex
      bg={theme.colors.white}
      pt={[6, null, 13, null, null]}
      pb={[4, null, 8, null, null]}
    >
      <Container medium>
        <BaseTitle fontWeight="500" m="0 0 8px">
          Contact Us
        </BaseTitle>
        <BaseText fontSize="24px" lineHeight="24px" textAlign="center" mb={8}>
          How can we help?
        </BaseText>
        <LoginFormWrapper>
          {fetching ? (
            <LoginFormItem alignItems="center" width="100%">
              <Spin size="large" />
            </LoginFormItem>
          ) : (
            <form
              id="contactUs"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <LoginFormItem>
                <Input
                  id="full_name"
                  name="full_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Full Name..."
                  value={formik.values.full_name}
                  theme="bordered"
                />
                {formik.touched.full_name && formik.errors.full_name ? (
                  <CardInputError>{formik.errors.full_name}</CardInputError>
                ) : null}
              </LoginFormItem>
              <LoginFormItem>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Email..."
                  value={formik.values.email}
                  theme="bordered"
                />
                {formik.touched.email && formik.errors.email ? (
                  <CardInputError>{formik.errors.email}</CardInputError>
                ) : null}
              </LoginFormItem>
              <TextArea
                id="message"
                name="message"
                placeholder="Your message..."
                theme="bordered"
                rows={10}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message ? (
                <CardInputError>{formik.errors.message}</CardInputError>
              ) : null}
              <LoginFormItem m="24px 0" alignItems="flex-end">
                <ButtonAux
                  pinkBtn
                  width="116px"
                  maxWidth="116px"
                  type="submit"
                  form="contactUs"
                >
                  Send
                </ButtonAux>
              </LoginFormItem>
            </form>
          )}
        </LoginFormWrapper>
      </Container>
    </Flex>
  );
};

export default ContactUsBlock;
