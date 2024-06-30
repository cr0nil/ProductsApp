export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthData {
  token: string;
}

export type AuthResponse = Promise<[AuthData, Error]>;
