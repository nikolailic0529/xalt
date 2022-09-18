import styled, {css} from 'styled-components';
import colors from 'lib/theme/colors';
import {Input, Menu} from 'antd';

export const ModalWrapper = styled.div`
  background: #FFFFFF;
  width: 100%;
`;

export const ModalContainer = styled.div`
  ${(props) =>
    css`
      width: ${props.isFullWidth ? '100%' : '97%'};
    `};
  height: 96%;
  max-height: 490px;
  margin: 8px 0 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 30px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border: solid 4px transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.kingfisherDaisy};
    border-radius: 30px;
  }
`;

export const ModalItem = styled.div`
  display: flex;
  ${(props) =>
    css`
      flex-direction: ${props.direction};
      justify-content: ${props.justify};
      align-items: ${props.align};
    `};
  height: 240px;
  width: 100%;
  flex-wrap: wrap;
  :not(:last-child) {
    border-bottom: 1px solid ${colors.gray300};
  }
`;

export const CreateSectionWrapper = styled.div`
  width: 50%;
  padding: 12px;
`;

export const CreateSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const ModalInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
`;

export const ModalButton = styled.button`
  background: ${colors.darkPink};
  color: ${colors.white};
  width: 100%;
  height: 48px;
  box-shadow: 0px 1px 2px rgba(51, 51, 51, 0.12);
  border-radius: 10px;
  border: none;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  :disabled {
    background: ${colors.gray500};
  }
`;

export const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: flex-start;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.2px;
  color: ${colors.gray1000};
  padding: 0 18px;
  width: 144px;
`;

export const MeetingTime = styled.span`
  font-size: 12px;
  line-height: 15px;
`;

export const MemberName = styled.span`
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ModalAction = styled.div`
  align-self: flex-start;
  margin-left: auto;
`;

export const ProgramDescription = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.2px;
  color: ${colors.gray1000};
  display: flex;
  flex-direction: column;
  height: 42px;
  width: 100%;
  
`;

export const DescriptionHeader = styled.span`
  font-weight: bold;
  font-size: 11px;
  line-height: 20px;
  padding: 4px 0;
`;

export const DescriptionText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Pending = styled.div`
  width: 210px;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  font-family: Roboto, sans-serif;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.2px;
  color: ${colors.gray1000};
`;

export const SearchSection = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${colors.gray200};
`;

export const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchInput = styled(Input)`
  width: 80%;
  height: 24px;
  font-family: Roboto, sans-serif;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: ${colors.gray1000};
  border: none;
`;

export const NoChosenMember = styled.span`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${colors.gray1000};
  opacity: 0.5;
`;

export const UserList = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 30px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border: solid 4px transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.kingfisherDaisy};
    border-radius: 30px;
  }
`;

export const UserListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4px;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  ${(props) =>
    props.isChosen 
    ? css`
      background: #FCECF2;
      border: 1px solid ${colors.darkPink};
    `
    : css`
      :hover {
        background: ${colors.darkPink}19;
      }
    `};
`;

export const UserName = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.25px;
  text-align: left;
  padding-left: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RemoveIcon = styled.div`
  margin-left: auto;
  margin-right: 0;
  margin-top: 6px;
`;

export const FilterResult = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const StyledMenu = styled(Menu)`
  width: 240px;
  border: 1px solid ${colors.gray500};
  padding: 5px;
  border-radius: 10px;
`;

export const StyledItem = styled(Menu.Item)`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 24px;
  display: flex;
  align-items: center;
  :hover {
    color: ${colors.darkPink}
  }
`;