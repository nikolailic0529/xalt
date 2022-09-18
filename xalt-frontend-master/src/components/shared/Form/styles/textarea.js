import colors from 'lib/theme/colors';

export const Classic = `
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

export const ClassicGray = `
  padding: 1rem 2rem;
  background-color: ${colors.gray100} !important;
  border: none !important;
  border-radius: 5px;

  &:hover {
    background-color: ${colors.gray100} !important;
    border: none !important;
    box-shadow: none;
  }

  &:focus {
    background-color: ${colors.gray100} !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

export const Bordered = `
  border: 2px solid ${colors.graySteel} !important;
  border-radius: 5px;

  &:hover {
    border: 2px solid ${colors.graySteel} !important;
    box-shadow: none;
  }

  &:focus {
    border: 2px solid ${colors.graySteel} !important;
    box-shadow: none !important;
  }
`;

export const Chat = `
  height: 150px !important;
  ${ClassicGray}
`;
