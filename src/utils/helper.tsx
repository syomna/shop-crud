import { fromAddress, fromLatLng } from "react-geocode";
import { validCode, validPhoneNumber } from "./constants";
import { GeoLocationProps, ValidateFieldsProps } from "./props";

export const validateField = ({
  fieldName,
  touchedFields,
  initialValues,
}: ValidateFieldsProps) => {
  const name = fieldName == "shopName";
  const code = fieldName == "shopCode";
  const phone = fieldName == "phoneNumber";

  if (touchedFields[fieldName] && initialValues[fieldName].trim() === "") {
    return `${
      name ? "Shop Name" : code ? "Shop Code" : "Phone Number"
    } is required`;
  } else if (
    touchedFields[fieldName] &&
    phone &&
    !validPhoneNumber.test(initialValues[fieldName])
  ) {
    return "Phone number must be 12 digits starts with 01";
  } else if (
    touchedFields[fieldName] &&
    code &&
    !validCode.test(initialValues[fieldName])
  ) {
    return "Shop Code must be 2 digits";
  } else return "";
};

export const getAddress: ({ lat, lng }: GeoLocationProps) => Promise<string> = async ({
  lat,
  lng,
}: GeoLocationProps) => {
  const results = await fromLatLng(lat, lng);
  const address = results.results[0].address_components;
  const a = `${address[1].long_name}, ${address[2].long_name}, ${address[3].long_name}, ${address[4].long_name}`;
  return a;
};

export const getCoordinates = async (address: string) => {
  const result = await fromAddress(address);
  const coordinates = result.results[0].geometry.location;
  const geolocation: GeoLocationProps = {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };
    return geolocation;
};
