import { UserSchema } from './user';

export type CommentSchema = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  issueId: string;
  userId: string;
  user: UserSchema;
};
