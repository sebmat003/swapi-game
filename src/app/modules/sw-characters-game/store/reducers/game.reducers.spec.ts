import { initialState, reducer, State } from './game.reducers';
import * as GameActions from '../actions/game.actions';
import { createTestObjects } from '../../testing/game-testing.data';

const state = initialState as State;

const { numberOfPeople, randomPeople, error } = createTestObjects();

describe('GameReducers', () => {
  it.each([GameActions.getRandomPeople(), GameActions.getNumberOfPeople()])(
    'should set loading to true while requesting data',
    (action) => {
      const result = reducer(state, action);

      expect(result).toEqual({
        loading: true,
      });
    },
  );

  it.each([
    GameActions.getRandomPeopleFailure({ error }),
    GameActions.getNumberOfPeopleFailure({ error }),
  ])('should set error', (action) => {
    const result = reducer(state, action);

    expect(result).toEqual({
      error,
      loading: false,
    });
  });

  it('should set random people', () => {
    const result = reducer(
      state,
      GameActions.getRandomPeopleSuccess({
        randomPeople,
      }),
    );

    expect(result).toEqual({
      loading: false,
      randomPeople,
    });
  });

  it('should set number of people', () => {
    const result = reducer(
      state,
      GameActions.getNumberOfPeopleSuccess({
        numberOfPeople,
      }),
    );

    expect(result).toEqual({
      loading: false,
      numberOfPeople,
    });
  });
});
