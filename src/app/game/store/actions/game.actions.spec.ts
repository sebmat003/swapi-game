import * as GameActions from "./game.actions";
import { createTestObjects } from "../../testing/game-testing.data";

const {randomPeople, allPeople, error} = createTestObjects();

describe('GameActions', () => {
  it.each(
    [
      [GameActions.getRandomPeople, undefined],
      [GameActions.getRandomPeopleSuccess, randomPeople, 'randomPeople'],
      [GameActions.getRandomPeopleFailure, error, 'error'],
      [GameActions.getAllPeople, undefined],
      [GameActions.getAllPeopleSuccess, allPeople, 'allPeople'],
      [GameActions.getAllPeopleFailure, error, 'error'],
    ])('should create an action', (action, payload: any, propName = '') => {
      const props = { [propName]: payload };
      const expectedAction = {
        type: action.type,
        ...props
      };

      expect(action(props as any)).toEqual(expectedAction);
    }
  );
});
