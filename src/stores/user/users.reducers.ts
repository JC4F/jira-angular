import { UserSchema } from '@/types';
import { createFeature, createReducer } from '@ngrx/store';
import { AuthActions } from './users.actions';
import { immerOn } from 'ngrx-immer/store';

export type AuthState = UserSchema & {
  isLoading: boolean;
};

export const initialState: AuthState = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
  accessToken: '',
  issueIds: [],
  createdAt: '',
  updatedAt: '',
  isLoading: false,
};

export const userReducer = createFeature({
  name: 'user',
  reducer: createReducer<AuthState>(
    initialState,
    immerOn(AuthActions.loginStart, state => {
      state.isLoading = true;
    }),
    immerOn(AuthActions.loginSuccess, (state, user) => {
      Object.assign(state, user);
      state.isLoading = false;
    }),
    immerOn(AuthActions.logout, () => initialState),
    immerOn(AuthActions.loginFail, () => initialState)
  ),
});
