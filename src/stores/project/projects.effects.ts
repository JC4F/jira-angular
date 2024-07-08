import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectActions } from './projects.actions';
import { ProjectService } from '@/services';

export const projectEffect = createEffect(
  (actions$ = inject(Actions), projectService = inject(ProjectService)) => {
    return actions$.pipe(
      ofType(ProjectActions.fetchProject),
      exhaustMap(() => {
        ProjectActions.initFetchProject();

        return projectService.fetchProject().pipe(
          map(response => {
            if (response.data && response.success) {
              return ProjectActions.fetchProjectSuccess(response.data);
            }
            return ProjectActions.fetchProjectFail({
              message: response.message,
            });
          }),
          catchError((error: { message: string }) =>
            of(ProjectActions.fetchProjectFail({ message: error.message }))
          )
        );
      })
    );
  },
  { functional: true }
);
