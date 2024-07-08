import { ActionReducer } from '@ngrx/store';
import { filterReducer } from './filter/filters.reducers';
import { projectReducer } from './project/projects.reducers';
import { userReducer } from './user/users.reducers';
// import { ActionReducer, combineReducers } from '@ngrx/store';

type ExtractState<T> = T extends ActionReducer<infer S, never> ? S : never;

// export const reducers = combineReducers({
//   [userReducer.name]: userReducer.reducer,
// });

// export type RootReducerState = ExtractState<typeof reducers>;

export const reducers = {
  [userReducer.name]: userReducer.reducer,
  [filterReducer.name]: filterReducer.reducer,
  [projectReducer.name]: projectReducer.reducer,
};

export type RootReducerState = typeof reducers;
export type RootState = {
  [K in keyof RootReducerState]: ExtractState<RootReducerState[K]>;
};
