import React from 'react';
import When from 'components/shared/When';
import Text from 'components/shared/Text';
import { Row, Col, Empty } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

const WithdrawalHistory = ({ payouts }) => (
  <>
    <When condition={payouts.length}>
      {
        payouts.map(({
          amount, currency, source_type: sourceType, created, status,
        }) => (
          <Row>
            <Col xl={2}>
              <Text bold>
                $
                {amount}
              </Text>
            </Col>
            <Col xl={2}>
              <Text>
                {currency}
              </Text>
            </Col>
            <Col xl={3}>
              <Text>
                {sourceType}
              </Text>
            </Col>
            <Col xl={4}>
              <Text>
                {moment(created).format('MMMM DD, HH:mm A')}
              </Text>
            </Col>
            <Col xl={4}>
              <Text kingfisherDaisy>
                <When condition={status === 'paid'}>
                  Succeeded
                </When>
                <When condition={status !== 'paid'}>
                  Error
                </When>
              </Text>
            </Col>
          </Row>
        ))
      }
    </When>

    <When condition={!payouts.length}>
      <Empty />
    </When>
  </>
);

const mapStateToProps = (state) => ({
  payouts: state.profile.stripe.payouts || [],
});

export default connect(mapStateToProps, null)(WithdrawalHistory);
