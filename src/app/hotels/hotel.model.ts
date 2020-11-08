export interface Hotel {
  id: number;
  hotelName: string;
  mobileNo: number;
  menuItems?: [
    { mId: number; itemName: string; itemPrice: number; available: boolean }
  ];
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
