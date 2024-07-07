import { BaseResponse } from '../response';

export type UserSchema = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  issueIds: string[];
  accessToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = BaseResponse<UserSchema>;
