import React from 'react';
import When from 'components/shared/When';
import {
  CoachProfileCertWrapper, CoachProfileCertTitle, CoachProfileCertBlock,
  CoachProfileCertColumn, CoachProfileCertItem,
} from './styles';

const CoachProfileCertification = ({ certificats }) => (
  <CoachProfileCertWrapper>
    <CoachProfileCertTitle big>Certifications</CoachProfileCertTitle>

    {
      certificats
        ? (
          <CoachProfileCertBlock>
            <When condition={certificats.length < 4}>
              <div>
                {
                  certificats.map(({ name }) => (
                    <CoachProfileCertItem big>{name}</CoachProfileCertItem>
                  ))
                }
              </div>
            </When>
            <When condition={certificats.length > 3}>
              <CoachProfileCertColumn>
                {
                  certificats.slice(0, Math.ceil(certificats.length / 2)).map(({ name }) => (
                    <CoachProfileCertItem big>{name}</CoachProfileCertItem>
                  ))
                }
              </CoachProfileCertColumn>
              <CoachProfileCertColumn>
                {
                  certificats.slice(Math.ceil(certificats.length / 2), certificats.length).map(({ name }) => (
                    <CoachProfileCertItem big>{name}</CoachProfileCertItem>
                  ))
                }
              </CoachProfileCertColumn>
            </When>
          </CoachProfileCertBlock>
        )
        : null
}
  </CoachProfileCertWrapper>
);

export default CoachProfileCertification;
