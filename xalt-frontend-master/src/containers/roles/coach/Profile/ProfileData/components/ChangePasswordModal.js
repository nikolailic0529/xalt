import React, { useEffect } from 'react';
import {
  Modal, Row, Form as AntForm,
} from 'antd';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ButtonAux from 'components/shared/ButtonAux';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import { Input } from 'components/shared/Form';
import { connect, useDispatch } from 'react-redux';
import ProfileActions from 'lib/redux/reducers/profile';
import { StyledCol } from 'containers/roles/coach/Profile/styles';
import { CardInputError } from 'components/shared/Checkout';
import modalsTypes from 'lib/redux/types/modals';

const { useForm } = AntForm;

const {
  TOGGLE_CHANGE_PASSWORD_MODAL,
} = modalsTypes;

const schema = Yup.object().shape({
  old_password: Yup.string().required('Please, enter password!'),
  new_password: Yup.string().required('Please, enter password!'),
  new_password_confirmation: Yup.string().required('Please, enter password!'),
});

const ChangeNameModal = ({
  updateProfilePassword, visible,
}) => {
  const dispatch = useDispatch();

  const [form] = useForm();

  const onClose = () => {
    dispatch({ type: TOGGLE_CHANGE_PASSWORD_MODAL });
    form.resetFields();
  };

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  });

  return (
    <Modal
      centered
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <Spacer direction="vertical" size={36} fullWidth>
        <Flex justifyContent="center">
          <Text black>Change password</Text>
        </Flex>

        <Formik
          enableReinitialize
          initialValues={{ old_password: '', new_password: '', new_password_confirmation: '' }}
          validationSchema={schema}
          onSubmit={(values) => {
            updateProfilePassword(values);
          }}
        >
          {({
            touched, errors, handleSubmit, handleChange, handleBlur,
          }) => (
            <Form
              id="update-password"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <AntForm form={form}>
                <Spacer direction="vertical" fullWidth>
                  <div>
                    <Input
                      id="old_assword"
                      name="old_password"
                      placeholder="Old password"
                      type="password"
                      theme="classic-pink"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.old_password && errors.old_password ? (
                      <CardInputError>{errors.old_password}</CardInputError>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      id="new_password"
                      name="new_password"
                      placeholder="New password"
                      type="password"
                      theme="classic-pink"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.new_password && errors.new_password ? (
                      <CardInputError>{errors.new_password}</CardInputError>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      id="new_password_confirmation"
                      name="new_password_confirmation"
                      placeholder="Confirm new password"
                      type="password"
                      theme="classic-pink"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.new_password_confirmation && errors.new_password_confirmation ? (
                      <CardInputError>{errors.new_password_confirmation}</CardInputError>
                    ) : null}
                  </div>
                </Spacer>

                <Row>
                  <StyledCol span={12} padding="1rem">
                    <Flex justifyContent="flex-end">
                      <ButtonAux pinkBrdrBtn onClick={onClose}>
                        <Text darkPink>Cancel</Text>
                      </ButtonAux>
                    </Flex>
                  </StyledCol>
                  <StyledCol span={12} padding="1rem">
                    <ButtonAux
                      pinkBtn
                      type="submit"
                      form="update-password"
                    >
                      <Text white>Save</Text>
                    </ButtonAux>
                  </StyledCol>
                </Row>
              </AntForm>
            </Form>
          )}
        </Formik>
      </Spacer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  visible: state.modals.changePasswordVisible,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateProfilePassword: (data) => dispatch(ProfileActions.updateProfilePasswordRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNameModal);
