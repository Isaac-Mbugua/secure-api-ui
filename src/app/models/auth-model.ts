export interface Register {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
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
