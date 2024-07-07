import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './features/home/home.routes';
import { combineReducers, provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as authEffect from './stores/user/users.effects';
import { userReducer } from './stores/user/users.reducers';

const reducers = combineReducers({
  [userReducer.name]: userReducer.reducer,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideEffects([authEffect]),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    provideState(reducers),
  ],
};
