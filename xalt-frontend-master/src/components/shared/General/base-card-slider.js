import React, { useState } from 'react';

import styled from 'styled-components';
import {
  layout,
  space,
  color,
  typography,
  flexbox,
  border,
  variant,
  compose,
  shadow,
} from 'styled-system';

import Flex from 'components/shared/Flex';
import { theme } from 'components';

const BaseCardSliderWrapper = styled(Flex)``;
BaseCardSliderWrapper.defaultProps = {
  width: 'calc(100% + 24px)',
  flexDirection: ['column', null, 'row', null],
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  position: 'relative',
  mx: '-12px',
};

const composeBaseCardSliderViewsHelper = compose(
  variant({
    variants: {
      slideLeft: {
        order: [2, null, 1, null],
      },
      slideRight: {
        order: [1, null, 2, null],
      },
    },
  }),
);
const BaseCardSliderViews = styled.div`
  ${flexbox};
  ${layout};
  ${space};
  ${composeBaseCardSliderViewsHelper};
`;
BaseCardSliderViews.defaultProps = {
  display: ['none', null, 'flex', null],
  width: [1, null, 1 / 2, null],
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  px: '12px',
  py: 0,
};

const composeBaseCardSliderItemsHelper = compose(
  variant({
    variants: {
      slideLeft: {
        order: [1, null, 2, null],
      },
      slideRight: {
        order: [2, null, 1, null],
      },
    },
  }),
);

const BaseCardSliderItems = styled(Flex)`
  ${composeBaseCardSliderItemsHelper};
`;
BaseCardSliderItems.defaultProps = {
  width: [1, null, 1 / 2, null],
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  px: '12px',
  py: 0,
};

const composeBaseCardSliderItemHelper = compose(
  variant({
    variants: {
      violet: {
        '&:hover::before': {
          background: `linear-gradient(113.19deg,${theme.colors.kingfisherDaisy} 3.41%,${theme.colors.darkPink} 100%)`,
          opacity: '0.3',
        },
      },
      violetActive: {
        fontWeight: '700',
        '&::before,&:hover::before': {
          background: `linear-gradient(113.19deg,${theme.colors.kingfisherDaisy} 3.41%,${theme.colors.darkPink} 100%)`,
          opacity: 1,
        },
      },
      red: {
        '&:hover::before': {
          background: `linear-gradient(90deg,${theme.colors.darkPink} 0%, ${theme.colors.yellow} 100%)`,
          opacity: '0.3',
        },
      },
      redActive: {
        fontWeight: '700',
        '&::before,&:hover::before': {
          background: `linear-gradient(90deg,${theme.colors.darkPink} 0%, ${theme.colors.yellow} 100%)`,
          opacity: 1,
        },
      },
      blue: {
        '&:hover::before': {
          background: `linear-gradient(113.19deg,${theme.colors.blue} 3.41%, ${theme.colors.lightBlue} 100%)`,
          opacity: '0.3',
        },
      },
      blueActive: {
        fontWeight: '700',
        '&::before,&:hover::before': {
          background: `linear-gradient(113.19deg,${theme.colors.blue} 3.41%, ${theme.colors.lightBlue} 100%)`,
          opacity: 1,
        },
      },
    },
  }),
);

const BaseCardSliderItem = styled.button`
  display: flex;
  position: relative;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease-in-out 0s;

  &::before {
    content: '';
    width: 100%;
    height: 14px;
    background-color: transparent;
    opacity: 0;
    transition: all 0.2s ease-in-out 0s;
    border-radius: 5px 5px 0 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  ${typography};
  ${flexbox};
  ${layout};
  ${color};
  ${space};
  ${border};
  ${composeBaseCardSliderItemHelper};
`;
BaseCardSliderItem.defaultProps = {
  width: '100%',
  minHeight: '104px',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: '5px',
  fontSize: ['14px', null, '18px', null],
  fontWeight: '400',
  lineHeight: '24px',
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  bg: theme.colors.white,
  color: theme.colors.gray1000,
  border: 'none',
  p: ['24px 16px', '24px', null, null, null],
  my: '12px',
  mx: 0,
};

