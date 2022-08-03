import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from './store';
import QuestionRound from './components/QuestionRound';
import CorrectMessage from './components/CorrectMessage';
import { reset } from './features/userAnswersSlice';
import breakpoints from './styles/breakpoints';
import { Button, Header } from './styles/global';
import GameStart from './components/GameStart';
import GameEnd from './components/GameEnd';
import { QUESTION_SET, GAME_LENGTH } from './constants';
import { setHighScore } from './features/highScoreSlice';

export interface IQuestionSet {
  answers: string[];
  id: number;
  question: string;
  correct_answers: string[];
  wrong_answers: string[];
}

const AppWrapper = styled.div`
  @media ${breakpoints.device.sm} {
    display: flex;
    justify-content: center;
  }
`;

const GameWrapper = styled.div`
  margin: 20px;
  flex-flow: column;
  display: flex;
  justify-content: space-between;
  @media ${breakpoints.device.sm} {
    margin: 48px;
    width: 800px;
  }
`;

const QuestionsContainer = styled.div``;

const GameStatus = styled(GameWrapper)`
  justify-content: center;
`;
const NextButton = styled(Button)`
  margin-top: 30px;
`;
const NextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = (): JSX.Element => {
  const [questions, setQuestions] = useState<IQuestionSet[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0 as number);
  const [gameOver, setGameOver] = useState(true);
  const [correctMessage, setCorrectMessage] = useState(false);
  const userAnswers = useSelector((state: RootState) => state.userAnswers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameOver || questionNumber === 0) {
      setCorrectMessage(false);
    }
    setTimeout(() => {
      setCorrectMessage(!correctMessage);
    }, 850);
  }, [score]);

  const fetchQuestions = () => {
    const questionSet = QUESTION_SET;
    const newQuestionSet = questionSet.map((question) => ({
      ...question,
      answers: [...question.wrong_answers, ...question.correct_answers],
      id: Math.random() * 10
    }));
    setQuestions(newQuestionSet);
  };

  const startGame = () => {
    setCorrectMessage(false);
    fetchQuestions();
    setQuestionNumber(0);
    setScore(0);
    setGameOver(false);
    dispatch(setHighScore);
  };

  const checkAnswers = () => {
    if (!gameOver) {
      const answers = userAnswers;
      const extractedAnswers = answers.answers
        .map((answer) => answer.text)
        .sort();
      const correct =
        JSON.stringify(questions[questionNumber].correct_answers.sort()) ===
        JSON.stringify(extractedAnswers);

      if (correct) {
        setCorrectMessage(true);
        setScore((prev) => prev + 1);
      }
      dispatch(reset());
    }
  };

  const nextQuestion = () => {
    const next = questionNumber + 1;
    next === GAME_LENGTH ? setGameOver(true) : setQuestionNumber(next);
    checkAnswers();
  };

  return (
    <AppWrapper>
      <GameWrapper>
        <GameStatus>
          {questions.length === 0 && <GameStart callback={startGame} />}
          {questions.length !== 0 && gameOver ? (
            <GameEnd score={score} callback={startGame} />
          ) : null}
        </GameStatus>
        {!gameOver && (
          <Header>
            <div>
              Question {questionNumber + 1} of {GAME_LENGTH}
            </div>
            <div>Score: {score}</div>
          </Header>
        )}
        <QuestionsContainer>
          {!gameOver ? (
            <QuestionRound
              questionNumber={questionNumber}
              questions={questions}
            />
          ) : null}
        </QuestionsContainer>
        <NextContainer>
          {questionNumber !== 0 && correctMessage && <CorrectMessage />}
          {!gameOver ? (
            <NextButton onClick={nextQuestion}>Next question</NextButton>
          ) : null}
        </NextContainer>
      </GameWrapper>
    </AppWrapper>
  );
};

export default App;
