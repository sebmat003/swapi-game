import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from '../reducers/game.reducers';

export const selectFeatureState = createFeatureSelector<State>(featureKey);

export const selectNumberOfPeople = createSelector(
  selectFeatureState,
  (state) => state.numberOfPeople,
);
export const selectPeople = createSelector(
  selectFeatureState,
  (state) => state.randomPeople,
);
export const selectLoading = createSelector(
  selectFeatureState,
  (state) => state.loading,
);
export const selectError = createSelector(
  selectFeatureState,
  (state) => state.error,
);
