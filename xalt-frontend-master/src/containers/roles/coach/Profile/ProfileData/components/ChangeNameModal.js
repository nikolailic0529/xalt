import React from 'react';
import { Modal, Row } from 'antd';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ButtonAux from 'components/shared/ButtonAux';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import { Input } from 'components/shared/Form';
import { connect } from 'react-redux';
import ProfileActions from 'lib/redux/reducers/profile';
import { StyledCol } from 'containers/roles/coach/Profile/styles';
import { CardInputError } from 'components/shared/Checkout';

const schema = Yup.object().shape({
  name: Yup.string().required('Please, enter name!'),
});

const ChangeNameModal = ({
  updateProfileData, visible, setVisible,
}) => (
  <Modal
    centered
    visible={visible}
    footer={null}
    onCancel={() => setVisible(false)}
  >
    <Spacer direction="vertical" size={36} fullWidth>
      <Flex justifyContent="center">
        <Text black>Change name</Text>
      </Flex>

      <Formik
        enableReinitialize
        initialValues={{ name: '' }}
        onSubmit={(values) => {
          updateProfileData(values);
          setVisible(false);
        }}
        validationSchema={schema}
      >
        {({
          touched, errors, handleSubmit, handleChange, handleBlur,
        }) => (
          <Form
            id="update-name"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              id="name"
              name="name"
              placeholder="Full name"
              theme="classic-pink"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? (
              <CardInputError>{errors.name}</CardInputError>
            ) : null}

            <Row>
              <StyledCol span={12} padding="1rem">
                <Flex justifyContent="flex-end">
                  <ButtonAux pinkBrdrBtn onClick={() => setVisible(false)}>
                    <Text darkPink>Cancel</Text>
                  </ButtonAux>
                </Flex>
              </StyledCol>
              <StyledCol span={12} padding="1rem">
                <ButtonAux
                  pinkBtn
                  type="submit"
                  form="update-name"
                >
                  <Text white>Save</Text>
                </ButtonAux>
              </StyledCol>
            </Row>
          </Form>
        )}
      </Formik>
    </Spacer>
  </Modal>
);

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateProfileData: (data) => dispatch(ProfileActions.updateProfileDataRequest(data)),
});

export default connect(null, mapDispatchToProps)(ChangeNameModal);
