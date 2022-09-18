import React from 'react';
import styled from 'styled-components';
import When from 'components/shared/When';
import ReactPlayer from 'react-player';

const Wrapper = styled.div`
  overflow: hidden;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  position: relative;

  .overlay {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  iframe {
  }
`;

const EmbedTypes = {
  preview: {
    width: '100%',
    height: '150px',
    autoplay: '',
    fullscreen: '',
    showOverlay: true,
  },
  player: {
    width: '100%',
    height: '300px',
    autoplay: 'autoplay',
    fullscreen: 'fullscreen',
  },
};

export default ({ url, type }) => {
  const embedType = EmbedTypes[type];

  return (
    <Wrapper height={embedType.height} width={embedType.width}>
      <ReactPlayer url={url} light playing controls width="100%" height="100%" />
    </Wrapper>
  );
};
