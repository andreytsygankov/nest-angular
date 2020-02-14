
interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  created_at: Date;
  user: string;
  _id: string;
}

export interface UserResponse {
  data: User[];
  code: string;
}

