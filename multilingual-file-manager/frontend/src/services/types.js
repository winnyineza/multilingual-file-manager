export interface User {
  id: number;
  username: string;
  email: string;
}

export interface FileType {
  id: number;
  name: string;
  path: string;
  created_at: string;
  user_id: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ProfileUpdateData {
  username?: string;
  email?: string;
  language?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  isAuthenticated: boolean;
} 