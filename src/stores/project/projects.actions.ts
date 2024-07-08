import { CommentSchema, IssueSchema, ProjectSchema } from '@/types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProjectActions = createActionGroup({
  source: 'Project',
  events: {
    'Init Fetch Project': emptyProps(),
    'Fetch Project Success': props<ProjectSchema>(),
    'Fetch Project Fail': emptyProps(),
    'Update Project': props<Partial<ProjectSchema>>(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'Update Issues': props<IssueSchema>(),
    'Delete Issues': props<{ issueId: string }>(),
    'Update Issue Comment': props<{
      issueId: string;
      comment: CommentSchema;
    }>(),
  },
});
