export interface Hotel {
  id: number;
  hotelName: string;
  mobileNo: number;
  menuItems?: [{ id: number; itemName: string; itemPrice: number }];
  address?: {
    id: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}
