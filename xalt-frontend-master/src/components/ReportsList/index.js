import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import When from 'components/shared/When';
import colors from 'lib/theme/colors';
import { formatDate, formatTime } from 'lib/datetime';
import { Col, Space, Empty } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import ButtonAux from 'components/shared/ButtonAux';
import { StyledRow, HalfHeightFlex } from './styles';

const ReportsList = ({ reports }) => {
  return (
    <>
      <When condition={!reports.length}>
        <HalfHeightFlex alignItems="center" justifyContent="center">
          <Empty />
        </HalfHeightFlex>
      </When>

      <When condition={reports.length}>
        <Space direction="vertical" size={18}>
          {reports.map(
            ({ id, created_at: createdAt, is_filled: isFilled, member_profile: { user } }, _) => (
              <StyledRow key={id} isFilled={isFilled}>
                <Col md={4} xs={24}>
                  <Flex justifyContent="center" alignItems="center" className="h-100">
                    <Icon src="empty-user-profile" width="70px" height="70px" />
                  </Flex>
                </Col>
                <Col md={4} xs={24}>
                  <Flex justifyContent="left" alignItems="center" className="h-100">
                    <Text bold>{user.name}</Text>
                  </Flex>
                </Col>
                <Col md={4} xs={24}>
                  <Flex justifyContent="center" alignItems="center" className="h-100">
                    {formatTime(createdAt)}
                  </Flex>
                </Col>
                <Col md={4} xs={24}>
                  <Flex justifyContent="center" alignItems="center" className="h-100">
                    {formatDate(createdAt)}
                  </Flex>
                </Col>
                <Col md={4} xs={24}>
                  <When condition={!isFilled}>
                    <Flex justifyContent="center" alignItems="center" className="h-100">
                      <WarningOutlined
                        style={{
                          fontSize: '24px',
                          color: colors.gray500,
                        }}
                      />
                    </Flex>
                  </When>
                </Col>
                <Col md={4} xs={24}>
                  <Flex alignItems="center" className="h-100">
                    <When condition={!isFilled}>
                      <Link to={`/reports/edit/${id}`}>
                        <ButtonAux pinkBtn>Complete Report</ButtonAux>
                      </Link>
                    </When>

                    <When condition={isFilled}>
                      <Link to={`/reports/view/${id}`}>
                        <ButtonAux pinkBrdrBtn>See Report</ButtonAux>
                      </Link>
                    </When>
                  </Flex>
                </Col>
              </StyledRow>
            ),
          )}
        </Space>
      </When>
    </>
  );
};

export default ReportsList;
