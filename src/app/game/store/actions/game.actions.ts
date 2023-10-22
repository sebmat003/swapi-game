import { createAction, props } from "@ngrx/store";
import { BasicPersonProperties, Person } from "../../game/person.models";

export const GameActions = {
  GET_RANDOM_PEOPLE: '[Game] Get random people',
  GET_RANDOM_PEOPLE_SUCCESS: '[Game] Success to get random people',
  GET_RANDOM_PEOPLE_FAILURE: '[Game] Failure to get random people',

  GET_ALL_PEOPLE: '[Game] Get all people',
  GET_ALL_PEOPLE_SUCCESS: '[Game] Success to get all people',
  GET_ALL_PEOPLE_FAILURE: '[Game] Failure to get all people',
}

export const getRandomPeople = createAction(GameActions.GET_RANDOM_PEOPLE);
export const getRandomPeopleSuccess = createAction(GameActions.GET_RANDOM_PEOPLE_SUCCESS, props<{
  people: Person[]
}>());
export const getRandomPeopleFailure = createAction(GameActions.GET_RANDOM_PEOPLE_FAILURE, props<{
  error: string
}>());

export const getAllPeople = createAction(GameActions.GET_ALL_PEOPLE);
export const getAllPeopleSuccess = createAction(GameActions.GET_ALL_PEOPLE_SUCCESS, props<{
  allPeople: BasicPersonProperties[]
}>());
export const getAllPeopleFailure = createAction(GameActions.GET_ALL_PEOPLE_FAILURE, props<{
  error: string
}>());
