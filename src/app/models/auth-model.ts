export interface Register {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}
