import { GeoLocationProps } from "./props";

export const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
export declare type Library = "places";
export declare type Libraries = Library[];
export const libraries: Libraries = ["places"];
export const validPhoneNumber = new RegExp("^01[0-9]{10}$");
export const validCode = new RegExp("^[0-9]{2}$");
export const defaultCoordinates: GeoLocationProps = {
  lat: 38.01764771383971,
  lng: -105.01705625,
};