import { Address } from '../address.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  address: Address;
}
