import { Row, Switch } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import ProfileActions from 'lib/redux/reducers/profile';

import { Card, StyledCol } from 'containers/roles/coach/Profile/styles';

const EmailNotifications = ({ settings, updateProfileData }) => {
  const update = (field, value) =>
    updateProfileData({
      email_notifications_settings: JSON.stringify([{ [field]: value ? 'true' : 'false' }]),
    });

  return (
    <Row>
      <StyledCol span={24}>
        <Card>
          <Spacer direction="vertical" fullWidth size={12}>
            <Flex justifyContent="space-between" alignItmes="center">
              <Text regularBiggerSize>Notify me 20 minuites before an upcoming session.</Text>
              <Switch
                defaultChecked={settings?.upcoming_meeting}
                onChange={(value) => update('upcoming_meeting', value)}
              />
            </Flex>
            <Flex justifyContent="space-between" alignItmes="center">
              <Text regularBiggerSize>Notify me when I receive a new private message.</Text>
              <Switch defaultChecked={settings?.new_message} />
            </Flex>
            <Flex justifyContent="space-between" alignItmes="center">
              <Text regularBiggerSize>Notify about a new member</Text>
              <Switch
                defaultChecked={settings?.new_member}
                onChange={(value) => update('new_member', value)}
              />
            </Flex>
            <Flex justifyContent="space-between" alignItmes="center">
              <Text regularBiggerSize>Notify me when I have an unfilled report.</Text>
              <Switch
                defaultChecked={settings?.expired_report}
                onChange={(value) => update('expired_report', value)}
              />
            </Flex>
            <Flex justifyContent="space-between" alignItmes="center">
              <Text regularBiggerSize>Notify when member complete a action</Text>
              <Switch
                defaultChecked={settings?.member_completed_homework}
                onChange={(value) => update('member_completed_homework', value)}
              />
            </Flex>
          </Spacer>
        </Card>
      </StyledCol>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  settings: state.profile.email_notifications_settings,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateProfileData: (data) => dispatch(ProfileActions.updateProfileDataRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailNotifications);
