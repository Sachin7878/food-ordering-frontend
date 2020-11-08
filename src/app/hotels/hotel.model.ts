import { Address } from '../address.model';
import { MenuItem } from './menu-item.model';

export interface Hotel {
  id: number;
  hotelName: string;
  mobileNo: number;
  menuItems?: MenuItem[];
  address?: Address;
}
