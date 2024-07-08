import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './features/home/home.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as authEffect from './stores/user/users.effects';
import * as projectEffect from './stores/project/projects.effects';
import { provideHttpClient } from '@angular/common/http';
import { reducers } from './stores/root-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([authEffect, projectEffect]),
  ],
};
