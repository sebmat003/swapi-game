import * as GameActions from './game.actions';
import { createTestObjects } from '../../testing/game-testing.data';

const { randomPeople, numberOfPeople, error } = createTestObjects();

describe('GameActions', () => {
  it.each([
    [GameActions.getRandomPeople, undefined],
    [GameActions.getRandomPeopleSuccess, randomPeople, 'randomPeople'],
    [GameActions.getRandomPeopleFailure, error, 'error'],
    [GameActions.getNumberOfPeople, undefined],
    [GameActions.getNumberOfPeopleSuccess, numberOfPeople, 'allPeople'],
    [GameActions.getNumberOfPeopleFailure, error, 'error'],
  ])('should create an action', (action, payload: unknown, propName = '') => {
    const props = { [propName]: payload };
    const expectedAction = {
      type: action.type,
      ...props,
    };

    expect(action(props as any)).toEqual(expectedAction);
  });
});
