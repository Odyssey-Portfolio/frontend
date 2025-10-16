export interface UpdateUserDetailsRequest {
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  userId?: string;
}
