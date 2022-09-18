import React from 'react';

import styled from 'styled-components';
import {
  layout,
  space,
  color,
  typography,
  position,
  flexbox,
  compose,
  variant,
} from 'styled-system';

import Flex from 'components/shared/Flex';
import { theme } from 'components';

export const MainContent = styled.div`
  flex: 1 0 auto;
  padding: 0;
`;

export const ContentBlock = styled.div``;

export const BaseTitle = styled.span`
  display: block;

  ${typography};
  ${color};
  ${space};
`;
BaseTitle.defaultProps = {
  fontSize: ['20px', null, '48px', null, null],
  fontWeight: '500',
  lineHeight: ['32px', null, '60px', null, null],
  letterSpacing: '0.25',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: theme.colors.gray1000,
  m: ['0 0 24px', null, null, '0 0 32px', null],
};

export const BaseSlogan = styled.span`
  display: block;
  ${typography};
  ${color};
  ${space};
`;
BaseSlogan.defaultProps = {
  fontSize: ['18px', null, '30px', null, null],
  fontWeight: '700',
  lineHeight: ['24px', null, '36px', null, null],
  letterSpacing: '0.2',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'center',
  color: theme.colors.gray1000,
};

export const BaseDescription = styled.span`
  display: block;
  ${typography};
  ${color};
  ${space};
`;
BaseDescription.defaultProps = {
  fontSize: ['16px', null, '24px', null, null],
  fontWeight: '400',
  lineHeight: ['24px', null, '28px', null, null],
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  color: theme.colors.gray1000,
  m: ['0 0 24px', null, null, '0 0 40px', null],
};

export const BaseText = styled.span`
  display: block;
  ${typography};
  ${color};
  ${space};
`;
BaseText.defaultProps = {
  fontSize: ['11px', '14px', '18px', null, null],
  fontWeight: '400',
  lineHeight: ['18px', '24px', '28px', null, null],
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'left',
  color: theme.colors.gray1000,
};

export const BaseTwoPointCardList = styled(Flex)``;
BaseTwoPointCardList.defaultProps = {
  width: 'calc(100% + 24px)',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  mx: '-12px',
  my: 0,
};

const BaseTwoPointCardItemWrapper = styled(Flex)``;
BaseTwoPointCardItemWrapper.defaultProps = {
  width: ['100%', '50%', null, null, null],
  flexDirection: 'column',
  p: '12px',
};

const BaseTwoPointCardItemBox = styled(Flex)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  ${typography};
`;
BaseTwoPointCardItemBox.defaultProps = {
  width: '100%',
  height: '100%',
  minHeight: '104px',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: '5px',
  p: ['24px 16px', '24px', null, null, null],
  position: 'relative',
  fontSize: ['14px', null, '18px', null],
  fontWeight: '400',
  lineHeight: '24px',
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  bg: theme.colors.white,
  color: theme.colors.gray1000,
};

export const BaseTwoPointCardItem = (props) => {
  const { item } = props;
  return (
    <BaseTwoPointCardItemWrapper>
      <BaseTwoPointCardItemBox>
        <div dangerouslySetInnerHTML={{ __html: item }} />
      </BaseTwoPointCardItemBox>
    </BaseTwoPointCardItemWrapper>
  );
};

const SimpleWideImageWrapper = styled(Flex)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, #e6447d 0%, #ffab3d 100%);
    mix-blend-mode: overlay;
    opacity: 0.5;
  }
`;
SimpleWideImageWrapper.defaultProps = {
  width: '100%',
  height: ['240px', '358px', null, null, null],
  borderRadius: '5px',
  position: 'relative',
};

const SimpleWideImage = styled(Flex)`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background-color: ${theme.colors.white};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SimpleWideImageBlock = ({ image, ...rest }) => (
  <SimpleWideImageWrapper {...rest}>
    <SimpleWideImage style={{ backgroundImage: `url(${image})` }} />
  </SimpleWideImageWrapper>
);

const ArticleItemWithImageWrapper = styled(Flex)``;
ArticleItemWithImageWrapper.defaultProps = {
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  p: '0 0 22px',
  mb: 4,
};

const ArticleItemImage = styled.img`
  ${position};
  ${layout};
  ${space};
