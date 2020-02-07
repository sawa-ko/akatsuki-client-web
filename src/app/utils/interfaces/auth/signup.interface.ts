export interface KeySingUpInterface {
    key: string
}

export interface SignUpInterface {
  name: string;
  username: string;
  specialty: string;
  device: string | number;
  email: KeySingUpInterface,
  password: KeySingUpInterface
}