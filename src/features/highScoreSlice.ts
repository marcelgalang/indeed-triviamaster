import { createSlice } from '@reduxjs/toolkit';
import { GAME_LENGTH } from '../constants';

export interface HighScoreState {
  highScore: [{ score: number; date: string; gameLength: number }];
}

const initialState = {
  highScore: {
    score: 0,
    date: '7/1/2022',
    gameLength: GAME_LENGTH
  }
};

export const highScoreSlice = createSlice({
  name: 'highScore',
  initialState,
  reducers: {
    setHighScore: (state) => {
      return state;
    },
    updateScore: (state, action) => {
      state.highScore = action.payload.newHigh;
      return state;
    },
  }
});

export const { updateScore, setHighScore } = highScoreSlice.actions;

export default highScoreSlice.reducer;
