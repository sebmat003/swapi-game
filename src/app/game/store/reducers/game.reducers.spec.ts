import { initialState, reducer, State } from "./game.reducers";
import * as GameActions from "../actions/game.actions";
import { createTestObjects } from "../../testing/game-testing.data";

const state = initialState as State;

const {allPeople, randomPeople, error} = createTestObjects();

describe('BooksReducers', () => {
  it.each([GameActions.getRandomPeople(), GameActions.getAllPeople()])('should set loading to true while requesting data', (action) => {
    const result = reducer(state, action);

    expect(result).toEqual({
      loading: true
    });
  });

  it.each([GameActions.getRandomPeopleFailure({error}), GameActions.getAllPeopleFailure({error})])('should set error', (action) => {
    const result = reducer(state, action);

    expect(result).toEqual({
      error,
      loading: false
    });
  });

  it('should set random people', () => {
    const result = reducer(
      state,
      GameActions.getRandomPeopleSuccess({
        randomPeople
      })
    );

    expect(result).toEqual({
      loading: false,
      randomPeople
    });
  });

  it('should set all people', () => {
    const result = reducer(
      state,
      GameActions.getAllPeopleSuccess({
        allPeople
      })
    );

    expect(result).toEqual({
      loading: false,
      allPeople
    });
  });
});
