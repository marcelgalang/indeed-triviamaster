import { useState } from 'react';
import styled from 'styled-components';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { addAnswer, removeAnswer } from '../features/userAnswersSlice';
import Checkbox from './Checkbox';
import breakpoints from '../styles/breakpoints';

type Props = {
  choice: string;
};

const AnswerWrapper = styled.div`
  height: 24px;
  margin: 12px 0;
  font-size: 16px;
  @media ${breakpoints.device.sm} {
    min-width: 348px;
    margin: 0 16px 16px 0;
  }
`;

const Answer = ({ choice }: Props): JSX.Element => {
  const [selected, setSelected] = useState(false);
  const answers = useSelector((state: RootState) => state.userAnswers);
  const dispatch = useDispatch();

  const handleClick = (e: {
    stopPropagation: () => void;
    target: { name: string };
  }): void => {
    e.stopPropagation();
    setSelected(!selected);
    const newUserAnswer: string = e.target.name;
    if (answers.answers.some((answer) => answer.text === newUserAnswer)) {
      dispatch(
        removeAnswer({
          text: newUserAnswer
        })
      );
    } else {
      dispatch(
        addAnswer({
          text: newUserAnswer
        })
      );
    }
  };

  return (
    <AnswerWrapper>
      <Checkbox onChange={handleClick} name={choice} checked={selected} />
      {choice}
    </AnswerWrapper>
  );
};

export default Answer;
