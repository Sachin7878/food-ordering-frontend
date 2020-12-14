import { Address } from '../address.model';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  address: Address;
}
