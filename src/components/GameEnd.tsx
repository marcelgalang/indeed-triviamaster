import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Header } from '../styles/global';
import master from '../img/master.gif';
import meh from '../img/meh.gif';
import ruhrow from '../img/ruhrow.gif';
import { GAME_LENGTH } from '../constants';
import breakpoints from '../styles/breakpoints';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { updateScore } from '../features/highScoreSlice';
import newDate from '../utils/date';

type EndProps = {
  score: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const EndHeader = styled(Header)`
  align-items: center;
  justify-content: center;
  flex-flow: column;
  font-size: 18px;
  margin: 24px 0;
  @media ${breakpoints.device.sm} {
    font-size: 36px;
  }
`;
const End = styled.div``;
const BodyCopy = styled.p`
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  @media ${breakpoints.device.sm} {
    font-size: 16px;
  }
`;
const Img = styled.img`
  margin: 5px;
`;

const GameEnd = ({ score, callback }: EndProps): JSX.Element => {
  const [rating, setRating] = useState(0);
  const ratings = [`master`, `meh`, `ruh-row`];
  const highScore = useSelector(
    (state: RootState) => state.highScore.highScore
  );

  const prevHighScore = highScore ? highScore.score : null;
  const highDate = highScore ? highScore.date : null;
  const highLength = highScore ? highScore.gameLength : null;
  const dispatch = useDispatch();

  const ratingSystem = () => {
    const percentage = (score / GAME_LENGTH) * 100;
    if (percentage >= 80) {
      setRating(0);
    }
    if (percentage >= 50 && percentage <= 80) {
      setRating(1);
    }
    if (percentage <= 50) {
      setRating(2);
    }
  };
  const newHigh = {
    score: score,
    date: newDate(),
    gameLength: GAME_LENGTH
  };

  const setScoreUpdate = () => {
    if (highScore.score < score) {
      dispatch(
        updateScore({
          newHigh
        })
      );
    }
  };

  useEffect(() => {
    ratingSystem();
    setScoreUpdate();
  }, [score]);

  return (
    <End>
      <EndHeader>
        {rating === 0 && <Img src={master} alt="master-gif" />}
        {rating === 1 && <Img src={meh} alt="meh-gif" width="90%" />}
        {rating === 2 && <Img src={ruhrow} alt="ruhrow-gif" />}
        You're a trivia {ratings[rating]}!
        <BodyCopy>
          You got {score} out of {GAME_LENGTH} questions right! Your best score
          so far was {prevHighScore} out of {highLength} which you got on{' '}
          {highDate}.
        </BodyCopy>
        <Button onClick={callback}>Play again!</Button>
      </EndHeader>
    </End>
  );
};

export default GameEnd;
