import React, { useEffect, useState } from 'react';
import Text from 'components/shared/Text';
import Spacer from 'components/shared/Spacer';
import Flex from 'components/shared/Flex';
import { Card, StyledIcon } from 'containers/roles/coach/Account/styles';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authTypes from 'lib/redux/types/auth';
import OuterLinkPink from 'components/shared/OuterLinkPink';
import { OnboardingNextBtn } from 'components/shared/Onboarding';

const { CREATE_STRIPE_LINK_REQUEST } = authTypes;

const PaymentInfo = ({ info, isStripeConnected }) => {
  const history = useHistory();
  const { url } = useSelector((state) => ({
    url: state.auth.stripe?.url,
  }));
  const dispatch = useDispatch();
  const [linkClicked, setLinkClicked] = useState(false);

  const createLink = () => {
    dispatch({ type: CREATE_STRIPE_LINK_REQUEST });
    setLinkClicked(true);
  };

  useEffect(() => {
    if (url && linkClicked) {
      window.location.href = url;
    }
  }, [url]);

  return (
    <>
      {!isStripeConnected ? (
        <div>
          <OnboardingNextBtn onClick={createLink} pinkBtn width="300px">
            Connect your payment method
          </OnboardingNextBtn>
        </div>
      ) : (
        <Row>
          <Col xl={16} md={18} xs={24}>
            <Card>
              <Flex alignItems="center">
                <Spacer direction="vertical" fullWidth>
                  <Row>
                    <Col xl={12} xs={24}>
                      <Spacer direction="vertical" fullWidth>
                        <Text black>Country</Text>
                        <Text grayRegular>{info.country || '-'}</Text>
                      </Spacer>
                    </Col>
                    <Col xl={12} xs={24}>
                      <Spacer direction="vertical" fullWidth>
                        <Text black>Account Number</Text>
                        <Text grayRegular>{info.account_number || '-'}</Text>
                      </Spacer>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={12} xs={24}>
                      <Spacer direction="vertical" fullWidth>
                        <Text black>Account Holder Name</Text>
                        <Text grayRegular>{info.account_holder_name || '-'}</Text>
                      </Spacer>
                    </Col>
                    <Col xl={12} xs={24}>
                      <Spacer direction="vertical" fullWidth>
                        <Text black>Institution Number</Text>
                        <Text grayRegular>{info.institution_number || '-'}</Text>
                      </Spacer>
                    </Col>
                    {/* <Col xl={12} xs={24}>
                      <Spacer direction="vertical" fullWidth>
                        <Text black>Routing Number</Text>
                        <Text grayRegular>{info.routing_number || '-'}</Text>
                      </Spacer>
                    </Col> */}
                  </Row>
                </Spacer>
                <StyledIcon name="edit" clickable onClick={() => history.push('/account/edit')} />
              </Flex>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.profile.stripe?.external_account || {},
  isStripeConnected:
    (state.auth.stripe && state.auth.stripe.stripe_account_id) ||
    (state.profile.stripe && state.profile.stripe.stripe_account_id),
});

export default connect(mapStateToProps, null)(PaymentInfo);
