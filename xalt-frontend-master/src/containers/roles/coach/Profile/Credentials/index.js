import { Row, Col, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Text from 'components/shared/Text';
import When from 'components/shared/When';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import DocumentsActions from 'lib/redux/reducers/documents';

import {
  Card,
  StyledCol,
} from 'containers/roles/coach/Profile/styles';
import styled from 'styled-components';
import { StyledButtonAux, StyledIcon } from '../styles';
import UploadCertificateModal from './components/UploadCertificateModal';

const MarginedStyledIcon = styled(StyledIcon)`
  margin-right: ${({ margin = '1rem' }) => margin};
`;

const EmailNotifications = ({ documents, getDocuments, deleteDocument }) => {
  useEffect(getDocuments, []);

  const [uploadCertificateModalVisible, setUploadCertificateModalVisible] = useState();
  const [selectedCertificate, setSelectedCertificate] = useState();

  return (
    <>
      {
        uploadCertificateModalVisible
          ? (
            <UploadCertificateModal
              onClose={() => setUploadCertificateModalVisible(false)}
              certificate={selectedCertificate}
            />
          )
          : null
      }

      <Row>
        <StyledCol span={24}>
          <Card>
            <Spacer direction="vertical" fullWidth size={18}>
              {
              documents.length
                ? documents.map((document) => (
                  <Row>
                    <Col xl={16} md={8} xs={8}>
                      <Flex alignItems="center" className="h-100">
                        <MarginedStyledIcon margin="0.5rem" name="document" clickable />
                        <Text black>{document.name}</Text>
                      </Flex>
                    </Col>
                    <Col xl={6} md={8} xs={8}>
                      <Flex alignItems="center" className="h-100">
                        <When condition={document.verified}>
                          <MarginedStyledIcon name="verified" clickable />
                          <Text darkPink>Verified</Text>
                        </When>
                        <When condition={!document.verified}>
                          <MarginedStyledIcon name="verifiedDisabled" />
                          <Text>Pending</Text>
                        </When>
                      </Flex>
                    </Col>
                    <Col xl={2} md={8} xs={8}>
                      <Flex alignItems="center" justifyContent="flex-end" className="h-100">
                        <Spacer direction="horizontal">
                          <StyledIcon
                            name="edit"
                            clickable
                            onClick={() => {
                              setSelectedCertificate(document);
                              setUploadCertificateModalVisible(true);
                            }}
                          />
                          <StyledIcon name="trash" clickable onClick={() => deleteDocument(document.id)} />
                        </Spacer>
                      </Flex>
                    </Col>
                  </Row>
                ))
                : (
                  <Flex justifyContent="center">
                    <Empty />
                  </Flex>
                )
            }

              <StyledButtonAux
                pinkBrdrBtn
                onClick={() => {
                  setSelectedCertificate(null);
                  setUploadCertificateModalVisible(true);
                }}
              >
                <Flex alignItems="center">
                  <MarginedStyledIcon name="upload" />
                  <Text darkPink>Upload file</Text>
                </Flex>
              </StyledButtonAux>
            </Spacer>
          </Card>
        </StyledCol>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  documents: state.documents.documents,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getDocuments: () => dispatch(DocumentsActions.getDocumentsRequest()),
  deleteDocument: (id) => dispatch(DocumentsActions.deleteDocumentRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailNotifications);
