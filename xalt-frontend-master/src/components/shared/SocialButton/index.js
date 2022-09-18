import React from 'react';
import styled from 'styled-components';
import ButtonAux from 'components/shared/ButtonAux';
import SvgIcon from 'components/shared/SvgIcon';
import OuterLink from 'components/shared/OuterLink';
import colors from 'lib/theme/colors';

const SocialButtonLink = styled(OuterLink)`
  ${ButtonAux} {
    flex-direction: row;
    padding: 0 8px;
  }
`;
SocialButtonLink.defaultProps = {
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '1.43',
  letterSpacing: '0.2px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  m: '8px',
};

const SocialButton = (props) => {
  const {href, type} = props;

  return (
    <SocialButtonLink href={href}>
      <ButtonAux pinkBrdrBtn width="142px" maxWidth="142px">
        {type === 'Instagram' ? (
          <SvgIcon
            name="socialButtonInstagram"
            width="24px"
            height="25px"
            fill={colors.white}
            m="0 4px 0 0"
          />
        ) : type === 'Linkedin' ? (
          <SvgIcon
            name="socialButtonLinkedin"
            width="25px"
            height="25px"
            fill={colors.white}
            m="0 4px 0 0"
          />
        ) : (
          type === 'Youtube' && (
            <SvgIcon
              name="socialButtonYoutube"
              width="25px"
              height="25px"
              fill={colors.white}
              m="0 4px 0 0"
            />
          )
        )}
        {type}
      </ButtonAux>
    </SocialButtonLink>
  );
};

export default SocialButton;