export const BaseCardSliderViewWrapper = styled(Flex)`
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
  overflow: hidden;
`;
BaseCardSliderViewWrapper.defaultProps = {
  width: 1,
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  bg: theme.colors.white,
  borderRadius: '5px',
  position: 'relative',
  my: '12px',
};

const composeBaseCardSliderViewHelper = compose(
  variant({
    variants: {
      active: {
        opacity: 1,
        '@media screen and (max-width: 768px)': {
          position: 'relative',
          height: 'auto',
        },
      },
    },
  }),
);

const BaseCardSliderView = styled(Flex)`
  transition: opacity 0.2s ease-in-out 0s;
  opacity: 0;
  ${composeBaseCardSliderViewHelper};
`;
BaseCardSliderView.defaultProps = {
  width: 1,
  height: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: '5px',
  position: 'absolute',
  top: 0,
  left: 0,
};

const BaseCardSliderViewImg = styled.img`
  ${layout};
  max-width: 100%;
`;
BaseCardSliderViewImg.defaultProps = {
  width: 1,
};

const BaseCardSliderViewText = styled.div`
  ${typography};
  ${layout};
  ${space};
  ${color};
`;
BaseCardSliderViewText.defaultProps = {
  width: 1,
  fontSize: ['12px', null, '18px', null],
  fontWeight: '400',
  lineHeight: ['24px', null, '35px', null],
  fontFamily: "'Roboto', sans-serif",
  letterSpacing: '0.2',
  textAlign: 'center',
  color: theme.colors.gray1000,
  px: [3, null, 5, null],
  py: 0,
  my: [4, null, 7, null],
  mx: 0,
};

const composedBaseCardSliderViewMobileHelper = compose(
  variant({
    variants: {
      visible: {
        display: ['flex', null, 'none', null],
      },
      unvisible: {
        display: 'none',
      },
    },
  }),
);

const BaseCardSliderViewMobile = styled.div`
  ${flexbox};
  ${shadow};
  ${layout};
  ${border};
  ${color};
  ${space};
  ${composedBaseCardSliderViewMobileHelper};
`;
BaseCardSliderViewMobile.defaultProps = {
  width: 1,
  bg: theme.colors.white,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: theme.radii.normal,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
  my: '12px',
  mx: 0,
};

export const BaseCardSlider = ({
  items,
  activeColor,
  slidePosition,
  ...rest
}) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const variant =
    !!activeColor && activeColor === 'red'
      ? 'red'
      : !!activeColor && activeColor === 'blue'
      ? 'blue'
      : 'violet';
  const variantActive =
    !!activeColor && activeColor === 'red'
      ? 'redActive'
      : !!activeColor && activeColor === 'blue'
      ? 'blueActive'
      : 'violetActive';

  return (
    <BaseCardSliderWrapper {...rest}>
      <BaseCardSliderViews
        variant={slidePosition === 'right' ? 'slideRight' : 'slideLeft'}
      >
        <BaseCardSliderViewWrapper>
          {items.map((slide, slideIndex) => (
            <BaseCardSliderView
              variant={slide.id === activeSlide && 'active'}
              key={slide.key}
            >
              <BaseCardSliderViewImg
                src={slide.slide.img}
                alt={slide.slide.text}
              />
              <BaseCardSliderViewText>
                {slide.slide.text}
              </BaseCardSliderViewText>
            </BaseCardSliderView>
          ))}
        </BaseCardSliderViewWrapper>
      </BaseCardSliderViews>
      <BaseCardSliderItems
        variant={slidePosition === 'right' ? 'slideRight' : 'slideLeft'}
      >
        {items.map((item, index) => (
          <>
            <BaseCardSliderItem
              id={item.id}
              onClick={() => setActiveSlide(item.id)}
              key={item.key}
              variant={item.id === activeSlide ? variantActive : variant}
            >
              {item.title}
            </BaseCardSliderItem>

            <BaseCardSliderViewMobile
              variant={item.id === activeSlide ? 'visible' : 'unvisible'}
            >
              <BaseCardSliderViewImg
                src={item.slide.img}
                alt={item.slide.text}
              />
              <BaseCardSliderViewText>{item.slide.text}</BaseCardSliderViewText>
            </BaseCardSliderViewMobile>
          </>
        ))}
      </BaseCardSliderItems>
    </BaseCardSliderWrapper>
  );
};
