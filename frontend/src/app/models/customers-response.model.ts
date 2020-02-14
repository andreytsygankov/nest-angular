
interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  created_at: Date;
  user: string;
  _id: string;
}

interface CustomerPagination {
  count: number;
  limit: number;
  offset: number;
  list: Customer[];
}

export interface CustomersResponse {
  data: CustomerPagination;
  code: string;
}

