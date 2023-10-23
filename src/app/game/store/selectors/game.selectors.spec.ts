import { selectAllPeopleIds, selectError, selectLoading, selectPeople } from "./game.selectors";
import { State } from "../reducers/game.reducers";
import { createTestObjects } from "../../testing/game-testing.data";

const {randomPeople, allPeople, error} = createTestObjects();

const state: State = {
  loading: true,
  error,
  allPeople,
  randomPeople,
}

describe('Should return expected value for each selector', () => {
  it.each([[selectAllPeopleIds, [1, 2, 3]],
    [selectPeople, randomPeople],
    [selectLoading, state.loading],
    [selectError, state.error]])('selector %s should return %s', (selector, result) => {
    expect(result).toEqual(selector.projector(state))
  });
})




