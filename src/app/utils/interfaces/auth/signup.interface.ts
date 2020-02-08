export interface KeySingUpInterface {
  readonly key: string;
}

export interface SignUpInterface {
  readonly name: string;
  readonly username: string;
  readonly specialty: string;
  readonly device: string | number;
  readonly email: KeySingUpInterface;
  readonly password: KeySingUpInterface;
}
