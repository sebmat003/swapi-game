import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureKey, State } from "../reducers/game.reducers";

export const selectFeatureState = createFeatureSelector<State>(featureKey);

export const selectAllPeopleIds = createSelector(selectFeatureState, state => state.allPeople?.map(person => +person.uid));
export const selectPeople = createSelector(selectFeatureState, state => state.people);
export const selectLoading = createSelector(selectFeatureState, state => state.loading);
export const selectError = createSelector(selectFeatureState, state => state.error);
