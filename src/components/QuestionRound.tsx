import React from "react";
import styled from "styled-components";
import Answer from "./Answer";
import breakpoints from "../styles/breakpoints";
import { colors } from "../styles/global";
import { IQuestionSet } from "../App";

type Props = {
  questionNumber: number;
  questions: IQuestionSet[];
};

const ChoicesWrapper = styled.div`
  flex-flow: column wrap;
  @media ${breakpoints.device.sm} {
    display: flex;
    flex-direction: row;
  }
`;
const QuestionWrapper = styled.div`
  font-size: 16px;
  color: ${colors.blackIndeed};
  @media ${breakpoints.device.sm} {
    margin: 0 16px 16px 0;
  }
`;

const QuestionRound: React.FC<Props> = ({ questionNumber, questions }) => {
  const choices = questions[questionNumber].answers;

  return (
    <>
      <QuestionWrapper>{questions[questionNumber].question}</QuestionWrapper>
      <ChoicesWrapper>
        {choices.map((choice: string) => (
          <Answer choice={choice} key={choice} />
        ))}
      </ChoicesWrapper>
    </>
  );
};

export default QuestionRound;
