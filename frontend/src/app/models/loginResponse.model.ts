
interface User {
  _id: string;
  email: string;
}

interface Data {
  user: User;
  token: string;
  expiredAt: Date;
  refreshToken: string;
}

export interface LoginResponse {
  data: Data;
}

