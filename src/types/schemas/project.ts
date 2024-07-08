import { BaseResponse } from '../response';
import { IssueSchema } from './issue';
import { UserSchema } from './user';

export type ProjectSchema = {
  id: string;
  name: string;
  url: string;
  description: string;
  category: ProjectCategory;
  createdAt: string;
  updateAt: string;
  issues: IssueSchema[];
  users: UserSchema[];
};

export enum ProjectCategory {
  SOFTWARE = 'Software',
  MARKETING = 'Marketing',
  BUSINESS = 'Business',
}

export type projectResponse = BaseResponse<ProjectSchema>;
