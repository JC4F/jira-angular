import { CommentSchema, IssueSchema, ProjectSchema } from '@/types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProjectActions = createActionGroup({
  source: 'Project',
  events: {
    'Fetch Project': emptyProps(),
    'Init Fetch Project': emptyProps(),
    'Fetch Project Success': props<ProjectSchema>(),
    'Fetch Project Fail': props<{ message: string }>(),
    'Update Project': props<Partial<ProjectSchema>>(),
    'Update Issues': props<IssueSchema>(),
    'Delete Issues': props<{ issueId: string }>(),
    'Update Issue Comment': props<{
      issueId: string;
      comment: CommentSchema;
    }>(),
  },
});
