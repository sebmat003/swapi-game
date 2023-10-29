import { createReducer, on } from '@ngrx/store';
import * as VehicleInfoActions from '../actions/game.actions';
import { InitialState } from '@ngrx/store/src/models';
import { Person } from '../../models/person.models';

export const featureKey = 'game';

export interface State {
  randomPeople: Person[];
  numberOfPeople: number;
  loading: boolean;
  error: string;
}

export const initialState: InitialState<State> = {
  randomPeople: undefined,
  numberOfPeople: undefined,
  loading: false,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(
    VehicleInfoActions.getRandomPeople,
    VehicleInfoActions.getNumberOfPeople,
    (state) => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    VehicleInfoActions.getRandomPeople,
    VehicleInfoActions.getNumberOfPeople,
    (state) => ({
      ...state,
      error: initialState.error,
    }),
  ),
  on(
    VehicleInfoActions.getRandomPeopleSuccess,
    VehicleInfoActions.getNumberOfPeopleSuccess,
    VehicleInfoActions.getRandomPeopleFailure,
    VehicleInfoActions.getNumberOfPeopleFailure,
    (state) => ({
      ...state,
      loading: initialState.loading,
    }),
  ),
  on(VehicleInfoActions.getRandomPeopleSuccess, (state, { randomPeople }) => ({
    ...state,
    randomPeople,
  })),
  on(
    VehicleInfoActions.getNumberOfPeopleSuccess,
    (state, { numberOfPeople }) => ({
      ...state,
      numberOfPeople,
    }),
  ),
  on(
    VehicleInfoActions.getRandomPeopleFailure,
    VehicleInfoActions.getNumberOfPeopleFailure,
    (state, { error }) => ({
      ...state,
      error,
    }),
  ),
);
