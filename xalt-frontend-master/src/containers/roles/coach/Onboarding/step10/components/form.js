import React from 'react';
import { CardInputError } from 'components/shared/Checkout';
import { LoginFormItem } from 'components/shared/Onboarding';
import { Input, Select } from 'components/shared/Form';

export default ({ formik, countries }) => (
  <>
    <LoginFormItem>
      <Select
        id="country"
        type="select"
        name="country"
        placeholder="Country"
        theme="bordered"
        options={countries}
        value={formik.values.country}
        onChange={(value) => formik.setFieldValue('country', value)}
        onBlur={formik.handleBlur}
        width="100%"
      />
      {formik.touched.country && formik.errors.country ? (
        <CardInputError>{formik.errors.country}</CardInputError>
      ) : null}
    </LoginFormItem>
    <LoginFormItem>
      <Input
        id="account_holder_name"
        name="account_holder_name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Account Holder Name"
        value={formik.values.account_holder_name}
        theme="bordered"
      />
      {formik.touched.account_holder_name && formik.errors.account_holder_name ? (
        <CardInputError>{formik.errors.account_holder_name}</CardInputError>
      ) : null}
    </LoginFormItem>
    <LoginFormItem>
      <Input
        id="routing_number"
        name="routing_number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Routing Number"
        value={formik.values.routing_number}
        theme="bordered"
      />
      {formik.touched.routing_number && formik.errors.routing_number ? (
        <CardInputError>{formik.errors.routing_number}</CardInputError>
      ) : null}
    </LoginFormItem>
    <LoginFormItem>
      <Input
        id="account_number"
        name="account_number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Account Number"
        value={formik.values.account_number}
        theme="bordered"
      />
      {formik.touched.account_number && formik.errors.account_number ? (
        <CardInputError>{formik.errors.account_number}</CardInputError>
      ) : null}
    </LoginFormItem>
    <LoginFormItem>
      <Input
        id="institution_number"
        name="institution_number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Institution Number"
        value={formik.values.institution_number}
        theme="bordered"
      />
      {formik.touched.institution_number && formik.errors.institution_number ? (
        <CardInputError>{formik.errors.institution_number}</CardInputError>
      ) : null}
    </LoginFormItem>
  </>
);
