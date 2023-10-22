import { createReducer, on } from '@ngrx/store';
import * as VehicleInfoActions from '../actions/game.actions';
import { InitialState } from "@ngrx/store/src/models";
import { BasicPersonProperties, Person } from "../../models/person.models";

export const featureKey = 'game';

export interface State {
  randomPeople: Person[];
  allPeople: BasicPersonProperties[];
  loading: boolean;
  error: string;
}

export const initialState: InitialState<State> = {
  randomPeople: undefined,
  loading: false,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(VehicleInfoActions.getRandomPeople,
    VehicleInfoActions.getAllPeople, state => ({
      ...state,
      loading: true
    })),
  on(VehicleInfoActions.getRandomPeopleSuccess,
    VehicleInfoActions.getAllPeopleSuccess,
    VehicleInfoActions.getRandomPeopleFailure,
    VehicleInfoActions.getAllPeopleFailure,
    state => ({
      ...state,
      loading: initialState.loading
    })),
  on(VehicleInfoActions.getRandomPeopleSuccess, (state, {randomPeople}) => ({
    ...state,
    randomPeople
  })),
  on(VehicleInfoActions.getAllPeopleSuccess, (state, {allPeople}) => ({
    ...state,
    allPeople,
  })),
  on(VehicleInfoActions.getRandomPeopleFailure,
    VehicleInfoActions.getAllPeopleFailure, (state, {error}) => ({
      ...state,
      error
    }))
);
