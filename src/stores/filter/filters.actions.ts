import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FilterActions = createActionGroup({
  source: 'Filter',
  events: {
    'Search Term': props<{ searchTerm: string }>(),
    'Toggle User Id': props<{ userId: string }>(),
    'Toggle Only My Issue': emptyProps(),
    'Toggle Ignore Resolve': emptyProps(),
    'Reset All': emptyProps(),
  },
});
