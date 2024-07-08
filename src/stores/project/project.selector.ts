import { createSelector, select } from '@ngrx/store';
import { RootState } from '../root-store';
import { IssueStatus } from '@/types';
import { map, pipe } from 'rxjs';

export const lastIssuePosition = (status: IssueStatus) =>
  createSelector(
    (state: RootState) => state.project.issues,
    issues => issues.filter(issue => issue.status === status).length
  );

export const issueByStatusSorted = (status: IssueStatus) =>
  createSelector(
    (state: RootState) => state.project.issues,
    issues =>
      issues
        .filter(x => x.status === status)
        .sort((a, b) => a.listPosition - b.listPosition)
  );

export const issueById = (issueId: string) =>
  pipe(
    select((state: RootState) => state.project.issues),
    map(issues => issues.find(x => x.id === issueId))
  );
