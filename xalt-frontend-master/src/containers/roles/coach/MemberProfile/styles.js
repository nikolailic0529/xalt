import styled from 'styled-components';
import { theme } from 'components';
import { Divider, Modal } from 'antd';
import { Form } from 'formik';
import { flexbox, layout } from 'styled-system';

export const NewProgramWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: flex-start;
  border: 1px solid ${theme.colors.darkPink};
  border-radius: 20px;
`;

export const NewProgramFormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ResultBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.8);
  display: ${({ display }) => (display ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 140px;
  padding: 0 12px;
`;

export const NewExerciseDate = styled.div`
  color: ${theme.colors.kingfisherDaisy};
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  padding: 12px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const PinkDivider = styled(Divider)`
  background: ${theme.colors.darkPink};
`;

export const AddProgram = styled.div`
  display: flex;
  width: 120px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  align-self: center;
`;

export const ProgramForm = styled(Form)`
  width: 100%;
`;

export const ExercisesList = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.darkPink};
  border-radius: 20px;
  padding: 24px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ExerciseOption = styled.div`
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.colors.gray1000};
  border-radius: 5px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${theme.colors.gray1000};
`;

export const DeleteIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin: 8px 0;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

export const ItemWrapper = styled.div`
  ${flexbox};
  ${layout};
  width: 100%;
  padding: 36px;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  line-height: 28px;
  font-weight: bold;
  letter-spacing: 0.2px;
  color: ${theme.colors.gray1000};
  :not(:last-child) {
    border-bottom: 1px solid ${theme.colors.gray300};
  }
  @media (max-width: 1242px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

ItemWrapper.defaultProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const Question = styled.div`
  padding: 12px 0;
`;

export const QuestionText = styled.span`
  font-weight: normal;
`;

export const RoundedAnswer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.colors.gray1000};
  border-radius: 10px;
  padding: 8px 32px;
`;

export const SelectExerciseModal = styled(Modal)`
  & .ant-modal-body {
    padding: 12px 24px 24px !important;
  }
`;
