import { LoginPayload, UserSchema } from '@/types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<LoginPayload>(),
    'Login Success': props<UserSchema>(),
    'Login Fail': props<{ message: string }>(),
    Logout: emptyProps(),
  },
});
