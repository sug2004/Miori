export interface PublicUser {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: PublicUser;
}

export interface MeResponse {
  user: PublicUser;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly fields?: string[];

  constructor(status: number, message: string, fields?: string[]) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.fields = fields;
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}