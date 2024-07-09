import { UserService } from '@/services/user.service';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, delay, exhaustMap, map, of } from 'rxjs';
import { RootState } from '../root-store';
import { AuthActions } from './users.actions';

export const authEffect = createEffect(
  (
    actions$ = inject(Actions),
    userService = inject(UserService),
    store = inject(Store<RootState>)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) => {
        store.dispatch(AuthActions.loginStart());

        return userService.login({ email, password }).pipe(
          delay(1000),
          map(response => {
            if (response.data && response.success) {
              return AuthActions.loginSuccess(response.data);
            }
            return AuthActions.loginFail({ message: response.message });
          }),
          catchError((error: { message: string }) =>
            of(AuthActions.loginFail({ message: error.message }))
          )
        );
      })
    );
  },
  { functional: true }
);
