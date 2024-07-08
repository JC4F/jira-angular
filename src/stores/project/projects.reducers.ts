import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { ProjectSchema } from '@/types';
import { ProjectActions } from './projects.actions';
import { produce } from 'immer';

export type ProjectState = ProjectSchema & {
  isLoading: boolean;
};

export const initialState: ProjectState = {
  issues: [],
  users: [],
  isLoading: false,
} as unknown as ProjectState;

export const projectReducer = createFeature({
  name: 'project',
  reducer: createReducer<ProjectState>(
    initialState,
    immerOn(ProjectActions.fetchProjectSuccess, (state, project) => {
      return produce(state, draft => {
        Object.assign(draft, project);
        draft.isLoading = false; // Set isLoading to false after successfully fetching the project
      });
    })
  ),
});
