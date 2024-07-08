import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { ProjectSchema } from '@/types';
import { ProjectActions } from './projects.actions';

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
      Object.assign(state, project);
      state.isLoading = false;
    }),
    immerOn(ProjectActions.updateProject, (state, project) => {
      Object.assign(state, project);
    }),
    immerOn(ProjectActions.initFetchProject, state => {
      state.isLoading = true;
    }),
    immerOn(ProjectActions.fetchProjectFail, state => {
      Object.assign(state, initialState);
    }),
    immerOn(ProjectActions.updateIssues, (state, issue) => {
      const hasIssue = issue.id && state.issues.find(i => i.id === issue.id);
      if (hasIssue) {
        state.issues = state.issues.map(i => (i.id === issue.id ? issue : i));
      } else state.issues.push(issue);
    }),
    immerOn(ProjectActions.deleteIssues, (state, { issueId }) => {
      state.issues = state.issues.filter(i => i.id !== issueId);
    }),
    immerOn(
      ProjectActions.updateIssueComment,
      (state, { issueId, comment }) => {
        const issue = state.issues.find(i => i.id === issueId);
        if (!issue) return;

        const hasComment = issue.comments.find(c => c.id === comment.id);
        if (hasComment) {
          issue.comments = issue.comments.map(c =>
            c.id === comment.id ? comment : c
          );
        } else issue.comments.push(comment);
      }
    )
  ),
});
