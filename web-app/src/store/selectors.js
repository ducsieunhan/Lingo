import { createSelector } from 'reselect';

const selectTests = (state) => state.tests.tests || [];
const selectAttempts = (state) => state.attempts.attempts || [];

export const selectMergedTests = createSelector(
  [selectTests, selectAttempts],
  (tests, attempts) => {
    return tests.map(test => {
      const found = attempts.find(a => a.quizId === test.id);
      return found ? { ...test, finish: true } : test;
    });
  }
)

