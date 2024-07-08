import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@/services/user.service';
import { AuthActions } from './users.actions';

export const authEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) => {
        AuthActions.loginStart();

        return userService.login({ email, password }).pipe(
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
