import React from 'react';
import styled from 'styled-components';
import {
  layout,
  space,
  shadow,
  typography,
  color,
  border,
  variant,
  compose,
} from 'styled-system';

import Flex from 'components/shared/Flex';
import ButtonAux from 'components/shared/ButtonAux';
import InnerLink from 'components/shared/InnerLink';
import { CoachDetails } from 'components/shared/CoachList';

const composeCardWithImageWrapperHelper = compose(
  variant({
    variants: {
      horizon: {
        flexDirection: ['column', null, 'row', null],
        alignItems: 'center',
      },
      normal: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  }),
);

const CardWithImageWrapper = styled(Flex)`
  ${composeCardWithImageWrapperHelper};
`;
CardWithImageWrapper.defaultProps = {
  width: 1,
  position: 'relative',
};

const CardWithImageImg = styled.img`
  ${layout}
  ${border};
`;
CardWithImageImg.defaultProps = {
  width: 1,
  maxWidth: '648px',
  height: 'auto',
  borderRadius: '5px 5px 0 0',
};

const composeCardWithImageCardHelper = compose(
  variant({
    variants: {
      horizon: {
        position: ['relative', null, 'absolute', null],
        maxWidth: ['auto', null, '432px', null],
        right: ['inherit', null, 0, null],
        m: ['-35px 12px 0', null, 0, null],
      },
    },
  }),
);

const CardWithImageCard = styled(Flex)`
  ${layout}
  ${shadow};
  ${composeCardWithImageCardHelper};
`;
CardWithImageCard.defaultProps = {
  width: ['calc(100% - 24px)', null, 'calc(100% - 48px)', null],
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
  borderRadius: '5px',
  bg: 'white',
  p: [2, null, 3, null],
  margin: ['-35px 12px 0', null, '-80px 24px 0', null],
};

const CardWithImageTitle = styled.span`
  ${color};
  ${space};
  ${typography};
`;
CardWithImageTitle.defaultProps = {
  width: '100%',
  fontSize: ['20px', null, '24px', null],
  fontWeight: '500',
  lineHeight: ['28px', null, '34px', null],
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: 'gray1000',
  mb: 2,
};

const CardWithImageDescr = styled.span`
  ${color};
  ${space};
  ${typography};
`;
CardWithImageDescr.defaultProps = {
  width: '100%',
  fontSize: ['14px', null, '18px', null],
  fontWeight: '400',
  lineHeight: '24px',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: 'gray1000',
  mb: 3,
};

export const CardWithImage = ({ item, cardPosition, ...rest }) => {
  return (
    <CardWithImageWrapper
      variant={cardPosition === 'horizon' ? 'horizon' : 'normal'}
      {...rest}
    >
      <CardWithImageImg src={item.img} />
      <CardWithImageCard variant={cardPosition === 'horizon' && 'horizon'}>
        <CardWithImageTitle>{item.title}</CardWithImageTitle>
        <CardWithImageDescr>{item.description}</CardWithImageDescr>
        <InnerLink to={item.button.link}>
          <ButtonAux pinkBrdrBtn width="180px">
            {item.button.title}
          </ButtonAux>
        </InnerLink>
        <Flex width={1} height="12px"></Flex>
        {item.link && (
          <CoachDetails largeFont to={item.link} p="14px 2px">
            Read more
          </CoachDetails>
        )}
      </CardWithImageCard>
    </CardWithImageWrapper>
  );
};
