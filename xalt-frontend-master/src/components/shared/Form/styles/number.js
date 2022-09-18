import colors from 'lib/theme/colors';

export const Classic = `
  height: 42px;
  width: 100%;
  border: 1px solid ${colors.gray1000} !important;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    border: 1px solid ${colors.gray1000} !important;
    box-shadow: none;
  }

  &:focus {
    border: 1px solid ${colors.gray1000} !important;
    box-shadow: none !important;
  }
`;
