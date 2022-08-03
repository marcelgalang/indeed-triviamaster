import { createSlice } from '@reduxjs/toolkit';

export interface IAnswer {
  id: number;
  text: string;
}
export interface AnswersState {
  answers: Array<IAnswer>;
}

const initialState: AnswersState = {
  answers: []
};

export const answersSlice = createSlice({
  name: 'userAnswers',
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    addAnswer: (state, action) => {
      const answer = {
        id: Math.random() * 100,
        text: action.payload.text
      };
      state.answers.push(answer);
    },
    removeAnswer: (state, action) => {
      state.answers = state.answers.filter(
        (answer) => answer.text !== action.payload.text
      );
    }
  }
});

export const { addAnswer, removeAnswer, reset } = answersSlice.actions;

export default answersSlice.reducer;
