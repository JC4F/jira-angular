import { createFeature, createReducer, on } from '@ngrx/store';
import { FilterActions } from './filters.actions';
import { immerOn } from 'ngrx-immer/store';

export type FilterState = {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  ignoreResolved: boolean;
};

export const initialState: FilterState = {
  searchTerm: '',
  userIds: [],
  onlyMyIssue: false,
  ignoreResolved: false,
};

export const filterReducer = createFeature({
  name: 'filter',
  reducer: createReducer<FilterState>(
    initialState,
    immerOn(FilterActions.searchTerm, (state, { searchTerm }) => {
      state.searchTerm = searchTerm;
    }),
    immerOn(FilterActions.toggleUserId, (state, { userId }) => {
      const hasUser = state.userIds.includes(userId);
      if (hasUser) state.userIds.filter(x => x !== userId);
      else state.userIds.push(userId);
    }),
    immerOn(FilterActions.toggleOnlyMyIssue, state => {
      state.onlyMyIssue = !state.onlyMyIssue;
    }),
    immerOn(FilterActions.toggleIgnoreResolve, state => {
      state.ignoreResolved = !state.ignoreResolved;
    }),
    on(FilterActions.resetAll, () => ({
      ...initialState,
    }))
  ),
});
