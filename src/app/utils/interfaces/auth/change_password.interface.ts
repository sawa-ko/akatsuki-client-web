export interface ChangePasswordInterface {
  readonly userId: string;

  readonly tokenPassword: string;

  readonly newPassword: string;
}
