import {
  selectNumberOfPeople,
  selectError,
  selectLoading,
  selectPeople,
} from './game.selectors';
import { State } from '../reducers/game.reducers';
import { createTestObjects } from '../../testing/game-testing.data';

const { randomPeople, numberOfPeople, error } = createTestObjects();

const state: State = {
  loading: true,
  error,
  numberOfPeople,
  randomPeople,
};

describe('Should return expected value for each selector', () => {
  it.each([
    [selectNumberOfPeople, numberOfPeople],
    [selectPeople, randomPeople],
    [selectLoading, state.loading],
    [selectError, state.error],
  ])('selector %s should return %s', (selector, result) => {
    expect(result).toEqual(selector.projector(state));
  });
});
