import { createAction, props } from '@ngrx/store';
import { Person } from '../../models/person.models';

export const GameActions = {
  GET_RANDOM_PEOPLE: '[Game] Get random people',
  GET_RANDOM_PEOPLE_SUCCESS: '[Game] Success to get random people',
  GET_RANDOM_PEOPLE_FAILURE: '[Game] Failure to get random people',

  GET_NUMBER_OF_PEOPLE: '[Game] Get number of people',
  GET_NUMBER_OF_PEOPLE_SUCCESS: '[Game] Success to get number of people',
  GET_NUMBER_OF_PEOPLE_FAILURE: '[Game] Failure to get number of people',
};

export const getRandomPeople = createAction(GameActions.GET_RANDOM_PEOPLE);
export const getRandomPeopleSuccess = createAction(
  GameActions.GET_RANDOM_PEOPLE_SUCCESS,
  props<{
    randomPeople: Person[];
  }>(),
);
export const getRandomPeopleFailure = createAction(
  GameActions.GET_RANDOM_PEOPLE_FAILURE,
  props<{
    error: string;
  }>(),
);

export const getNumberOfPeople = createAction(GameActions.GET_NUMBER_OF_PEOPLE);
export const getNumberOfPeopleSuccess = createAction(
  GameActions.GET_NUMBER_OF_PEOPLE_SUCCESS,
  props<{
    numberOfPeople: number;
  }>(),
);
export const getNumberOfPeopleFailure = createAction(
  GameActions.GET_NUMBER_OF_PEOPLE_FAILURE,
  props<{
    error: string;
  }>(),
);
