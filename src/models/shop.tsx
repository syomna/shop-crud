import { GeoLocationProps } from "../utils/props";

export interface ShopModel {
  id: string;
  name: string;
  code: string;
  location: GeoLocationProps;
  address: string;
  phoneNumber: string;
}
