import styled, { createGlobalStyle } from 'styled-components';

export const colors = {
  blueIndeed: '#065FB1',
  blackIndeed: '#2D2D2D',
  green: '065927'
};

export const Global = createGlobalStyle`
    * {
      @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
      font-family: 'Roboto', sans-serif;
      color: ${colors.blackIndeed};
    }
`;

export const Button = styled.button`
  width: 145px;
  height: 44px;
  background: ${colors.blueIndeed};
  border-radius: 8px;
  color: white;
  border: none;
  font-size: 16px;
`;
export const Header = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  justify-content: space-between;
  line-height: 30px;
  margin-bottom: 16px;
`;

export default Global;
