import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import When from 'components/shared/When';
import ProfileActions from 'lib/redux/reducers/profile';
import DomainsActions from 'lib/redux/reducers/domains';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import ButtonAux from 'components/shared/ButtonAux';
import Heading from 'components/shared/Heading';
import OnboardingCard from 'components/shared/OnboardingCard';
import { Card } from 'containers/roles/coach/Profile/styles';
import {
  StaticOnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingProgress,
  OnboardingStepWrapper,
  OnboardingList,
  OnboardingListItem,
  OnboardingStep,
  OnboardingPrevBtn,
  OnboardingNextBtn,
  OnboardingRadioRow,
} from 'components/shared/Onboarding';
import { connect } from 'react-redux';
import { StyledButtonAux, StyledIcon } from '../styles';

const Domains = ({
  updateDomains, getFitnesDomainsRequest, profile, domains, currentDomains,
}) => {
  const [isEditing, setIsEditing] = useState();
  const [selected, setSelected] = useState([]);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      updateDomains(selected);
    },
  });

  useEffect(() => {
    getFitnesDomainsRequest();
  }, []);

  const clienteles = [
    {
      id: 'clientelle-yourth',
      clientele_name: 'Youth',
    },
    {
      id: 'clientelle-adults',
      clientele_name: 'Adults',
    },
    {
      id: 'clientelle-senior',
      clientele_name: 'Senior(60+)',
    },
    {
      id: 'clientelle-health-issues',
      clientele_name: 'Member with health issues',
    },
    {
      id: 'clientelle-no-prefrence',
      clientele_name: 'No prefrence',
    },
  ];

  return (
    <Card>
      <form
        id="update-domains"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Row>
          <Col xl={20} xs={24}>
            <StaticOnboardingBlock>
              <OnboardingWrapper>
                <Container min centered>
                  <OnboardingList>
                    {clienteles.map((clientele) => (
                      <OnboardingListItem key={clientele.id}>
                        <OnboardingCard
                          checked={!!selected.find((item) => item === clientele.id)}
                          onClick={() => setSelected([...selected, clientele.id])}
                          id={clientele.id}
                          iconName={clientele.id}
                        >
                          {clientele.clientele_name}
                        </OnboardingCard>
                      </OnboardingListItem>
                    ))}
                  </OnboardingList>
                </Container>
              </OnboardingWrapper>
            </StaticOnboardingBlock>
          </Col>
          <Col xl={4} xs={24}>
            <Flex className="h-100" alignItems="center" justifyContent="center">
              <When condition={!isEditing}>
                <StyledIcon name="edit" clickable onClick={() => setIsEditing(true)} />
              </When>

              <When condition={isEditing}>
                <div>
                  <Flex justifyContent="center">
                    <ButtonAux pinkBtn type="submit" form="update-domains">
                      <Text white uppercase>save</Text>
                    </ButtonAux>
                  </Flex>

                  <br />

                  <Flex justifyContent="center">
                    <ButtonAux pinkBrdrBtn onClick={() => setIsEditing(false)}>
                      <Text darkPink uppercase>cancel</Text>
                    </ButtonAux>
                  </Flex>
                </div>
              </When>
            </Flex>
          </Col>
        </Row>
      </form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  domains: state.domains.domains,
  currentDomains: state.profile.onboardingProfile.fitnes_domain_ids,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateDomains: (data) => dispatch(ProfileActions.updateDomainsRequest(data)),
  getFitnesDomainsRequest: () => dispatch(DomainsActions.getFitnesDomainsRequest('coach')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Domains);
