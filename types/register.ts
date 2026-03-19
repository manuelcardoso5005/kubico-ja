export type UserRole = 'buyer' | 'seller' | 'agent';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}