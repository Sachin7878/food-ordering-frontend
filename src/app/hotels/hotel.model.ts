import { Address } from '../address.model';
import { User } from '../user/user-model';
import { MenuItem } from './menu-item.model';

export interface Hotel {
  id: number;
  hotelName: string;
  mobileNo: number;
  menuItems?: MenuItem[];
  address?: Address;
  vendor?: User;
}
