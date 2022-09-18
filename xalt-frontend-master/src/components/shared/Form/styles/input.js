import { theme } from 'components';
import colors from 'lib/theme/colors';

export const Classic = `
  height: 42px;
  border: 1px solid ${theme.colors.gray1000} !important;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    border: 1px solid ${theme.colors.gray1000} !important;
    box-shadow: none;
  }

  &:focus {
    border: 1px solid ${theme.colors.gray1000} !important;
    box-shadow: none !important;
  }
`;

export const ClassicBig = `
  height: 67px;
  border: 1px solid ${theme.colors.gray1000} !important;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    border: 1px solid ${theme.colors.gray1000} !important;
    box-shadow: none;
  }

  &:focus {
    border: 1px solid ${theme.colors.gray1000} !important;
    box-shadow: none !important;
  }
`;

export const ClassicPink = `
  height: 42px;
  border: 1px solid ${colors.darkPink} !important;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    border: 1px solid ${colors.darkPink} !important;
    box-shadow: none;
  }

  &:focus {
    border: 1px solid ${colors.darkPink} !important;
    box-shadow: none !important;
  }
`;

export const ClassicLight = `
  height: 42px;
  border: 1px solid ${theme.colors.gray100} !important;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    border: 1px solid ${theme.colors.gray100} !important;
    box-shadow: none;
  }

  &:focus {
    border: 1px solid ${theme.colors.gray100} !important;
    box-shadow: none !important;
  }
`;

export const Bordered = `
  height: 64px;
  border: 2px solid ${theme.colors.graySteel} !important;
  border-radius: 5px;

  &:hover {
    border: 2px solid ${theme.colors.graySteel} !important;
    box-shadow: none;
  }

  &:focus {
    border: 2px solid ${theme.colors.graySteel} !important;
    box-shadow: none !important;
  }
`;
