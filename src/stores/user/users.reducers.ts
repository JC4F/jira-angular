import { UserSchema } from '@/types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './users.actions';

export type AuthState = UserSchema & {
  isLoading: boolean;
};

export const initialState: AuthState | null = null;

export const userReducer = createFeature({
  name: 'user',
  reducer: createReducer<AuthState | null>(
    initialState,
    on(AuthActions.logout, () => initialState),
    on(AuthActions.loginFail, () => initialState)
  ),
});
