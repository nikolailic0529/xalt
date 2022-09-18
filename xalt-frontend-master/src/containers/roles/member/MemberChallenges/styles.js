import React from 'react';
import Text from 'components/shared/Text';
import { Input, Col, Upload } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import colors from 'lib/theme/colors';

export const Panel = styled.div`
  background-color: ${colors.gray50};
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  padding: 0px 1rem;
`;

const SearchField = () => <Input placeholder="Type here ..." prefix={<SearchOutlined />} />;

export const StyledSearchField = styled(SearchField)`
  height: 38px;
  border: none !important;
  box-shadow: none !important;

  &:hover {
    border: none !important;
  }
`;

export const StyledSearchFieldWrapper = styled.div`
  border-radius: 10px !important;
  border: 1px solid ${colors.gray100};
  overflow: hidden;
`;

export const MarginedCol = styled(Col)`
  padding: 2rem 0px;
`;

export const NewChallengeFormWrapper = styled.div`
  position: relative;

  .confirmText {
    color: rgba(7, 7, 7, 0.5);
    font-size: 16px;

    .ant-checkbox-wrapper .ant-checkbox-inner {
      width: 16px;
      height: 16px;
    }

    .ant-checkbox-wrapper span {
      font-size: 16px;
    }

    p {
      margin: 0;
      padding-left: 20px;
    }
  }

  .ant-form-item-control-input-content,
  input {
    font-size: 16px;
  }

  .ant-select,
  .ant-select-selection-placeholder {
    font-weight: 400;
  }

  #video_url {
    font-size: 16px;
  }
`;

export const ResultBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: ${({ display }) => (display ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const StyledDragger = styled(Upload.Dragger)`
  background-color: #fff !important;
  border: 1px dashed ${colors.darkPink} !important;
  padding: 2rem 0rem;
`;
