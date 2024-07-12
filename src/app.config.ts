import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideQuillConfig } from 'ngx-quill';
import { routes } from './app.routes';
import { quillConfiguration } from './constants';
import * as projectEffect from './stores/project/projects.effects';
import { reducers } from './stores/root-store';
import * as authEffect from './stores/user/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([authEffect, projectEffect]),
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: quillConfiguration.toolbar,
      },
    }),
  ],
};
