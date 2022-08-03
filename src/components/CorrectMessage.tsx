import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const CorrectMessageStyles = styled.span`
  animation: ${fadeOut} ease 10s;
  animation-fill-mode: forwards;
  color: green;
  height: 30px;
  position: absolute;
`;
const CorrectMessage = (): JSX.Element => {
  return <CorrectMessageStyles>You got it right!</CorrectMessageStyles>;
};

export default CorrectMessage;
