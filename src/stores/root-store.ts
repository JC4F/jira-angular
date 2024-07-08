import { filterReducer } from './filter/filters.reducers';
import { userReducer } from './user/users.reducers';
// import { ActionReducer, combineReducers } from '@ngrx/store';

// type ExtractState<T> = T extends ActionReducer<infer S, never> ? S : never;

// export const reducers = combineReducers({
//   [userReducer.name]: userReducer.reducer,
// });

// export type RootState = ExtractState<typeof reducers>;

export const reducers = {
  [userReducer.name]: userReducer.reducer,
  [filterReducer.name]: filterReducer.reducer,
};

export type RootState = typeof reducers;
