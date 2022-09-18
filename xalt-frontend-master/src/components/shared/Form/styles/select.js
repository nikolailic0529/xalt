import { theme } from 'components';

export const Classic = `
  height: 42px;
  border: 1px solid ${theme.colors.gray1000} !important;
  border-radius: 5px;

  .ant-select-selector {
    border-radius: 5px !important;
    font-size: 16px;
  }
`;

export const ClassicBig = `
  height: 67px;
  border: 1px solid ${theme.colors.gray1000} !important;
  border-radius: 5px;
  font-weight: normal !important;

  .ant-select-selector {
    border-radius: 5px !important;
    font-size: 16px;
  }
`;

export const Bordered = `
  height: 64px;
  border: 2px solid ${theme.colors.graySteel} !important;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;

  &:hover {
    border: 2px solid ${theme.colors.graySteel} !important;
    box-shadow: none;
  }

  &:focus {
    border: 2px solid ${theme.colors.graySteel} !important;
    box-shadow: none !important;
  }
`;