`;
ArticleItemImage.defaultProps = {
  width: '100%',
  maxWidth: ['100%', '88%', '66.8%'],
  height: 'auto',
  top: 0,
  left: 0,
  position: ['static', 'absolute'],
  right: 'unset',
  bottom: 'unset',
};

const composeArticleIteTextWrapperHelper = compose(
  variant({
    variants: {
      darkPink: {
        borderColor: 'darkPink',
      },
      blue: {
        borderColor: 'blue',
      },
      yellow: {
        borderColor: 'yellow',
      },
    },
  }),
);

const composeArticleIteTextBoxHelper = compose(
  variant({
    variants: {
      darkPink: {
        '&::before': {
          borderColor: 'darkPink',
        },
      },
      blue: {
        '&::before': {
          borderColor: 'blue',
        },
      },
      yellow: {
        '&::before': {
          borderColor: 'yellow',
        },
      },
    },
  }),
);

const ArticleIteTextWrapper = styled.div`
  ${composeArticleIteTextWrapperHelper};
  ${position};
  ${layout};
  display: block;
  border-width: 6px;
  border-style: solid;
  @media screen and (max-width: 648px) {
    display: none;
  }
`;
ArticleIteTextWrapper.defaultProps = {
  width: '100%',
  maxWidth: 472,
  height: ['calc(100% - 160px)', null, 'calc(100% - 36px)'],
  top: ['159px', null, '14px'],
  left: 'unset',
  right: 0,
  bottom: 'unset',
  position: 'absolute',
  borderColor: theme.colors.darkPink,
};

const ArticleIteTextWrapperWithBottomImage = styled(Flex)`
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - 150px);
    height: 420px;
    left: 120px;
    bottom: -60px;
    border: 6px solid ${theme.colors.darkPink};
  }
  @media screen and (max-width: 768px) {
    &::before {
      width: calc(100% - 56px);
      left: 40px;
      bottom: -30px;
      height: 220px;
    }
  }
`;
ArticleIteTextWrapperWithBottomImage.defaultProps = {
  width: '100%',
  position: 'relative',
  mt: [null, null, 2, null, null],
  ml: [2, null, null, null, null],
};

const ArticleIteTextBox = styled(BaseText)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  ${composeArticleIteTextBoxHelper};
  ${layout};
  ${position};
  ${flexbox};
  @media screen and (max-width: 648px) {
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: calc(100% - 16px);
      height: 100%;
      left: 16px;
      top: -16px;
      border-width: 6px;
      border-style: solid;
      z-index: -1;
    }
    &::after {
      content: '';
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }
  }
`;
ArticleIteTextBox.defaultProps = {
  width: ['95%', '100%'],
  maxWidth: ['100%', 472],
  bg: theme.colors.white,
  p: '40px 20px',
  position: 'relative',
  alignSelf: ['unset', 'flex-end'],
  top: [0, 36],
  left: 'unset',
  right: ['unset', '57px'],
  bottom: 'unset',
  zIndex: 1,
  mt: [0, '160px', 2, null, null],
};

export const CardHeaderWrapper = styled.div`
  ${layout};
  ${space};
  ${flexbox};
`;

CardHeaderWrapper.defaultProps = {
  display: 'flex',
  p: '32px 0',
  alignItems: 'center',
};

export const ArticleItemWithImage = ({
  image,
  header,
  children,
  textWrapperProps,
  imageProps,
  textBoxProps,
  variant,
  isBottomImage,
  ...rest
}) => (
  <ArticleItemWithImageWrapper {...rest}>
    {!isBottomImage && <ArticleItemImage src={image} {...imageProps} />}
    <ArticleIteTextBox variant={variant} {...textBoxProps}>
      {header}
      {children}
    </ArticleIteTextBox>
    {isBottomImage && <ArticleItemImage src={image} {...imageProps} />}
    <ArticleIteTextWrapper variant={variant} {...textWrapperProps} />
  </ArticleItemWithImageWrapper>
);

const ArticleIteTextBoxWithoutOffset = styled(BaseText)`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  ${layout};
  ${position};
`;
ArticleIteTextBoxWithoutOffset.defaultProps = {
  width: [null, null, 1, null],
  bg: theme.colors.white,
  p: '40px 20px',
  position: 'relative',
  top: ['24px', null, '22px', null, null],
  left: ['0', null, '0', null, null],
  zIndex: 1,
};

export const ArticleItemWithBottomImage = ({ image, children, ...rest }) => (
  <ArticleItemWithImageWrapper {...rest}>
    <ArticleIteTextBoxWithoutOffset>{children}</ArticleIteTextBoxWithoutOffset>
    <ArticleIteTextWrapperWithBottomImage justifyContent="center">
      <ArticleItemImage
        src={image}
        maxWidth={['90%', '88%', null, null]}
        position="relative"
      />
    </ArticleIteTextWrapperWithBottomImage>
  </ArticleItemWithImageWrapper>
);

export * from './base-card-slider';
export * from './card-with-image';
export * from './our-pillar-health';
