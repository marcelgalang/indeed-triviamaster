import { configureStore } from '@reduxjs/toolkit';
import userAnswersReducer from '../features/userAnswersSlice';
import highScoreReducer from '../features/highScoreSlice';
export const store = configureStore({
  reducer: {
    userAnswers: userAnswersReducer,
    highScore: highScoreReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
